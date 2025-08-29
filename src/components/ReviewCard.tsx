// src/components/ReviewCard.tsx
// src/components/ReviewCard.tsx
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

export default function ReviewCard({
  name,
  rating,
  comment,
  avatar,
}: {
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}) {
  return (
    <div className="p-4 border rounded-lg flex flex-col items-start">
      <div className="flex items-center gap-2">
        <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
        <span className="font-medium">{name}</span>
        <StarRating rating={rating} />
      </div>
      <p className="text-gray-600 mt-2">{comment}</p>
    </div>
  );
}

