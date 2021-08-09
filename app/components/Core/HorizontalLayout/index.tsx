import React, { FC } from 'react'
import classNames from 'classnames'
import styles from './HorizontalLayout.module.css'

interface HorizontalLayoutProps {
  className?: string
}

const HorizontalLayout: FC<HorizontalLayoutProps & React.HTMLAttributes<HTMLElement>> =
  ({ children, className, ...rest }) => {
  return (
    <span {...rest} className={classNames(styles.layout, className)}>{children}</span>
  )
}

export default HorizontalLayout