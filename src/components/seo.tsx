import { FC } from 'react'
import Head from 'next/head'

const siteMetadata = {
  title: 'DH Inventory',
  description: 'DH inventory manager',
}

export const SEO: FC<{
  description?: string
  title: string
}> = ({ description, title }) => (
  <Head>
    <title>
      {title ? `${title} | ${siteMetadata.title}` : siteMetadata.title}
    </title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta
      name="description"
      content={description || siteMetadata.description}
    />
  </Head>
)
