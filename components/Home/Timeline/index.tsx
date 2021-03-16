import { Fragment } from 'react'
import { VerticalLine } from '../../Core'
import { AchievementData, HighlightData } from '../../../lib/data'
import styles from './timeline.module.css'
import YearRecord from './YearRecord'

const YEARS_TO_RENDER_ON_TIMELINE = 10

export interface YearRecordProps {
  year: number,
  achievements: AchievementData[],
  highlights: HighlightData[]
}

interface TimelineProps {
  showFullTimeline: boolean,
  achievements: AchievementData[],
  highlights: HighlightData[]
}

export default function Timeline({ achievements, highlights }: TimelineProps) {
  const renderTimeline = () => {
    const yearRecords = []
    const currentYear = new Date().getFullYear()
    const lastYearToRender = currentYear - YEARS_TO_RENDER_ON_TIMELINE
    
    for (let i = currentYear; i > lastYearToRender; i--) {
      const isSameYear = (date: string | number | Date, year: number) => new Date(date).getFullYear() === year
      const yearsAchievements = achievements.filter(a => isSameYear(a.startDate, i))
      const yearsHighlights = highlights.filter(h => isSameYear(h.date, i))
      const componentToRender = (
        <Fragment key={i}>
          {i !== currentYear && i !== lastYearToRender + 1 ? <VerticalLine height={18} /> : null}
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
    <section>
      {renderTimeline()}
    </section>
  )
}