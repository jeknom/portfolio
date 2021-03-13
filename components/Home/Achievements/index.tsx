import { Title, Divider } from '../../Core'
import { AchievementProps } from '../../../lib/data'
import TopAchievement from './TopAchievement'
import styles from './achievements.module.css'

interface AchievementsProps {
  achievements: AchievementProps[]
}

export default function index({ achievements }: AchievementsProps) {
  const renderTopAchievements = () => {
    return achievements.map((a, index) => (
      <TopAchievement key={index} title={a.title} subtitle={a.subtitle} image={a.image} date={a.date} />
    ))
  }

  return (
    <section>
      <Title text='Achievements' />
      <Divider />
      <div className={styles.topAchievements}>
        {renderTopAchievements()}
      </div>
    </section>
  )
}