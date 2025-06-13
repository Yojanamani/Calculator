
import React, { useState } from 'react';
import { Calculator as CalculatorIcon } from 'lucide-react';
import CalculatorButton from './CalculatorButton';
import CalculatorDisplay from './CalculatorDisplay';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="bg-black/20 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/10">
      <div className="flex items-center justify-center mb-6">
        <CalculatorIcon className="text-white mr-2" size={24} />
        <span className="text-white font-semibold">Calculator</span>
      </div>
      
      <CalculatorDisplay value={display} />

      <div className="grid grid-cols-4 gap-3 mt-6">
        {/* Row 1 */}
        <CalculatorButton onClick={clear} variant="secondary" className="col-span-2">
          AC
        </CalculatorButton>
        <CalculatorButton onClick={() => performOperation('÷')} variant="operator">
          ÷
        </CalculatorButton>
        <CalculatorButton onClick={() => performOperation('×')} variant="operator">
          ×
        </CalculatorButton>

        {/* Row 2 */}
        <CalculatorButton onClick={() => inputNumber('7')}>7</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('8')}>8</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('9')}>9</CalculatorButton>
        <CalculatorButton onClick={() => performOperation('-')} variant="operator">
          -
        </CalculatorButton>

        {/* Row 3 */}
        <CalculatorButton onClick={() => inputNumber('4')}>4</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('5')}>5</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('6')}>6</CalculatorButton>
        <CalculatorButton onClick={() => performOperation('+')} variant="operator">
          +
        </CalculatorButton>

        {/* Row 4 */}
        <CalculatorButton onClick={() => inputNumber('1')}>1</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('2')}>2</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('3')}>3</CalculatorButton>
        <CalculatorButton onClick={handleEquals} variant="equals" className="row-span-2">
          =
        </CalculatorButton>

        {/* Row 5 */}
        <CalculatorButton onClick={() => inputNumber('0')} className="col-span-2">
          0
        </CalculatorButton>
        <CalculatorButton onClick={inputDecimal}>.</CalculatorButton>
      </div>
    </div>
  );
};

export default Calculator;
