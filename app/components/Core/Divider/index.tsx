import { FC, HTMLAttributes } from 'react'
import styles from './divider.module.css'

const Divider: FC<HTMLAttributes<HTMLElement>> = () => {
  return (
    <hr className={styles.divider} />
  )
}

export default Divider