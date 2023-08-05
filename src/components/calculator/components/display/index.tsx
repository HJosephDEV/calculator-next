import { CalculatorDisplayProps } from '../../@types';
import styles from './styles.module.scss';

export default function CalculatorDisplay({
  displayView,
  historic
}: CalculatorDisplayProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {historic.map((expression: string, i: number) => (
          <div key={`expression-${i}`}>
            {expression}
            <br />
          </div>
        ))}
        {displayView.expression}
        <br />
        {!!displayView.result && `= ${displayView.result}`}
      </div>
    </div>
  );
}
