"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import { OrderProvider } from "@/context/OrderContext";
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
  );
}
