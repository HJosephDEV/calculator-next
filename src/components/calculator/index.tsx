'use client';

import { useState, useEffect } from 'react';

import CalculatorDisplay from './components/display';
import CalculatorKeyboard from './components/keyboard';

import { CalculatorKeyboardButton, DisplayViewProps } from './@types';

import styles from './styles.module.scss';

export default function Calculator(): JSX.Element {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [historic, setHistoric] = useState<string[]>([]);
  const [expressionResult, setExpressionResult] = useState<string>('');
  const sinals: string[] = ['+', '-', '/', '*'];
  const allowedKey: string[] = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    ',',
    '%',
    '=',
    'Backspace',
    'Delete',
    ...sinals
  ];
  const displayView: DisplayViewProps = {
    expression: displayValue.replaceAll('/', ':').replaceAll('*', 'x'),
    result: expressionResult
  };

  const handlePressKey = ({ key }: { key: string }) => {
    allowedKey.includes(key) &&
      buttonsList.find((k: CalculatorKeyboardButton) => k.keyboardKey === key)?.event();
  };

  useEffect(() => {
    window.addEventListener('keydown', handlePressKey);
    return () => window.removeEventListener('keydown', handlePressKey);
  }, [handlePressKey]);

  const handleComma = () => {
    if (!!expressionResult) {
      handleKeyAfterResult();
      setDisplayValue(`${expressionResult},`);
      return;
    }

    const reverseString: string[] = displayValue.split('').reverse();
    const lastSinalIndex: number = reverseString.findIndex((letter: string) =>
      sinals.includes(letter)
    );
    const number: string =
      lastSinalIndex === -1
        ? displayValue
        : reverseString.slice(0, lastSinalIndex).reverse().join();

    const hasComma: boolean = number.indexOf(',') > -1;

    if (!number.length) return false;
    if (hasComma) return false;

    const isLastNaN: boolean = handleNaN(',', true);
    !isLastNaN && setDisplayValue(`${displayValue},`);
  };

  const handleKeyAfterResult = () => {
    const completedExpression = `${displayValue} = ${expressionResult}`;
    setHistoric([...historic, completedExpression]);
    setExpressionResult('');
  };

  const handlePercentage = () => {
    let percentage: number = 0.0;

    if (!!expressionResult) {
      percentage = Number(expressionResult) / 100;
      handleKeyAfterResult();
      setDisplayValue(percentage.toString());
      return;
    }

    const display = sinals.includes(displayValue.at(-1) || '')
      ? displayValue.substring(0, displayValue.length - 1)
      : displayValue;
    const hasSinal: boolean = sinals.map((sinal) => display.includes(sinal)).includes(true);
    const hasOnlySinalEnd: boolean = sinals.includes(display.at(-1) || '');
    const sinalsLength: number = display
      .split('')
      .filter((string: string) => sinals.includes(string)).length;

    if (!hasSinal || (hasOnlySinalEnd && sinalsLength === 1)) {
      const number: string = hasOnlySinalEnd ? display.substring(0, display.length - 1) : display;
      percentage = Number(number) / 100;
      setDisplayValue(percentage.toString());
      return;
    }

    const lastSinalIndex: number = display
      .split('')
      .findLastIndex((string: string) => sinals.includes(string));
    const number: number = Number(display.slice(lastSinalIndex + 1));
    percentage = number / 100;
    const expression: string = display.substring(0, lastSinalIndex);
    const result: number = eval(expression) * percentage;
    const newDisplayValue: string = `${expression}${display[lastSinalIndex]}${result}`;

    setDisplayValue(newDisplayValue);
  };

  const handleNaN = (key: string, replace: boolean): boolean => {
    if (isNaN(Number(displayValue.at(-1))) && isNaN(Number(key))) {
      replace && setDisplayValue(displayValue.substring(0, displayValue.length - 1) + key);
      return true;
    }

    return false;
  };
  const handleKey = (key: string) => {
    if (!!expressionResult) {
      const isSinal: boolean = sinals.includes(key);
      const newDisplay: string = isSinal ? `${expressionResult}${key}` : key;
      handleKeyAfterResult();
      setDisplayValue(newDisplay);
      return;
    }

    if (handleNaN(key, true)) return;
    setDisplayValue(displayValue + key);
  };

  const handleClear = () => {
    setDisplayValue('0');
    setHistoric([]);
    setExpressionResult('');
  };

  const handleBack = () => {
    setDisplayValue(displayValue.substring(0, displayValue.length - 1));
  };

  const handleResult = () => {
    const lastDigit: string = displayValue.at(-1) ?? '';
    if (sinals.includes(lastDigit) || lastDigit === ',') return;
    const value: string = eval(displayValue.replaceAll(',', '.')).toString();
    setExpressionResult(value);
  };

  const buttonsList: Array<CalculatorKeyboardButton> = [
    {
      name: 'clear',
      keyboardKey: 'Delete',
      content: 'C',
      event: () => handleClear()
    },
    {
      name: 'back',
      keyboardKey: 'Backspace',
      content: '<',
      event: () => handleBack()
    },
    {
      name: 'division',
      keyboardKey: '/',
      content: ':',
      event: () => handleKey('/')
    },
    {
      name: 'multiplication',
      keyboardKey: '*',
      content: 'X',
      event: () => handleKey('*')
    },
    {
      keyboardKey: '7',
      event: () => handleKey('7')
    },
    {
      keyboardKey: '8',
      event: () => handleKey('8')
    },
    {
      keyboardKey: '9',
      event: () => handleKey('9')
    },
    {
      name: 'minus',
      keyboardKey: '-',
      content: '-',
      event: () => handleKey('-')
    },
    {
      keyboardKey: '4',
      event: () => handleKey('4')
    },
    {
      keyboardKey: '5',
      event: () => handleKey('5')
    },
    {
      keyboardKey: '6',
      event: () => handleKey('6')
    },
    {
      name: 'plus',
      keyboardKey: '+',
      content: '+',
      event: () => handleKey('+')
    },
    {
      keyboardKey: '1',
      event: () => handleKey('1')
    },
    {
      keyboardKey: '2',
      event: () => handleKey('2')
    },
    {
      keyboardKey: '3',
      event: () => handleKey('3')
    },
    {
      name: 'equal',
      keyboardKey: '=',
      content: '=',
      event: () => handleResult()
    },
    {
      keyboardKey: '%',
      event: () => handlePercentage()
    },
    {
      keyboardKey: '0',
      event: () => handleKey('0')
    },
    {
      keyboardKey: ',',
      event: () => handleComma()
    }
  ];

  return (
    <div className={styles.container}>
      <CalculatorDisplay
        displayView={displayView}
        historic={historic}
      />
      <CalculatorKeyboard buttonsList={buttonsList} />
    </div>
  );
}
