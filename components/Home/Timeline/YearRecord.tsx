import { Base64Image } from '../../Core'
import { YearRecordProps } from './index'
import { getShortDateOr } from '../../../lib/utils'
import { DATE_NULL_REPLACEMENT } from '../../../lib/constants'
import styles from './timeline.module.css'

export default function YearRecord({ year, achievements, highlights }: YearRecordProps) {
  if (achievements.length === 0 && highlights.length === 0) {
    return null
  }

  const renderAchievements = achievements.map(a => (
    <div className={styles.vertical} key={a.title+a.startDate}>
      <span className={styles.achievement}>
        <span className='primaryText'>{a.title}</span>
        <span className='secondaryText'>{a.subtitle}</span>
        <span className='captionText'>{`${getShortDateOr(a.startDate, DATE_NULL_REPLACEMENT)} - ${getShortDateOr(a.endDate, DATE_NULL_REPLACEMENT)}`}</span>
      </span>
      <Base64Image
        style={{ width: '75px', height: '75px', borderRadius: '12px' }}
        image={a.image}
        alt={`${a.title} image.`}
        hideNull />
    </div>
  ))

  const renderHighlights = highlights.map(h => (
    <p key={h.name+h.date} className={styles.highlight}>
      <b>{h.name}</b>
      <br />
      {h.description}
    </p>
  ))

  return (
    <span className={styles.record}>
      <p>{year}</p>
      {renderAchievements}
      {renderHighlights}
    </span>
  )
}