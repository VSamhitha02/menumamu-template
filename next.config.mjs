import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    // domains: ['https://menumamu-template.vercel.app/'],
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'date-fns', 'react-icons','@radix-ui/react-dialog'],
  },
    serverExternalPackages: [ 'graphql'], 
}

export default withPayload(nextConfig)
