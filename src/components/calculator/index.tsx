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
    'Enter',
    ...sinals
  ];
  const displayView: DisplayViewProps = {
    expression: displayValue.replaceAll('/', ':').replaceAll('*', 'x').replaceAll('.', ','),
    result: expressionResult
  };

  const handlePressKey = ({ key }: { key: string }) => {
    allowedKey.includes(key) &&
      buttonsList.find((k: CalculatorKeyboardButton) => k.keyboardKey.includes(key))?.event();
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
        : reverseString.slice(0, lastSinalIndex).reverse().join('');

    const hasComma: boolean = number.indexOf(',') > -1;

    if (!number.length || hasComma) return false;

    const isLastNaN: boolean = handleNaN(',', true);
    !isLastNaN && setDisplayValue(`${displayValue}.`);
  };

  const handleKeyAfterResult = () => {
    const completedExpression: string = `${displayValue} = ${expressionResult}`;
    setHistoric([...historic, completedExpression]);
    setExpressionResult('');
  };

  const handlePercentage = () => {
    let percentage: number = 0.0;

    if (!!expressionResult) {
      const expressionResultLocal: string = expressionResult.replaceAll(',', '.');
      percentage = Number(expressionResultLocal) / 100;
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

  const handleZeroInDisplay = (key: string) => {
    if (key === '0') return;

    setDisplayValue(key);
  };

  const handleResultInDisplay = (key: string) => {
    const isSinal: boolean = sinals.includes(key);
    const newDisplay: string = isSinal ? `${expressionResult}${key}` : key;
    handleKeyAfterResult();
    setDisplayValue(newDisplay);
  };

  const handleKey = (key: string) => {
    if (!!expressionResult) {
      handleResultInDisplay(key);
      return;
    }

    if (displayValue.length === 1 && displayValue[0] === '0' && !sinals.includes(key)) {
      handleZeroInDisplay(key);
      return;
    }

    const isKeyNaN: boolean = handleNaN(key, true);
    if (isKeyNaN) return;

    setDisplayValue(displayValue + key);
  };

  const handleClear = () => {
    setDisplayValue('0');
    setHistoric([]);
    setExpressionResult('');
  };

  const handleBack = () => {
    if (displayValue.length > 1 && !expressionResult) {
      setDisplayValue(displayValue.substring(0, displayValue.length - 1));
      return;
    }

    setDisplayValue('0');
  };

  const handleResult = () => {
    const lastDigit: string = displayValue.at(-1) ?? '';
    if (sinals.includes(lastDigit) || lastDigit === ',') return;
    const value: string = eval(displayValue.replaceAll(',', '.')).toString().replaceAll('.', ',');
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
      content: '7',
      event: () => handleKey('7')
    },
    {
      keyboardKey: '8',
      content: '8',
      event: () => handleKey('8')
    },
    {
      keyboardKey: '9',
      content: '9',
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
      content: '4',
      event: () => handleKey('4')
    },
    {
      keyboardKey: '5',
      content: '5',
      event: () => handleKey('5')
    },
    {
      keyboardKey: '6',
      content: '6',
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
      content: '1',
      event: () => handleKey('1')
    },
    {
      keyboardKey: '2',
      content: '2',
      event: () => handleKey('2')
    },
    {
      keyboardKey: '3',
      content: '3',
      event: () => handleKey('3')
    },
    {
      name: 'equal',
      keyboardKey: 'Enter',
      content: '=',
      event: () => handleResult()
    },
    {
      keyboardKey: '%',
      content: '%',
      event: () => handlePercentage()
    },
    {
      keyboardKey: '0',
      content: '0',
      event: () => handleKey('0')
    },
    {
      keyboardKey: ',',
      content: ',',
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
