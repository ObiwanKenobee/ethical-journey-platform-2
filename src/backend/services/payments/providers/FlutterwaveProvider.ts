import crypto from "crypto";
import { logger } from "../../../utils/logger";

interface FlutterwaveConfig {
  secretKey: string;
  publicKey: string;
  baseUrl: string;
}

export class FlutterwaveProvider {
  private config: FlutterwaveConfig;

  constructor() {
    this.config = {
      secretKey: process.env.FLUTTERWAVE_SECRET_KEY || "",
      publicKey: process.env.FLUTTERWAVE_PUBLIC_KEY || "",
      baseUrl: "https://api.flutterwave.com/v3",
    };

    if (!this.config.secretKey) {
      throw new Error(
        "FLUTTERWAVE_SECRET_KEY environment variable is required",
      );
    }

    logger.info("✅ Flutterwave provider initialized");
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
        throw new Error(result.message || "Flutterwave API request failed");
      }

      return result;
    } catch (error) {
      logger.error("Flutterwave API request failed:", error);
      throw error;
    }
  }

  async createCustomer(customerData: any): Promise<any> {
    try {
      const response = await this.makeRequest("/customers", "POST", {
        email: customerData.email,
        name: customerData.name,
        phone_number: customerData.phone,
        meta: [
          {
            metaname: "atlasUserId",
            metavalue: customerData.userId,
          },
          {
            metaname: "atlasCustomerId",
            metavalue: customerData.id,
          },
        ],
      });

      logger.info(`Flutterwave customer created: ${response.data.id}`);
      return {
        id: response.data.id.toString(),
        email: response.data.email,
        name: response.data.name,
      };
    } catch (error) {
      logger.error("Failed to create Flutterwave customer:", error);
      throw error;
    }
  }

  async createPaymentIntent(intentData: any): Promise<any> {
    try {
      const response = await this.makeRequest("/payments", "POST", {
        tx_ref: this.generateReference(intentData.id),
        amount: intentData.amount,
        currency: intentData.currency || "USD",
        redirect_url: process.env.FLUTTERWAVE_REDIRECT_URL,
        customer: {
          email: intentData.customerEmail,
          name: intentData.customerName,
          phonenumber: intentData.customerPhone,
        },
        customizations: {
          title: "Atlas Payment",
          description: "Payment for Atlas services",
          logo: process.env.COMPANY_LOGO_URL,
        },
        meta: {
          atlasIntentId: intentData.id,
          workspaceId: intentData.workspaceId,
          ...intentData.metadata,
        },
      });

      logger.info(`Flutterwave payment created: ${response.data.id}`);
      return {
        id: response.data.id.toString(),
        status: "processing",
        paymentLink: response.data.link,
      };
    } catch (error) {
      logger.error("Failed to create Flutterwave payment:", error);
      throw error;
    }
  }

  async confirmPaymentIntent(
    paymentIntentId: string,
    paymentMethodId?: string,
  ): Promise<any> {
    try {
      // Verify transaction
      const response = await this.makeRequest(
        `/transactions/${paymentIntentId}/verify`,
      );

      logger.info(`Flutterwave transaction verified: ${paymentIntentId}`);
      return {
        id: paymentIntentId,
        status: response.data.status === "successful" ? "succeeded" : "failed",
      };
    } catch (error) {
      logger.error("Failed to verify Flutterwave transaction:", error);
      throw error;
    }
  }

  async createSubscription(subscriptionData: any): Promise<any> {
    try {
      // Create payment plan first
      const planResponse = await this.makeRequest("/payment-plans", "POST", {
        amount: subscriptionData.amount,
        name: subscriptionData.planName,
        interval: subscriptionData.interval || "monthly",
        duration: subscriptionData.duration || 0, // 0 means forever
        currency: subscriptionData.currency || "USD",
      });

      // Create subscription
      const response = await this.makeRequest("/subscriptions", "POST", {
        payment_plan: planResponse.data.id,
        customer: subscriptionData.customerId,
        start_date: subscriptionData.startDate || new Date().toISOString(),
      });

      logger.info(`Flutterwave subscription created: ${response.data.id}`);
      return {
        id: response.data.id.toString(),
        status: response.data.status,
      };
    } catch (error) {
      logger.error("Failed to create Flutterwave subscription:", error);
      throw error;
    }
  }

  async cancelSubscription(
    subscriptionId: string,
    cancelAtPeriodEnd: boolean = false,
  ): Promise<any> {
    try {
      const response = await this.makeRequest(
        `/subscriptions/${subscriptionId}/cancel`,
        "PUT",
      );

      logger.info(`Flutterwave subscription cancelled: ${subscriptionId}`);
      return {
        id: subscriptionId,
        status: "cancelled",
      };
    } catch (error) {
      logger.error("Failed to cancel Flutterwave subscription:", error);
      throw error;
    }
  }

  async createPaymentMethod(customerId: string, methodData: any): Promise<any> {
    try {
      // Flutterwave doesn't have separate payment method storage
      // Payment methods are tokenized during transactions
      const paymentMethodId = `flw_pm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      logger.info(`Flutterwave payment method created: ${paymentMethodId}`);
      return {
        id: paymentMethodId,
        type: methodData.type || "card",
        last4: "****",
        brand: "unknown",
      };
    } catch (error) {
      logger.error("Failed to create Flutterwave payment method:", error);
      throw error;
    }
  }

  async createRefund(
    paymentIntentId: string,
    amount?: number,
    reason?: string,
  ): Promise<any> {
    try {
      const response = await this.makeRequest("/refunds", "POST", {
        id: paymentIntentId,
        amount: amount,
        comments: reason || "Refund requested",
      });

      logger.info(`Flutterwave refund created: ${response.data.id}`);
      return {
        id: response.data.id.toString(),
        status: response.data.status,
        amount: response.data.amount,
      };
    } catch (error) {
      logger.error("Failed to create Flutterwave refund:", error);
      throw error;
    }
  }

  async handleWebhook(payload: any, signature: string): Promise<any> {
    try {
      // Verify webhook signature
      const secretHash = process.env.FLUTTERWAVE_WEBHOOK_SECRET || "";
      const computedSignature = crypto
        .createHmac("sha256", secretHash)
        .update(JSON.stringify(payload))
        .digest("hex");

      if (computedSignature !== signature) {
        throw new Error("Invalid webhook signature");
      }

      logger.info(`Flutterwave webhook received: ${payload.event}`);

      switch (payload.event) {
        case "charge.completed":
          await this.handleChargeCompleted(payload.data);
          break;

        case "charge.failed":
          await this.handleChargeFailed(payload.data);
          break;

        case "subscription.activated":
        case "subscription.cancelled":
          await this.handleSubscriptionEvent(payload.data, payload.event);
          break;

        case "refund.completed":
          await this.handleRefundCompleted(payload.data);
          break;

        default:
          logger.info(`Unhandled Flutterwave webhook event: ${payload.event}`);
      }

      return { received: true };
    } catch (error) {
      logger.error("Failed to handle Flutterwave webhook:", error);
      throw error;
    }
  }

  private async handleChargeCompleted(chargeData: any): Promise<void> {
    logger.info(`Charge completed: ${chargeData.id}`);
    // Update payment intent status in database
  }

  private async handleChargeFailed(chargeData: any): Promise<void> {
    logger.info(`Charge failed: ${chargeData.id}`);
    // Update payment intent status in database
  }

  private async handleSubscriptionEvent(
    subscriptionData: any,
    eventType: string,
  ): Promise<void> {
    logger.info(`Subscription event ${eventType}: ${subscriptionData.id}`);
    // Update subscription status in database
  }

  private async handleRefundCompleted(refundData: any): Promise<void> {
    logger.info(`Refund completed: ${refundData.id}`);
    // Update refund status in database
  }

  private generateReference(intentId: string): string {
    return `ATLAS_FLW_${intentId}_${Date.now()}`;
  }

  // Transfer and payout methods
  async createTransfer(transferData: any): Promise<any> {
    try {
      const response = await this.makeRequest("/transfers", "POST", {
        account_bank: transferData.bankCode,
        account_number: transferData.accountNumber,
        amount: transferData.amount,
        narration: transferData.reason || "Atlas transfer",
        currency: transferData.currency || "USD",
        reference: this.generateReference(transferData.id || "transfer"),
        callback_url: process.env.FLUTTERWAVE_TRANSFER_CALLBACK_URL,
        debit_currency: transferData.currency || "USD",
      });

      logger.info(`Flutterwave transfer created: ${response.data.id}`);
      return response.data;
    } catch (error) {
      logger.error("Failed to create Flutterwave transfer:", error);
      throw error;
    }
  }

  // Bank verification
  async verifyBankAccount(
    accountNumber: string,
    bankCode: string,
  ): Promise<any> {
    try {
      const response = await this.makeRequest("/accounts/resolve", "POST", {
        account_number: accountNumber,
        account_bank: bankCode,
      });

      return response.data;
    } catch (error) {
      logger.error("Failed to verify bank account:", error);
      throw error;
    }
  }

  async getBanks(country: string = "NG"): Promise<any> {
    try {
      const response = await this.makeRequest(`/banks/${country}`);
      return response.data;
    } catch (error) {
      logger.error("Failed to get banks:", error);
      throw error;
    }
  }

  // Virtual account creation
  async createVirtualAccount(customerData: any): Promise<any> {
    try {
      const response = await this.makeRequest(
        "/virtual-account-numbers",
        "POST",
        {
          email: customerData.email,
          is_permanent: true,
          bvn: customerData.bvn,
          tx_ref: this.generateReference("va"),
          phonenumber: customerData.phone,
          firstname: customerData.firstName,
          lastname: customerData.lastName,
          narration: `Atlas Virtual Account - ${customerData.name}`,
        },
      );

      logger.info(
        `Flutterwave virtual account created: ${response.data.account_number}`,
      );
      return response.data;
    } catch (error) {
      logger.error("Failed to create virtual account:", error);
      throw error;
    }
  }

  // Bill payments
  async createBillPayment(billData: any): Promise<any> {
    try {
      const response = await this.makeRequest("/bills", "POST", {
        country: billData.country || "NG",
        customer: billData.customer,
        amount: billData.amount,
        recurrence: billData.recurrence || "ONCE",
        type: billData.type,
        reference: this.generateReference("bill"),
      });

      logger.info(`Flutterwave bill payment created: ${response.data.id}`);
      return response.data;
    } catch (error) {
      logger.error("Failed to create bill payment:", error);
      throw error;
    }
  }

  // Exchange rates
  async getExchangeRates(
    from: string,
    to: string,
    amount: number,
  ): Promise<any> {
    try {
      const response = await this.makeRequest(
        `/transfers/rates?amount=${amount}&destination_currency=${to}&source_currency=${from}`,
      );

      return response.data;
    } catch (error) {
      logger.error("Failed to get exchange rates:", error);
      throw error;
    }
  }
}
