import { UserDetails } from "@/types/domain-types";

export type AdminManagementUsers = {
  totalUsers: number;
  totalPages: number;
  page: number;
  pageSize: number;
  search: string;
  sort:
    | "firstName_asc"
    | "firstName_desc"
    | "lastName_asc"
    | "lastName_desc"
    | "activeOrders_asc"
    | "activeOrders_desc"
    | "completedOrders_asc"
    | "completedOrders_desc"
    | "createdAt_asc"
    | "createdAt_desc";
  users: UserDetails[];
  user: UserDetails | null | undefined;
};

export type ChangeUserPasswordRequest = {
  newPassword: string;
};
