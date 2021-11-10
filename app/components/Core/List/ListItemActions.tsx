import { FC, HTMLProps } from "react";
import HorizontalLayout from "../HorizontalLayout";

interface ListItemActionsProps {}

const ListItemActions: FC<ListItemActionsProps & HTMLProps<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  return (
    <HorizontalLayout
      {...rest}
      gap={8}
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </HorizontalLayout>
  );
};

ListItemActions.displayName = "ListItemActions";

export default ListItemActions;
