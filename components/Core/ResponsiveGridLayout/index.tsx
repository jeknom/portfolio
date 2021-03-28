import styles from './ResponsiveGridLayout.module.css'
import classNames from 'classnames'

interface ResponsiveGridLayoutProps {
  children: any,
  className?: any
}

export default function ResponsiveGridLayout({ children, className }: ResponsiveGridLayoutProps) {
  return (
    <span className={classNames(styles.layout, className)}>{children}</span>
  )
}