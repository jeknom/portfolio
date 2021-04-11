import { FC } from 'react'
import classNames from 'classnames'
import { Paragraph } from '../../Core'
import styles from '../../../styles/Home.module.css'

interface IntroProps {
  bio: string,
  className?: string
}

const Intro: FC<IntroProps> = ({ bio, className, ...rest }) => {
  return (
    <section {...rest} className={classNames(className, styles.bio)}>
      <Paragraph text={bio} />
    </section>
  )
}

export default Intro