// src/components/ReviewCard.tsx
import React from "react";

type ReviewCardProps = {
  name: string;
  rating: number;
  comment: string;
  avatar: string;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ name, rating, comment, avatar }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm flex flex-col items-start gap-2">
      <div className="flex items-center gap-3">
        <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-yellow-500">{`⭐ ${rating}`}</p>
        </div>
      </div>
      <p className="mt-2 text-gray-700">{comment}</p>
    </div>
  );
};

export default ReviewCard;
