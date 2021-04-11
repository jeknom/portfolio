import React, { FC, useState, Children } from 'react'
import { FlatButton, VerticalLayout, HorizontalLayout } from '../'
import styles from './Carousel.module.css'

const Carousel: FC = ({ children }) => {
  const [ currentIndex, setCurrentIndex ] = useState<number>(0)
  const childrenCount = Children.count(children);
  const prevItem = () => {
    if (childrenCount < 2) {
      return
    }

    if (currentIndex === 0) {
      setCurrentIndex(childrenCount - 1)
    } else {
      setCurrentIndex(currentIndex - 1)
    }
  }
  const nextItem = () => {
    if (childrenCount < 2) {
      return
    }

    const isLastIndex = currentIndex === childrenCount - 1

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
        <FlatButton onClick={prevItem}><img src='/arrow-left.svg' alt='Previous carousel item icon.' /></FlatButton>
        <p className='secondaryText'>{currentIndex + 1} / {childrenCount}</p>
        <FlatButton onClick={nextItem}><img src='/arrow-right.svg' alt='Next carousel item icon.' /></FlatButton>
      </HorizontalLayout>
    </VerticalLayout>
  )
}

export default Carousel