import React from 'react'
import DynamicPageRenderer, { getPage } from '@/components/DynamicPageRenderer'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {

  const { slug = [] } = await params

  const restaurant = slug[0] || 'restaurant1'

  const pagePath =
    slug.length <= 1
      ? '/'
      : `/${slug.slice(1).join('/')}`

  const result = await getPage(pagePath, restaurant)

  const pageData = result?.page
  const meta = (pageData?.metadata as any)?.meta

  // Dynamic base URL
const headersList = await headers()

const host = headersList.get('host') || ''

const baseUrl = `https://${host}`

  // OG image
  let imageUrl = meta?.metaImage?.url

  if (imageUrl?.startsWith('/')) {
    imageUrl = `${baseUrl}${imageUrl}`
  }

  return {
    metadataBase: new URL(baseUrl),

    title:
      meta?.metaTitle ||
      pageData?.title ||
      'Default Title',

    description:
      meta?.metaDescription ||
      'Default description',

    alternates: {
      canonical: `${baseUrl}/${slug.join('/')}`,
    },

    openGraph: {
      title:
        meta?.metaTitle ||
        pageData?.title ||
        'Default Title',

      description:
        meta?.metaDescription ||
        'Default description',

      url: `${baseUrl}/${slug.join('/')}`,

      siteName: 'MenuMamu',

images: imageUrl
  ? [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt:
          meta?.metaTitle ||
          pageData?.title ||
          'Preview Image',
        type: 'image/png',
      },
    ]
  : [],

      locale: 'en_US',
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',

      title:
        meta?.metaTitle ||
        pageData?.title ||
        'Default Title',

      description:
        meta?.metaDescription ||
        'Default description',

      images: imageUrl ? [imageUrl] : [],
    },
    icons: meta?.faviconImage?.url
      ? [
          { rel: 'icon', url: meta.faviconImage.url },
        ]
      : undefined,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {

  const { slug = [] } = await params

  const restaurant = slug[0] || 'restaurant1'

  const pagePath =
    slug.length <= 1
      ? '/'
      : `/${slug.slice(1).join('/')}`

  return (
    <DynamicPageRenderer
      pagePath={pagePath}
      restaurant={restaurant}
    />
  )
}