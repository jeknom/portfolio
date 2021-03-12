import { SkillProps } from '../../../lib/data'
import { Paragraph } from '../../Core'
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

  const skillIconToRender = image ? (
    <img
      className={styles.icon}
      src={`data:image/png;base64, ${image}`}
      alt={`${name} skill icon.`} />
  ) : null

  return (
    <div>
      <p className={styles.header}>
        <span className={styles.nameIconContainer}>{skillIconToRender}{name}</span>
        <span className={styles.rank} style={{ backgroundColor: getColorForRank(rank) }}>
          {rank * 20}
          <span className={styles.rankTooltipText}>Confidence score</span>      
        </span>
      </p>
      <Paragraph text={description} />
    </div>
  )
}