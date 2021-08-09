import { FC, Fragment } from 'react'
import styles from './ContactInformation.module.css'

interface ContactInformationProps {
  information: ContactInformationData[]
}

const ContactInformation: FC<ContactInformationProps> = ({ information }) => {
  const renderInformation = information.map((info, index) => (
    <Fragment key={index}>
      | <a href={info.link} target='_blank'>{info.name}{' '}</a>
    </Fragment>
  ))

  return (
    <p className={styles.layout}>Catch me @ {renderInformation}</p>
  )
}

export default ContactInformation