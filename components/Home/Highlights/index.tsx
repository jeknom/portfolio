import React, { FC } from 'react'
import { Title, Divider, Carousel } from '../../Core'
import Highlight from './Highlight'

interface HighlightsProps {
  highlights: HighlightData[]
}

const HIGHLIGHTS_TO_RENDER: number = 4

const Highlights: FC<HighlightsProps> = ({ highlights }) => {
  const highlightsToRender = highlights.length > HIGHLIGHTS_TO_RENDER ?
    highlights.slice(0, HIGHLIGHTS_TO_RENDER) :
    highlights
  const renderHighlights = highlightsToRender.map((h, index) =>
    <Highlight
      key={index}
      title={h.name}
      description={h.description}
      image={h.image} />
  )

  renderHighlights.push(
    <Highlight
      key={'seemore'}
      title='Wish to see more?'
      description='Check out my full story at the bottom of the page!'
      image={null} />
  )
  
  return (
    <section className='fullWidth'>
      <Title text='Highlights' />
      <Divider />
      <Carousel>
        {renderHighlights}
      </Carousel>
    </section>
  )
}

export default Highlights