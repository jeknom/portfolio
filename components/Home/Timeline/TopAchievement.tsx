import { Base64Image } from '../../Core'
import { AchievementProps } from '../../../lib/data'
import styles from './achievements.module.css'

export default function TopAchievements({ title, subtitle, image, startDate, endDate }: AchievementProps) {
  const dateToShow = startDate === endDate ? startDate : `${startDate} - ${endDate}`

  return (
    <span className={styles.topAchievementContainer}>
      <span>
        <p className='subtitle'>{title}</p>
        <p className='secondaryText'>{subtitle}</p>
        <p className='secondaryText'>{dateToShow}</p>
      </span>
      <Base64Image
        className={styles.achievementImage}
        image={image}
        alt={`${title} icon.`}
        hideNull />
    </span>
  )
}