import React, { Component } from 'react'
import styles from './button.module.css'

class Button extends Component<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  render() {
    const { children, ...rest } = this.props
    
    return (
      <button className={styles.button} {...rest}>{children}</button>
    )
  }
}

export default Button