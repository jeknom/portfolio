import { Title, Divider } from '../../Core'
import { AchievementProps } from '../../../lib/data'
import TopAchievement from './TopAchievement'
import styles from './achievements.module.css'

interface TimelineProps {
  achievements: AchievementProps[]
}

export default function index({ achievements }: TimelineProps) {
  const renderTopAchievements = () => {
    return achievements.map((a, index) => (
      <TopAchievement
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
        {renderTopAchievements()}
      </div>
    </section>
  )
}