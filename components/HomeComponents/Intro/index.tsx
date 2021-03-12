import { Title, Divider, Paragraph } from '../../CoreComponents'
import styles from '../../../styles/Home.module.css'

interface IntroProps {
  bio: string
}

export default function index({ bio }: IntroProps) {
  return (
    <section className={styles.bio}>
      <Title text='Introduction' />
      <Divider />
      <Paragraph text={bio} />
    </section>
  )
}