export type OrderStatus =
  | "Pendente"
  | "Aprovado"
  | "Em Separação"
  | "Enviado"
  | "Entregue"
  | "Cancelado";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  state?: string;
}

export interface Order {
  id: string;
  code: string; // Ex: #SN-9281
  customer: CustomerInfo;
  items: OrderItem[];
  total: number;
  paymentMethod: "Cartão de Crédito" | "PIX" | "Boleto";
  status: OrderStatus;
  createdAt: string; // ISO string
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  status: "Ativo" | "VIP" | "Inativo";
  lastOrderDate: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number; // 10% ou R$ 10,00
  minOrderValue?: number;
  active: boolean;
  usageCount: number;
  expiresAt: string;
}

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-1",
    code: "#SN-9281",
    customer: {
      name: "Mariana Costa",
      email: "mariana.costa@exemplo.com",
      phone: "(11) 98765-4321",
      city: "São Paulo",
      state: "SP",
    },
    items: [
      {
        id: "1",
        name: "Smartphone Galaxy Ultra",
        price: 3499.9,
        quantity: 1,
        image: "📱",
      },
    ],
    total: 3499.9,
    paymentMethod: "Cartão de Crédito",
    status: "Aprovado",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "ord-2",
    code: "#SN-9280",
    customer: {
      name: "Rodrigo Almeida",
      email: "rodrigo.almeida@exemplo.com",
      phone: "(21) 97654-3210",
      city: "Rio de Janeiro",
      state: "RJ",
    },
    items: [
      {
        id: "2",
        name: "Notebook Pro Max 16\"",
        price: 7899.0,
        quantity: 1,
        image: "💻",
      },
      {
        id: "3",
        name: "Fone Bluetooth Wireless Noise Cancelling",
        price: 549.9,
        quantity: 1,
        image: "🎧",
      },
    ],
    total: 8448.9,
    paymentMethod: "PIX",
    status: "Em Separação",
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: "ord-3",
    code: "#SN-9279",
    customer: {
      name: "Camila Ribeiro",
      email: "camila.ribeiro@exemplo.com",
      phone: "(31) 98822-1100",
      city: "Belo Horizonte",
      state: "MG",
    },
    items: [
      {
        id: "4",
        name: "Smartwatch Sport Titanium",
        price: 1199.0,
        quantity: 1,
        image: "⌚",
      },
    ],
    total: 1199.0,
    paymentMethod: "Cartão de Crédito",
    status: "Enviado",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "ord-4",
    code: "#SN-9278",
    customer: {
      name: "Felipe Siqueira",
      email: "felipe.siqueira@exemplo.com",
      phone: "(41) 99123-4567",
      city: "Curitiba",
      state: "PR",
    },
    items: [
      {
        id: "5",
        name: "Câmera Mirrorless 4K",
        price: 4599.0,
        quantity: 1,
        image: "📷",
      },
    ],
    total: 4599.0,
    paymentMethod: "Boleto",
    status: "Entregue",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: "cust-1",
    name: "Mariana Costa",
    email: "mariana.costa@exemplo.com",
    phone: "(11) 98765-4321",
    ordersCount: 3,
    totalSpent: 6240.0,
    status: "VIP",
    lastOrderDate: "Hoje, 14:15",
  },
  {
    id: "cust-2",
    name: "Rodrigo Almeida",
    email: "rodrigo.almeida@exemplo.com",
    phone: "(21) 97654-3210",
    ordersCount: 1,
    totalSpent: 8448.9,
    status: "VIP",
    lastOrderDate: "Hoje, 11:30",
  },
  {
    id: "cust-3",
    name: "Camila Ribeiro",
    email: "camila.ribeiro@exemplo.com",
    phone: "(31) 98822-1100",
    ordersCount: 2,
    totalSpent: 2199.0,
    status: "Ativo",
    lastOrderDate: "Ontem, 16:40",
  },
  {
    id: "cust-4",
    name: "Felipe Siqueira",
    email: "felipe.siqueira@exemplo.com",
    phone: "(41) 99123-4567",
    ordersCount: 1,
    totalSpent: 4599.0,
    status: "Ativo",
    lastOrderDate: "Há 2 dias",
  },
  {
    id: "cust-5",
    name: "Luciana Fernandes",
    email: "luciana.fernandes@exemplo.com",
    phone: "(19) 98111-2233",
    ordersCount: 4,
    totalSpent: 9850.0,
    status: "VIP",
    lastOrderDate: "Há 5 dias",
  },
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: "cp-1",
    code: "BEMVINDO10",
    type: "percentage",
    value: 10,
    minOrderValue: 100,
    active: true,
    usageCount: 48,
    expiresAt: "2026-12-31",
  },
  {
    id: "cp-2",
    code: "FRETEOFF",
    type: "fixed",
    value: 30,
    minOrderValue: 250,
    active: true,
    usageCount: 112,
    expiresAt: "2026-10-15",
  },
  {
    id: "cp-3",
    code: "VIPNOVA20",
    type: "percentage",
    value: 20,
    minOrderValue: 500,
    active: true,
    usageCount: 19,
    expiresAt: "2026-11-30",
  },
];
