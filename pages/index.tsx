import { Head, Button, FlatButton } from '../components/Core'
import {
  getMaintainer,
  getSkills,
  getAchievements,
  getHighlights,
  DataProps,
  MaintainerData,
  SkillData,
  AchievementData,
  HighlightData } from '../lib/data'
import { Header, Intro, Skills, Timeline, Achievements } from '../components/Home'
import styles from '../styles/Home.module.css'
import { useState, useRef } from 'react'

export default function Home({ maintainer, skills, achievements, highlights }: DataProps) {
  const [ shouldShowFullTimeline, setShouldShowFullTimeline ] = useState(false)
  const pageTopRef = useRef(null)

  const openTimeline = () => {
    setShouldShowFullTimeline(true)
    pageTopRef.current.scrollIntoView()
  }

  const closeTimeline = () => {
    setShouldShowFullTimeline(false)
    // TODO: Make this scroll to the timelinetop
    pageTopRef.current.scrollIntoView()
  }

  const renderContent = () => {
    if (shouldShowFullTimeline) {
      return (
        <>
          <Timeline
            showFullTimeline={shouldShowFullTimeline}
            achievements={achievements}
            highlights={highlights} />
          <FlatButton
            className={styles.closeButton}
            onClick={closeTimeline}>
            X
          </FlatButton>
        </>
      )
    }
    else {
      return (
        <div className={styles.content}>
          <Header name={maintainer.name} headline={maintainer.headline} image={maintainer.image} />
          <br />
          <Intro bio={maintainer.bio} />
          <br />
          <Skills skills={skills} />
          <br />
          <Achievements amountToShow={4} achievements={achievements} />
          <Button onClick={openTimeline}>Show full</Button>
        </div>
      )
    }
  }

  return (
    <>
      <Head
        title={maintainer.name}
        description={`${maintainer.name} the ${maintainer.headline}'s portfolio. Check out the latest from the up and coming developer from Helsinki, Finland!`} />
      <div ref={pageTopRef} className={styles.root}>
        {renderContent()}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const maintainer: MaintainerData = await getMaintainer()
  const skills: SkillData[] = await getSkills()
  const achievements: AchievementData[] = await getAchievements()
  const highlights: HighlightData[] = await getHighlights()

  return {
    props: { maintainer, skills, achievements, highlights }
  }
}