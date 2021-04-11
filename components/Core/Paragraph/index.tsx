import { FC } from 'react'
import ReactMarkdown from 'react-markdown/with-html'

interface ParagraphProps {
  text: string
}

const Paragraph: FC<ParagraphProps> = ({ text }) => {
  return (
    <ReactMarkdown
      allowDangerousHtml
      className='secondaryText'>{text}</ReactMarkdown>
  );
}

export default Paragraph