import { useState, useEffect } from "react";

// Breakpoint system matching Tailwind CSS
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

// Custom hook for responsive behavior
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState<{
    width: number;
    height: number;
    breakpoint: Breakpoint;
  }>({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
    breakpoint: "lg",
  });

  const getCurrentBreakpoint = (width: number): Breakpoint => {
    if (width >= breakpoints["2xl"]) return "2xl";
    if (width >= breakpoints.xl) return "xl";
    if (width >= breakpoints.lg) return "lg";
    if (width >= breakpoints.md) return "md";
    if (width >= breakpoints.sm) return "sm";
    return "xs";
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const breakpoint = getCurrentBreakpoint(width);

      setScreenSize({ width, height, breakpoint });
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Utility functions
  const isMobile =
    screenSize.breakpoint === "xs" || screenSize.breakpoint === "sm";
  const isTablet = screenSize.breakpoint === "md";
  const isDesktop =
    screenSize.breakpoint === "lg" ||
    screenSize.breakpoint === "xl" ||
    screenSize.breakpoint === "2xl";
  const isSmallScreen = screenSize.width < breakpoints.md;
  const isLargeScreen = screenSize.width >= breakpoints.lg;

  // Responsive value function
  const getResponsiveValue = <T,>(values: {
    xs?: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
    "2xl"?: T;
  }): T | undefined => {
    const { breakpoint } = screenSize;

    // Return the exact match first
    if (values[breakpoint] !== undefined) {
      return values[breakpoint];
    }

    // Fall back to smaller breakpoints
    const breakpointOrder: Breakpoint[] = ["2xl", "xl", "lg", "md", "sm", "xs"];
    const currentIndex = breakpointOrder.indexOf(breakpoint);

    for (let i = currentIndex; i < breakpointOrder.length; i++) {
      const bp = breakpointOrder[i];
      if (values[bp] !== undefined) {
        return values[bp];
      }
    }

    return undefined;
  };

  // Responsive grid columns
  const getGridCols = (config: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  }): number => {
    return getResponsiveValue(config) || 1;
  };

  // Responsive spacing
  const getSpacing = (config: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    "2xl"?: string;
  }): string => {
    return getResponsiveValue(config) || "1rem";
  };

  return {
    ...screenSize,
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen,
    isLargeScreen,
    getResponsiveValue,
    getGridCols,
    getSpacing,
    // Media query helpers
    mediaQueries: {
      xs: `(min-width: ${breakpoints.xs}px)`,
      sm: `(min-width: ${breakpoints.sm}px)`,
      md: `(min-width: ${breakpoints.md}px)`,
      lg: `(min-width: ${breakpoints.lg}px)`,
      xl: `(min-width: ${breakpoints.xl}px)`,
      "2xl": `(min-width: ${breakpoints["2xl"]}px)`,
    },
  };
};

// Hook for responsive form layouts
export const useResponsiveForm = () => {
  const { isMobile, isTablet, getGridCols } = useResponsive();

  const formConfig = {
    // Form field layouts
    fieldLayout: getGridCols({
      xs: 1,
      sm: 1,
      md: 2,
      lg: 2,
      xl: 2,
    }),

    // Button layouts
    buttonLayout: getGridCols({
      xs: 1,
      sm: 2,
      md: 2,
      lg: 3,
      xl: 3,
    }),

    // Input sizes
    inputSize: isMobile ? "default" : "default",

    // Spacing
    spacing: isMobile ? "space-y-4" : "space-y-6",

    // Card padding
    cardPadding: isMobile ? "p-4" : "p-6",

    // Modal width
    modalWidth: isMobile ? "w-full" : "max-w-2xl",
  };

  return formConfig;
};

// Hook for responsive navigation
export const useResponsiveNav = () => {
  const { isMobile, isTablet } = useResponsive();

  return {
    shouldCollapse: isMobile,
    showFullMenu: !isMobile,
    navLayout: isMobile ? "mobile" : isTablet ? "tablet" : "desktop",
    menuStyle: isMobile ? "dropdown" : "horizontal",
  };
};

// Hook for responsive tables
export const useResponsiveTable = () => {
  const { isMobile, isTablet, getResponsiveValue } = useResponsive();

  const tableConfig = {
    // Show/hide columns based on screen size
    visibleColumns:
      getResponsiveValue({
        xs: 2,
        sm: 3,
        md: 4,
        lg: 6,
        xl: 8,
      }) || 6,

    // Table layout
    layout: isMobile ? "stacked" : "grid",

    // Pagination size
    pageSize:
      getResponsiveValue({
        xs: 5,
        sm: 10,
        md: 15,
        lg: 20,
        xl: 25,
      }) || 20,

    // Table density
    density: isMobile ? "compact" : "comfortable",
  };

  return tableConfig;
};

// Hook for responsive cards and layouts
export const useResponsiveLayout = () => {
  const { getGridCols, getSpacing, isMobile } = useResponsive();

  return {
    // Grid configurations
    cardGrid: {
      cols: getGridCols({
        xs: 1,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 4,
      }),
      gap: getSpacing({
        xs: "1rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "2rem",
        xl: "2.5rem",
      }),
    },

    // Feature grid
    featureGrid: {
      cols: getGridCols({
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3,
      }),
      gap: getSpacing({
        xs: "1.5rem",
        sm: "2rem",
        md: "2.5rem",
        lg: "3rem",
        xl: "3rem",
      }),
    },

    // Stats grid
    statsGrid: {
      cols: getGridCols({
        xs: 2,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 4,
      }),
      gap: getSpacing({
        xs: "1rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "2rem",
        xl: "2rem",
      }),
    },

    // Container padding
    containerPadding: isMobile ? "px-4" : "px-6",

    // Section spacing
    sectionSpacing: isMobile ? "py-12" : "py-16",
  };
};

export default useResponsive;
