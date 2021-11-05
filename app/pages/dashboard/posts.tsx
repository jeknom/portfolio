import { Post } from ".prisma/client";
import { dashboardRoutes, permissions } from "constants/index";
import { DASHBOARD_POSTS_ROUTE } from "@constants/routes";
import {
  HorizontalLayout,
  VerticalLayout,
  Button,
  NavBar,
} from "components/Core";
import { FC } from "react";
import useSwr from "swr";
import Protected from "components/Core/Protected";

interface PostsProps {}

interface PostListItemProps {
  post: Post;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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
  const postsRequest = useSwr<Post[]>("/api/posts", fetcher);
  const posts = (postsRequest?.data || []).map((p) => (
    <PostListItem key={p.id} post={p} />
  ));

  return (
    <Protected permissions={[permissions.ADMIN]}>
      <VerticalLayout gap={12} alignItems="center">
        <NavBar
          selectedRoute={DASHBOARD_POSTS_ROUTE}
          routes={dashboardRoutes}
        />
        {!postsRequest?.data && !postsRequest?.error && (
          <p className="secondaryText">Loading...</p>
        )}
        <ul>{posts}</ul>
        <HorizontalLayout alignItems="center">
          <Button>Create new</Button>
        </HorizontalLayout>
      </VerticalLayout>
    </Protected>
  );
};

export default Posts;
