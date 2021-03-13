import { SkillProps } from '../../../lib/data'
import { Paragraph, Base64Image } from '../../Core'
import styles from './skill.module.css'

export default function index({ name, description, rank, image }: SkillProps) {
  const getColorForRank = (rank: number) => {
    switch (rank) {
      case 5:
        return '#f3c98a'
      case 4:
        return '#e767f8'
      case 3:
        return '#679af8'
      case 2:
        return '#73f867'
      case 1:
        return '#818181'
    }
  }

  return (
    <div>
      <p className={styles.header}>
        <span className={styles.nameIconContainer}>
          <Base64Image image={image} alt={`${name} skill icon.`} className={styles.icon} hideNull />
          <span className='subtitle'>{name}</span>
        </span>
        <span className={styles.rank} style={{ backgroundColor: getColorForRank(rank) }}>
          {rank * 20}
          <span className={styles.rankTooltipText}>Confidence score</span>      
        </span>
      </p>
      <Paragraph text={description} />
    </div>
  )
}