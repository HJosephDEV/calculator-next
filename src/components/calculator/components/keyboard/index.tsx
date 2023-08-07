import { CalculatorKeyboardButton, CalculatorKeyboardProps } from '../../@types';
import CalculatorButton from './components/button';
import styles from './styles.module.scss';

export default function CalculatorKeyboard({ buttonsList }: CalculatorKeyboardProps): JSX.Element {
  const buttons =
    buttonsList.length > 0 &&
    buttonsList.map((button: CalculatorKeyboardButton) => (
      <CalculatorButton
        key={`key-${button.keyboardKey}`}
        id={`key-${button.name || button.keyboardKey}`}
        event={button.event}
      >
        {button?.content}
      </CalculatorButton>
    ));

  return <div className={styles.container}>{buttons}</div>;
}
