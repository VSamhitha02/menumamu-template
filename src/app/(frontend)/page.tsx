import React from 'react'
import DynamicPageRenderer, { getPage } from '@/components/DynamicPageRenderer'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const currentPath = '/' //  FIXED

  const result = await getPage(currentPath, 'restaurant1') // default restaurant

  const pageData = result?.page
  const meta = (pageData?.metadata as any)?.meta

  const metaTitle = meta?.metaTitle || pageData?.title || 'Default Title'
  const metaDescription = meta?.metaDescription || 'Default description'
  const metaImage = meta?.metaImage
  const faviconImage = meta?.faviconImage

  const openGraphImages = metaImage?.filename ? [{ url: `/media/${metaImage.filename}` }] : []

  const faviconBaseUrl = faviconImage?.filename ? `/media/${faviconImage.filename}` : null

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: openGraphImages,
    },
    icons: faviconBaseUrl
      ? [
          { rel: 'icon', url: faviconBaseUrl },
          { rel: 'shortcut icon', url: faviconBaseUrl },
          { rel: 'apple-touch-icon', url: faviconBaseUrl, sizes: '180x180' },
          { rel: 'android-chrome', url: faviconBaseUrl, sizes: '192x192' },
        ]
      : undefined,
  }
}

export default async function Page() {
  return (
    <DynamicPageRenderer
      pagePath="/" //FIXED
      restaurant="restaurant1" // default fallback
    />
  )
}
