import Head from 'next/head'

interface HeadProps {
  title: string,
  description: string
}

export default function HeadComponent({title, description}: HeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  );
}