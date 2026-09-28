import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { BlockData, RenderBlocks } from '@/Blocks/RenderBlock'
import { draftMode, headers } from 'next/headers'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export type PageData = {
  title: string
  slug: string
  layout: BlockData[]
  path: string
  mode?: 'light' | 'dark'
  metadata?: {
    meta?: {
      metaTitle?: string
      metaDescription?: string
      metaImage?: { filename?: string }
      faviconImage?: { filename?: string }
    }
  }
}

export async function getPage(path: string, restaurant: string) {
  const normalizedPath = path === '/' ? '/' : path.replace(/\/$/, '')

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const headerList = await headers()
  const { user } = await payload.auth({ headers: headerList })
  const { isEnabled: isDraftMode } = await draftMode()

  const result = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { path: { equals: normalizedPath } },
        ...(restaurant ? [{ restaurant: { equals: restaurant } }] : []),
      ],
    },
    draft: true,
    depth: 2,
  })

  return {
    page: result.docs?.[0],
    user: user || null,
  }
}

export default async function DynamicPageRendererPreview({
  pagePath,
  restaurant,
}: {
  pagePath: string
  restaurant: string
}) {
  const { page, user } = await getPage(pagePath, restaurant)

  if (!page) {
    notFound()
  }

  const themeName = page.theme && typeof page.theme === 'object' ? page.theme.name : null

const resolvedTheme =
  page.theme && typeof page.theme === 'object'
    ? {
        navbar: {
          textColor: page.theme.navbar?.textColor ?? undefined,
          backgroundColor: page.theme.navbar?.backgroundColor ?? undefined,
        },
        variants: {
          fill: {
            textColor: page.theme.variants?.fill?.textColor ?? undefined,
            backgroundColor: page.theme.variants?.fill?.backgroundColor ?? undefined,
          },
          outline: {
            textColor: page.theme.variants?.outline?.textColor ?? undefined,
            borderColor: page.theme.variants?.outline?.borderColor ?? undefined,
            backgroundColor: page.theme.variants?.outline?.backgroundColor ?? undefined,
          },
        },
              // NEW — forward the custom theme entries so RenderBlocks can match block className
        customThemes: page.theme.customThemes?.map((c: any) => ({
          className: c.className,
          textColor: c.textColor ?? undefined,
          backgroundColor: c.backgroundColor ?? undefined,
          mode: c.mode ?? undefined,
        })),  
      }
    : undefined
    

  return (
    <>
      {themeName && (
        <link
          rel="stylesheet"
          data-theme
          href={`/api/theme?name=${encodeURIComponent(themeName)}`}
        />
      )}

      <LivePreviewListener />
      <main className="page-bg flex-1">
        {page.layout?.length ? (
          <RenderBlocks blocks={page.layout} theme={resolvedTheme} />
        ) : (
          <div>No content blocks found.</div>
        )}
      </main>
    </>
  )
}