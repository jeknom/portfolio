import { Title, Divider, Base64Image } from '../../Core'
import { getShortDateOr } from '../../../lib/utils'
import styles from './Achievements.module.css'
import { DATE_NULL_REPLACEMENT } from '../../../lib/constants'
import { Fragment } from 'react'

interface AchievementProps {
  amountToShow: number,
  achievements: AchievementData[]
}

export default function Achievements({ amountToShow, achievements }: AchievementProps) {
  const actualAmountToShow = Math.min(achievements.length, amountToShow)
  const renderAchievements = achievements.slice(0, actualAmountToShow).map(a => (
      <Fragment key={a.title+a.subtitle+a.endDate}>
        <div className={styles.achievement}>
          <span className={styles.info}>
            <p className='subtitle'>{a.title}</p>
            <span className='secondaryText'>{a.subtitle}</span>
            <span className='secondaryText'>
              {getShortDateOr(a.startDate, DATE_NULL_REPLACEMENT)} - {getShortDateOr(a.endDate, DATE_NULL_REPLACEMENT)}
            </span>
          </span>
          <Base64Image
            style={{ height: '75px', width: '75px', borderRadius: '12px' }}
            image={a.image}
            alt={`${a.title} image.`}
            hideNull />
        </div>
        <br />
      </Fragment>
    )
  )

  return (
    <section className='fullWidth'>
      <Title text='Experience' />
      <Divider />
      {renderAchievements}
    </section>
  )
}