import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

type Operator = '+' | '-' | '*' | '/' | '+/-' | '%' | null;

export default function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [fullExpression, setFullExpression] = useState<string[]>([]);
  const [lastOperator, setLastOperator] = useState<Operator>(null);

  const handleNumberInput = (input: string | number) => {
    if (currentValue === '' && input === '.') {
      setCurrentValue('0.');
      setDisplayValue('0.');
    } else if (input === '.' && currentValue.includes('.')) {
      return;
    } else {
      const newValue = currentValue + input.toString();
      setCurrentValue(newValue);
      setDisplayValue(newValue);
    }
  };

  const handleOperatorInput = (operator: Operator) => {
    if (currentValue !== '') {
      setFullExpression([...fullExpression, currentValue, operator]);
      setCurrentValue('');
      setDisplayValue(operator.toString());
      setLastOperator(operator);
    } else if (fullExpression.length > 0 && typeof fullExpression[fullExpression.length - 1] !== 'string') {
      // אם הערך הנוכחי ריק ויש כבר אופרטור אחרון ברשימה, מחליפים אותו באופרטור החדש
      const newExpression = [...fullExpression];
      newExpression[newExpression.length - 1] = operator;
      setFullExpression(newExpression);
      setDisplayValue(operator.toString());
      setLastOperator(operator);
    }
  };

  const handlePercentInput = () => {
    let percentageValue = parseFloat(currentValue);
    if (fullExpression.length > 0) {
      const previousValue = parseFloat(fullExpression[fullExpression.length - 2]);
      percentageValue = (previousValue * percentageValue) / 100;
    } else {
      percentageValue = percentageValue / 100;
    }
    setCurrentValue(percentageValue.toString());
    setDisplayValue(percentageValue.toString());
  };

  const handleEqual = () => {
    if (currentValue !== '') {
      const expression = [...fullExpression, currentValue];
      const result = calculateResult(expression);
      setDisplayValue(result.toString());
      setFullExpression([]);
      setCurrentValue(result.toString());
    }
  };

  const calculateResult = (expression: string[]): number => {
    let result = parseFloat(expression[0]);
    for (let i = 1; i < expression.length; i += 2) {
      const operator = expression[i];
      const nextValue = parseFloat(expression[i + 1]);
      switch (operator) {
        case '+':
          result += nextValue;
          break;
        case '-':
          result -= nextValue;
          break;
        case '*':
          result *= nextValue;
          break;
        case '/':
          result /= nextValue;
          break;
      }
    }
    return result;
  };

  const handleClear = () => {
    setDisplayValue('0');
    setCurrentValue('');
    setFullExpression([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.fullExpressionText}>{fullExpression.join(' ')}</Text>
        <Text style={styles.displayText}>{displayValue}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={handleClear}>
            <Text style={styles.buttonText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleOperatorInput('+/-')}>
            <Text style={styles.buttonText}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePercentInput}>
            <Text style={styles.buttonText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperatorInput('/')}>
            <Text style={[styles.buttonText, styles.operatorButton]}>÷</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(7)}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(8)}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(9)}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperatorInput('*')}>
            <Text style={[styles.buttonText, styles.operatorButton]}>×</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(4)}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(5)}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(6)}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperatorInput('-')}>
            <Text style={[styles.buttonText, styles.operatorButton]}>−</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(1)}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(2)}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(3)}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperatorInput('+')}>
            <Text style={[styles.buttonText, styles.operatorButton]}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button]} onPress={() => handleNumberInput(0)}>
            <Text style={[styles.buttonText]}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberInput('.')}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.equalButton} onPress={handleEqual}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
