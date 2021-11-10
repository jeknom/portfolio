import { FC, Children, HTMLProps } from "react";
import classNames from "classnames";
import VerticalLayout from "../VerticalLayout";
import styles from "./list.module.css";

interface ListProps {}

const List: FC<ListProps & HTMLProps<HTMLUListElement>> = ({
  children,
  className,
  ...rest
}) => {
  const items: React.ReactNode[] = [];
  Children.map(children, (child, index) =>
    items.push(
      <li key={index}>
        <VerticalLayout alignItems="center" justifyContent="center">
          {child}
        </VerticalLayout>
      </li>
    )
  );

  return (
    <ul {...rest} className={classNames(className, styles.list)}>
      {items}
    </ul>
  );
};

export default List;
