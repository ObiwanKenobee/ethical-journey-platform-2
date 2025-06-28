import Stripe from "stripe";
import { logger } from "../../../utils/logger";

export class StripeProvider {
  private stripe: Stripe;

  constructor() {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error("STRIPE_SECRET_KEY environment variable is required");
    }

    this.stripe = new Stripe(secretKey, {
      apiVersion: "2024-04-10",
      typescript: true,
    });

    logger.info("✅ Stripe provider initialized");
  }

  async createCustomer(customerData: any): Promise<Stripe.Customer> {
    try {
      const customer = await this.stripe.customers.create({
        email: customerData.email,
        name: customerData.name,
        phone: customerData.phone,
        address: customerData.address,
        metadata: {
          atlasUserId: customerData.userId,
          atlasCustomerId: customerData.id,
        },
      });

      logger.info(`Stripe customer created: ${customer.id}`);
      return customer;
    } catch (error) {
      logger.error("Failed to create Stripe customer:", error);
      throw error;
    }
  }

  async createPaymentIntent(intentData: any): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(intentData.amount * 100), // Convert to cents
        currency: intentData.currency || "usd",
        customer: intentData.customerId,
        metadata: {
          atlasIntentId: intentData.id,
          workspaceId: intentData.workspaceId,
          ...intentData.metadata,
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      logger.info(`Stripe payment intent created: ${paymentIntent.id}`);
      return paymentIntent;
    } catch (error) {
      logger.error("Failed to create Stripe payment intent:", error);
      throw error;
    }
  }

  async confirmPaymentIntent(
    paymentIntentId: string,
    paymentMethodId?: string,
  ): Promise<Stripe.PaymentIntent> {
    try {
      const confirmData: any = {};

      if (paymentMethodId) {
        confirmData.payment_method = paymentMethodId;
      }

      const paymentIntent = await this.stripe.paymentIntents.confirm(
        paymentIntentId,
        confirmData,
      );

      logger.info(`Stripe payment intent confirmed: ${paymentIntentId}`);
      return paymentIntent;
    } catch (error) {
      logger.error("Failed to confirm Stripe payment intent:", error);
      throw error;
    }
  }

  async createSubscription(
    subscriptionData: any,
  ): Promise<Stripe.Subscription> {
    try {
      const subscription = await this.stripe.subscriptions.create({
        customer: subscriptionData.customerId,
        items: [
          {
            price: subscriptionData.planId,
          },
        ],
        trial_period_days: subscriptionData.trialPeriodDays,
        metadata: {
          atlasSubscriptionId: subscriptionData.id,
          workspaceId: subscriptionData.workspaceId,
          ...subscriptionData.metadata,
        },
      });

      logger.info(`Stripe subscription created: ${subscription.id}`);
      return subscription;
    } catch (error) {
      logger.error("Failed to create Stripe subscription:", error);
      throw error;
    }
  }

  async cancelSubscription(
    subscriptionId: string,
    cancelAtPeriodEnd: boolean = false,
  ): Promise<Stripe.Subscription> {
    try {
      const subscription = await this.stripe.subscriptions.update(
        subscriptionId,
        {
          cancel_at_period_end: cancelAtPeriodEnd,
        },
      );

      if (!cancelAtPeriodEnd) {
        await this.stripe.subscriptions.cancel(subscriptionId);
      }

      logger.info(`Stripe subscription cancelled: ${subscriptionId}`);
      return subscription;
    } catch (error) {
      logger.error("Failed to cancel Stripe subscription:", error);
      throw error;
    }
  }

  async createPaymentMethod(customerId: string, methodData: any): Promise<any> {
    try {
      const paymentMethod = await this.stripe.paymentMethods.create({
        type: methodData.type,
        card: methodData.card,
        billing_details: methodData.billingDetails,
      });

      // Attach to customer
      await this.stripe.paymentMethods.attach(paymentMethod.id, {
        customer: customerId,
      });

      logger.info(`Stripe payment method created: ${paymentMethod.id}`);
      return {
        id: paymentMethod.id,
        type: paymentMethod.type,
        last4: paymentMethod.card?.last4,
        brand: paymentMethod.card?.brand,
        expiryMonth: paymentMethod.card?.exp_month,
        expiryYear: paymentMethod.card?.exp_year,
      };
    } catch (error) {
      logger.error("Failed to create Stripe payment method:", error);
      throw error;
    }
  }

  async createRefund(
    paymentIntentId: string,
    amount?: number,
    reason?: string,
  ): Promise<Stripe.Refund> {
    try {
      const refundData: any = {
        payment_intent: paymentIntentId,
      };

      if (amount) {
        refundData.amount = Math.round(amount * 100); // Convert to cents
      }

      if (reason) {
        refundData.reason = reason;
      }

      const refund = await this.stripe.refunds.create(refundData);

      logger.info(`Stripe refund created: ${refund.id}`);
      return refund;
    } catch (error) {
      logger.error("Failed to create Stripe refund:", error);
      throw error;
    }
  }

  async handleWebhook(payload: any, signature: string): Promise<any> {
    try {
      const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
      if (!endpointSecret) {
        throw new Error("STRIPE_WEBHOOK_SECRET not configured");
      }

      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret,
      );

      logger.info(`Stripe webhook received: ${event.type}`);

      switch (event.type) {
        case "payment_intent.succeeded":
          await this.handlePaymentIntentSucceeded(
            event.data.object as Stripe.PaymentIntent,
          );
          break;

        case "payment_intent.payment_failed":
          await this.handlePaymentIntentFailed(
            event.data.object as Stripe.PaymentIntent,
          );
          break;

        case "customer.subscription.created":
        case "customer.subscription.updated":
        case "customer.subscription.deleted":
          await this.handleSubscriptionEvent(
            event.data.object as Stripe.Subscription,
            event.type,
          );
          break;

        case "invoice.payment_succeeded":
        case "invoice.payment_failed":
          await this.handleInvoiceEvent(
            event.data.object as Stripe.Invoice,
            event.type,
          );
          break;

        default:
          logger.info(`Unhandled Stripe webhook event: ${event.type}`);
      }

      return { received: true };
    } catch (error) {
      logger.error("Failed to handle Stripe webhook:", error);
      throw error;
    }
  }

  private async handlePaymentIntentSucceeded(
    paymentIntent: Stripe.PaymentIntent,
  ): Promise<void> {
    // Update payment intent status in database
    // This would be handled by the main PaymentService
    logger.info(`Payment intent succeeded: ${paymentIntent.id}`);
  }

  private async handlePaymentIntentFailed(
    paymentIntent: Stripe.PaymentIntent,
  ): Promise<void> {
    // Update payment intent status in database
    // This would be handled by the main PaymentService
    logger.info(`Payment intent failed: ${paymentIntent.id}`);
  }

  private async handleSubscriptionEvent(
    subscription: Stripe.Subscription,
    eventType: string,
  ): Promise<void> {
    // Update subscription status in database
    // This would be handled by the main PaymentService
    logger.info(`Subscription event ${eventType}: ${subscription.id}`);
  }

  private async handleInvoiceEvent(
    invoice: Stripe.Invoice,
    eventType: string,
  ): Promise<void> {
    // Handle invoice events
    // This would be handled by the main PaymentService
    logger.info(`Invoice event ${eventType}: ${invoice.id}`);
  }

  // Price and Product management
  async createProduct(productData: any): Promise<Stripe.Product> {
    try {
      const product = await this.stripe.products.create({
        name: productData.name,
        description: productData.description,
        metadata: productData.metadata,
      });

      logger.info(`Stripe product created: ${product.id}`);
      return product;
    } catch (error) {
      logger.error("Failed to create Stripe product:", error);
      throw error;
    }
  }

  async createPrice(priceData: any): Promise<Stripe.Price> {
    try {
      const price = await this.stripe.prices.create({
        product: priceData.productId,
        unit_amount: Math.round(priceData.amount * 100), // Convert to cents
        currency: priceData.currency || "usd",
        recurring: priceData.recurring
          ? {
              interval: priceData.recurring.interval,
              interval_count: priceData.recurring.intervalCount,
            }
          : undefined,
        metadata: priceData.metadata,
      });

      logger.info(`Stripe price created: ${price.id}`);
      return price;
    } catch (error) {
      logger.error("Failed to create Stripe price:", error);
      throw error;
    }
  }

  // Customer portal
  async createCustomerPortalSession(
    customerId: string,
    returnUrl: string,
  ): Promise<Stripe.BillingPortal.Session> {
    try {
      const session = await this.stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
      });

      logger.info(`Stripe customer portal session created: ${session.id}`);
      return session;
    } catch (error) {
      logger.error("Failed to create Stripe customer portal session:", error);
      throw error;
    }
  }

  // Checkout sessions
  async createCheckoutSession(
    checkoutData: any,
  ): Promise<Stripe.Checkout.Session> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        customer: checkoutData.customerId,
        line_items: checkoutData.lineItems,
        mode: checkoutData.mode || "payment",
        success_url: checkoutData.successUrl,
        cancel_url: checkoutData.cancelUrl,
        metadata: checkoutData.metadata,
      });

      logger.info(`Stripe checkout session created: ${session.id}`);
      return session;
    } catch (error) {
      logger.error("Failed to create Stripe checkout session:", error);
      throw error;
    }
  }
}
