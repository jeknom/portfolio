import ReactMarkdown from 'react-markdown'

interface ParagraphProps {
  text: string,
  shouldBoldFirst: boolean
}

export default function index({text}: ParagraphProps) {
  return (
    <ReactMarkdown>{text}</ReactMarkdown>
  );
}