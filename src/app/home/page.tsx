import Calculator from '@/components/calculator';

import styles from './styles.module.scss';

export default function HomeTemplate(): JSX.Element {
  return <main className={styles.container}><Calculator /></main>;
}
