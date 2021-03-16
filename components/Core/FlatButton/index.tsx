import styles from './FlatButton.module.css'
import classNames from 'classnames'

export default function index({ children, className, ...rest }) {
  return (
    <button className={classNames(styles.flatButton, className)} {...rest}>{children}</button>
  )
}