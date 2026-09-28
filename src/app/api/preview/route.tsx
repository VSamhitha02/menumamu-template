import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const previewSecret = searchParams.get('previewSecret')
  const slug = searchParams.get('slug')
  const path = searchParams.get('path')

    console.log({
    previewSecret,
    slug,
    path,
  })

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  // Ensure we fall back cleanly. If path exists use it, otherwise fall back to slug or root
  const targetPath = path || (slug ? `/${slug}` : '/')
    console.log("Redirecting to:", targetPath)
  redirect(targetPath)
}
