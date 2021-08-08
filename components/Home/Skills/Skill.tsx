import { Paragraph } from '../../Core'
import styles from './skill.module.css'

export default function Skill({ name, score }: SkillData) {
  const getColorForScore = (rank: number) => {
    switch (rank) {
      case 5:
        return '#f3c98a'
      case 4:
        return '#e767f8'
      case 3:
        return '#679af8'
      case 2:
        return '#01e01f'
      case 1:
        return '#818181'
    }
  }

  return (
    <div className={styles.root}>
      <span>
        <p className={styles.title}><span className='subtitle'>{name}</span></p>
      </span>
      <span className={styles.rank} style={{ backgroundColor: getColorForScore(score) }}>
        {score * 20}
        <span className={styles.rankTooltipText}>Confidence score</span>
      </span>
    </div>
  )
}