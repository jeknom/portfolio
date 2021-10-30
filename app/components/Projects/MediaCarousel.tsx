import { FC, useState } from "react";
import Image from "next/image";
import { Carousel, VerticalLayout } from "components/Core";
import styles from "./projects.module.css";

interface MediaCarouselProps {
  project?: Project;
}

const MediaCarousel: FC<MediaCarouselProps> = ({ project }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!project || project.media.length === 0) {
    return null;
  }

  const carouselItems = project.media.map((media, index) => {
    if (media.type === "youtubeVideo") {
      return (
        <div key={index} className={styles.youtubeIframeContainer}>
          <iframe
            key={index}
            className={styles.youtubeIframe}
            src={media.url}
            title={project.name}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      );
    } else if (media.type === "image") {
      return (
        <Image
          key={index}
          width={1920}
          height={1080}
          src={media.url}
          alt={`${project.name} image`}
        />
      );
    }

    console.error("Unsupported file type!");

    return <p className="secondaryText">Unsupported file type.</p>;
  });

  return (
    <VerticalLayout className={styles.carouselRoot}>
      <Carousel currentIndex={currentIndex} onChangeIndex={setCurrentIndex}>
        {carouselItems}
      </Carousel>
    </VerticalLayout>
  );
};

export default MediaCarousel;
