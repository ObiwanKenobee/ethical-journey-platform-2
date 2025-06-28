import { supabase } from "@/integrations/supabase/client";

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  role?: string;
  organization?: string;
  archetype?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  company?: string;
  role: string;
  archetype?: string;
}

/**
 * Check if email is demo account
 */
export const isDemoAccount = (email: string): boolean => {
  return email.endsWith("@demo.com");
};

/**
 * Get current user
 */
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    return { user: data.user, error };
  } catch (error) {
    console.error("Get current user error:", error);
    return { user: null, error };
  }
};

/**
 * Login user
 */
export const loginUser = async (credentials: AuthCredentials) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);

    if (error) {
      console.error("Login error:", error);
      return { user: null, error };
    }

    return { user: data.user, error: null };
  } catch (error) {
    console.error("Login service error:", error);
    return { user: null, error };
  }
};

/**
 * Create user profile in database with fallback handling
 */
const createUserProfile = async (user: any, userData: RegisterData) => {
  try {
    console.log("Attempting to create user profile for:", user.id);

    // First try to create in user_profiles table
    const { data: userProfile, error: userProfileError } = await supabase
      .from("user_profiles")
      .insert([
        {
          id: user.id,
          name: userData.name,
          role: userData.role,
          organization: userData.company || null,
          archetype: userData.archetype || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (!userProfileError && userProfile) {
      console.log(
        "User profile created in user_profiles table:",
        userProfile.id,
      );
      return userProfile;
    }

    console.log(
      "user_profiles insert failed, trying profiles table:",
      userProfileError,
    );

    // Fallback to profiles table if user_profiles fails
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: user.id,
          full_name: userData.name,
          email: userData.email,
          role: userData.role,
          organization: userData.company || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (!profileError && profile) {
      console.log("User profile created in profiles table:", profile.id);
      return profile;
    }

    console.warn("Both profile table inserts failed:", {
      userProfileError,
      profileError,
    });

    // Don't throw error if profile creation fails - user registration was successful
    return null;
  } catch (error) {
    console.error("Create user profile error:", error);
    // Don't throw - profile creation failure shouldn't fail registration
    return null;
  }
};

/**
 * Register user with complete profile creation
 */
export const registerUser = async (userData: RegisterData) => {
  try {
    console.log("Starting user registration:", {
      email: userData.email,
      role: userData.role,
    });

    // Step 1: Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          name: userData.name,
          company: userData.company,
          role: userData.role,
          archetype: userData.archetype,
        },
      },
    });

    if (authError) {
      console.error("Auth signup error:", authError);

      // Provide user-friendly error messages
      let errorMessage = "Registration failed. Please try again.";

      if (
        authError.message.includes("already registered") ||
        authError.message.includes("already exists")
      ) {
        errorMessage =
          "An account with this email already exists. Please try logging in instead.";
      } else if (authError.message.includes("Invalid email")) {
        errorMessage = "Please enter a valid email address.";
      } else if (authError.message.includes("Password")) {
        errorMessage = "Password must be at least 8 characters long.";
      } else if (
        authError.message.includes("network") ||
        authError.message.includes("fetch")
      ) {
        errorMessage =
          "Network error. Please check your connection and try again.";
      } else {
        errorMessage = authError.message;
      }

      throw new Error(errorMessage);
    }

    if (!authData.user) {
      throw new Error("Registration failed: No user data returned");
    }

    console.log("Auth user created successfully:", authData.user.id);

    // Step 2: Try to create user profile (non-blocking)
    try {
      const profile = await createUserProfile(authData.user, userData);
      if (profile) {
        console.log("User profile created successfully:", profile);
      } else {
        console.log(
          "Profile creation skipped - will be created during onboarding",
        );
      }
    } catch (profileError) {
      console.error(
        "Profile creation failed, but auth succeeded:",
        profileError,
      );
      // Continue since auth was successful - profile can be created later
    }

    // Step 3: Store role information for immediate use
    if (typeof window !== "undefined") {
      localStorage.setItem("userRole", userData.role);
      if (userData.archetype) {
        localStorage.setItem("userArchetype", userData.archetype);
      }
    }

    return { user: authData.user, error: null };
  } catch (error) {
    console.error("Register user error:", error);

    // Return a user-friendly error message
    let errorMessage = "Registration failed. Please try again.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      user: null,
      error: new Error(errorMessage),
    };
  }
};

