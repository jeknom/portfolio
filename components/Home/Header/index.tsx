import { FC } from 'react'
import classNames from 'classnames'
import { Base64Image } from '../../Core'
import styles from '@styles/Home.module.css'

interface HeaderProps {
  name: string,
  headline: string,
  image: string,
  className?: string
}

const Header: FC<HeaderProps> = ({ name, headline, image, className, ...rest }) => {
  return (
    <section {...rest} className={classNames(styles.header, className)}>
      <Base64Image className={styles.profilePicture} image={image} alt='Profile picture' hideNull={false} />
      <span className='primaryText'>{name}</span>
      <span className='subtitle'>{headline}</span>
    </section>
  )
}

export default Header