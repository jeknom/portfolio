import styles from './VerticalLayout.module.css'
import classNames from 'classnames'

interface VerticalLayoutProps {
  children: any,
  className?: any,
  style?: object
}

export default function VerticalLayout({ children, className, style }: VerticalLayoutProps) {
  return (
    <span
      className={classNames(styles.layout, className)}
      style={style}>
      {children}
    </span>
  )
}