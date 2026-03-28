export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
  };
  token: string;
}
