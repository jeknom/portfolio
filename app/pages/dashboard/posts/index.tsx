import { FC, useState, useEffect } from "react";
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
import { useGetRequest, useRequest } from "hooks/requests";
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
  const { title, updatedAt, id } = post;

  return (
    <ListItem>
      <ListItemActions>
        <Button>Edit</Button>
        <Button onClick={() => onDelete(post)}>Delete</Button>
      </ListItemActions>
      <ListItemText
        primary={`${title} - ${id}`}
        secondary={new Date(updatedAt).toLocaleDateString()}
      />
    </ListItem>
  );
};

const Posts: FC<PostsProps> = () => {
  const [postToDelete, setPostToDelete] = useState<Post>(null);
  const [postsData, postsError, isLoading, refresh] = useGetRequest(
    createFetchPostsRequest()
  );
  const [doDeleteRequest, deleteRequestError, isDeletePending] = useRequest(
    createDeletePostRequest(postToDelete?.id)
  );
  const posts = (postsData || []).map((p: Post) => (
    <PostListItem key={p.id} post={p} onDelete={setPostToDelete} />
  ));

  const handleCloseDeleteConfirmation = () => {
    setPostToDelete(null);
  };

  const handleDeletePost = async () => {
    const result = await doDeleteRequest();
    if (!result.error) {
      setPostToDelete(null);
      refresh();
    }
  };

  return (
    <Protected permissions={[permissions.ALLOWED_TO_SEE_POSTS]}>
      <VerticalLayout gap={12} alignItems="center">
        <NavBar
          selectedRoute={DASHBOARD_POSTS_ROUTE}
          routes={dashboardRoutes}
        />
        {postsError && <Alert type="error">{postsError.toString()}</Alert>}
        <LoadingContainer loading={isLoading}>
          <List>{posts}</List>
        </LoadingContainer>
        <HorizontalLayout alignItems="center">
          <Link href="/dashboard/posts/create">
            <Button>Create new</Button>
          </Link>
        </HorizontalLayout>
      </VerticalLayout>
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
