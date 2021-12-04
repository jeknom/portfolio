import { FC, useState } from "react";
import { Post } from ".prisma/client";
import Link from "next/link";
import { dashboardRoutes, permissions } from "constants/index";
import { DASHBOARD_POSTS_CREATE, DASHBOARD_POSTS } from "@constants/routes";
import {
  HorizontalLayout,
  Button,
  Sidebar,
  LoadingContainer,
  VerticalLayout,
  ListItem,
  ListItemText,
  ListItemActions,
  Dialog,
  List,
  Alert,
} from "components/Core";
import Protected from "components/Core/Protected";
import { useRequest } from "hooks/requests";
import DialogActions from "components/Core/Dialog/DialogActions";
import {
  createDeletePostRequest,
  createFetchPostsRequest,
} from "requests/posts";

interface PostsProps {}

interface PostListItemProps {
  post: Post;
  onDelete: (post: Post) => void;
}

const PostListItem: FC<PostListItemProps> = ({ post, onDelete }) => {
  const { title, updatedAt } = post;

  return (
    <ListItem>
      <ListItemActions>
        <Link href={`/posts/${post.id}`}>
          <span>
            <Button>Open</Button>
          </span>
        </Link>
        <Link href={`/dashboard/posts/edit/${post.id}`}>
          <span>
            <Button>Edit</Button>
          </span>
        </Link>
        <Button onClick={() => onDelete(post)}>Delete</Button>
      </ListItemActions>
      <ListItemText
        primary={title}
        secondary={new Date(updatedAt).toLocaleDateString()}
      />
    </ListItem>
  );
};

const Posts: FC<PostsProps> = () => {
  const [postToDelete, setPostToDelete] = useState<Post>(null);
  const getPostsHandler = useRequest<PortfolioAPIResponse<Post[]>>(
    createFetchPostsRequest(),
    {
      doRequestOnMount: true,
    }
  );
  const deletePostHandler = useRequest<PortfolioAPIResponse<Post>>(
    createDeletePostRequest(postToDelete?.id)
  );

  const posts = (getPostsHandler.data || []).map((p: Post) => (
    <PostListItem key={p.id} post={p} onDelete={setPostToDelete} />
  ));

  const handleCloseDeleteConfirmation = () => {
    setPostToDelete(null);
  };

  const handleDeletePost = async () => {
    const result = await deletePostHandler.doRequest();
    if (!result.error) {
      setPostToDelete(null);
      getPostsHandler.doRequest();
    }
  };

  return (
    <Protected permissions={[permissions.ALLOWED_TO_SEE_DASHBOARD]}>
      <Sidebar selectedRoute={DASHBOARD_POSTS} routes={dashboardRoutes} />
      <LoadingContainer loading={getPostsHandler.isLoading}>
        <VerticalLayout className="fullWidth" gap={12} alignItems="center">
          {getPostsHandler.error && (
            <Alert type="error">{getPostsHandler.error.toString()}</Alert>
          )}
          {posts.length === 0 && (
            <p className="captionText">
              There are no posts, create new ones and they will appear here.
            </p>
          )}
          <List>{posts}</List>
          <HorizontalLayout alignItems="center">
            <Link href={DASHBOARD_POSTS_CREATE}>
              <span>
                <Button>Create new</Button>
              </span>
            </Link>
          </HorizontalLayout>
        </VerticalLayout>
      </LoadingContainer>
      <Dialog
        title="Delete post"
        open={postToDelete !== null}
        onClose={handleCloseDeleteConfirmation}
      >
        <p className="secondaryText">
          Are you sure you wish to delete post {postToDelete?.title}?
        </p>
        <DialogActions>
          <Button onClick={handleDeletePost}>Yes</Button>
          <Button onClick={handleCloseDeleteConfirmation}>No</Button>
        </DialogActions>
      </Dialog>
    </Protected>
  );
};

export default Posts;
