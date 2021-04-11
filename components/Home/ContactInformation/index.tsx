import { FC } from 'react'
import { VerticalLayout } from '../../Core'
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
    <VerticalLayout className={styles.layout}><p>Catch me @</p>{renderInformation}</VerticalLayout>
  )
}

export default ContactInformation