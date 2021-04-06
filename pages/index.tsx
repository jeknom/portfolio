import { FC } from 'react'
import { Head, Button, HorizontalLayout } from '../components/Core'
import {
  getMaintainer,
  getSkills,
  getAchievements,
  getMinAchievementDate,
  getHighlights,
  getContactInformation } from '../lib/data'
import {
  Header,
  Intro,
  Skills,
  Achievements,
  Highlights, 
  ContactInformation } from '../components/Home'
import styles from '../styles/Home.module.css'

const Home: FC<DataProps> = ({
  maintainer,
  skills,
  achievements,
  highlights,
  contactInformation
  }) => {

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
            <a href='/Timeline'>
              <Button>See my full story</Button>
            </a>
          </HorizontalLayout>
          <br />
          <ContactInformation information={contactInformation} />
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
  const contactInformation: ContactInformationData[] = await getContactInformation()

  return {
    props: {
      maintainer,
      skills,
      achievements,
      minAchievementDate,
      highlights,
      contactInformation
    }
  }
}

export default Home