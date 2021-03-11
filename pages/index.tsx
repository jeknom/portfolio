import styles from '../styles/Home.module.css'
import Head from '../components/Head'
import { getMaintainer, getSkills } from '../lib/data'
import Divider from '../components/Divider'
import Title from '../components/Title'
import Paragraph from '../components/Paragraph'

const renderHeader = (name: string, headline: string, image: string) => {
  return (
    <>
      <img className={styles.profilePicture} src={`data:image/png;base64, ${image}`} alt='Profile picture' />
      <section className={styles.header}>
        <span className={styles.title}>{name}</span>
        <span className={styles.headline}>{headline}</span>
      </section>
    </>
  )
}

const renderIntro = (bio: string) => {
  return (
    <section className={styles.bio}>
      <Title text='Introduction' />
      <Divider />
      <Paragraph text={bio} shouldBoldFirst />
    </section>
  )
}

const renderSkills = (skills: any[]) => {
  const renderSkills = skills.map(skill => 
  <div>
    <h3>{skill.name}</h3>
    <p>{skill.description}</p>
  </div>)

  return (
    <section>
      <Title text='Skills' />
      <Divider />
      {renderSkills}
    </section>
  )
}

export default function Home({ maintainer, skills }) {
  return (
    <div className={styles.root}>
      <Head
        title={maintainer.name}
        description={`${maintainer.name} the ${maintainer.headline}'s portfolio. Check out the latest from the up and coming developer from Helsinki, Finland!`} />
      {renderHeader(maintainer.name, maintainer.headline, maintainer.image)}
      {renderIntro(maintainer.bio)}
      {renderSkills(skills)}
    </div>
  )
}

export async function getServerSideProps(context) {
  const maintainer = await getMaintainer()
  const skills = await getSkills()

  return {
    props: {
     maintainer,
     skills
    }
  }
}