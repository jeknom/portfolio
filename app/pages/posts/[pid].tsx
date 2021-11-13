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
import { useGetRequest } from "hooks/requests";
import prisma from "server/prismaClient";
import { fetchOpenGraphData } from "@endpoints/openGraphData";
import styles from "../../styles/posts.module.css";
import { createFetchPostByIdRequest } from "requests/posts";

interface PostPageProps {
  openGraphData: OpenGraphData;
}

const PostPage: FC<PostPageProps> = ({ openGraphData }) => {
  const router = useRouter();
  const { pid } = router.query;
  const [postsData, postsError, isLoading, refresh] = useGetRequest(
    createFetchPostByIdRequest(pid as string)
  );
  const post = postsData?.length > 0 && postsData[0];
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
          {postsError && (
            <p className="secondaryText">{postsError.toString()}</p>
          )}
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
