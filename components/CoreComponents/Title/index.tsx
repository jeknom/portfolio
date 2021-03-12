import styles from './title.module.css'

interface TitleProps {
  text: string
}

export default function index({ text }: TitleProps) {
  return (
    <h3 className={styles.title}>{text}</h3>
  )
}