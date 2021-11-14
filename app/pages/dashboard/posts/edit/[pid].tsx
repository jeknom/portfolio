import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import {
  HorizontalLayout,
  Root,
  Toggle,
  Button,
  Alert,
  LoadingContainer,
} from "components/Core";
import { useRequest } from "hooks/requests";
import { useRouter } from "next/router";
import Protected from "components/Core/Protected";
import { permissions } from "@constants/index";
import {
  createFetchPostByIdRequest,
  createUpdatePostRequest,
} from "requests/posts";
import { Post } from ".prisma/client";
import { Preview, Edit } from "components/Dashboard/Posts";
import { getShortDateOr } from "utils";

interface EditPostProps {}

const EditPost: FC<EditPostProps> = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const router = useRouter();
  const { pid } = router.query;
  const getPostHandler = useRequest<Post>(
    createFetchPostByIdRequest(pid as string)
  );
  const updatePostHandler = useRequest<PortfolioAPIResponse<Post>>(
    createUpdatePostRequest(pid as string, postTitle, postContent)
  );

  const handleUpdatePost = async () => {
    const result = await updatePostHandler.doRequest();
    if (!result.error) {
      router.push("/dashboard/posts");
    }
  };

  const handleMount = async () => {
    console.log(pid);
    const data = await getPostHandler.doRequest();

    if (data) {
      setPostTitle(data.title);
      setPostContent(data.content);
    }
  };

  useEffect(() => {
    if (pid && pid !== "") {
      handleMount();
    }
  }, [pid]);

  if (getPostHandler.errorCode && getPostHandler.errorCode === 404) {
    router.push("/404");
  }
  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_POSTS]}>
      <Root alignItems="center" gap={12}>
        <LoadingContainer loading={getPostHandler.isLoading}>
          <HorizontalLayout gap={12}>
            <p className="captionText">Post ID: {getPostHandler.data?.id}</p>
            <p className="captionText">|</p>
            <p className="captionText">
              Created:{" "}
              {getShortDateOr(
                getPostHandler.data?.createdAt.toString(),
                "Unknown"
              )}
            </p>
            <p className="captionText">|</p>
            <p className="captionText">
              Last update:{" "}
              {getShortDateOr(
                getPostHandler.data?.updatedAt.toString(),
                "Unknown"
              )}
            </p>
          </HorizontalLayout>
          {getPostHandler.error && (
            <Alert type="error">{getPostHandler.error}</Alert>
          )}
          {updatePostHandler.error && (
            <Alert type="error">{updatePostHandler.error}</Alert>
          )}
          <HorizontalLayout gap={8}>
            <Toggle
              label="Preview"
              enabled={isPreview}
              onToggle={setIsPreview}
            />
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
              onClick={handleUpdatePost}
            >
              Update
            </Button>
            <Link href="/dashboard/posts">
              <span>
                <Button>Cancel</Button>
              </span>
            </Link>
          </HorizontalLayout>
        </LoadingContainer>
      </Root>
    </Protected>
  );
};

export default EditPost;
