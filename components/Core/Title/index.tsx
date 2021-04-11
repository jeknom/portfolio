import { FC } from 'react'

interface TitleProps {
  text: string
}

const Title: FC<TitleProps> = ({ text }) => {
  return (
    <h3 className='primaryText'>{text}</h3>
  )
}

export default Title