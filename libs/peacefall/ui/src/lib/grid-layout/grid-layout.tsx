import styles from './grid-layout.module.css';

/* eslint-disable-next-line */
export interface GridLayoutProps {
  children?: React.ReactNode;
}

export function GridLayout({ children }: GridLayoutProps) {
  return <div className={styles['container']}>{children}</div>;
}

export default GridLayout;
