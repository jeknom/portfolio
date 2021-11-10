import { FC, HTMLProps, ReactNode, Children } from "react";
import HorizontalLayout from "../HorizontalLayout";
import classNames from "classnames";
import styles from "./list.module.css";

interface ListItemProps {}

const ListItem: FC<ListItemProps & HTMLProps<HTMLDivElement>> = ({
  className,
  children,
  ...rest
}) => {
  let text: ReactNode | null = null;
  let actions: ReactNode | null = null;
  const restChildren: ReactNode[] = [];

  Children.forEach(children, (child: { type?: { displayName?: string } }) => {
    const type = child?.type?.displayName || "";

    switch (type) {
      case "ListItemText":
        text = child;
        break;
      case "ListItemActions":
        actions = child;
        break;
      default:
        restChildren.push(child);
        break;
    }
  });

  return (
    <HorizontalLayout
      {...rest}
      className={classNames(className, styles.listItem)}
      alignItems="center"
      justifyContent="space-between"
    >
      {text}
      {restChildren}
      {actions}
    </HorizontalLayout>
  );
};

export default ListItem;
