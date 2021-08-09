import { FC } from 'react'

interface VerticalLineProps {
  height: number,
  className?: string
}

const VerticalLine: FC<VerticalLineProps> = ({ height, className }) => {
  return (
    <span
      className={className}
      style={{ borderRight: '1px solid black', height: `${height}rem` }} />
  )
}

export default VerticalLine