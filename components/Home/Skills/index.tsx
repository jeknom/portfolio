import { useState } from 'react'
import Skill from './Skill'
import { SkillProps } from '../../../lib/data'
import { Title, Divider, Button } from '../../Core'

interface SkillsProps {
  skills: SkillProps[]
}

const SKILLS_TO_SHOW = 5;

export default function index({ skills }: SkillsProps) {
  const [shouldShowAllSkills, setShouldShowAllSkills] = useState(false)
  const toggleShouldShowAllSkills = () => setShouldShowAllSkills(!shouldShowAllSkills)
  const skillsToRender = shouldShowAllSkills ?  skills : skills.slice(0, SKILLS_TO_SHOW)
  const renderSkills = skillsToRender.map((s, index) =>
    <Skill key={index} name={s.name} description={s.description} rank={s.rank} image={s.image} />
  )

  return (
    <section>
      <Title text='Skills' />
      <Divider />
      {renderSkills}
      <Button onClick={toggleShouldShowAllSkills}>{shouldShowAllSkills ? 'Show less' : 'Show all'}</Button>
    </section>
  )
}