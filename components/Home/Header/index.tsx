import styles from '../../../styles/Home.module.css'
import { Base64Image } from '../../Core'

interface HeaderProps {
  name: string,
  headline: string,
  image: string
}

export default function index({ name, headline, image }: HeaderProps) {
  return (
    <section className={styles.header}>
      <Base64Image className={styles.profilePicture} image={image} alt='Profile picture' hideNull={false} />
      <span className='primaryText'>{name}</span>
      <span className='subtitle'>{headline}</span>
    </section>
  )
}