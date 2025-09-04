// src/components/ReviewCard.tsx
import React from "react";

interface ReviewCardProps {
  name: string;
  rating: number;
  comment: string;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

export default function ReviewCard({ name, rating, comment }: ReviewCardProps) {
  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">{name}</span>
        <StarRating rating={rating} />
      </div>
      <p className="text-gray-600 dark:text-gray-300">{comment}</p>
    </div>
  );
};

export default ReviewCard;
