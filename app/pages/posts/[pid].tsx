import React, { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  LoadingContainer,
  Paragraph,
  Title,
  VerticalLayout,
  Head,
  Button,
} from "components/Core";
import usePosts from "hooks/usePosts";
import prisma from "server/prismaClient";
import { fetchOpenGraphData } from "@endpoints/openGraphData";
import styles from "../../styles/posts.module.css";

interface PostPageProps {
  openGraphData: OpenGraphData;
}

const PostPage: FC<PostPageProps> = ({ openGraphData }) => {
  const router = useRouter();
  const { pid } = router.query;
  const [posts, isLoading] = usePosts(pid as string);
  const post = posts?.length > 0 && posts[0];
  const { title, description, type, imageUrl } = openGraphData;

  return (
    <>
      <Head
        title={title}
        description={description}
        type={type}
        imagePath={imageUrl}
      />
      <VerticalLayout
        className={styles.postRoot}
        alignItems="center"
        justifyContent="center"
        gap={16}
      >
        <LoadingContainer loading={isLoading}>
          <Title text={post?.title || ""} />
          <Paragraph text={post?.content || ""} />
        </LoadingContainer>
        <Link href="/">
          <Button>See my portfolio and CV</Button>
        </Link>
      </VerticalLayout>
    </>
  );
};

export async function getServerSideProps() {
  const [openGraphData] = await Promise.all([fetchOpenGraphData(prisma)]);

  return {
    props: {
      openGraphData,
    },
  };
}

export default PostPage;
