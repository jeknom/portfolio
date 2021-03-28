import Skill from './Skill'
import { Title, Divider, ResponsiveLayoutGrid } from '../../Core'

interface SkillsProps {
  skills: SkillData[]
}

export default function Skills({ skills }: SkillsProps) {
  const renderSkills = skills.map((s, index) =>
    <Skill key={index} name={s.name} description={s.description} rank={s.rank} />
  )

  return (
    <section className='fullWidth'>
      <Title text='Confidence' />
      <Divider />
      <ResponsiveLayoutGrid>
        {renderSkills}
      </ResponsiveLayoutGrid>
    </section>
  )
}