export interface UserCreateDTO {
  name: string;
  email: string;
  password: string;
  role?: string;
  status?: boolean;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface UserSession {
  id: number,
  name: string,
  email: string,
  role: string
}