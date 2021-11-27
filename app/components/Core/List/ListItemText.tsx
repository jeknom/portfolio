import { FC } from "react";

interface ListItemTextProps {
  primary?: string;
  secondary?: string;
}

const ListItemText: FC<ListItemTextProps> = ({ primary, secondary }) => {
  return (
    <div>
      {primary && <p className="secondaryText">{primary}</p>}
      {secondary && <p className="captionText">{secondary}</p>}
    </div>
  );
};

ListItemText.displayName = "ListItemText";

export default ListItemText;
