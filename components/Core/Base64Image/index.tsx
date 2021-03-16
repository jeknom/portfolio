interface Base64ImageProps {
  image: string,
  alt: string,
  hideNull: boolean, 
  className?: any,
  style?: object
}

export default function Base64Image({ image, alt, hideNull, className, style }: Base64ImageProps) {
  if (!image && hideNull) {
    return null
  }

  return (
    <img className={className} style={style} src={`data:image/png;base64, ${image}`} alt={alt} />
  )
}