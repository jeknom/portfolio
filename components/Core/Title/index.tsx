interface TitleProps {
  text: string
}

export default function index({ text }: TitleProps) {
  return (
    <h3 className='primaryText'>{text}</h3>
  )
}