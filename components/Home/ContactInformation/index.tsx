import { FC } from 'react'
import { ResponsiveLayoutGrid } from '../../Core'
import styles from './ContactInformation.module.css'

interface ContactInformationProps {
  information: ContactInformationData[]
}

const ContactInformation: FC<ContactInformationProps> = ({ information }) => {
  const renderInformation = information.map(info => (
    <p key={info.name}>
      <a href={info.link} target='_blank'>
        {info.name}
      </a>
    </p>
  ))

  return (
    <ResponsiveLayoutGrid className={styles.layout}><p>Contact me </p>{renderInformation}</ResponsiveLayoutGrid>
  )
}

export default ContactInformation