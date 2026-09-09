"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "comprador" | "vendedor";

export interface AuthUser {
  email: string;
  name?: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (role: UserRole, email: string, name?: string) => void;
  logout: () => void;
  isHydrated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("shopnova_auth_user");
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Erro ao carregar usuário autenticado", e);
    }
    setIsHydrated(true);
  }, []);

  const login = (role: UserRole, email: string, name?: string) => {
    const authUser: AuthUser = {
      role,
      email: email || (role === "vendedor" ? "admin@shopnova.com" : "cliente@exemplo.com"),
      name: name || (role === "vendedor" ? "Gestor ShopNova" : "Cliente"),
    };
    setUser(authUser);
    localStorage.setItem("shopnova_auth_user", JSON.stringify(authUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("shopnova_auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isHydrated }}>
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
