import canUseDOM from './canUseDOm' // Ensure the filename matches your import
export const getServerSideUrl: () => string = () => {
  let url: string | undefined = process.env.NEXT_PUBLIC_SERVER_URL
  if (!url && process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  if (!url) {
    url = 'http://localhost:3000'
    console.log('Using default server URL')
  }
  console.log('getServerSideUrl', url)
  return url
}
export const getClientSideUrl: () => string = () => {
  if (canUseDOM) {
    // CHANGE 'host' TO 'hostname' HERE
    const { protocol, hostname, port } = window.location
    return `${protocol}//${hostname}${port ? `:${port}` : ''}`
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    console.log('Using NEXT_PUBLIC_SITE_URL for client-side URL', process.env.NEXT_PUBLIC_SITE_URL)
    return `https://${process.env.NEXT_PUBLIC_SITE_URL}`
  }
  return process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
}
