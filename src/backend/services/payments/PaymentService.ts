import Stripe from "stripe";
import { supabaseService } from "../../config/database";
import { logger } from "../../utils/logger";
import { PaystackProvider } from "./providers/PaystackProvider";
import { StripeProvider } from "./providers/StripeProvider";
import { FlutterwaveProvider } from "./providers/FlutterwaveProvider";

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  customerId?: string;
  workspaceId?: string;
  metadata?: Record<string, any>;
  status: "pending" | "processing" | "succeeded" | "failed" | "cancelled";
  provider: "stripe" | "paystack" | "flutterwave";
  providerIntentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentMethod {
  id: string;
  customerId: string;
  type: "card" | "bank_account" | "wallet";
  provider: string;
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  metadata?: Record<string, any>;
}

export interface Customer {
  id: string;
  userId: string;
  email: string;
  name: string;
  phone?: string;
  address?: any;
  stripeCustomerId?: string;
  paystackCustomerId?: string;
  flutterwaveCustomerId?: string;
  metadata?: Record<string, any>;
}

export interface Subscription {
  id: string;
  customerId: string;
  workspaceId: string;
  planId: string;
  status: "active" | "cancelled" | "past_due" | "incomplete" | "trialing";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  trialEnd?: string;
  cancelAtPeriodEnd: boolean;
  provider: string;
  providerSubscriptionId: string;
  metadata?: Record<string, any>;
}

export interface Invoice {
  id: string;
  customerId: string;
  subscriptionId?: string;
  amount: number;
  currency: string;
  status: "draft" | "open" | "paid" | "void" | "uncollectible";
  dueDate?: string;
  paidAt?: string;
  provider: string;
  providerInvoiceId: string;
  downloadUrl?: string;
  metadata?: Record<string, any>;
}

export interface PaymentPlan {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  interval: "month" | "year";
  intervalCount: number;
  trialPeriodDays?: number;
  features: string[];
  isActive: boolean;
  metadata?: Record<string, any>;
}

class PaymentService {
  private stripeProvider: StripeProvider;
  private paystackProvider: PaystackProvider;
  private flutterwaveProvider: FlutterwaveProvider;

  constructor() {
    this.stripeProvider = new StripeProvider();
    this.paystackProvider = new PaystackProvider();
    this.flutterwaveProvider = new FlutterwaveProvider();
  }

