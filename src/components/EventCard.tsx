import { Calendar } from "lucide-react";

export default function EventCard({ title, date }: { title: string; date: string }) {
  return (
    <div className="p-4 border rounded-lg flex items-center">
      <Calendar size={18} className="mr-2 text-purple-600" />
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </div>
  );
}
