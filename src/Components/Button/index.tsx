import {ButtonHTMLAttributes} from 'react'
import S from './styles.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return (
      <button className={S.container} {...props}>{props.children}</button>
  )
}