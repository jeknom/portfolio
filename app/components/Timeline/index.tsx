import { Fragment } from 'react'
import { VerticalLine } from '../Core'
import styles from './Timeline.module.css'
import YearRecord from './YearRecord'

export interface YearRecordProps {
  year: number,
  achievements: AchievementData[],
  highlights: HighlightData[]
}

interface TimelineProps {
  achievements: AchievementData[],
  minAchievementDate: MinAchievementDateData,
  highlights: HighlightData[]
}

export default function Timeline({ achievements, minAchievementDate, highlights }: TimelineProps) {
  const renderTimeline = () => {
    const yearRecords = []
    const currentYear = new Date().getFullYear()
    const minAchievementYear = new Date(minAchievementDate.min).getFullYear()
    const lastYearToRender = currentYear - (currentYear - minAchievementYear)
    
    for (let i = currentYear; i >= lastYearToRender; i--) {
      const isSameYear = (date: string | number | Date, year: number) => new Date(date).getFullYear() === year
      const yearsAchievements = achievements.filter(a => isSameYear(a.startDate, i))
      const yearsHighlights = highlights.filter(h => isSameYear(h.date, i))
      const componentToRender = (
        <Fragment key={i}>
          {i !== currentYear && i !== lastYearToRender + 1 ? <VerticalLine height={8} /> : null}
          <YearRecord key={i} year={i} achievements={yearsAchievements} highlights={yearsHighlights} />
        </Fragment>
      )

      yearRecords.push(componentToRender)
    }

    return (
      <div className={styles.timelineContent}>{yearRecords}</div>
    )
  }

  return (
    <section className='fullWidth'>
      {renderTimeline()}
    </section>
  )
}