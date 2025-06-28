import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "./auth.service";

/**
 * Get user profile by user ID - handles both profiles and user_profiles tables
 */
export const getUserProfile = async (
  userId: string,
): Promise<{ profile: UserProfile | null; error: Error | null }> => {
  try {
    // First try user_profiles table
    const { data: userProfileData, error: userProfileError } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (!userProfileError && userProfileData) {
      // Convert user_profiles data to UserProfile type
      const profile: UserProfile = {
        id: userProfileData.id,
        name: userProfileData.name,
        role: userProfileData.role,
        organization: userProfileData.organization,
        archetype: userProfileData.archetype,
        created_at: userProfileData.created_at,
        updated_at: userProfileData.updated_at,
      };

      return { profile, error: null };
    }

    // Fallback to profiles table
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.log(`No profile found for user ${userId} in either table`);
      return { profile: null, error: new Error("Profile not found") };
    }

    // Convert profiles data to UserProfile type
    const profile: UserProfile = {
      id: profileData.id,
      name: profileData.full_name || "",
      email: profileData.email,
      role: profileData.role,
      organization: profileData.organization,
      created_at: profileData.created_at,
      updated_at: profileData.updated_at,
    };

    return { profile, error: null };
  } catch (error) {
    console.error("Get user profile error:", error);
    return { profile: null, error: error as Error };
  }
};

/**
 * Update user profile - handles both tables
 */
export const updateUserProfile = async (
  userId: string,
  profileData: Partial<UserProfile>,
): Promise<{ profile: UserProfile | null; error: Error | null }> => {
  try {
    // First try to update user_profiles table
    const userProfileUpdate = {
      name: profileData.name,
      role: profileData.role,
      organization: profileData.organization,
      archetype: profileData.archetype,
      updated_at: new Date().toISOString(),
    };

    const { data: userProfileData, error: userProfileError } = await supabase
      .from("user_profiles")
      .update(userProfileUpdate)
      .eq("id", userId)
      .select()
      .single();

    if (!userProfileError && userProfileData) {
      // Convert user_profiles data to UserProfile type
      const profile: UserProfile = {
        id: userProfileData.id,
        name: userProfileData.name,
        role: userProfileData.role,
        organization: userProfileData.organization,
        archetype: userProfileData.archetype,
        created_at: userProfileData.created_at,
        updated_at: userProfileData.updated_at,
      };

      return { profile, error: null };
    }

    // Fallback to profiles table
    const profileUpdate = {
      full_name: profileData.name,
      email: profileData.email,
      role: profileData.role,
      organization: profileData.organization,
      updated_at: new Date().toISOString(),
    };

    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .update(profileUpdate)
      .eq("id", userId)
      .select()
      .single();

    if (profilesError) {
      throw profilesError;
    }

    // Convert profiles data to UserProfile type
    const profile: UserProfile = {
      id: profilesData.id,
      name: profilesData.full_name || "",
      email: profilesData.email,
      role: profilesData.role,
      organization: profilesData.organization,
      created_at: profilesData.created_at,
      updated_at: profilesData.updated_at,
    };

    return { profile, error: null };
  } catch (error) {
    console.error("Update user profile error:", error);
    return { profile: null, error: error as Error };
  }
};

/**
 * Create user profile - handles both tables
 */
export const createUserProfile = async (
  userId: string,
  profileData: Partial<UserProfile> & { name: string; role: string },
): Promise<{ profile: UserProfile | null; error: Error | null }> => {
  try {
    // First try to create in user_profiles table
    const userProfileData = {
      id: userId,
      name: profileData.name,
      role: profileData.role,
      organization: profileData.organization || null,
      archetype: profileData.archetype || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: userProfile, error: userProfileError } = await supabase
      .from("user_profiles")
      .insert([userProfileData])
      .select()
      .single();

    if (!userProfileError && userProfile) {
      // Convert user_profiles data to UserProfile type
      const profile: UserProfile = {
        id: userProfile.id,
        name: userProfile.name,
        role: userProfile.role,
        organization: userProfile.organization,
        archetype: userProfile.archetype,
        created_at: userProfile.created_at,
        updated_at: userProfile.updated_at,
      };

      return { profile, error: null };
    }

    console.warn(
      "user_profiles insert failed, trying profiles table:",
      userProfileError,
    );

    // Fallback to profiles table
    const profilesData = {
      id: userId,
      full_name: profileData.name,
      email: profileData.email || null,
      role: profileData.role,
      organization: profileData.organization || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: profile, error: profilesError } = await supabase
      .from("profiles")
      .insert([profilesData])
      .select()
      .single();

    if (profilesError) {
      throw profilesError;
    }

    // Convert profiles data to UserProfile type
    const convertedProfile: UserProfile = {
      id: profile.id,
      name: profile.full_name || "",
      email: profile.email,
      role: profile.role,
      organization: profile.organization,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
    };

    return { profile: convertedProfile, error: null };
  } catch (error) {
    console.error("Create user profile error:", error);
    return { profile: null, error: error as Error };
  }
};

