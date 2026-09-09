"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import { OrderProvider } from "@/context/OrderContext";

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
  );
}

