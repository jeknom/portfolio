import { Head } from '../components/Core'
import { getMaintainer, getSkills, MaintainerProps, SkillProps } from '../lib/data'
import { Header, Intro, Skills } from '../components/Home'
import styles from '../styles/Home.module.css'

interface HomeProps {
  maintainer: MaintainerProps,
  skills: SkillProps[]
}

export default function Home({ maintainer, skills }: HomeProps) {
  return (
    <div className={styles.root}>
      <Head
        title={maintainer.name}
        description={`${maintainer.name} the ${maintainer.headline}'s portfolio. Check out the latest from the up and coming developer from Helsinki, Finland!`} />
      <div className={styles.content}>
        <Header name={maintainer.name} headline={maintainer.headline} image={maintainer.image} />
        <Intro bio={maintainer.bio} />
        <Skills skills={skills} />
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const maintainer: MaintainerProps = await getMaintainer()
  const skills: SkillProps[] = await getSkills()

  return {
    props: {
     maintainer,
     skills
    }
  }
}