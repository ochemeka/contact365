import { Briefcase } from "lucide-react";

export default function JobCard({ title, type }: { title: string; type: string }) {
  return (
    <div className="p-4 border rounded-lg flex items-center justify-between">
      <div className="flex items-center">
        <Briefcase size={18} className="mr-2 text-green-600" />
        <span>{title}</span>
      </div>
      <span className="text-sm text-gray-500">{type}</span>
    </div>
  );
}
