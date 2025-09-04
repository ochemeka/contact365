// src/components/EventCard.tsx
import { Calendar } from "lucide-react";

interface EventCardProps {
  title: string;
  date: string;
}

export default function EventCard({ title, date }: EventCardProps) {
  return (
    <div className="p-4 border rounded-lg flex items-center bg-white dark:bg-gray-800 shadow">
      <Calendar size={18} className="mr-2 text-purple-600" />
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-300">{date}</p>
      </div>
    </div>
  );
}
