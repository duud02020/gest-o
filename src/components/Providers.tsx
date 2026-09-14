"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import { OrderProvider } from "@/context/OrderContext";
<<<<<<< HEAD

import { AuthProvider } from "@/context/AuthContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ProductProvider>
        <OrderProvider>
          <CartProvider>{children}</CartProvider>
        </OrderProvider>
      </ProductProvider>
    </AuthProvider>
=======
import { AnalyticsProvider } from "@/context/AnalyticsContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AnalyticsProvider>
      <OrderProvider>
        <ProductProvider>
          <CartProvider>{children}</CartProvider>
        </ProductProvider>
      </OrderProvider>
    </AnalyticsProvider>
>>>>>>> 2e3ba7d78f21a50404ac62478f1cd891a842c69f
  );
}

