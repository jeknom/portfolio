interface TitleProps {
  text: string
}

export default function Title({ text }: TitleProps) {
  return (
    <h3 className='primaryText'>{text}</h3>
  )
}