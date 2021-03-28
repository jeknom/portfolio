import { Fragment } from 'react'
import { Base64Image, HorizontalLayout, VerticalLayout, Paragraph } from '../Core'
import { YearRecordProps } from './index'
import { getShortDateOr } from '../../lib/utils'
import { DATE_NULL_REPLACEMENT } from '../../lib/constants'
import styles from './Timeline.module.css'

export default function YearRecord({ year, achievements, highlights }: YearRecordProps) {
  if (achievements.length === 0 && highlights.length === 0) {
    return null
  }

  const renderAchievements = achievements.map(a => (
    <HorizontalLayout key={a.title+a.startDate} className='fullWidth'>
      <VerticalLayout className={styles.achievement}>
        <span className='primaryText'>{a.title}</span>
        <span className='secondaryText'>{a.subtitle}</span>
        <span className='captionText'>{`${getShortDateOr(a.startDate, DATE_NULL_REPLACEMENT)} - ${getShortDateOr(a.endDate, DATE_NULL_REPLACEMENT)}`}</span>
      </VerticalLayout>
      <Base64Image
        style={{ width: '75px', height: '75px', borderRadius: '12px' }}
        image={a.image}
        alt={`${a.title} image.`}
        hideNull />
    </HorizontalLayout>
  ))

  const renderHighlights = highlights.map((h, index) => (
    <Fragment key={index}>
      <b className='subtitle'>{h.name}</b>
      <Paragraph text={h.description} />
    </Fragment>
  ))

  return (
    <span className='fullWidth'>
      <p>{year}</p>
      {renderAchievements}
      {renderHighlights}
    </span>
  )
}