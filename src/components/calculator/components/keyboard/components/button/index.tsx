import styles from './styles.module.scss';
import { CalculatorButtonProps } from '../../../../@types';

export default function CalculatorButton({
  children,
  event,
  id
}: CalculatorButtonProps): JSX.Element {
  return (
    <button
      type='button'
      className={`${styles.button} ${styles[id] ?? ''}`}
      onClick={event}
    >
      {children}
    </button>
  );
}
