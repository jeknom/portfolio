import { FC } from 'react'
import Image from 'next/image'
import { Paragraph, HorizontalLayout, VerticalLayout } from '../../Core'
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
      layout='fixed'
      height='75'
      width='75' />
  )

  return (
    <HorizontalLayout className={styles.highlightroot}>
      <VerticalLayout>
        <p className='subtitle'>{title}</p>
        <Paragraph text={description} />
      </VerticalLayout>
      <VerticalLayout className={styles.imageContainer}>
        {renderImage}
      </VerticalLayout>
    </HorizontalLayout>
  )
}

export default Highlight