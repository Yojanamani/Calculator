
import React from 'react';

interface CalculatorDisplayProps {
  value: string;
}

const CalculatorDisplay = ({ value }: CalculatorDisplayProps) => {
  // Format the display value to handle long numbers
  const formatValue = (val: string) => {
    if (val.length > 12) {
      const num = parseFloat(val);
      if (num > 999999999999) {
        return num.toExponential(5);
      }
      return num.toString().slice(0, 12);
    }
    return val;
  };

  return (
    <div className="bg-black/30 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
      <div className="text-right">
        <div className="text-4xl font-light text-white font-mono tracking-wider">
          {formatValue(value)}
        </div>
      </div>
    </div>
  );
};

export default CalculatorDisplay;
