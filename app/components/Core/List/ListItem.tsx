import { FC, ReactNode } from "react";
import { HorizontalLayout, VerticalLayout } from "..";

interface ListItemProps {
  icon?: ReactNode;
  primary: string;
  secondary: string;
}

const ListItem: FC<ListItemProps> = ({ icon, primary, secondary }) => {
  return (
    <>
      <li>
        <HorizontalLayout gap={16} alignItems="center">
          {icon || null}
          <VerticalLayout>
            <h3 className="primaryText">{primary}</h3>
            <span className="secondaryText">{secondary}</span>
          </VerticalLayout>
        </HorizontalLayout>
      </li>
      <style jsx>{`
        li {
          width: 100%;
          margin-bottom: 12px;
          padding: 0px 12px 12px 12px;
          border: 1px solid rgb(241, 241, 241);
          border-radius: 8px;
          list-style-type: none;
          box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px,
            rgba(17, 17, 26, 0.05) 0px 8px 32px;
        }
      `}</style>
    </>
  );
};

export default ListItem;
