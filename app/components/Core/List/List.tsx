import { FC } from "react";

interface ListProps {}

const List: FC<ListProps> = ({ children }) => {
  return (
    <>
      <ul>{children}</ul>
      <style jsx>{`
        ul {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default List;
