import React, { ChangeEvent, FC, useState } from "react";
import Link from "next/link";
import {
  HorizontalLayout,
  Paragraph,
  TextArea,
  Root,
  Toggle,
  VerticalLayout,
  Button,
  TextField,
  Alert,
} from "components/Core";
import { useRequest } from "hooks/requests";
import { useRouter } from "next/router";
import Protected from "components/Core/Protected";
import { permissions } from "@constants/index";
import { createPostRequest } from "requests/posts";

interface CreatePostProps {}

interface PreviewProps {
  titleText: string;
  contentText: string;
}

interface EditProps {
  titleText: string;
  contentText: string;
  onChangeTitle: (title: string) => void;
  onChangeContent: (content: string) => void;
}

const Preview: FC<PreviewProps> = ({ titleText, contentText }) => {
  const titleElement =
    titleText === "" ? (
      <p className="primaryText">No title</p>
    ) : (
      <p className="primaryText">{titleText}</p>
    );
  const contentElement =
    contentText === "" ? (
      <p className="secondaryText">No content to show here</p>
    ) : (
      <Paragraph text={contentText} />
    );

  return (
    <VerticalLayout>
      {titleElement}
      {contentElement}
    </VerticalLayout>
  );
};

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

const CreatePost: FC<CreatePostProps> = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const router = useRouter();
  const postRequest = createPostRequest(postTitle, postContent);
  const [doCreatePostRequest, createPostError, isCreatePostPending] =
    useRequest(postRequest);

  const handleCreatePost = async () => {
    const post = await doCreatePostRequest(postTitle, postContent);
    if (!post?.error) {
      router.push("/dashboard/posts");
    }
  };

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_POSTS]}>
      <Root alignItems="center" gap={12}>
        {createPostError && (
          <Alert type="error">Failed to create post: {createPostError}</Alert>
        )}
        <HorizontalLayout gap={8}>
          <Toggle label="Preview" enabled={isPreview} onToggle={setIsPreview} />
        </HorizontalLayout>
        <HorizontalLayout className="fullWidth">
          {!isPreview && (
            <Edit
              titleText={postTitle}
              contentText={postContent}
              onChangeTitle={setPostTitle}
              onChangeContent={setPostContent}
            />
          )}
          {isPreview && (
            <Preview titleText={postTitle} contentText={postContent} />
          )}
        </HorizontalLayout>
        <HorizontalLayout gap={8}>
          <Button
            disabled={postTitle === "" || postContent === ""}
            onClick={handleCreatePost}
          >
            Create
          </Button>
          <Link href="/dashboard/posts">
            <span>
              <Button>Cancel</Button>
            </span>
          </Link>
        </HorizontalLayout>
      </Root>
    </Protected>
  );
};

export default CreatePost;
