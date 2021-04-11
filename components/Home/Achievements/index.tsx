import { FC, Fragment } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import { Title, Divider } from '../../Core'
import { getShortDateOr } from '@lib/utils'
import { DATE_NULL_REPLACEMENT } from '@lib/constants'
import styles from './Achievements.module.css'

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
          <Image
            className={styles.achievementImage}
            src={a.image}
            alt={`${a.title} image.`}
            width='75'
            height='75' />
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