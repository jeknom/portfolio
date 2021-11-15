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
  let icon: ReactNode | null = null;
  let text: ReactNode | null = null;
  let actions: ReactNode | null = null;
  const restChildren: ReactNode[] = [];

  Children.forEach(children, (child: { type?: { displayName?: string } }) => {
    const type = child?.type?.displayName || "";

    switch (type) {
      case "ListItemIcon":
        icon = child;
        break;
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
      gap={8}
    >
      <HorizontalLayout alignItems="center" justifyContent="center" gap={8}>
        {icon}
        {text}
      </HorizontalLayout>
      {restChildren}
      {actions}
    </HorizontalLayout>
  );
};

export default ListItem;
