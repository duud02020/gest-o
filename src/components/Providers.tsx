"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ProductProvider>
      <CartProvider>{children}</CartProvider>
    </ProductProvider>
  );
}
