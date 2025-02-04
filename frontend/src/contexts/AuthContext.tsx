import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  userId: number | null;
  userEmail: string | null;
  userRole: string | null;
  login: (token: string, userId: number, userEmail: string, userRole: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));
  const [userId, setUserId] = useState<number | null>(
    localStorage.getItem("userId") ? parseInt(localStorage.getItem("userId")!, 10) : null
  );
  const [userEmail, setUserEmail] = useState<string | null>(localStorage.getItem("userEmail"));
  const [userRole, setUserRole] = useState<string | null>(localStorage.getItem("userRole"));

  useEffect(() => {
    if (token) localStorage.setItem("authToken", token);
    if (userId) localStorage.setItem("userId", userId.toString());
    if (userEmail) localStorage.setItem("userEmail", userEmail);
    if (userRole) localStorage.setItem("userRole", userRole);
  }, [token, userId, userEmail, userRole]);

  const login = (newToken: string, newUserId: number, newUserEmail: string, newUserRole: string) => {
    setToken(newToken);
    setUserId(newUserId);
    setUserEmail(newUserEmail);
    setUserRole(newUserRole);
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("userId", newUserId.toString());
    localStorage.setItem("userEmail", newUserEmail);
    localStorage.setItem("userRole", newUserRole);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setUserEmail(null);
    setUserRole(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, token, userId, userEmail, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
