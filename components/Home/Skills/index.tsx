import { FC } from 'react'
import Skill from './Skill'
import { Title, Divider, ResponsiveLayoutGrid } from '../../Core'
import classNames from 'classnames'

interface SkillsProps {
  skills: SkillData[]
  className?: string
}

const Skills: FC<SkillsProps> = ({ skills, className, ...rest }) => {
  const renderSkills = skills.map((s, index) =>
    <Skill key={index} name={s.name} description={s.description} rank={s.rank} />
  )

  return (
    <section {...rest} className={classNames(className, 'fullWidth')}>
      <Title text='Confidence' />
      <Divider />
      <ResponsiveLayoutGrid>
        {renderSkills}
      </ResponsiveLayoutGrid>
    </section>
  )
}

export default Skills