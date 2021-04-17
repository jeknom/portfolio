import { FC } from 'react'
import { Paragraph } from '../../Core'

interface IntroProps {
  bio: string,
  className?: string
}

const Intro: FC<IntroProps> = ({ bio, className, ...rest }) => {
  return (
    <section {...rest} className={className}>
      <Paragraph text={bio} />
    </section>
  )
}

export default Intro