import styles from './header.module.css';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return <div className={styles['header']}></div>;
}

export default Header;
