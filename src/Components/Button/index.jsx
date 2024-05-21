import S from './styles.module.css';
export function Button(props) {
  return <button className={S.container} onClick={props.onClick}>{props.children}</button>;
}