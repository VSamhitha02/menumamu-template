import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },

  experimental: {
        // Windows only: limit build workers so they don't fight over the local D1 file
    ...(process.platform === 'win32' ? { cpus: 1 } : {}),
    optimizePackageImports: [
      'lucide-react',
      'date-fns',
      'react-icons',
      '@radix-ui/react-dialog',
    ],
  },

  serverExternalPackages: [
    'graphql',
    'drizzle-kit',
    'drizzle-kit/api',
    'sharp',
  ],
}

export default withPayload(nextConfig)