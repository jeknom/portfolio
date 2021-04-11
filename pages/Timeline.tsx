import { FC } from 'react'
import Image from 'next/image'
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
          <Image src='/x.svg' alt='Close button X' width='64' height='64' priority />
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
  const result = await Promise.all([getAchievements(), getMinAchievementDate(), getHighlights()])
  const achievements = result[0]
  const minAchievementDate = result[1]
  const highlights = result[2]

  return {
    props: { achievements, minAchievementDate, highlights }
  }
}

export default Timeline