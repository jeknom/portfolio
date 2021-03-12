import styles from '../../../styles/Home.module.css'

interface HeaderProps {
  name: string,
  headline: string,
  image: string
}

export default function index({ name, headline, image }: HeaderProps) {
  return (
    <section className={styles.header}>
      <img className={styles.profilePicture} src={`data:image/png;base64, ${image}`} alt='Profile picture' />
      <span className={styles.title}>{name}</span>
      <span className={styles.headline}>{headline}</span>
    </section>
  )
}