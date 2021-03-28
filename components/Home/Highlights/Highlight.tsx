import { FC } from 'react'
import { Paragraph, HorizontalLayout, Base64Image } from '../../Core'
import styles from './Highlights.module.css'

interface HighlightProps {
  title: string,
  description: string,
  image: string | null,
}

const Highlight: FC<HighlightProps> = ({ title, description, image }) => {

  return (
    <HorizontalLayout className={styles.highlightroot}>
      <span>
          <p className='subtitle'>{title}</p>
          <Paragraph text={description} />
        </span>
      <Base64Image
        className={styles.image}
        image={image}
        alt={`${title} image.`}
        hideNull />
    </HorizontalLayout>
  )
}

export default Highlight