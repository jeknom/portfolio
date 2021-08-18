import { FC, HTMLProps } from 'react'
import styles from './VerticalLayout.module.css'
import classNames from 'classnames'

interface VerticalLayoutProps extends HTMLProps<HTMLSpanElement> {
  children: any,
  className?: any,
  style?: object
}

const VerticalLayout: FC<VerticalLayoutProps> = ({ children, className, style, ...rest }) => {
  return (
    <span
      {...rest}
      className={classNames(styles.layout, className)}
      style={style}>
      {children}
    </span>
  )
}

export default VerticalLayout;