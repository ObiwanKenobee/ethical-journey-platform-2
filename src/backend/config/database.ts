import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { logger } from "../utils/logger";

interface DatabaseConfig {
  supabaseUrl: string;
  supabaseKey: string;
  serviceRoleKey: string;
}

class DatabaseManager {
  private client: SupabaseClient;
  private serviceClient: SupabaseClient;
  private config: DatabaseConfig;

  constructor() {
    this.config = {
      supabaseUrl: process.env.SUPABASE_URL || "",
      supabaseKey: process.env.SUPABASE_ANON_KEY || "",
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
    };

    this.validateConfig();
    this.initializeClients();
  }

  private validateConfig(): void {
    if (!this.config.supabaseUrl) {
      throw new Error("SUPABASE_URL environment variable is required");
    }
    if (!this.config.supabaseKey) {
      throw new Error("SUPABASE_ANON_KEY environment variable is required");
    }
    if (!this.config.serviceRoleKey) {
      throw new Error(
        "SUPABASE_SERVICE_ROLE_KEY environment variable is required",
      );
    }
  }

  private initializeClients(): void {
    try {
      // Regular client for user operations
      this.client = createClient(
        this.config.supabaseUrl,
        this.config.supabaseKey,
      );

      // Service role client for admin operations
      this.serviceClient = createClient(
        this.config.supabaseUrl,
        this.config.serviceRoleKey,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        },
      );

      logger.info("✅ Database clients initialized successfully");
    } catch (error) {
      logger.error("❌ Failed to initialize database clients:", error);
      throw error;
    }
  }

  // Get regular client for user operations
  public getClient(): SupabaseClient {
    return this.client;
  }

  // Get service role client for admin operations
  public getServiceClient(): SupabaseClient {
    return this.serviceClient;
  }

  // Test database connection
  public async testConnection(): Promise<boolean> {
    try {
      const { data, error } = await this.client
        .from("workspaces")
        .select("count")
        .limit(1);

      if (error) {
        logger.error("Database connection test failed:", error);
        return false;
      }

      logger.info("✅ Database connection test successful");
      return true;
    } catch (error) {
      logger.error("❌ Database connection test failed:", error);
      return false;
    }
  }

  // Execute raw SQL with service role
  public async executeRawSQL(query: string, params?: any[]): Promise<any> {
    try {
      const { data, error } = await this.serviceClient.rpc("execute_sql", {
        query,
        params: params || [],
      });

      if (error) throw error;
      return data;
    } catch (error) {
      logger.error("Raw SQL execution failed:", error);
      throw error;
    }
  }

  // Transaction support
  public async executeTransaction(
    operations: (() => Promise<any>)[],
  ): Promise<any[]> {
    const results = [];

    for (const operation of operations) {
      try {
        const result = await operation();
        results.push(result);
      } catch (error) {
        logger.error("Transaction operation failed:", error);
        // In a real implementation, you'd want to rollback previous operations
        throw error;
      }
    }

    return results;
  }

  // Bulk operations
  public async bulkInsert(
    table: string,
    records: any[],
    batchSize: number = 1000,
  ): Promise<void> {
    const batches = [];
    for (let i = 0; i < records.length; i += batchSize) {
      batches.push(records.slice(i, i + batchSize));
    }

    for (const batch of batches) {
      const { error } = await this.serviceClient.from(table).insert(batch);

      if (error) {
        logger.error(`Bulk insert failed for table ${table}:`, error);
        throw error;
      }
    }

    logger.info(
      `✅ Bulk insert completed for ${records.length} records in table ${table}`,
    );
  }

  // Database migration utilities
  public async runMigration(
    migrationName: string,
    migrationSQL: string,
  ): Promise<void> {
    try {
      // Check if migration already ran
      const { data: existingMigration } = await this.serviceClient
        .from("migrations")
        .select("id")
        .eq("name", migrationName)
        .single();

      if (existingMigration) {
        logger.info(`Migration ${migrationName} already applied`);
        return;
      }

      // Execute migration
      await this.executeRawSQL(migrationSQL);

      // Record migration
      await this.serviceClient.from("migrations").insert({
        name: migrationName,
        executed_at: new Date().toISOString(),
        sql: migrationSQL,
      });

      logger.info(`✅ Migration ${migrationName} applied successfully`);
    } catch (error) {
      logger.error(`❌ Migration ${migrationName} failed:`, error);
      throw error;
    }
  }

  // Performance monitoring
  public async getPerformanceMetrics(): Promise<any> {
    try {
      const { data, error } = await this.serviceClient.rpc(
        "get_performance_metrics",
      );

      if (error) throw error;
      return data;
    } catch (error) {
      logger.error("Failed to get performance metrics:", error);
      throw error;
    }
  }

  // Connection pooling status
  public getConnectionStatus(): any {
    return {
      client: this.client ? "connected" : "disconnected",
      serviceClient: this.serviceClient ? "connected" : "disconnected",
      timestamp: new Date().toISOString(),
    };
  }
}

// Singleton instance
export const databaseManager = new DatabaseManager();

// Export individual clients for convenience
export const supabase = databaseManager.getClient();
export const supabaseService = databaseManager.getServiceClient();

export default databaseManager;
