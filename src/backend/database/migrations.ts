import { supabaseService } from "../config/database";
import { logger } from "../utils/logger";

export interface Migration {
  id: string;
  name: string;
  description: string;
  sql: string;
  rollbackSql?: string;
  version: string;
}

export const migrations: Migration[] = [
  {
    id: "001",
    name: "create_user_profiles_table",
    description: "Create user_profiles table if it does not exist",
    version: "1.0.0",
    sql: `
      CREATE TABLE IF NOT EXISTS public.user_profiles (
        id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        organization TEXT,
        archetype TEXT,
        skill_matrix JSONB DEFAULT '{}',
        productivity_metrics JSONB DEFAULT '{}',
        certification_levels JSONB DEFAULT '{}',
        collaboration_score INTEGER DEFAULT 50,
        innovation_index INTEGER DEFAULT 50,
        interaction_preferences TEXT[] DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Create RLS policies
      ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

      CREATE POLICY "Users can view own profile" ON public.user_profiles
        FOR SELECT USING (auth.uid() = id);

      CREATE POLICY "Users can update own profile" ON public.user_profiles
        FOR UPDATE USING (auth.uid() = id);

      CREATE POLICY "Users can insert own profile" ON public.user_profiles
        FOR INSERT WITH CHECK (auth.uid() = id);

      -- Create indexes
      CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);
      CREATE INDEX IF NOT EXISTS idx_user_profiles_archetype ON public.user_profiles(archetype);
      CREATE INDEX IF NOT EXISTS idx_user_profiles_organization ON public.user_profiles(organization);
    `,
    rollbackSql: `
      DROP TABLE IF EXISTS public.user_profiles;
    `,
  },
  {
    id: "002",
    name: "create_dashboard_preferences_table",
    description: "Create dashboard_preferences table for user customizations",
    version: "1.0.0",
    sql: `
      CREATE TABLE IF NOT EXISTS public.dashboard_preferences (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
        role TEXT NOT NULL,
        preferences JSONB DEFAULT '{}',
        is_onboarded BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(user_id)
      );

      -- Create RLS policies
      ALTER TABLE public.dashboard_preferences ENABLE ROW LEVEL SECURITY;

      CREATE POLICY "Users can view own preferences" ON public.dashboard_preferences
        FOR SELECT USING (auth.uid() = user_id);

      CREATE POLICY "Users can update own preferences" ON public.dashboard_preferences
        FOR UPDATE USING (auth.uid() = user_id);

      CREATE POLICY "Users can insert own preferences" ON public.dashboard_preferences
        FOR INSERT WITH CHECK (auth.uid() = user_id);

      -- Create indexes
      CREATE INDEX IF NOT EXISTS idx_dashboard_preferences_user_id ON public.dashboard_preferences(user_id);
      CREATE INDEX IF NOT EXISTS idx_dashboard_preferences_role ON public.dashboard_preferences(role);
    `,
    rollbackSql: `
      DROP TABLE IF EXISTS public.dashboard_preferences;
    `,
  },
  {
    id: "003",
    name: "create_migrations_table",
    description: "Create migrations tracking table",
    version: "1.0.0",
    sql: `
      CREATE TABLE IF NOT EXISTS public.migrations (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        version TEXT NOT NULL,
        sql TEXT NOT NULL,
        executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        execution_time_ms INTEGER
      );

      -- Create indexes
      CREATE INDEX IF NOT EXISTS idx_migrations_executed_at ON public.migrations(executed_at);
      CREATE INDEX IF NOT EXISTS idx_migrations_version ON public.migrations(version);
    `,
    rollbackSql: `
      DROP TABLE IF EXISTS public.migrations;
    `,
  },
  {
    id: "004",
    name: "create_api_usage_logs_table",
    description: "Create API usage logging table",
    version: "1.0.0",
    sql: `
      CREATE TABLE IF NOT EXISTS public.api_usage_logs (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
        workspace_id UUID,
        method TEXT NOT NULL,
        path TEXT NOT NULL,
        status_code INTEGER NOT NULL,
        duration INTEGER NOT NULL,
        user_agent TEXT,
        ip TEXT,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Create indexes for performance
      CREATE INDEX IF NOT EXISTS idx_api_usage_logs_user_id ON public.api_usage_logs(user_id);
      CREATE INDEX IF NOT EXISTS idx_api_usage_logs_timestamp ON public.api_usage_logs(timestamp);
      CREATE INDEX IF NOT EXISTS idx_api_usage_logs_path ON public.api_usage_logs(path);
      CREATE INDEX IF NOT EXISTS idx_api_usage_logs_status_code ON public.api_usage_logs(status_code);

      -- Create partitioning for large datasets (optional)
      -- This would be implemented later for high-volume applications
    `,
    rollbackSql: `
      DROP TABLE IF EXISTS public.api_usage_logs;
    `,
  },
  {
    id: "005",
    name: "create_user_profile_trigger",
    description:
      "Create trigger to automatically create user profile on signup",
    version: "1.0.0",
    sql: `
      -- Function to handle new user signup
      CREATE OR REPLACE FUNCTION public.handle_new_user() 
      RETURNS TRIGGER AS $$
      BEGIN
        INSERT INTO public.user_profiles (id, name, role, organization)
        VALUES (
          NEW.id,
          COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
          COALESCE(NEW.raw_user_meta_data->>'role', 'business'),
          NEW.raw_user_meta_data->>'company'
        );
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;

      -- Trigger to execute the function
      DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
      CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
    `,
    rollbackSql: `
      DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
      DROP FUNCTION IF EXISTS public.handle_new_user();
    `,
  },
  {
    id: "006",
    name: "create_updated_at_trigger",
    description: "Create trigger to automatically update updated_at timestamps",
    version: "1.0.0",
    sql: `
      -- Function to update updated_at timestamp
      CREATE OR REPLACE FUNCTION public.update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      -- Apply trigger to user_profiles
      DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
      CREATE TRIGGER update_user_profiles_updated_at
        BEFORE UPDATE ON public.user_profiles
        FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

      -- Apply trigger to dashboard_preferences
      DROP TRIGGER IF EXISTS update_dashboard_preferences_updated_at ON public.dashboard_preferences;
      CREATE TRIGGER update_dashboard_preferences_updated_at
        BEFORE UPDATE ON public.dashboard_preferences
        FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
    `,
    rollbackSql: `
      DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
      DROP TRIGGER IF EXISTS update_dashboard_preferences_updated_at ON public.dashboard_preferences;
      DROP FUNCTION IF EXISTS public.update_updated_at_column();
    `,
  },
];

