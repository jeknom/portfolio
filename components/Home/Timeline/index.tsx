import { Title, Divider } from '../../Core'
import { AchievementProps } from '../../../lib/data'
import Achievement from './Achievement'
import styles from './achievements.module.css'

const LATEST_ACHIEVEMENTS_TO_SHOW = 3;

interface TimelineProps {
  achievements: AchievementProps[]
}

export default function index({ achievements }: TimelineProps) {
  const renderLatestAchievements = () => {
    const achievementsToShow = Math.min(achievements.length, LATEST_ACHIEVEMENTS_TO_SHOW)

    return achievements.slice(0, achievementsToShow).map((a, index) => (
      <Achievement
        key={index}
        title={a.title}
        subtitle={a.subtitle}
        image={a.image}
        startDate={a.startDate}
        endDate={a.endDate} />
    ))
  }

  return (
    <section>
      <Title text='Timeline' />
      <Divider />
      <div className={styles.topAchievements}>
        {renderLatestAchievements()}
      </div>
    </section>
  )
}