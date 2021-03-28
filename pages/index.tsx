import Link from 'next/link'
import { Head, Button, HorizontalLayout } from '../components/Core'
import {
  getMaintainer,
  getSkills,
  getAchievements,
  getMinAchievementDate,
  getHighlights } from '../lib/data'
import { Header, Intro, Skills, Achievements, Highlights } from '../components/Home'
import styles from '../styles/Home.module.css'

export default function Home({
  maintainer,
  skills,
  achievements,
  highlights }: DataProps) {

  const renderContent = () => {
      return (
        <>
          <Header name={maintainer.name} headline={maintainer.headline} image={maintainer.image} />
          <br />
          <Intro bio={maintainer.bio} />
          <br />
          <Highlights highlights={highlights} />
          <br />
          <Skills skills={skills} />
          <br />
          <Achievements amountToShow={4} achievements={achievements} />
          <br />
          <HorizontalLayout className={styles.timelineLink}>
            <Link href='/Timeline'>
              <Button>See my full story</Button>
            </Link>
          </HorizontalLayout>
        </>
      )
  }

  return (
    <>
      <Head
        title={maintainer.name}
        description={`${maintainer.name} the ${maintainer.headline}'s portfolio. Check out the latest from the up and coming developer from Helsinki, Finland!`} />
      {renderContent()}
    </>
  )
}

export async function getServerSideProps() {
  const maintainer: MaintainerData = await getMaintainer()
  const skills: SkillData[] = await getSkills()
  const achievements: AchievementData[] = await getAchievements()
  const minAchievementDate: MinAchievementDateData = await getMinAchievementDate()
  const highlights: HighlightData[] = await getHighlights()

  return {
    props: { maintainer, skills, achievements, minAchievementDate, highlights }
  }
}