import { FC } from 'react'
import classNames from 'classnames'
import Image from 'next/image'
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
      <span className={styles.profilePictureContainer}>
        <Image className={styles.profilePicture} src={image} alt='Profile picture' height='256' width='256' priority />
      </span>
      <span className='primaryText'>{name}</span>
      <span className='subtitle'>{headline}</span>
    </section>
  )
}

export default Header