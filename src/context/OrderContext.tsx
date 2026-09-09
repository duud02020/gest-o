"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  Order,
  OrderStatus,
  Customer,
  Coupon,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_COUPONS,
} from "@/data/orders";

interface CreateOrderInput {
  customer: {
    name: string;
    email: string;
    phone?: string;
    city?: string;
    state?: string;
  };
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
  paymentMethod: "Cartão de Crédito" | "PIX" | "Boleto";
}

interface OrderContextType {
  orders: Order[];
  customers: Customer[];
  coupons: Coupon[];
  createOrder: (input: CreateOrderInput) => Order;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  deleteOrder: (id: string) => void;
  addCoupon: (coupon: Omit<Coupon, "id" | "usageCount">) => void;
  toggleCoupon: (id: string) => void;
  deleteCoupon: (id: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem("shopnova_orders");
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedCustomers = localStorage.getItem("shopnova_customers");
      if (savedCustomers) setCustomers(JSON.parse(savedCustomers));

      const savedCoupons = localStorage.getItem("shopnova_coupons");
      if (savedCoupons) setCoupons(JSON.parse(savedCoupons));
    } catch (e) {
      console.error("Erro ao carregar dados do localStorage", e);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("shopnova_orders", JSON.stringify(orders));
    }
  }, [orders, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("shopnova_customers", JSON.stringify(customers));
    }
  }, [customers, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("shopnova_coupons", JSON.stringify(coupons));
    }
  }, [coupons, isHydrated]);

  const createOrder = (input: CreateOrderInput): Order => {
    const randomCodeNumber = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: crypto.randomUUID ? crypto.randomUUID() : `ord-${Date.now()}`,
      code: `#SN-${randomCodeNumber}`,
      customer: input.customer,
      items: input.items,
      total: input.total,
      paymentMethod: input.paymentMethod,
      status: "Aprovado",
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Atualiza ou cadastra o cliente
    setCustomers((prev) => {
      const existing = prev.find(
        (c) => c.email.toLowerCase() === input.customer.email.toLowerCase()
      );
      if (existing) {
        return prev.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                ordersCount: c.ordersCount + 1,
                totalSpent: c.totalSpent + input.total,
                lastOrderDate: "Agora",
                status: c.ordersCount + 1 >= 3 ? "VIP" : "Ativo",
              }
            : c
        );
      } else {
        const newCustomer: Customer = {
          id: `cust-${Date.now()}`,
          name: input.customer.name,
          email: input.customer.email,
          phone: input.customer.phone || "(Não informado)",
          ordersCount: 1,
          totalSpent: input.total,
          status: "Ativo",
          lastOrderDate: "Agora",
        };
        return [newCustomer, ...prev];
      }
    });

    return newOrder;
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const addCoupon = (coupon: Omit<Coupon, "id" | "usageCount">) => {
    const newCoupon: Coupon = {
      ...coupon,
      id: `cp-${Date.now()}`,
      usageCount: 0,
    };
    setCoupons((prev) => [newCoupon, ...prev]);
  };

  const toggleCoupon = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        customers,
        coupons,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        addCoupon,
        toggleCoupon,
        deleteCoupon,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
}
