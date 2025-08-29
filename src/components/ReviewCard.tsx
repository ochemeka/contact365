import { Star } from "lucide-react";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ))}
  </div>
);

export default function ReviewCard({ user, rating, text }: { user: string; rating: number; text: string }) {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between">
        <span className="font-medium">{user}</span>
        <StarRating rating={rating} />
      </div>
      <p className="text-gray-600 mt-2">{text}</p>
    </div>
  );
}
