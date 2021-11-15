import React, { FC, useState } from "react";
import Link from "next/link";
import { HorizontalLayout, Root, Toggle, Button, Alert } from "components/Core";
import { useRequest } from "hooks/requests";
import { useRouter } from "next/router";
import Protected from "components/Core/Protected";
import { permissions } from "@constants/index";
import { createPostRequest } from "requests/posts";
import { Post } from ".prisma/client";
import { Preview, Edit } from "components/Dashboard/Posts";
import { DASHBOARD_POSTS } from "@constants/routes";

interface CreatePostProps {}

const CreatePost: FC<CreatePostProps> = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const router = useRouter();
  const postRequest = createPostRequest(postTitle, postContent);
  const createPostHandler = useRequest<PortfolioAPIResponse<Post>>(postRequest);

  const handleCreatePost = async () => {
    const post = await createPostHandler.doRequest();
    if (!post?.error) {
      router.push(DASHBOARD_POSTS);
    }
  };

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_POSTS]}>
      <Root alignItems="center" gap={12}>
        <p className="primaryText">Create post</p>
        {createPostHandler.error && (
          <Alert type="error">
            Failed to create post: {createPostHandler.error}
          </Alert>
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
          <Link href={DASHBOARD_POSTS}>
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
