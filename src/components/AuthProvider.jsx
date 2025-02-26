import { createContext, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import getBackendURL from "../utils/getBackendURL";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem("authToken") || null,
  );
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("authToken");
    return token ? jwtDecode(token) : null;
  });

  const login = async ({ email, password }) => {
    const response = await axios.post(`${getBackendURL()}/login`, {
      email,
      password,
    });
    const token = response.data.token;
    setAuthToken(token);
    setUser(jwtDecode(token));
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
  };

  const refetch = async () => {
    if (authToken) {
      const response = await axios.get(`${getBackendURL()}/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUser(jwtDecode(response.data.token));
      setAuthToken(response.data.token);
    }
  };

  return (
    <AuthContext.Provider value={{ refetch, authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
