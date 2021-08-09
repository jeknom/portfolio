import { FC } from 'react';
import ReactMarkdown from 'react-markdown';

interface ParagraphProps {
  text: string
}

const Paragraph: FC<ParagraphProps> = ({ text }) => {
  return (
    <ReactMarkdown className='secondaryText'>{text}</ReactMarkdown>
  );
}

export default Paragraph