import React, { ButtonHTMLAttributes, Component } from 'react'
import styles from './FlatButton.module.css'
import classNames from 'classnames'

interface FlatButtonProps {
  className?: string
}

class FlatButton extends Component<FlatButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> {
  render() {
    const { children, className, ...rest } = this.props
    return (
      <button className={classNames(styles.flatButton, className)} {...rest}>{children}</button>
    )
  }
}

export default FlatButton