// src/components/JobCard.tsx
import { Briefcase } from "lucide-react";

interface JobCardProps {
  title: string;
  type: string;
}

export default function JobCard({ title, type }: JobCardProps) {
  return (
    <div className="p-4 border rounded-lg flex items-center justify-between bg-white dark:bg-gray-800 shadow">
      <div className="flex items-center">
        <Briefcase size={18} className="mr-2 text-green-600" />
        <span>{title}</span>
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-300">{type}</span>
    </div>
  );
}
