import { Paragraph } from '../../Core'
import styles from '../../../styles/Home.module.css'

interface IntroProps {
  bio: string
}

export default function Intro({ bio }: IntroProps) {
  return (
    <section className={styles.bio}>
      <Paragraph text={bio} />
    </section>
  )
}