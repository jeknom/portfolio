import { FC, ChangeEvent } from "react";
import { VerticalLayout, TextField, TextArea } from "components/Core";

interface EditProps {
  titleText: string;
  contentText: string;
  onChangeTitle: (title: string) => void;
  onChangeContent: (content: string) => void;
}

const Edit: FC<EditProps> = ({
  titleText,
  contentText,
  onChangeTitle,
  onChangeContent,
}) => {
  const handlePostTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeTitle(event.target.value);
  };

  const handlePostContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeContent(event.target.value);
  };

  return (
    <VerticalLayout className="fullWidth" gap={8}>
      <TextField
        value={titleText}
        onChange={handlePostTitleChange}
        placeholder="Title"
      />
      <TextArea
        placeholder="Post markdown contents"
        rows={30}
        value={contentText}
        onChange={handlePostContentChange}
      />
    </VerticalLayout>
  );
};

export default Edit;
