export type ID = string;

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export type PagingInfo = {
  page: number;
  size: number;
  sortDirection: "Asc" | "Desc";
  sortColumn: string;
};

export type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};

export type PaginatedResponse<T> = ApiResponse<{
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}>;

export type ApiError = {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
};

export type { User } from "./user";
