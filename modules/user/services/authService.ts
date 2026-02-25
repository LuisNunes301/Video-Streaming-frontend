import { httpClient } from "@/shared/services/httpClient";
import { LoginResponse, User } from "../types/user.types";

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await httpClient.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  return response.data;
}

export async function getMe(): Promise<User> {
  const response = await httpClient.get<User>("/auth/me");
  return response.data;
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
}): Promise<LoginResponse> {
  const response = await httpClient.post<LoginResponse>("/auth/register", {
    data
  });

  return response.data;
}