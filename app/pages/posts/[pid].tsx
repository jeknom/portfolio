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
import { useRequest } from "hooks/requests";
import prisma from "server/prismaClient";
import { fetchOpenGraphData } from "@endpoints/openGraphData";
import styles from "../../styles/posts.module.css";
import { createFetchPostByIdRequest } from "requests/posts";
import { Post } from "@prisma/client";

interface PostPageProps {
  openGraphData: OpenGraphData;
}

const PostPage: FC<PostPageProps> = ({ openGraphData }) => {
  const router = useRouter();
  const { pid } = router.query;
  const getPostHandler = useRequest<Post>(
    createFetchPostByIdRequest(pid as string),
    {
      doRequestOnMount: true,
    }
  );

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
        <LoadingContainer loading={getPostHandler.isLoading}>
          {getPostHandler.error && (
            <p className="secondaryText">{getPostHandler.error.toString()}</p>
          )}
          <Title text={getPostHandler.data?.title || ""} />
          <Paragraph text={getPostHandler.data?.content || ""} />
        </LoadingContainer>
        <Link href="/">
          <span>
            <Button>See my portfolio and CV</Button>
          </span>
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
