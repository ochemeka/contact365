import { ShoppingBag } from "lucide-react";

export default function ProductCard({
  name,
  price,
}: {
  name: string;
  price: string;
}) {
  return (
    <div className="p-4 border rounded-lg flex flex-col items-center">
      <ShoppingBag size={20} className="text-blue-600" />
      <p className="mt-2 font-medium">{name}</p>
      <p className="text-sm text-gray-500">{price}</p>
    </div>
  );
}
