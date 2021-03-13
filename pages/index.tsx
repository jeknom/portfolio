import { Head } from '../components/Core'
import { getMaintainer, getSkills, getAchievements, MaintainerProps, SkillProps, AchievementProps } from '../lib/data'
import { Header, Intro, Skills, Timeline } from '../components/Home'
import styles from '../styles/Home.module.css'

interface HomeProps {
  maintainer: MaintainerProps,
  skills: SkillProps[],
  achievements: AchievementProps[]
}

export default function Home({ maintainer, skills, achievements }: HomeProps) {
  return (
    <div className={styles.root}>
      <Head
        title={maintainer.name}
        description={`${maintainer.name} the ${maintainer.headline}'s portfolio. Check out the latest from the up and coming developer from Helsinki, Finland!`} />
      <div className={styles.content}>
        <Header name={maintainer.name} headline={maintainer.headline} image={maintainer.image} />
        <br />
        <Intro bio={maintainer.bio} />
        <br />
        <Skills skills={skills} />
        <br />
        <Timeline achievements={achievements} />
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const maintainer: MaintainerProps = await getMaintainer()
  const skills: SkillProps[] = await getSkills()
  const achievements: AchievementProps[] = await getAchievements()

  return {
    props: {
     maintainer,
     skills,
     achievements
    }
  }
}