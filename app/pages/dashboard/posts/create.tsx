import React, { ChangeEvent, FC, useState } from "react";
import {
  HorizontalLayout,
  Paragraph,
  TextArea,
  Root,
  Toggle,
} from "components/Core";

interface CreatePostProps {}

interface PreviewProps {
  contentText: string;
}

interface EditProps {
  contentText: string;
  onChangeContent: (content: string) => void;
}

const Preview: FC<PreviewProps> = ({ contentText }) => {
  if (contentText === "") {
    return <p className="secondaryText">No content to show here</p>;
  }

  return <Paragraph text={contentText} />;
};

const Edit: FC<EditProps> = ({ contentText, onChangeContent }) => {
  const handlePostContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeContent(event.target.value);
  };

  return (
    <TextArea
      className="fullWidth"
      rows={30}
      value={contentText}
      onChange={handlePostContentChange}
    />
  );
};

const CreatePost: FC<CreatePostProps> = () => {
  const [postContent, setPostContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  return (
    <Root alignItems="center">
      <HorizontalLayout>
        <Toggle label="Preview" enabled={isPreview} onToggle={setIsPreview} />
      </HorizontalLayout>
      <HorizontalLayout className="fullWidth">
        {!isPreview && (
          <Edit contentText={postContent} onChangeContent={setPostContent} />
        )}
        {isPreview && <Preview contentText={postContent} />}
      </HorizontalLayout>
    </Root>
  );
};

export default CreatePost;
