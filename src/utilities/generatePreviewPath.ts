// import { PayloadRequest, CollectionSlug } from 'payload'

// // Extend CollectionSlug to include 'pages'
// type ExtendedCollectionSlug = CollectionSlug | 'pages'

// const collectionPrefixMap: Partial<Record<ExtendedCollectionSlug, string>> = {
//   pages: '',
// }

// type Props = {
//   collection: ExtendedCollectionSlug
//   slug: string
//   req: PayloadRequest
// }

// export const generatePreviewPath = ({ collection, slug }: Props) => {
//   const encodedParams = new URLSearchParams({
//     slug,
//     collection,
//     path: `${collectionPrefixMap[collection]}/${slug}`,
//     previewSecret: process.env.PREVIEW_SECRET || '',
//   })

//   const url = `/api/preview?${encodedParams.toString()}`

//   return url
// }
import type { CollectionSlug } from 'payload'

export function generatePreviewPath({
  slug,
  collection,
}: {
  slug: string
  collection: CollectionSlug
  req?: any
}) {
  const previewSecret = process.env.PREVIEW_SECRET

  return `/api/preview?slug=${slug}&path=/${slug}&collection=${collection}&previewSecret=${previewSecret}`
}