/**
 * Logout user
 */
export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    // Clear local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("userRole");
      localStorage.removeItem("userArchetype");
    }

    return { error };
  } catch (error) {
    console.error("Logout error:", error);
    return { error };
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
  id: string,
  updates: Partial<UserProfile>,
) => {
  try {
    // Try to update user_profiles first
    const { data: userProfile, error: userProfileError } = await supabase
      .from("user_profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (!userProfileError && userProfile) {
      return { profile: userProfile, error: null };
    }

    // Fallback to profiles table
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .update({
        full_name: updates.name,
        email: updates.email,
        role: updates.role,
        organization: updates.organization,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (profileError) {
      throw profileError;
    }

    return { profile, error: null };
  } catch (error) {
    console.error("Update user profile error:", error);
    return { profile: null, error };
  }
};

/**
 * Reset password
 */
export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      throw error;
    }

    return { success: true, error: null };
  } catch (error) {
    console.error("Reset password error:", error);
    return { success: false, error };
  }
};

/**
 * Update password
 */
export const updatePassword = async (newPassword: string) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw error;
    }

    return { success: true, error: null };
  } catch (error) {
    console.error("Update password error:", error);
    return { success: false, error };
  }
};

/**
 * Ensure user profile exists
 */
export const ensureUserProfile = async (
  user: any,
  userData?: Partial<RegisterData>,
) => {
  try {
    // First check if profile exists in user_profiles
    const { data: existingUserProfile } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (existingUserProfile) {
      return { profile: existingUserProfile, error: null };
    }

    // Check if profile exists in profiles table
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (existingProfile) {
      return { profile: existingProfile, error: null };
    }

    // Create profile if it doesn't exist
    if (userData) {
      const profile = await createUserProfile(user, userData as RegisterData);
      return { profile, error: null };
    }

    // Create basic profile from auth metadata
    const basicUserData: RegisterData = {
      email: user.email || "",
      password: "", // Not needed for profile creation
      name: user.user_metadata?.name || user.email?.split("@")[0] || "User",
      company: user.user_metadata?.company,
      role: user.user_metadata?.role || "business",
      archetype: user.user_metadata?.archetype,
    };

    const profile = await createUserProfile(user, basicUserData);
    return { profile, error: null };
  } catch (error) {
    console.error("Ensure user profile error:", error);
    return { profile: null, error };
  }
};

export const getDashboardPathForRole = (role: string): string => {
  switch (role) {
    case "business":
    case "ceo":
    case "supply_chain_officer":
    case "operations_manager":
    case "procurement_manager":
      return "/dashboard/supply-chain";
    case "compliance":
    case "compliance_officer":
    case "external_auditor":
      return "/dashboard/compliance";
    case "ngo":
    case "ngo_analyst":
      return "/dashboard/ngo";
    case "government":
    case "government_official":
      return "/dashboard/government";
    case "admin":
    case "platform_admin":
      return "/dashboard/platform-admin";
    case "superadmin":
      return "/dashboard/superadmin";
    case "data_scientist":
      return "/dashboard/platform-admin";
    default:
      return "/dashboard";
  }
};

export const demoAccounts = [
  {
    role: "business",
    email: "business@demo.com",
    password: "demo123",
    title: "Supply Chain Executive",
    description:
      "Monitor global supply chains, track ESG compliance, and manage supplier relationships",
  },
  {
    role: "compliance",
    email: "compliance@demo.com",
    password: "demo123",
    title: "Compliance Officer",
    description:
      "Oversee regulatory compliance, manage audits, and ensure policy adherence",
  },
  {
    role: "ngo",
    email: "ngo@demo.com",
    password: "demo123",
    title: "NGO Human Rights Analyst",
    description:
      "Investigate human rights violations, track worker protection, and advocate for policy changes",
  },
  {
    role: "government",
    email: "government@demo.com",
    password: "demo123",
    title: "Government Regulator",
    description:
      "Enforce policies, monitor compliance, and coordinate international standards",
  },
  {
    role: "admin",
    email: "admin@demo.com",
    password: "demo123",
    title: "Platform Administrator",
    description:
      "Manage global operations, oversee system health, and configure platform settings",
  },
];
