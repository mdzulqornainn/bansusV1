// components/ui/StatCard.tsx
import { theme } from "@/lib/theme";

interface StatCardProps {
  progja: string;
  label: string;
  color: string;
}

export const StatCard = ({ progja, label, color }: StatCardProps) => (
  <div className={theme.card_stat}>
    <div className="text-sm font-bold text-slate-700 mb-3 group-hover:text-[#0B5EA8] transition-colors">
      {progja}
    </div>
    <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">
      <span className={`w-1.5 h-1.5 rounded-full ${color}`}></span>
      <span>{label}</span>
    </div>
  </div>
);
