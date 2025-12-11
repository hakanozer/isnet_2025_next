export interface UserCreateDTO {
  name: string;
  email: string;
  password: string;
  role?: string;
  status?: boolean;
}