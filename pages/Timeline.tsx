import { FC } from 'react'
import { getAchievements, getMinAchievementDate, getHighlights } from '../lib/data'
import { Head, FlatButton } from '../components/Core'
import TimelineComponent from '../components/Timeline'
import styles from '../styles/Timeline.module.css'

interface TimelineProps {
  achievements: AchievementData[],
  minAchievementDate: MinAchievementDateData,
  highlights: HighlightData[]
}

const Timeline: FC<TimelineProps> = ({ achievements, minAchievementDate, highlights }) => {
  return (
    <>
      <Head
        title='Timeline'
        description='The story of my career by Johannes Palvanen.' />
      <a href='/'>
        <FlatButton className={styles.closeButton}>
          X
        </FlatButton>
      </a>
      <TimelineComponent
        achievements={achievements}
        minAchievementDate={minAchievementDate}
        highlights={highlights} />
    </>
  )
}

export async function getServerSideProps() {
  const achievements: AchievementData[] = await getAchievements()
  const minAchievementDate: MinAchievementDateData = await getMinAchievementDate()
  const highlights: HighlightData[] = await getHighlights()

  return {
    props: { achievements, minAchievementDate, highlights }
  }
}

export default Timeline