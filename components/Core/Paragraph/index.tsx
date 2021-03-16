import ReactMarkdown from 'react-markdown'

interface ParagraphProps {
  text: string
}

export default function Paragraph({text}: ParagraphProps) {
  return (
    <ReactMarkdown className='secondaryText'>{text}</ReactMarkdown>
  );
}