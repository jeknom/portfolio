import React, { FC } from "react";
import { Dialog, Paragraph } from "components/Core";
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
      <MediaCarousel project={selectedProject} />
      <Paragraph className={styles.paragraph} text={selectedProject?.content} />
    </Dialog>
  );
};

export default ProjectDialog;
