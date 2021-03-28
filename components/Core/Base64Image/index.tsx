import { FC, ImgHTMLAttributes } from 'react'

interface Base64ImageProps {
  image: string,
  alt: string,
  hideNull: boolean, 
  className?: any,
  style?: object
}

const Base64Image: FC<Base64ImageProps & ImgHTMLAttributes<HTMLElement>> =
  ({ image, alt, hideNull, className, style }) => {
  if (!image && hideNull) {
    return null
  }

  return (
    <img
      className={className}
      style={style}
      src={`data:image/png;base64,${image}`}
      alt={alt} />
  )
}

export default Base64Image