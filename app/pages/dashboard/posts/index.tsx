import { FC, useState } from "react";
import { Post } from ".prisma/client";
import Link from "next/link";
import { dashboardRoutes, permissions } from "constants/index";
import { DASHBOARD_POSTS_ROUTE } from "@constants/routes";
import {
  HorizontalLayout,
  VerticalLayout,
  Button,
  NavBar,
  LoadingContainer,
  List,
  ListItem,
  ListItemText,
  ListItemActions,
  Dialog,
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
  console.log(getPostsHandler.data);
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
      <VerticalLayout gap={12} alignItems="center">
        <NavBar
          selectedRoute={DASHBOARD_POSTS_ROUTE}
          routes={dashboardRoutes}
        />
        {getPostsHandler.error && (
          <Alert type="error">{getPostsHandler.error.toString()}</Alert>
        )}
        <LoadingContainer loading={getPostsHandler.isLoading}>
          {posts.length === 0 && (
            <p className="captionText">
              There are no posts, create new ones and they will appear here.
            </p>
          )}
          <List>{posts}</List>
        </LoadingContainer>
        <HorizontalLayout alignItems="center">
          <Link href="/dashboard/posts/create">
            <span>
              <Button>Create new</Button>
            </span>
          </Link>
        </HorizontalLayout>
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
      </VerticalLayout>
    </Protected>
  );
};

export default Posts;
