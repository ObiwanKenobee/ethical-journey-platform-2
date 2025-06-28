import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "@supabase/supabase-js";
import { getCurrentUser, ensureUserProfile } from "@/services/auth.service";
import {
  getUserProfile,
  getOrCreateUserProfile,
} from "@/services/user.service";
import { UserProfile } from "@/services/auth.service";
import { supabase } from "@/integrations/supabase/client";
import { isDemoAccount } from "@/services/auth.service";
import {
  userArchetypeService,
  UserArchetypeProfile,
} from "@/services/user-archetype.service";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  userRole: string | null;
  userArchetype: UserArchetypeProfile | null;
  archetypeId: string | null;
  refreshAuth: () => Promise<void>;
  checkUserAccess: (requiredRole?: string) => boolean;
  getPersonalizedContent: () => any;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isLoading: true,
  isAuthenticated: false,
  userRole: null,
  userArchetype: null,
  archetypeId: null,
  refreshAuth: async () => {},
  checkUserAccess: () => false,
  getPersonalizedContent: () => ({}),
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userArchetype, setUserArchetype] =
    useState<UserArchetypeProfile | null>(null);
  const [archetypeId, setArchetypeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const { user: userData, error } = await getCurrentUser();

      if (error || !userData) {
        // Clear all user data
        setUser(null);
        setProfile(null);
        setUserRole(null);
        setUserArchetype(null);
        setArchetypeId(null);

        // Clear localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("userRole");
          localStorage.removeItem("userArchetype");
        }
        return;
      }

      setUser(userData);

      // Check if this is a demo account
      const isDemo = userData.email ? isDemoAccount(userData.email) : false;

      if (isDemo) {
        // Handle demo accounts
        await handleDemoAccount(userData);
        return;
      }

      // Handle regular accounts
      await handleRegularAccount(userData);
    } catch (error) {
      console.error("Auth context error:", error);
      // On error, clear everything
      setUser(null);
      setProfile(null);
      setUserRole(null);
      setUserArchetype(null);
      setArchetypeId(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoAccount = async (userData: User) => {
    const storedRole =
      typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
    const storedArchetypeId =
      typeof window !== "undefined"
        ? localStorage.getItem("userArchetype")
        : null;

    if (storedRole) {
      setUserRole(storedRole);

      // Load archetype profile if available
      if (storedArchetypeId) {
        const archetypeProfile =
          userArchetypeService.getArchetypeProfile(storedArchetypeId);
        if (archetypeProfile) {
          setUserArchetype(archetypeProfile);
          setArchetypeId(storedArchetypeId);

          // Create a personalized profile for demo accounts
          setProfile({
            id: userData.id,
            name: `Demo ${archetypeProfile.title}`,
            role: storedRole,
            email: userData.email || undefined,
          });
          return;
        }
      }

      // Fallback to basic profile
      setProfile({
        id: userData.id,
        name: `Demo ${storedRole.charAt(0).toUpperCase() + storedRole.slice(1)} User`,
        role: storedRole,
        email: userData.email || undefined,
      });
    }
  };

  const handleRegularAccount = async (userData: User) => {
    try {
      // First try to get existing profile
      const { profile: userProfile, error: profileError } =
        await getUserProfile(userData.id);

      if (userProfile) {
        // Profile exists, use it
        setProfile(userProfile);
        if (userProfile.role) {
          setUserRole(userProfile.role);
          // Store the user role in localStorage for quick access
          if (typeof window !== "undefined") {
            localStorage.setItem("userRole", userProfile.role);
          }
        }

        // Load archetype if available
        if (userProfile.archetype) {
          const archetypeProfile = userArchetypeService.getArchetypeProfile(
            userProfile.archetype,
          );
          if (archetypeProfile) {
            setUserArchetype(archetypeProfile);
            setArchetypeId(userProfile.archetype);
            if (typeof window !== "undefined") {
              localStorage.setItem("userArchetype", userProfile.archetype);
            }
          }
        }
        return;
      }

      // Profile doesn't exist, try to create it from user metadata
      if (userData.user_metadata) {
        const { name, role, company, archetype } = userData.user_metadata;

        if (name && role) {
          console.log("Creating profile from user metadata:", { name, role });

          const { profile: newProfile, error: createError } =
            await getOrCreateUserProfile(userData.id, {
              name,
              email: userData.email,
              role,
            });

          if (newProfile) {
            setProfile(newProfile);
            setUserRole(role);

            if (typeof window !== "undefined") {
              localStorage.setItem("userRole", role);
              if (archetype) {
                localStorage.setItem("userArchetype", archetype);
              }
            }

            // Load archetype if available
            if (archetype) {
              const archetypeProfile =
                userArchetypeService.getArchetypeProfile(archetype);
              if (archetypeProfile) {
                setUserArchetype(archetypeProfile);
                setArchetypeId(archetype);
              }
            }
            return;
          }
        }
      }

      // Fallback: use localStorage role if available
      const storedRole =
        typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
      if (storedRole) {
        setUserRole(storedRole);

        // Create a minimal profile
        setProfile({
          id: userData.id,
          name: userData.email?.split("@")[0] || "User",
          role: storedRole,
          email: userData.email || undefined,
        });
      }
    } catch (error) {
      console.error("Error handling regular account:", error);

      // Fallback to localStorage role
      const storedRole =
        typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
      if (storedRole) {
        setUserRole(storedRole);
        setProfile({
          id: userData.id,
          name: userData.email?.split("@")[0] || "User",
          role: storedRole,
          email: userData.email || undefined,
        });
      }
    }
  };

  // Check if user has access to a particular role
  const checkUserAccess = (requiredRole?: string): boolean => {
    // No role required, or user is authenticated and no specific role is required
    if (!requiredRole) {
      return !!user;
    }

    // User must be authenticated and have the required role
    return !!user && userRole === requiredRole;
  };

  useEffect(() => {
    fetchUserData();

    // Listen for auth state changes from Supabase
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state change:", event, session?.user?.id);

      if (event === "SIGNED_IN" && session?.user) {
        // Need to fetch the full user data including profile
        fetchUserData();
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setProfile(null);
        setUserRole(null);
        setUserArchetype(null);
        setArchetypeId(null);

        if (typeof window !== "undefined") {
          localStorage.removeItem("userRole");
          localStorage.removeItem("userArchetype");
        }
      } else if (event === "TOKEN_REFRESHED" && session?.user) {
        // Token was refreshed, update user data
        setUser(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const refreshAuth = async () => {
    await fetchUserData();
  };

  const getPersonalizedContent = () => {
    if (!userArchetype || !archetypeId) {
      return {
        welcomeMessage: "Welcome to Atlas",
        helpContent: [],
        insights: [],
      };
    }

    return {
      welcomeMessage:
        userArchetypeService.getPersonalizedWelcomeMessage(archetypeId),
      helpContent: userArchetypeService.getContextualHelpContent(archetypeId),
      insights: userArchetypeService.generateArchetypeInsights(archetypeId),
      dashboardConfig: userArchetypeService.getDashboardConfig(archetypeId),
      widgetPermissions: userArchetypeService.getWidgetPermissions(archetypeId),
      reportingCapabilities:
        userArchetypeService.getReportingCapabilities(archetypeId),
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isAuthenticated: !!user,
        userRole,
        userArchetype,
        archetypeId,
        refreshAuth,
        checkUserAccess,
        getPersonalizedContent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
