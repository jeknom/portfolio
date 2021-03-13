import { Base64Image } from '../../Core'
import { AchievementProps } from '../../../lib/data'
import styles from './achievements.module.css'

export default function TopAchievements({ title, subtitle, image, date }: AchievementProps) {
  return (
    <span className={styles.topAchievementContainer}>
      <span>
        <p className='subtitle'>{title}</p>
        <p className='secondaryText'>{subtitle}</p>
        <p className='secondaryText'>{date}</p>
      </span>
      <Base64Image
        className={styles.achievementImage}
        image={image}
        alt={`${title} icon.`}
        hideNull />
    </span>
  )
}