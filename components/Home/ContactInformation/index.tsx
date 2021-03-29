import { FC } from 'react'
import { HorizontalLayout } from '../../Core'
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
    <HorizontalLayout className={styles.layout}><p>Contact me </p>{renderInformation}</HorizontalLayout>
  )
}

export default ContactInformation