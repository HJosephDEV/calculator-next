'use client';

import { useState } from 'react';

import CalculatorDisplay from './components/display';
import styles from './styles.module.scss';
import CalculatorKeyboard from './components/keyboard';
import { CalculatorKeyboardButton } from './@types';

export default function Calculator(): JSX.Element {
  const [displayValue, setDisplayValue] = useState<string>('');
  const [allowedComma, setAllowedComma] = useState<boolean>(true);

  const handleComma = (key = '') => {
    if (key === ',') {
      setAllowedComma(false);
      return;
    }

    let display = '';
    if (key !== 'back') display = displayValue + key;
    if (key === 'back') display = displayValue.substring(0, displayValue.length - 1);

    const commaNumbers: number = display
      .split('')
      .filter((letter: string) => letter === ',').length;

    if (commaNumbers === 0) return;

    const reverseString: string[] = display.split('').reverse();
    const lastCommaIndex: number = reverseString.indexOf(',');
    const arraySinceLastComma: string[] = reverseString.slice(0, lastCommaIndex).reverse();

    let allowComma = false;
    for (let i = 0; i < arraySinceLastComma.length; i++) {
      if (allowComma) break;

      const element = arraySinceLastComma[i];
      const sinals = ['+', '-', '/', '*'];

      allowComma =
        sinals.includes(element) &&
        !isNaN(Number(arraySinceLastComma[i - 1])) &&
        !isNaN(Number(arraySinceLastComma[i + 1]));
    }

    setAllowedComma(allowComma);
  };

  const handleKey = (key?: string) => {
    if (!allowedComma && key === ',') return;

    if (isNaN(Number(displayValue.at(-1))) && isNaN(Number(key))) {
      setDisplayValue(displayValue.substring(0, displayValue.length - 1) + key);
      return;
    }

    handleComma(key ?? '');
    setDisplayValue(displayValue + key);
  };

  const handleClear = () => {
    setDisplayValue('');
    setAllowedComma(true);
  };

  const handleBack = () => {
    handleComma('back');
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
