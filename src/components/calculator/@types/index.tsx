import { ReactNode } from '@/@types';
import Calculator from '../index';

export type CalculatorButtonProps = {
  id: string;
  event: () => void;
} & ReactNode;

export type CalculatorKeyboardButton = {
  event: (key?: string) => void;
  keyboardKey: string;
  content?: string;
};

export type CalculatorKeyboardProps = { buttonsList: Array<CalculatorKeyboardButton> };
