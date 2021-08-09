import { FC } from 'react'
import classNames from 'classnames'
import styles from './ResponsiveGridLayout.module.css'

interface ResponsiveGridLayoutProps {
  className?: string
}

const ResponsiveGridLayout: FC<ResponsiveGridLayoutProps> = ({ children, className }) => {
  return (
    <span className={classNames(styles.layout, className)}>{children}</span>
  )
}

export default ResponsiveGridLayout