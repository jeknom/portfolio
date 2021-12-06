import React, { FC } from "react";
import Link from "next/link";
import {
  Paragraph,
  Title,
  VerticalLayout,
  Head,
  Button,
} from "components/Core";
import prisma from "server/prismaClient";
import { fetchOpenGraphData } from "@endpoints/openGraphData";
import styles from "../../styles/posts.module.css";
import { HOME } from "@constants/routes";
import { fetchPostById } from "@endpoints/posts";
import { NextPageContext } from "next";

interface PostPageProps {
  openGraphData: OpenGraphData;
  post?: { title: string; content: string };
}

const PostPage: FC<PostPageProps> = ({ openGraphData, post }) => {
  const { title, description, type, imageUrl } = openGraphData;

  return (
    <>
      <Head
        title={title}
        description={description}
        type={type}
        imagePath={imageUrl}
      />
      {!post && (
        <p className="secondaryText">Could not find the requested post</p>
      )}
      <Title text={post?.title || ""} />
      <Paragraph text={post?.content || ""} />
      <Link href={HOME}>
        <span>
          <Button>Back to main page</Button>
        </span>
      </Link>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  try {
    const { pid } = context.query;
    const [openGraphData, post] = await Promise.all([
      fetchOpenGraphData(prisma),
      fetchPostById(prisma, pid as string),
    ]);

    return {
      props: {
        openGraphData,
        post: post ? { title: post.title, content: post.content } : null,
      },
    };
  } catch (error) {
    console.error(error);
  }
}

export default PostPage;
