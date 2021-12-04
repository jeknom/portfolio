import { FC } from "react";
import Image from "next/image";
import styles from "./ContactInformation.module.css";

interface ContactInformationProps {
  information?: ContactInformation[];
}

const ContactInformation: FC<ContactInformationProps> = ({ information }) => {
  if (!information) {
    return <p className="subtitle">Loading...</p>;
  }

  const renderInformation = information.map((info, index) => {
    if (info.imageUrl) {
      return (
        <a key={index} href={info.link} target="_blank">
          <div className={styles.imageContainer}>
            <Image
              className={styles.image}
              src={info.imageUrl}
              alt={`${info.name} icon`}
              width={32}
              height={32}
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </a>
      );
    }

    return (
      <p key={index}>
        <a href={info.link} target="_blank">
          {info.name}{" "}
        </a>
      </p>
    );
  });

  return <footer className={styles.contactRoot}>{renderInformation}</footer>;
};

export default ContactInformation;