export class MigrationRunner {
  private async ensureMigrationsTable(): Promise<void> {
    try {
      const migrationTableMigration = migrations.find((m) => m.id === "003");
      if (migrationTableMigration) {
        await supabaseService.rpc("execute_sql", {
          query: migrationTableMigration.sql,
        });
        logger.info("Migrations table ensured");
      }
    } catch (error) {
      logger.error("Failed to ensure migrations table:", error);
      throw error;
    }
  }

  async runPendingMigrations(): Promise<void> {
    try {
      await this.ensureMigrationsTable();

      // Get list of executed migrations
      const { data: executedMigrations, error } = await supabaseService
        .from("migrations")
        .select("id");

      if (error && error.code !== "PGRST116") {
        // PGRST116 is "not found"
        throw error;
      }

      const executedIds = executedMigrations?.map((m) => m.id) || [];

      // Run pending migrations
      for (const migration of migrations) {
        if (!executedIds.includes(migration.id)) {
          await this.runMigration(migration);
        }
      }

      logger.info("All migrations completed successfully");
    } catch (error) {
      logger.error("Migration failed:", error);
      throw error;
    }
  }

  private async runMigration(migration: Migration): Promise<void> {
    const startTime = Date.now();

    try {
      logger.info(`Running migration ${migration.id}: ${migration.name}`);

      // Execute the migration SQL
      await supabaseService.rpc("execute_sql", {
        query: migration.sql,
      });

      const executionTime = Date.now() - startTime;

      // Record the migration
      await supabaseService.from("migrations").insert({
        id: migration.id,
        name: migration.name,
        description: migration.description,
        version: migration.version,
        sql: migration.sql,
        execution_time_ms: executionTime,
      });

      logger.info(`Migration ${migration.id} completed in ${executionTime}ms`);
    } catch (error) {
      logger.error(`Migration ${migration.id} failed:`, error);
      throw error;
    }
  }

  async rollbackMigration(migrationId: string): Promise<void> {
    try {
      const migration = migrations.find((m) => m.id === migrationId);

      if (!migration) {
        throw new Error(`Migration ${migrationId} not found`);
      }

      if (!migration.rollbackSql) {
        throw new Error(`Migration ${migrationId} has no rollback SQL`);
      }

      logger.info(`Rolling back migration ${migration.id}: ${migration.name}`);

      // Execute rollback SQL
      await supabaseService.rpc("execute_sql", {
        query: migration.rollbackSql,
      });

      // Remove migration record
      await supabaseService.from("migrations").delete().eq("id", migrationId);

      logger.info(`Migration ${migration.id} rolled back successfully`);
    } catch (error) {
      logger.error(`Rollback of migration ${migrationId} failed:`, error);
      throw error;
    }
  }

  async getMigrationStatus(): Promise<any[]> {
    try {
      const { data: executedMigrations, error } = await supabaseService
        .from("migrations")
        .select("*")
        .order("executed_at", { ascending: true });

      if (error) throw error;

      const executedIds = executedMigrations?.map((m) => m.id) || [];

      return migrations.map((migration) => ({
        ...migration,
        executed: executedIds.includes(migration.id),
        executedAt: executedMigrations?.find((em) => em.id === migration.id)
          ?.executed_at,
      }));
    } catch (error) {
      logger.error("Failed to get migration status:", error);
      throw error;
    }
  }
}

export const migrationRunner = new MigrationRunner();
