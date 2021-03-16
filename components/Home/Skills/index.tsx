import { useState } from 'react'
import Skill from './Skill'
import { SkillData } from '../../../lib/data'
import { Title, Divider, Button } from '../../Core'

interface SkillsProps {
  skills: SkillData[]
}

const SKILLS_TO_SHOW = 3;

export default function Skills({ skills }: SkillsProps) {
  const [shouldShowAllSkills, setShouldShowAllSkills] = useState(false)
  const toggleShouldShowAllSkills = () => setShouldShowAllSkills(!shouldShowAllSkills)
  const renderCount = Math.min(skills.length, SKILLS_TO_SHOW)
  const skillsToRender = shouldShowAllSkills ?  skills : skills.slice(0, renderCount)
  const renderSkills = skillsToRender.map((s, index) =>
    <Skill key={index} name={s.name} description={s.description} rank={s.rank} />
  )
  const toggleShowButton = renderCount < skills.length ?
    <Button onClick={toggleShouldShowAllSkills}>{shouldShowAllSkills ? 'Show less' : 'Show all'}</Button> :
    null

  return (
    <section>
      <Title text='Skills' />
      <Divider />
      {renderSkills}
      {toggleShowButton}
    </section>
  )
}