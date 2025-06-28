import crypto from "crypto";
import { logger } from "../../../utils/logger";

interface PaystackConfig {
  secretKey: string;
  publicKey: string;
  baseUrl: string;
}

export class PaystackProvider {
  private config: PaystackConfig;

  constructor() {
    this.config = {
      secretKey: process.env.PAYSTACK_SECRET_KEY || "",
      publicKey: process.env.PAYSTACK_PUBLIC_KEY || "",
      baseUrl: "https://api.paystack.co",
    };

    if (!this.config.secretKey) {
      throw new Error("PAYSTACK_SECRET_KEY environment variable is required");
    }

    logger.info("✅ Paystack provider initialized");
  }

  private async makeRequest(
    endpoint: string,
    method: string = "GET",
    data?: any,
  ): Promise<any> {
    try {
      const url = `${this.config.baseUrl}${endpoint}`;
      const options: RequestInit = {
        method,
        headers: {
          Authorization: `Bearer ${this.config.secretKey}`,
          "Content-Type": "application/json",
        },
      };

      if (
        data &&
        (method === "POST" || method === "PUT" || method === "PATCH")
      ) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Paystack API request failed");
      }

      return result;
    } catch (error) {
      logger.error("Paystack API request failed:", error);
      throw error;
    }
  }

  async createCustomer(customerData: any): Promise<any> {
    try {
      const response = await this.makeRequest("/customer", "POST", {
        email: customerData.email,
        first_name: customerData.name?.split(" ")[0] || "",
        last_name: customerData.name?.split(" ").slice(1).join(" ") || "",
        phone: customerData.phone,
        metadata: {
          atlasUserId: customerData.userId,
          atlasCustomerId: customerData.id,
        },
      });

      logger.info(`Paystack customer created: ${response.data.customer_code}`);
      return {
        id: response.data.customer_code,
        email: response.data.email,
        name: `${response.data.first_name} ${response.data.last_name}`.trim(),
      };
    } catch (error) {
      logger.error("Failed to create Paystack customer:", error);
      throw error;
    }
  }

  async createPaymentIntent(intentData: any): Promise<any> {
    try {
      const response = await this.makeRequest(
        "/transaction/initialize",
        "POST",
        {
          email: intentData.customerEmail,
          amount: Math.round(intentData.amount * 100), // Convert to kobo
          currency: intentData.currency || "NGN",
          reference: this.generateReference(intentData.id),
          callback_url: process.env.PAYSTACK_CALLBACK_URL,
          metadata: {
            atlasIntentId: intentData.id,
            workspaceId: intentData.workspaceId,
            ...intentData.metadata,
          },
        },
      );

      logger.info(
        `Paystack transaction initialized: ${response.data.reference}`,
      );
      return {
        id: response.data.reference,
        status: "processing",
        authorizationUrl: response.data.authorization_url,
        accessCode: response.data.access_code,
      };
    } catch (error) {
      logger.error("Failed to initialize Paystack transaction:", error);
      throw error;
    }
  }

  async confirmPaymentIntent(
    paymentIntentId: string,
    paymentMethodId?: string,
  ): Promise<any> {
    try {
      // For Paystack, confirmation happens through the frontend
      // We can verify the transaction status
      const response = await this.makeRequest(
        `/transaction/verify/${paymentIntentId}`,
      );

      logger.info(`Paystack transaction verified: ${paymentIntentId}`);
      return {
        id: paymentIntentId,
        status: response.data.status === "success" ? "succeeded" : "failed",
      };
    } catch (error) {
      logger.error("Failed to verify Paystack transaction:", error);
      throw error;
    }
  }

  async createSubscription(subscriptionData: any): Promise<any> {
    try {
      // First create a plan if it doesn't exist
      const planResponse = await this.makeRequest("/plan", "POST", {
        name: subscriptionData.planName,
        amount: Math.round(subscriptionData.amount * 100), // Convert to kobo
        interval: subscriptionData.interval || "monthly",
        currency: subscriptionData.currency || "NGN",
      });

      // Create subscription
      const response = await this.makeRequest("/subscription", "POST", {
        customer: subscriptionData.customerId,
        plan: planResponse.data.plan_code,
        authorization: subscriptionData.authorizationCode,
        start_date: subscriptionData.startDate || new Date().toISOString(),
      });

      logger.info(
        `Paystack subscription created: ${response.data.subscription_code}`,
      );
      return {
        id: response.data.subscription_code,
        status: response.data.status,
        nextPaymentDate: response.data.next_payment_date,
      };
    } catch (error) {
      logger.error("Failed to create Paystack subscription:", error);
      throw error;
    }
  }

  async cancelSubscription(
    subscriptionId: string,
    cancelAtPeriodEnd: boolean = false,
  ): Promise<any> {
    try {
      const endpoint = cancelAtPeriodEnd
        ? `/subscription/disable`
        : `/subscription/${subscriptionId}`;

      const response = await this.makeRequest(endpoint, "POST", {
        code: subscriptionId,
        token: subscriptionId,
      });

      logger.info(`Paystack subscription cancelled: ${subscriptionId}`);
      return {
        id: subscriptionId,
        status: "cancelled",
      };
    } catch (error) {
      logger.error("Failed to cancel Paystack subscription:", error);
      throw error;
    }
  }

  async createPaymentMethod(customerId: string, methodData: any): Promise<any> {
    try {
      // Paystack doesn't have a separate payment method creation
      // Payment methods are created during transactions
      // We'll return a mock response for consistency
      const paymentMethodId = `pm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      logger.info(`Paystack payment method created: ${paymentMethodId}`);
      return {
        id: paymentMethodId,
        type: methodData.type || "card",
        last4: "****", // Would be populated from actual card data
        brand: "visa", // Would be determined from card data
      };
    } catch (error) {
      logger.error("Failed to create Paystack payment method:", error);
      throw error;
    }
  }

  async createRefund(
    paymentIntentId: string,
    amount?: number,
    reason?: string,
  ): Promise<any> {
    try {
      const response = await this.makeRequest("/refund", "POST", {
        transaction: paymentIntentId,
        amount: amount ? Math.round(amount * 100) : undefined, // Convert to kobo
        currency: "NGN",
        customer_note: reason,
        merchant_note: reason,
      });

      logger.info(`Paystack refund created: ${response.data.id}`);
      return {
        id: response.data.id,
        status: response.data.status,
        amount: response.data.amount / 100, // Convert from kobo
      };
    } catch (error) {
      logger.error("Failed to create Paystack refund:", error);
      throw error;
    }
  }

  async handleWebhook(payload: any, signature: string): Promise<any> {
    try {
      // Verify webhook signature
      const hash = crypto
        .createHmac("sha512", process.env.PAYSTACK_WEBHOOK_SECRET || "")
        .update(JSON.stringify(payload))
        .digest("hex");

      if (hash !== signature) {
        throw new Error("Invalid webhook signature");
      }

      logger.info(`Paystack webhook received: ${payload.event}`);

      switch (payload.event) {
        case "charge.success":
          await this.handleChargeSuccess(payload.data);
          break;

        case "charge.failed":
          await this.handleChargeFailed(payload.data);
          break;

        case "subscription.create":
        case "subscription.disable":
          await this.handleSubscriptionEvent(payload.data, payload.event);
          break;

        case "invoice.create":
        case "invoice.update":
          await this.handleInvoiceEvent(payload.data, payload.event);
          break;

        default:
          logger.info(`Unhandled Paystack webhook event: ${payload.event}`);
      }

      return { received: true };
    } catch (error) {
      logger.error("Failed to handle Paystack webhook:", error);
      throw error;
    }
  }

  private async handleChargeSuccess(chargeData: any): Promise<void> {
    logger.info(`Charge succeeded: ${chargeData.reference}`);
    // Update payment intent status in database
  }

  private async handleChargeFailed(chargeData: any): Promise<void> {
    logger.info(`Charge failed: ${chargeData.reference}`);
    // Update payment intent status in database
  }

  private async handleSubscriptionEvent(
    subscriptionData: any,
    eventType: string,
  ): Promise<void> {
    logger.info(
      `Subscription event ${eventType}: ${subscriptionData.subscription_code}`,
    );
    // Update subscription status in database
  }

  private async handleInvoiceEvent(
    invoiceData: any,
    eventType: string,
  ): Promise<void> {
    logger.info(`Invoice event ${eventType}: ${invoiceData.id}`);
    // Handle invoice events
  }

  private generateReference(intentId: string): string {
    return `ATLAS_${intentId}_${Date.now()}`;
  }

  // Transfer and settlement methods
  async createTransfer(transferData: any): Promise<any> {
    try {
      const response = await this.makeRequest("/transfer", "POST", {
        source: "balance",
        amount: Math.round(transferData.amount * 100), // Convert to kobo
        recipient: transferData.recipientCode,
        reason: transferData.reason || "Atlas payment transfer",
        currency: transferData.currency || "NGN",
        reference: this.generateReference(transferData.id || "transfer"),
      });

      logger.info(`Paystack transfer created: ${response.data.transfer_code}`);
      return response.data;
    } catch (error) {
      logger.error("Failed to create Paystack transfer:", error);
      throw error;
    }
  }

  async createTransferRecipient(recipientData: any): Promise<any> {
    try {
      const response = await this.makeRequest("/transferrecipient", "POST", {
        type: recipientData.type || "nuban",
        name: recipientData.name,
        account_number: recipientData.accountNumber,
        bank_code: recipientData.bankCode,
        currency: recipientData.currency || "NGN",
        description: recipientData.description,
      });

      logger.info(
        `Paystack transfer recipient created: ${response.data.recipient_code}`,
      );
      return response.data;
    } catch (error) {
      logger.error("Failed to create Paystack transfer recipient:", error);
      throw error;
    }
  }

  // Bank and verification methods
  async getBanks(): Promise<any> {
    try {
      const response = await this.makeRequest("/bank?currency=NGN");
      return response.data;
    } catch (error) {
      logger.error("Failed to get Paystack banks:", error);
      throw error;
    }
  }

  async verifyBankAccount(
    accountNumber: string,
    bankCode: string,
  ): Promise<any> {
    try {
      const response = await this.makeRequest(
        `/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
      );

      return response.data;
    } catch (error) {
      logger.error("Failed to verify bank account:", error);
      throw error;
    }
  }
}
