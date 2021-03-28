import React, { FC } from 'react'
import styles from './HorizontalLayout.module.css'
import classNames from 'classnames'

interface HorizontalLayoutProps {
  children: any,
  className?: any,
  style?: any
}

const HorizontalLayout: FC<HorizontalLayoutProps & React.HTMLAttributes<HTMLElement>> =
  ({ children, className, ...rest }) => {
  return (
    <span {...rest} className={classNames(styles.layout, className)}>{children}</span>
  )
}

export default HorizontalLayout