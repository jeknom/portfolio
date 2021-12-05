import React, { FC } from "react";
import { Dialog, Paragraph, VerticalLayout } from "components/Core";
import { DialogProps } from "components/Core/Dialog";
import MediaCarousel from "./MediaCarousel";
import styles from "./projects.module.css";

interface ProjectDialogProps {
  selectedProject: Project | null;
}

const ProjectDialog: FC<ProjectDialogProps & DialogProps> = ({
  selectedProject,
  contentProps,
  ...rest
}) => {
  return (
    <Dialog
      {...rest}
      open={selectedProject !== null}
      contentProps={{
        ...contentProps,
        className: styles.dialogContent,
      }}
    >
      <VerticalLayout gap={16} alignItems="center">
        <MediaCarousel project={selectedProject} />
        <Paragraph
          className={styles.paragraph}
          text={selectedProject?.content}
        />
      </VerticalLayout>
    </Dialog>
  );
};

export default ProjectDialog;
