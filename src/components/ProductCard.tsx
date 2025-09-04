// src/components/ProductCard.tsx
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: string;
}

export default function ProductCard({ name, price }: ProductCardProps) {
  return (
    <div className="p-4 border rounded-lg flex flex-col items-center bg-white dark:bg-gray-800 shadow">
      <ShoppingBag size={20} className="text-blue-600" />
      <p className="mt-2 font-medium">{name}</p>
      <p className="text-sm text-gray-500 dark:text-gray-300">{price}</p>
    </div>
  );
}
