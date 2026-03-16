/**
 * Application route constants
 * Centralized location for all route paths used in the app
 * Organized by authentication requirement
 */

// Unauthenticated routes (public access)
export const UNAUTH_ROUTES = {
  INDEX: "/",
  SPLASH: "/splash",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
} as const;

// Authenticated routes (require login)
export const AUTH_ROUTES = {
  // Tab routes
  TABS: {
    DASHBOARD: "/dashboard",
  },
} as const;

// Combined routes for convenience
export const ROUTES = {
  ...UNAUTH_ROUTES,
  ...AUTH_ROUTES,
} as const;

// Screen names for Stack.Screen components (without leading slash)
export const UNAUTH_SCREEN_NAMES = {
  LOGIN: "login",
  SIGNUP: "signup",
  FORGOT_PASSWORD: "forgot-password",
} as const;

// Combined screen names
export const SCREEN_NAMES = {
  ...UNAUTH_SCREEN_NAMES,
} as const;

// Type definitions
export type UnauthRouteType = typeof UNAUTH_ROUTES;
export type AuthRouteType = typeof AUTH_ROUTES;
export type RouteType = typeof ROUTES;
export type TabRouteType = typeof AUTH_ROUTES.TABS;
export type UnauthScreenNameType = typeof UNAUTH_SCREEN_NAMES;
export type ScreenNameType = typeof SCREEN_NAMES;
