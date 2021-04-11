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
import styles from '@styles/Home.module.css'

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
          <Header
            className={styles.section}
            name={maintainer.name}
            headline={maintainer.headline}
            image={maintainer.image} />
          <Intro className={styles.section} bio={maintainer.bio} />
          <Highlights className={styles.section} highlights={highlights} />
          <Skills className={styles.section} skills={skills} />
          <Achievements className={styles.section} amountToShow={4} achievements={achievements} />
          <HorizontalLayout className={styles.timelineLink}>
            <a href='/Timeline'>
              <Button>See my full story</Button>
            </a>
          </HorizontalLayout>
          <footer>
            <ContactInformation information={contactInformation} />
          </footer>
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
  const result = await Promise.all([
    getMaintainer(),
    getSkills(),
    getAchievements(),
    getMinAchievementDate(),
    getHighlights(),
    getContactInformation()
  ])

  const maintainer: MaintainerData = result[0]
  const skills: SkillData[] = result[1]
  const achievements: AchievementData[] = result[2]
  const minAchievementDate: MinAchievementDateData = result[3]
  const highlights: HighlightData[] = result[4]
  const contactInformation: ContactInformationData[] = result[5]

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