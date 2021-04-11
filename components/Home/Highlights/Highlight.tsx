import { FC } from 'react'
import Image from 'next/image'
import { Paragraph, HorizontalLayout } from '../../Core'
import styles from './Highlights.module.css'

interface HighlightProps {
  title: string,
  description: string,
  image: string | null,
}

const Highlight: FC<HighlightProps> = ({ title, description, image }) => {
  const renderImage = image === null ? null : (
    <Image
      className={styles.image}
      src={image}
      alt={`${title} image.`}
      height='75'
      width='75' />
  )

  return (
    <HorizontalLayout className={styles.highlightroot}>
      <span>
          <p className='subtitle'>{title}</p>
          <Paragraph text={description} />
        </span>
      {renderImage}
    </HorizontalLayout>
  )
}

export default Highlight