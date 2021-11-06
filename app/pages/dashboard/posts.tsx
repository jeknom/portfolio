import { Post } from ".prisma/client";
import { dashboardRoutes, permissions } from "constants/index";
import { DASHBOARD_POSTS_ROUTE } from "@constants/routes";
import {
  HorizontalLayout,
  VerticalLayout,
  Button,
  NavBar,
  LoadingContainer,
} from "components/Core";
import { FC } from "react";
import Protected from "components/Core/Protected";
import usePosts from "hooks/usePosts";

interface PostsProps {}

interface PostListItemProps {
  post: Post;
}

const PostListItem: FC<PostListItemProps> = ({ post }) => {
  const { title, updatedAt } = post;

  return (
    <li>
      <HorizontalLayout alignItems="center" gap={12}>
        <p className="secondaryText">{title}</p>
        <p className="secondaryText">
          {new Date(updatedAt).toLocaleDateString()}
        </p>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </HorizontalLayout>
    </li>
  );
};

const Posts: FC<PostsProps> = () => {
  const [postsData, isLoading] = usePosts();
  const posts = (postsData || []).map((p: Post) => (
    <PostListItem key={p.id} post={p} />
  ));

  return (
    <Protected permissions={[permissions.ALLOWED_TO_SEE_POSTS]}>
      <VerticalLayout gap={12} alignItems="center">
        <NavBar
          selectedRoute={DASHBOARD_POSTS_ROUTE}
          routes={dashboardRoutes}
        />
        <LoadingContainer loading={isLoading}>
          <ul>{posts}</ul>
        </LoadingContainer>
        <HorizontalLayout alignItems="center">
          <Button>Create new</Button>
        </HorizontalLayout>
      </VerticalLayout>
    </Protected>
  );
};

export default Posts;
