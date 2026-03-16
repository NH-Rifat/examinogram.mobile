import { PagingInfo } from "@/types";
import { env } from "@/utils/env";

// API Endpoints (from actual EcoSoft OMS Swagger documentation)
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/api/login",
    LOGOUT: "/api/logout", // requires {deviceId} as path parameter
    REFRESH_TOKEN: "/api/login/refresh-token",
    SIGN_UP: "/api/sign-up",
    CHANGE_PASSWORD: "/api/users/{id}/password",
    RESET_PASSWORD: "/api/users/{id}/password/reset",
    MFA_MOBILE_VERIFICATION:
      "/api/users/login-id/{loginId}/mfa/code/mobile-verification",
    MFA_EMAIL_VERIFICATION:
      "/api/users/login-id/{loginId}/mfa/code/email-verification",
    MFA_SECURITY_VERIFICATION: "/api/users/mfa/code/security-verification",
  },

  // Orderbook Directory
  ORDERBOOK: {
    DIRECTORY: (params: ApiFilterType) =>
      createApiUrl(
        `/api/orderbook-directories/${params?.stockExchange}/${params?.marketType}/${params?.tradingCode}`,
        params,
      ),
    GROUPS: (params: ApiFilterType) =>
      createApiUrl(
        `/api/orderbook-directories/${params?.stockExchange}/groups`,
        params,
      ),
    MARKET_TYPES: (params: ApiFilterType) =>
      createApiUrl(
        `/api/orderbook-directories/${params?.stockExchange}/market-types`,
        params,
      ),
    INSTRUMENTS: (params: ApiFilterType) =>
      createApiUrl(
        `/api/orderbook-directories/${params?.stockExchange}/instruments`,
        params,
      ),
    SECTORS: (params: ApiFilterType) =>
      createApiUrl(
        `/api/orderbook-directories/${params?.stockExchange}/sectors`,
        params,
      ),
    CATEGORIES: (params: ApiFilterType) =>
      createApiUrl(
        `/api/orderbook-directories/${params?.stockExchange}/categories`,
        params,
      ),
    TRADING_CODES: (params: ApiFilterType) =>
      createApiUrl(
        `/api/orderbook-directories/${params?.stockExchange}/trading-codes`,
        params,
      ),
    STOCK_INFO: (params: ApiFilterType) =>
      createApiUrl(
        `/api/orderbook-directories/${params?.stockExchange}/orderbook-info`,
        params,
      ),
  },
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// API Error Messages (based on common HTTP status codes and EcoSoft OMS patterns)
export const API_ERRORS = {
  NETWORK_ERROR:
    "Network connection error. Please check your internet connection.",
  UNAUTHORIZED: "Session expired. Please login again.",
  FORBIDDEN: "You do not have permission to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  SERVER_ERROR: "Server error. Please try again later.",
  TIMEOUT: "Request timeout. Please try again.",
  UNKNOWN: "An unexpected error occurred.",
  INVALID_CREDENTIALS: "Invalid login credentials.",
  ACCOUNT_LOCKED: "Account is locked. Please contact support.",
  INVALID_TOKEN: "Invalid or expired token.",
} as const;

export interface ApiFilterType {
  filters?: { [key: string]: any };
  paging?: { [key: string]: string | number | null | undefined };
  [key: string]: any;
}

export const createApiUrl = (endpoint: string, params?: ApiFilterType) => {
  const url = new URL(endpoint, env.API_URL);
  const filterUrl = createFilterParams(url, params?.filters);

  return createFilterParams(filterUrl, params?.paging, true).toString();
};

export const createFilterParams = (url: URL, params: any, isPaging = false) => {
  if (typeof params !== "object" || params === null) {
    return url;
  }
  if (isPaging) {
    for (const param in params) {
      if (params[param]) {
        url.searchParams.append(`Paging.${param}`, params[param]);
      }
    }
  } else {
    for (const param in params) {
      if (Array.isArray(params[param])) {
        params[param].forEach((value: string) => {
          if (value) {
            url.searchParams.append(`Filter.${param}`, value);
          }
        });
      } else if (params[param]) {
        url.searchParams.append(`Filter.${param}`, params[param]);
      }
    }
  }

  return url;
};

export const defaultPaging: PagingInfo = {
  page: 1,
  size: 100,
  sortDirection: "Asc",
  sortColumn: "",
};
