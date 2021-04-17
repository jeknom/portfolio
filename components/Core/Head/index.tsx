import { FC } from 'react'
import Head from 'next/head'

interface HeadProps {
  title: string,
  description: string,
  type: string,
  imagePath: string
}

const HeadComponent: FC<HeadProps> = ({ title, description, type, imagePath }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content={title} />
      <meta property="og:type" content={type} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imagePath} />
      <meta property="og:image:width" content={"300"} />
      <meta property="og:image:height" content={"300"} />
    </Head>
  )
}

export default HeadComponent