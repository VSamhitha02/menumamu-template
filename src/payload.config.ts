// storage-adapter-import-placeholder
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import path from 'path'
import { AccessArgs, AccessResult, buildConfig, SanitizedCollectionConfig } from 'payload'
import { fileURLToPath } from 'url'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { defaultLexical } from './fields/defaultLexical'
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'
import { r2Storage } from '@payloadcms/storage-r2'
import Metadata from './collections/Metadata'
import { getServerSideUrl } from '@/utilities/getURL'
import { Themes } from './collections/Themes'
import { canAccessFormSubmissions, isAdminOrSuperAdmin } from './app/access'
import { isSuperAdmin } from './app/access'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
// const cloudflareRemoteBindings =
//   process.env.USE_REMOTE === 'true' || process.env.NODE_ENV === 'production'
const cloudflareRemoteBindings = process.env.USE_REMOTE === 'true'

console.log('users', Users.slug)

const cloudflare =
  process.argv.find((value) => value.match(/^(generate|migrate):?/)) || !cloudflareRemoteBindings
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

const isAdminOrSuperAdminOrcanAccessFormSubmissions = (args: AccessArgs<any>) => {
  return Boolean(isAdminOrSuperAdmin(args)) || Boolean(canAccessFormSubmissions(args))
}

export default buildConfig({
  serverURL: getServerSideUrl(),
  admin: {
    user: Users.slug,
    autoLogin:
      process.env.NEXT_PUBLIC_AUTO_LOGIN === 'true'
        ? {
            email: process.env.NEXT_PUBLIC_AUTO_LOGIN_EMAIL!,
            password: process.env.NEXT_PUBLIC_AUTO_LOGIN_PASSWORD!,
          }
        : false,

    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      collections: ['pages'],
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
      url: ({ collectionConfig, data }) => {
        if (collectionConfig?.slug === 'pages') {
          const targetPath =
            data?.path || `/${data?.slug !== 'home' ? data?.slug : ''}`

          const restaurantSlug =
            typeof data?.restaurant === 'object'
              ? data.restaurant.slug
              : data.restaurant

          return `/preview-payload/${restaurantSlug}${targetPath}`
        }

        return '/'
      },
    },
  },

  collections: [Users, Media, Pages, Metadata, Themes],
  editor: defaultLexical,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteD1Adapter({
    binding: cloudflare.env.D1,
  }),
  plugins: [
    payloadCloudPlugin(),
    formBuilderPlugin({
      // 1. Protect the Form Templates (the forms structure)
      formOverrides: {
        access: {
          read: isAdminOrSuperAdminOrcanAccessFormSubmissions,
          create: isAdminOrSuperAdminOrcanAccessFormSubmissions,
          update: isAdminOrSuperAdminOrcanAccessFormSubmissions,
          delete: isAdminOrSuperAdminOrcanAccessFormSubmissions,
        },
      },
      // 2. Protect the actual user Submissions data entries
      formSubmissionOverrides: {
        access: {
          read: isAdminOrSuperAdminOrcanAccessFormSubmissions,
          update: canAccessFormSubmissions,
          delete: isAdminOrSuperAdmin,
          create: () => true,
        },
      },
    }),
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },
    }),
  ],
})

function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
      } satisfies GetPlatformProxyOptions),
  )
}