import { FC } from 'react'
import classNames from 'classnames'
import styles from './ResponsiveGridLayout.module.css'
import { ReactNode } from 'react-markdown/lib/react-markdown'

interface ResponsiveGridLayoutProps {
  className?: string
  children?: ReactNode;
}

const ResponsiveGridLayout: FC<ResponsiveGridLayoutProps> = ({ children, className }) => {
  return (
    <span className={classNames(styles.layout, className)}>{children}</span>
  )
}

export default ResponsiveGridLayout