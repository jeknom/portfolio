import React, { FC } from "react";
import {
  Button,
  HorizontalLayout,
  Paragraph,
  VerticalLayout,
} from "components/Core";
import styles from "./Timeline.module.css";

interface SmallItemProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onItemClick: () => void;
  };
}

const SmallItem: FC<SmallItemProps> = ({ title, description, action }) => {
  if (action) {
    console.log("Project");
  }
  return (
    <VerticalLayout className={styles.entry}>
      <b className="subtitle">{title}</b>
      <Paragraph text={description} />
      <HorizontalLayout alignItems="center">
        {action && <Button onClick={action.onItemClick}>{action.label}</Button>}
      </HorizontalLayout>
    </VerticalLayout>
  );
};

export default SmallItem;
