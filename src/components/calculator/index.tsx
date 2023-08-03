'use client';

import { useState } from 'react';

import CalculatorDisplay from './components/display';
import styles from './styles.module.scss';
import CalculatorKeyboard from './components/keyboard';
import { CalculatorKeyboardButton } from './@types';

export default function Calculator(): JSX.Element {
  const [displayValue, setDisplayValue] = useState<string>('');

  const handleComma = () => {
    const sinals = ['+', '-', '/', '*'];
    const reverseString = displayValue.split('').reverse();
    const lastSinalIndex = reverseString.findIndex((letter: string) => sinals.includes(letter));
    const numberInList =
      lastSinalIndex === -1 ? displayValue : reverseString.slice(0, lastSinalIndex - 1).reverse();
    const hasComma = numberInList.indexOf(',') > -1;

    if (hasComma) return false;

    return true;
  };

  const handleKey = (key?: string) => {
    const allowComma = handleComma();
    if (!allowComma && key === ',') return;

    if (isNaN(Number(displayValue.at(-1))) && isNaN(Number(key))) {
      setDisplayValue(displayValue.substring(0, displayValue.length - 1) + key);
      return;
    }

    setDisplayValue(displayValue + key);
  };

  const handleClear = () => {
    setDisplayValue('');
  };

  const handleBack = () => {
    setDisplayValue(displayValue.substring(0, displayValue.length - 1));
  };

  const buttonsList: Array<CalculatorKeyboardButton> = [
    {
      keyboardKey: 'clear',
      content: 'C',
      event: () => handleClear()
    },
    {
      keyboardKey: 'back',
      content: '<',
      event: () => handleBack()
    },
    {
      keyboardKey: 'division',
      content: ':',
      event: () => handleKey('/')
    },
    {
      keyboardKey: 'multiplication',
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
      keyboardKey: 'minus',
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
      keyboardKey: 'plus',
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
      keyboardKey: 'equal',
      content: '=',
      event: () => {
        console.log('oi');
      }
    },
    {
      keyboardKey: '%',
      event: () => {
        console.log('hi');
      }
    },
    {
      keyboardKey: '0',
      event: () => handleKey('0')
    },
    {
      keyboardKey: ',',
      event: () => handleKey(',')
    }
  ];

  return (
    <div className={styles.container}>
      <CalculatorDisplay />
      {displayValue}
      <CalculatorKeyboard buttonsList={buttonsList} />
    </div>
  );
}