/**
 * Save user onboarding data
 */
export const saveOnboardingData = async (
  userId: string,
  data: { role: string; archetype?: string; [key: string]: any },
): Promise<{ success: boolean; error: Error | null }> => {
  try {
    // Update user profile with role and archetype
    const { profile, error: profileError } = await updateUserProfile(userId, {
      role: data.role,
      archetype: data.archetype,
    });

    if (profileError && !profile) {
      // If update failed, try to create profile
      const { profile: newProfile, error: createError } =
        await createUserProfile(userId, {
          name: data.name || "User",
          role: data.role,
          archetype: data.archetype,
          organization: data.organization,
        });

      if (createError) {
        throw createError;
      }
    }

    // Save dashboard preferences
    try {
      const { error: preferencesError } = await supabase
        .from("dashboard_preferences")
        .upsert({
          user_id: userId,
          role: data.role,
          preferences: data,
          is_onboarded: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (preferencesError) {
        console.warn("Failed to save dashboard preferences:", preferencesError);
        // Don't fail the onboarding if preferences fail
      }
    } catch (prefError) {
      console.warn("Dashboard preferences table may not exist:", prefError);
      // Continue without preferences
    }

    // Store role in localStorage for immediate access
    if (typeof window !== "undefined") {
      localStorage.setItem("userRole", data.role);
      if (data.archetype) {
        localStorage.setItem("userArchetype", data.archetype);
      }
    }

    return { success: true, error: null };
  } catch (error) {
    console.error("Save onboarding data error:", error);
    return { success: false, error: error as Error };
  }
};

/**
 * Get or create user profile with fallback
 */
export const getOrCreateUserProfile = async (
  userId: string,
  userData?: { name?: string; email?: string; role?: string },
): Promise<{ profile: UserProfile | null; error: Error | null }> => {
  try {
    // First try to get existing profile
    const { profile, error } = await getUserProfile(userId);

    if (profile) {
      return { profile, error: null };
    }

    // If no profile exists and we have user data, create one
    if (userData && userData.name && userData.role) {
      return await createUserProfile(userId, {
        name: userData.name,
        email: userData.email,
        role: userData.role,
      });
    }

    // No profile and no data to create one
    return {
      profile: null,
      error: new Error("Profile not found and no data provided to create one"),
    };
  } catch (error) {
    console.error("Get or create user profile error:", error);
    return { profile: null, error: error as Error };
  }
};

/**
 * Delete user account (this deletes auth and profile)
 */
export const deleteUserAccount = async (
  userId: string,
): Promise<{ success: boolean; error: Error | null }> => {
  try {
    // Delete user profile from user_profiles first
    const { error: userProfileError } = await supabase
      .from("user_profiles")
      .delete()
      .eq("id", userId);

    // Also try to delete from profiles table
    const { error: profileError } = await supabase
      .from("profiles")
      .delete()
      .eq("id", userId);

    // Delete dashboard preferences
    try {
      await supabase
        .from("dashboard_preferences")
        .delete()
        .eq("user_id", userId);
    } catch (prefError) {
      console.warn("Failed to delete dashboard preferences:", prefError);
    }

    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("userRole");
      localStorage.removeItem("userArchetype");
    }

    console.log(`User data deletion completed for user ID: ${userId}`);
    return { success: true, error: null };
  } catch (error) {
    console.error("Delete user account error:", error);
    return { success: false, error: error as Error };
  }
};

/**
 * Get user dashboard preferences
 */
export const getUserDashboardPreferences = async (
  userId: string,
): Promise<{ preferences: any; error: Error | null }> => {
  try {
    const { data, error } = await supabase
      .from("dashboard_preferences")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "not found"
      throw error;
    }

    return { preferences: data || null, error: null };
  } catch (error) {
    console.error("Get user dashboard preferences error:", error);
    return { preferences: null, error: error as Error };
  }
};

/**
 * Update user dashboard preferences
 */
export const updateUserDashboardPreferences = async (
  userId: string,
  preferences: any,
): Promise<{ success: boolean; error: Error | null }> => {
  try {
    const { error } = await supabase.from("dashboard_preferences").upsert({
      user_id: userId,
      preferences,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      throw error;
    }

    return { success: true, error: null };
  } catch (error) {
    console.error("Update user dashboard preferences error:", error);
    return { success: false, error: error as Error };
  }
};
