import { FC } from 'react'
import Image from 'next/image'
import { getAchievements, getMinAchievementDate, getHighlights, getOpenGraphData } from '../lib/data'
import { Head, FlatButton } from '../components/Core'
import TimelineComponent from '../components/Timeline'
import styles from '../styles/Timeline.module.css'

interface TimelineProps {
  achievements: AchievementData[],
  minAchievementDate: MinAchievementDateData,
  highlights: HighlightData[],
  openGraphData: OpenGraphData
}

const Timeline: FC<TimelineProps> = ({
  achievements,
  minAchievementDate,
  highlights,
  openGraphData }) => {
  return (
    <>
      <Head
        title={openGraphData.title}
        description={openGraphData.description}
        type={openGraphData.type}
        imagePath={openGraphData.image} />
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
  const result = await Promise.all([
    getAchievements(),
    getMinAchievementDate(),
    getHighlights(),
    getOpenGraphData()])
  const achievements = result[0]
  const minAchievementDate = result[1]
  const highlights = result[2]
  const openGraphData = result[3]

  return {
    props: { achievements, minAchievementDate, highlights, openGraphData }
  }
}

export default Timeline