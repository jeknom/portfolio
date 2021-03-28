import React, { FC, useState } from 'react'
import { FlatButton, VerticalLayout, HorizontalLayout } from '../'
import styles from './Carousel.module.css'

interface CarouselProps {
  children: React.ReactNode[]
}


const Carousel: FC<CarouselProps> = ({ children }) => {
  const [ currentIndex, setCurrentIndex ] = useState<number>(0)
  const prevItem = () => {
    if (children.length < 2) {
      return
    }

    if (currentIndex === 0) {
      setCurrentIndex(children.length - 1)
    } else {
      setCurrentIndex(currentIndex - 1)
    }
  }
  const nextItem = () => {
    if (children.length < 2) {
      return
    }

    const isLastIndex = currentIndex === children.length - 1

    if (isLastIndex) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <VerticalLayout>
      {children[currentIndex]}
      <HorizontalLayout className={styles.actions}>
        <FlatButton onClick={prevItem}>{'<'}</FlatButton>
        <p className='secondaryText'>{currentIndex + 1} / {children.length}</p>
        <FlatButton onClick={nextItem}>{'>'}</FlatButton>
      </HorizontalLayout>
    </VerticalLayout>
  )
}

export default Carousel