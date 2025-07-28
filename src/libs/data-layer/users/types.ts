interface CreateUserDto {
  name: string;
  phone: string;
  password: string;
}

interface UpdateUserDto {
  name?: string;
  password?: string;
}

interface Wallet {
  id: string;
  goldAmount: number;
  cashBalance: number;
  userId: string;
}
interface Card {
  id: string;
  userId: string;
  cardNumber: string;
  cardName: string;
}
enum ActionType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

type JsonValue =
  | boolean
  | number
  | string
  | JsonValue[]
  | { [key: string]: JsonValue }
  | null;

interface Action {
  id: string;
  userId: string;
  type: ActionType;
  amount: number;
  metadata: JsonValue | null;
  createdAt: Date;
}

interface UserResponseDto {
  id: string;
  phone: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  wallet?: Wallet | null;
  cards?: Card[];
  actions?: Action[];
}

interface UserPaginatedResponse {
  users: UserResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DeleteUserResponse {
  success: boolean;
}

export interface TotalUsersCountResponse {
  total: number;
}

export interface UseUsersReturn {
  users: UserResponseDto[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  isLoading: boolean;
  error: Error | null;
}

export interface UseUserReturn {
  user: UserResponseDto | undefined;
  isLoading: boolean;
  error: Error | null;
}

export interface UseTotalUsersCountReturn {
  total: number;
  isLoading: boolean;
  error: Error | null;
}

export interface CreateUserVariables extends CreateUserDto {}

export interface UpdateUserVariables {
  id: string;
  updateUserDto: UpdateUserDto;
}

export interface DeleteUserVariables {
  id: string;
}

export interface UseUsersOptions {
  page?: number;
  limit?: number;
}

export type User = UserResponseDto;
export type UserCreateData = CreateUserDto;
export type UserUpdateData = UpdateUserDto;
export type PaginatedUsers = UserPaginatedResponse;
