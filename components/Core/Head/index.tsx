import { FC } from 'react'
import Head from 'next/head'

interface HeadProps {
  title: string,
  description: string
}

const HeadComponent: FC<HeadProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  )
}

export default HeadComponent