
import React from 'react';
import { cn } from '@/lib/utils';

interface CalculatorButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'operator' | 'equals' | 'secondary';
  className?: string;
}

const CalculatorButton = ({ 
  children, 
  onClick, 
  variant = 'default', 
  className 
}: CalculatorButtonProps) => {
  const baseClasses = "h-16 rounded-2xl font-semibold text-xl transition-all duration-200 active:scale-95 hover:brightness-110";
  
  const variantClasses = {
    default: "bg-slate-700/50 text-white hover:bg-slate-600/50 backdrop-blur-sm border border-slate-600/30",
    operator: "bg-orange-500/80 text-white hover:bg-orange-400/80 backdrop-blur-sm shadow-lg shadow-orange-500/20",
    equals: "bg-orange-500/80 text-white hover:bg-orange-400/80 backdrop-blur-sm shadow-lg shadow-orange-500/20",
    secondary: "bg-slate-500/50 text-white hover:bg-slate-400/50 backdrop-blur-sm border border-slate-400/30"
  };

  return (
    <button
      onClick={onClick}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      {children}
    </button>
  );
};

export default CalculatorButton;
