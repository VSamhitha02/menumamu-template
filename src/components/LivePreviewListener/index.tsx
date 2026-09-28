'use client'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import { getClientSideUrl } from '@/utilities/getURL'
export const LivePreviewListener: React.FC = () => {
  const router = useRouter()
  const url = getClientSideUrl()

  return <PayloadLivePreview refresh={router.refresh} serverURL={getClientSideUrl()} />
}
