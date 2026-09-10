"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Product } from "@/data/products";

export interface OrderItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (items: OrderItem[], total: number) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("shopnova_orders");
    if (saved) {
      try {
        setOrders(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse orders", e);
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("shopnova_orders", JSON.stringify(orders));
    }
  }, [orders, isHydrated]);

  const addOrder = (items: OrderItem[], total: number) => {
    const newOrder: Order = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      items,
      total,
    };
    setOrders((prev) => [...prev, newOrder]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
}
