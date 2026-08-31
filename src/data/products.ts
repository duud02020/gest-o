export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceFormatted: string; // formatted with thousand separator and currency
  image: string; // URL to image
  rating: number; // 0-5
  reviews: number;
  installments: string; // e.g., "12x R$ 291,66"
  shipping: string; // e.g., "Frete grátis"
  availability: string; // "Em estoque" ou "Esgotado"
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Smartphone Moderno X",
    description: "Um smartphone incrível com câmera de 108MP e bateria que dura o dia todo.",
    price: 3499.99,
    priceFormatted: "R$ 3.499,99",
    image: "https://picsum.photos/seed/1/200/200",
    rating: 4.5,
    reviews: 124,
    installments: "12x R$ 291,66",
    shipping: "Frete grátis",
    availability: "Em estoque",
    category: "Eletrônicos",
  },
  {
    id: "2",
    name: "Fone de Ouvido Noise Cancelling",
    description: "Isole-se do mundo com este fone de alta qualidade e som imersivo.",
    price: 899.5,
    priceFormatted: "R$ 899,50",
    image: "https://picsum.photos/seed/2/200/200",
    rating: 4.2,
    reviews: 58,
    installments: "12x R$ 74,96",
    shipping: "Frete grátis",
    availability: "Em estoque",
    category: "Áudio",
  },
  {
    id: "3",
    name: "Notebook Ultrafino Pro",
    description: "Perfeito para trabalho e lazer, com processador de última geração.",
    price: 5200,
    priceFormatted: "R$ 5.200,00",
    image: "https://picsum.photos/seed/3/200/200",
    rating: 4.7,
    reviews: 87,
    installments: "12x R$ 433,33",
    shipping: "Frete grátis",
    availability: "Em estoque",
    category: "Computadores",
  },
  {
    id: "4",
    name: "Smartwatch Fitness",
    description: "Acompanhe seus treinos, sono e notificações direto no seu pulso.",
    price: 1250,
    priceFormatted: "R$ 1.250,00",
    image: "https://picsum.photos/seed/4/200/200",
    rating: 4.0,
    reviews: 42,
    installments: "12x R$ 104,17",
    shipping: "Frete grátis",
    availability: "Em estoque",
    category: "Wearables",
  },
];
