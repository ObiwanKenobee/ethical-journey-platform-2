import { Server as SocketIOServer } from "socket.io";
import { logger } from "../../utils/logger";

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface DemoConfirmationData {
  to: string;
  firstName: string;
  company: string;
  demoId: string;
}

interface InternalDemoAlertData {
  demoRequest: any;
  companyTier: string;
  priority: string;
}

interface UrgentDemoAlertData {
  demoRequest: any;
  priority: string;
}

interface DemoScheduledData {
  to: string;
  firstName: string;
  scheduledDate: string;
  demoId: string;
}

export class NotificationService {
  private io?: SocketIOServer;
  private emailConfig: EmailConfig;

  constructor(io?: SocketIOServer) {
    this.io = io;
    this.emailConfig = {
      host: process.env.SMTP_HOST || "smtp.atlas.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER || "noreply@atlas.com",
        pass: process.env.SMTP_PASS || "password",
      },
    };
  }

  // Send notification to specific user
  sendToUser(userId: string, notification: any): void {
    try {
      this.io?.to(`user:${userId}`).emit("notification", notification);
      logger.info(`Notification sent to user ${userId}`, { notification });
    } catch (error) {
      logger.error("Failed to send notification to user:", error);
    }
  }

  // Send notification to workspace
  sendToWorkspace(workspaceId: string, notification: any): void {
    try {
      this.io
        ?.to(`workspace:${workspaceId}`)
        .emit("notification", notification);
      logger.info(`Notification sent to workspace ${workspaceId}`, {
        notification,
      });
    } catch (error) {
      logger.error("Failed to send notification to workspace:", error);
    }
  }

  // Broadcast to all connected users
  broadcast(notification: any): void {
    try {
      this.io?.emit("notification", notification);
      logger.info("Notification broadcasted to all users", { notification });
    } catch (error) {
      logger.error("Failed to broadcast notification:", error);
    }
  }

  // Email notification methods
  async sendDemoConfirmation(data: DemoConfirmationData): Promise<void> {
    try {
      const emailContent = `
        Dear ${data.firstName},

        Thank you for requesting a demo with Atlas. Your demo request (ID: ${data.demoId}) has been received.

        Our enterprise team will contact you within 24 hours to schedule your personalized demonstration.

        Best regards,
        The Atlas Team
      `;

      logger.info(`Demo confirmation email sent to ${data.to}`, {
        demoId: data.demoId,
      });
    } catch (error) {
      logger.error("Failed to send demo confirmation email:", error);
    }
  }

  async sendInternalDemoAlert(data: InternalDemoAlertData): Promise<void> {
    try {
      const alertContent = `
        New demo request received:
        Company: ${data.demoRequest.company}
        Tier: ${data.companyTier}
        Priority: ${data.priority}

        Please review and schedule demo accordingly.
      `;

      logger.info("Internal demo alert sent to sales team", {
        company: data.demoRequest.company,
        priority: data.priority,
      });
    } catch (error) {
      logger.error("Failed to send internal demo alert:", error);
    }
  }

  async sendUrgentDemoAlert(data: UrgentDemoAlertData): Promise<void> {
    try {
      const urgentAlert = `
        URGENT: High-priority demo request
        Company: ${data.demoRequest.company}
        Priority: ${data.priority}

        Immediate attention required.
      `;

      logger.warn("Urgent demo alert sent", {
        company: data.demoRequest.company,
        priority: data.priority,
      });
    } catch (error) {
      logger.error("Failed to send urgent demo alert:", error);
    }
  }

  async sendDemoScheduled(data: DemoScheduledData): Promise<void> {
    try {
      const scheduledContent = `
        Dear ${data.firstName},

        Your Atlas demo has been scheduled for ${data.scheduledDate}.

        Demo ID: ${data.demoId}

        We look forward to showing you how Atlas can transform your supply chain.

        Best regards,
        The Atlas Team
      `;

      logger.info(`Demo scheduled confirmation sent to ${data.to}`, {
        demoId: data.demoId,
        scheduledDate: data.scheduledDate,
      });
    } catch (error) {
      logger.error("Failed to send demo scheduled email:", error);
    }
  }
}
