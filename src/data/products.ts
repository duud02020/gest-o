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


