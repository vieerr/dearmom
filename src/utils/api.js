// src/utils/api.js
import getBackendUrl from "./getBackendURL";
export const registerUser = async (userData) => {
  const backendUrl = getBackendUrl();
  const response = await fetch(`${backendUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return response.json();
};

export const loginUser = async (userData) => {
  const backendUrl = getBackendUrl();
  const response = await fetch(`${backendUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return response.json();
};
