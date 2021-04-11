import { FC } from 'react'
import styles from './button.module.css'

const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => {
  return (
    <button className={styles.button} {...rest}>{children}</button>
  )
}

export default Button