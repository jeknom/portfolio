interface VerticalLineProps {
  height: number,
  className?: any
}

export default function VerticalLine({ height, className } : VerticalLineProps) {
  return (
    <span
      className={className}
      style={{ borderRight: '1px solid black', height: `${height}rem` }} />
  )
}