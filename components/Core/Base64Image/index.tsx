interface Base64ImageProps {
  image: string,
  alt: string,
  hideNull: boolean, 
  className?: any
}

export default function Base64Image({ image, alt, hideNull, className }: Base64ImageProps) {
  if (!image && hideNull) {
    return null
  }

  return (
    <img className={className} src={`data:image/png;base64, ${image}`} alt={alt} />
  )
}