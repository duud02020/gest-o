export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceFormatted: string; // formatted with thousand separator and currency
  image: string; // URL to image or emoji
  rating: number; // 0-5
  reviews: number;
  installments: string; // e.g., "12x R$ 291,66"
  shipping: string; // e.g., "Frete grátis"
  availability: string; // "Em estoque" ou "Esgotado"
  category: string;
  stock?: number;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Smartphone Galaxy Ultra 5G",
    description: "Tela AMOLED 6.8'', 256GB, Câmera quádrupla 108MP com zoom ótico 10x.",
    price: 3499.9,
    priceFormatted: "R$ 3.499,90",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviews: 128,
    installments: "12x de R$ 291,66 sem juros",
    shipping: "Frete grátis",
    availability: "Em estoque",
    category: "Eletrônicos",
    stock: 24,
  },
  {
    id: "prod-2",
    name: "Notebook Pro Max 16\"",
    description: "Processador Ultra M3, 32GB RAM unificada, SSD 1TB NVMe de altíssima velocidade.",
    price: 7899.0,
    priceFormatted: "R$ 7.899,00",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    reviews: 94,
    installments: "12x de R$ 658,25 sem juros",
    shipping: "Frete grátis",
    availability: "Em estoque",
    category: "Informática",
    stock: 12,
  },
  {
    id: "prod-3",
    name: "Fone Bluetooth Noise Cancelling",
    description: "Cancelamento de ruído ativo adaptativo, bateria de até 40 horas e áudio espacial.",
    price: 549.9,
    priceFormatted: "R$ 549,90",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviews: 210,
    installments: "10x de R$ 54,99 sem juros",
    shipping: "Frete grátis",
    availability: "Em estoque",
    category: "Áudio",
    stock: 45,
  },
  {
    id: "prod-4",
    name: "Smartwatch Sport Titanium",
    description: "Resistente à água 50m, GPS integrado de dupla frequência e monitor cardíaco ECG.",
    price: 1199.0,
    priceFormatted: "R$ 1.199,00",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviews: 75,
    installments: "12x de R$ 99,92 sem juros",
    shipping: "Frete grátis",
    availability: "Em estoque",
    category: "Wearables",
    stock: 18,
  },
  {
    id: "prod-5",
    name: "Câmera Mirrorless 4K Pro",
    description: "Sensor Full-frame 33MP, estabilização interna de 5 eixos e gravação 4K 60fps.",
    price: 4599.0,
    priceFormatted: "R$ 4.599,00",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviews: 42,
    installments: "12x de R$ 383,25 sem juros",
    shipping: "Frete grátis",
    availability: "Em estoque",
    category: "Fotografia",
    stock: 7,
  },
  {
    id: "prod-6",
    name: "Teclado Mecânico RGB Wireless",
    description: "Switches ópticos lineares, corpo em alumínio aeroespacial e conexão tri-mode.",
    price: 389.0,
    priceFormatted: "R$ 389,00",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    reviews: 63,
    installments: "6x de R$ 64,83 sem juros",
    shipping: "Frete grátis",
    availability: "Poucas unidades",
    category: "Informática",
    stock: 4,
  },
];