  // Customer Management
  async createCustomer(customerData: Omit<Customer, "id">): Promise<Customer> {
    try {
      // Create customer record in database
      const { data: customer, error } = await supabaseService
        .from("customers")
        .insert([
          {
            ...customerData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Create customers in payment providers
      const [stripeCustomer, paystackCustomer, flutterwaveCustomer] =
        await Promise.allSettled([
          this.stripeProvider.createCustomer(customer),
          this.paystackProvider.createCustomer(customer),
          this.flutterwaveProvider.createCustomer(customer),
        ]);

      // Update customer with provider IDs
      const updateData: any = {};
      if (stripeCustomer.status === "fulfilled") {
        updateData.stripe_customer_id = stripeCustomer.value.id;
      }
      if (paystackCustomer.status === "fulfilled") {
        updateData.paystack_customer_id = paystackCustomer.value.id;
      }
      if (flutterwaveCustomer.status === "fulfilled") {
        updateData.flutterwave_customer_id = flutterwaveCustomer.value.id;
      }

      if (Object.keys(updateData).length > 0) {
        await supabaseService
          .from("customers")
          .update(updateData)
          .eq("id", customer.id);
      }

      logger.info(`Customer created: ${customer.id}`);
      return customer;
    } catch (error) {
      logger.error("Failed to create customer:", error);
      throw error;
    }
  }

  async getCustomer(customerId: string): Promise<Customer | null> {
    try {
      const { data: customer, error } = await supabaseService
        .from("customers")
        .select("*")
        .eq("id", customerId)
        .single();

      if (error) throw error;
      return customer;
    } catch (error) {
      logger.error("Failed to get customer:", error);
      return null;
    }
  }

  async updateCustomer(
    customerId: string,
    updates: Partial<Customer>,
  ): Promise<Customer> {
    try {
      const { data: customer, error } = await supabaseService
        .from("customers")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", customerId)
        .select()
        .single();

      if (error) throw error;

      logger.info(`Customer updated: ${customerId}`);
      return customer;
    } catch (error) {
      logger.error("Failed to update customer:", error);
      throw error;
    }
  }

  // Payment Intent Management
  async createPaymentIntent(
    intentData: Omit<
      PaymentIntent,
      "id" | "status" | "createdAt" | "updatedAt"
    >,
  ): Promise<PaymentIntent> {
    try {
      // Create payment intent record
      const { data: intent, error } = await supabaseService
        .from("payment_intents")
        .insert([
          {
            ...intentData,
            status: "pending",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Create intent with selected provider
      let providerIntent;
      switch (intentData.provider) {
        case "stripe":
          providerIntent =
            await this.stripeProvider.createPaymentIntent(intent);
          break;
        case "paystack":
          providerIntent =
            await this.paystackProvider.createPaymentIntent(intent);
          break;
        case "flutterwave":
          providerIntent =
            await this.flutterwaveProvider.createPaymentIntent(intent);
          break;
        default:
          throw new Error(
            `Unsupported payment provider: ${intentData.provider}`,
          );
      }

      // Update intent with provider data
      const { data: updatedIntent, error: updateError } = await supabaseService
        .from("payment_intents")
        .update({
          provider_intent_id: providerIntent.id,
          status: "processing",
          updated_at: new Date().toISOString(),
        })
        .eq("id", intent.id)
        .select()
        .single();

      if (updateError) throw updateError;

      logger.info(
        `Payment intent created: ${intent.id} with provider ${intentData.provider}`,
      );
      return updatedIntent;
    } catch (error) {
      logger.error("Failed to create payment intent:", error);
      throw error;
    }
  }

  async confirmPaymentIntent(
    intentId: string,
    paymentMethodId?: string,
  ): Promise<PaymentIntent> {
    try {
      const intent = await this.getPaymentIntent(intentId);
      if (!intent) throw new Error("Payment intent not found");

      let confirmedIntent;
      switch (intent.provider) {
        case "stripe":
          confirmedIntent = await this.stripeProvider.confirmPaymentIntent(
            intent.providerIntentId!,
            paymentMethodId,
          );
          break;
        case "paystack":
          confirmedIntent = await this.paystackProvider.confirmPaymentIntent(
            intent.providerIntentId!,
            paymentMethodId,
          );
          break;
        case "flutterwave":
          confirmedIntent = await this.flutterwaveProvider.confirmPaymentIntent(
            intent.providerIntentId!,
            paymentMethodId,
          );
          break;
        default:
          throw new Error(`Unsupported payment provider: ${intent.provider}`);
      }

      // Update intent status
      const { data: updatedIntent, error } = await supabaseService
        .from("payment_intents")
        .update({
          status: confirmedIntent.status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", intentId)
        .select()
        .single();

      if (error) throw error;

      logger.info(`Payment intent confirmed: ${intentId}`);
      return updatedIntent;
    } catch (error) {
      logger.error("Failed to confirm payment intent:", error);
      throw error;
    }
  }

  async getPaymentIntent(intentId: string): Promise<PaymentIntent | null> {
    try {
      const { data: intent, error } = await supabaseService
        .from("payment_intents")
        .select("*")
        .eq("id", intentId)
        .single();

      if (error) throw error;
      return intent;
    } catch (error) {
      logger.error("Failed to get payment intent:", error);
      return null;
    }
  }

  // Subscription Management
  async createSubscription(
    subscriptionData: Omit<Subscription, "id">,
  ): Promise<Subscription> {
    try {
      // Create subscription with provider
      let providerSubscription;
      switch (subscriptionData.provider) {
        case "stripe":
          providerSubscription =
            await this.stripeProvider.createSubscription(subscriptionData);
          break;
        case "paystack":
          providerSubscription =
            await this.paystackProvider.createSubscription(subscriptionData);
          break;
        case "flutterwave":
          providerSubscription =
            await this.flutterwaveProvider.createSubscription(subscriptionData);
          break;
        default:
          throw new Error(
            `Unsupported payment provider: ${subscriptionData.provider}`,
          );
      }

      // Create subscription record
      const { data: subscription, error } = await supabaseService
        .from("subscriptions")
        .insert([
          {
            ...subscriptionData,
            provider_subscription_id: providerSubscription.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      logger.info(`Subscription created: ${subscription.id}`);
      return subscription;
    } catch (error) {
      logger.error("Failed to create subscription:", error);
      throw error;
    }
  }

  async cancelSubscription(
    subscriptionId: string,
    cancelAtPeriodEnd: boolean = false,
  ): Promise<Subscription> {
    try {
      const subscription = await this.getSubscription(subscriptionId);
      if (!subscription) throw new Error("Subscription not found");

      // Cancel with provider
      switch (subscription.provider) {
        case "stripe":
          await this.stripeProvider.cancelSubscription(
            subscription.providerSubscriptionId,
            cancelAtPeriodEnd,
          );
          break;
        case "paystack":
          await this.paystackProvider.cancelSubscription(
            subscription.providerSubscriptionId,
            cancelAtPeriodEnd,
          );
          break;
        case "flutterwave":
          await this.flutterwaveProvider.cancelSubscription(
            subscription.providerSubscriptionId,
            cancelAtPeriodEnd,
          );
          break;
      }

      // Update subscription record
      const { data: updatedSubscription, error } = await supabaseService
        .from("subscriptions")
        .update({
          status: cancelAtPeriodEnd ? subscription.status : "cancelled",
          cancel_at_period_end: cancelAtPeriodEnd,
          updated_at: new Date().toISOString(),
        })
        .eq("id", subscriptionId)
        .select()
        .single();

      if (error) throw error;

      logger.info(`Subscription cancelled: ${subscriptionId}`);
      return updatedSubscription;
    } catch (error) {
      logger.error("Failed to cancel subscription:", error);
      throw error;
    }
  }

  async getSubscription(subscriptionId: string): Promise<Subscription | null> {
    try {
      const { data: subscription, error } = await supabaseService
        .from("subscriptions")
        .select("*")
        .eq("id", subscriptionId)
        .single();

      if (error) throw error;
      return subscription;
    } catch (error) {
      logger.error("Failed to get subscription:", error);
      return null;
    }
  }

  // Payment Method Management
  async addPaymentMethod(
    customerId: string,
    provider: string,
    methodData: any,
  ): Promise<PaymentMethod> {
    try {
      let providerMethod;
      switch (provider) {
        case "stripe":
          providerMethod = await this.stripeProvider.createPaymentMethod(
            customerId,
            methodData,
          );
          break;
        case "paystack":
          providerMethod = await this.paystackProvider.createPaymentMethod(
            customerId,
            methodData,
          );
          break;
        case "flutterwave":
          providerMethod = await this.flutterwaveProvider.createPaymentMethod(
            customerId,
            methodData,
          );
          break;
        default:
          throw new Error(`Unsupported payment provider: ${provider}`);
      }

      // Save payment method
      const { data: paymentMethod, error } = await supabaseService
        .from("payment_methods")
        .insert([
          {
            customer_id: customerId,
            provider,
            provider_method_id: providerMethod.id,
            type: methodData.type,
            last4: providerMethod.last4,
            brand: providerMethod.brand,
            expiry_month: providerMethod.expiryMonth,
            expiry_year: providerMethod.expiryYear,
            is_default: false,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      logger.info(`Payment method added: ${paymentMethod.id}`);
      return paymentMethod;
    } catch (error) {
      logger.error("Failed to add payment method:", error);
      throw error;
    }
  }

  // Invoice Management
  async createInvoice(invoiceData: Omit<Invoice, "id">): Promise<Invoice> {
    try {
      const { data: invoice, error } = await supabaseService
        .from("invoices")
        .insert([
          {
            ...invoiceData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      logger.info(`Invoice created: ${invoice.id}`);
      return invoice;
    } catch (error) {
      logger.error("Failed to create invoice:", error);
      throw error;
    }
  }

  async getInvoices(
    customerId?: string,
    subscriptionId?: string,
  ): Promise<Invoice[]> {
    try {
      let query = supabaseService.from("invoices").select("*");

      if (customerId) {
        query = query.eq("customer_id", customerId);
      }

      if (subscriptionId) {
        query = query.eq("subscription_id", subscriptionId);
      }

      const { data: invoices, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) throw error;
      return invoices || [];
    } catch (error) {
      logger.error("Failed to get invoices:", error);
      return [];
    }
  }

  // Webhook handling
  async handleWebhook(
    provider: string,
    payload: any,
    signature: string,
  ): Promise<any> {
    try {
      switch (provider) {
        case "stripe":
          return await this.stripeProvider.handleWebhook(payload, signature);
        case "paystack":
          return await this.paystackProvider.handleWebhook(payload, signature);
        case "flutterwave":
          return await this.flutterwaveProvider.handleWebhook(
            payload,
            signature,
          );
        default:
          throw new Error(`Unsupported payment provider: ${provider}`);
      }
    } catch (error) {
      logger.error(`Failed to handle ${provider} webhook:`, error);
      throw error;
    }
  }

  // Analytics
  async getPaymentAnalytics(
    workspaceId?: string,
    timeRange: string = "30d",
  ): Promise<any> {
    try {
      const { data, error } = await supabaseService.rpc(
        "get_payment_analytics",
        {
          workspace_id: workspaceId,
          time_range: timeRange,
        },
      );

      if (error) throw error;
      return data;
    } catch (error) {
      logger.error("Failed to get payment analytics:", error);
      throw error;
    }
  }

  // Refunds
  async createRefund(
    paymentIntentId: string,
    amount?: number,
    reason?: string,
  ): Promise<any> {
    try {
      const intent = await this.getPaymentIntent(paymentIntentId);
      if (!intent) throw new Error("Payment intent not found");

      let refund;
      switch (intent.provider) {
        case "stripe":
          refund = await this.stripeProvider.createRefund(
            intent.providerIntentId!,
            amount,
            reason,
          );
          break;
        case "paystack":
          refund = await this.paystackProvider.createRefund(
            intent.providerIntentId!,
            amount,
            reason,
          );
          break;
        case "flutterwave":
          refund = await this.flutterwaveProvider.createRefund(
            intent.providerIntentId!,
            amount,
            reason,
          );
          break;
        default:
          throw new Error(`Unsupported payment provider: ${intent.provider}`);
      }

      // Record refund
      const { data: refundRecord, error } = await supabaseService
        .from("refunds")
        .insert([
          {
            payment_intent_id: paymentIntentId,
            amount: amount || intent.amount,
            reason: reason || "requested_by_customer",
            provider_refund_id: refund.id,
            status: refund.status,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      logger.info(`Refund created: ${refundRecord.id}`);
      return refundRecord;
    } catch (error) {
      logger.error("Failed to create refund:", error);
      throw error;
    }
  }
}

export const paymentService = new PaymentService();
export default PaymentService;
