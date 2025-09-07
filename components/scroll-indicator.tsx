import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollIndicatorProps {
  onClick: () => void;
  className?: string;
}

export function ScrollIndicator({ onClick, className }: ScrollIndicatorProps) {
  return (
    <div 
      className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 cursor-pointer animate-bounce",
        "z-50 w-12 h-12 flex items-center justify-center",
        "bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl",
        "text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50",
        "transition-all duration-200",
        className
      )}
      onClick={onClick}
    >
      <ChevronDown className="w-5 h-5" />
    </div>
  );
}
