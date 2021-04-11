import { FC, Fragment } from 'react'
import { Title, Divider, Base64Image } from '../../Core'
import { getShortDateOr } from '@lib/utils'
import { DATE_NULL_REPLACEMENT } from '@lib/constants'
import styles from './Achievements.module.css'
import classNames from 'classnames'

interface AchievementProps {
  amountToShow: number,
  achievements: AchievementData[],
  className?: string
}

const Achievements: FC<AchievementProps> = ({ amountToShow, achievements, className, ...rest }) => {
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
    <section {...rest} className={classNames(className, 'fullWidth')}>
      <Title text='Experience' />
      <Divider />
      {renderAchievements}
    </section>
  )
}

export default Achievements