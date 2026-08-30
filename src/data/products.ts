export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Smartphone Moderno X",
    description: "Um smartphone incrível com câmera de 108MP e bateria que dura o dia todo.",
    price: 3499.99,
    image: "📱",
    category: "Eletrônicos"
  },
  {
    id: "2",
    name: "Fone de Ouvido Noise Cancelling",
    description: "Isole-se do mundo com este fone de alta qualidade e som imersivo.",
    price: 899.50,
    image: "🎧",
    category: "Áudio"
  },
  {
    id: "3",
    name: "Notebook Ultrafino Pro",
    description: "Perfeito para trabalho e lazer, com processador de última geração.",
    price: 5200.00,
    image: "💻",
    category: "Computadores"
  },
  {
    id: "4",
    name: "Smartwatch Fitness",
    description: "Acompanhe seus treinos, sono e notificações direto no seu pulso.",
    price: 1250.00,
    image: "⌚",
    category: "Wearables"
  }
];
