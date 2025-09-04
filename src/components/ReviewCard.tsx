// src/components/ReviewCard.tsx
import React from "react";
import { Star } from "lucide-react";

interface ReviewCardProps {
  name: string;
  rating: number;
  comment: string;
  avatar?: string; // ✅ optional avatar
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

// ✅ helper: get initials from name
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export default function ReviewCard({ name, rating, comment, avatar }: ReviewCardProps) {
  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
              {getInitials(name)}
            </div>
          )}
          <span className="font-medium">{name}</span>
        </div>
        <StarRating rating={rating} />
      </div>
      <p className="text-gray-600 dark:text-gray-300">{comment}</p>
    </div>
  );
}
