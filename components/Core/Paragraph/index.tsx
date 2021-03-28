import ReactMarkdown from 'react-markdown/with-html'

interface ParagraphProps {
  text: string
}

export default function Paragraph({ text, allowDangerousHtml }: ParagraphProps) {
  return (
    <ReactMarkdown
      allowDangerousHtml
      className='secondaryText'>{text}</ReactMarkdown>
  );
}