import { FC } from 'react'
import Image from 'next/image'
import { HorizontalLayout, VerticalLayout, Paragraph } from '../Core'
import { YearRecordProps } from './index'
import { getShortDateOr } from '../../lib/utils'
import { DATE_NULL_REPLACEMENT } from '../../lib/constants'
import styles from './Timeline.module.css'

const YearRecord: FC<YearRecordProps> = ({ year, achievements, highlights }) => {
  if (achievements.length === 0 && highlights.length === 0) {
    return null
  }

  const renderAchievements = achievements.map(a => (
    <HorizontalLayout key={a.title+a.startDate} className='fullWidth'>
      <VerticalLayout className={styles.entry}>
        <span className='primaryText'>{a.title}</span>
        <span className='secondaryText'>{a.subtitle}</span>
        <span className='captionText'>{`${getShortDateOr(a.startDate, DATE_NULL_REPLACEMENT)} - ${getShortDateOr(a.endDate, DATE_NULL_REPLACEMENT)}`}</span>
      </VerticalLayout>
      <Image
        className={styles.achievementImage}
        width='75'
        height='75'
        src={a.image}
        alt={`${a.title} image.`}
        layout='fixed' />
    </HorizontalLayout>
  ))

  const renderHighlights = highlights.map((h, index) => (
    <div key={index} className={styles.entry}>
      <b className='subtitle'>{h.name}</b>
      <Paragraph text={h.description} />
    </div>
  ))

  return (
    <span className='fullWidth'>
      <p>{year}</p>
      {renderAchievements}
      {renderHighlights}
    </span>
  )
}

export default YearRecord