// storage-adapter-import-placeholder
// import { postgresAdapter } from '@payloadcms/db-postgres'
// import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
// import { lexicalEditor } from '@payloadcms/richtext-lexical'
// import path from 'path'
// import { buildConfig } from 'payload'
// import { fileURLToPath } from 'url'
// import sharp from 'sharp'
// import { s3Storage } from '@payloadcms/storage-s3'
// import { Users } from './collections/Users'
// import { Media } from './collections/Media'
// import { Pages } from './collections/Pages'

// const filename = fileURLToPath(import.meta.url)
// const dirname = path.dirname(filename)
// if (!process.env.S3_BUCKET) {
//   throw new Error('S3_BUCKET is not defined.')
// }

// if (!process.env.S3_ACCESS_KEY_ID) {
//   throw new Error('S3_ACCESS_KEY_ID is not defined.')
// }

// if (!process.env.S3_SECRET_ACCESS_KEY) {
//   throw new Error('S3_SECRET_ACCESS_KEY is not defined.')
// }

// export default buildConfig({
//   admin: {
//     user: Users.slug,
//     importMap: {
//       baseDir: path.resolve(dirname),
//     },
//   },
//   collections: [Users, Media, Pages],
//   editor: lexicalEditor(),
//   secret: process.env.PAYLOAD_SECRET || '',
//   typescript: {
//     outputFile: path.resolve(dirname, 'payload-types.ts'),
//   },
//   db: postgresAdapter({
//     pool: {
//       connectionString: process.env.DATABASE_URI || '',
//     },
//   }),
//   sharp,
//   plugins: [
//     payloadCloudPlugin(),

//     s3Storage({
//       collections: {
//         media: true, // Enable S3 storage for the 'media' collection
//       },
//       bucket: process.env.S3_BUCKET,
//       config: {
//         region: process.env.S3_Region,
//         credentials: {
//           accessKeyId: process.env.S3_ACCESS_KEY_ID,
//           secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//         },
//         endpoint: process.env.S3_ENDPOINT,
//         forcePathStyle: true,
//       },
//     }),
//   ],
// })
// storage-adapter-import-placeholder
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import path from 'path'
import { AccessArgs, AccessResult, buildConfig, SanitizedCollectionConfig } from 'payload'
import { fileURLToPath } from 'url'
// import sharp from 'sharp'
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
const cloudflareRemoteBindings =
  process.env.USE_REMOTE === 'true' || process.env.NODE_ENV === 'production'
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
      // url: ({
      //   collectionConfig,
      //   data,
      // }: {
      //   collectionConfig?: SanitizedCollectionConfig
      //   data: any
      // }) => {
      //   return collectionConfig?.slug === 'pages'
      //     ? `/${data?.slug !== 'home' ? data?.slug : ''}`
      //     : '/'
      // },
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
}
    },
  },

  collections: [Users, Media, Pages, Metadata, Themes],
  // editor: lexicalEditor(),
  editor: defaultLexical,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // db: postgresAdapter({
  //   pool: {
  //     connectionString: process.env.DATABASE_URI || '',
  //   },
  // }),
  db: sqliteD1Adapter({ 
  binding: cloudflare.env.D1,
  push: false,
}),

  // sharp,
  plugins: [
    payloadCloudPlugin(),

    // storage-adapter-placeholder
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
          read: isAdminOrSuperAdminOrcanAccessFormSubmissions, // Admin, Super Admin, and Form Manager can view records
          update: canAccessFormSubmissions, // Admin, Super Admin, and Form Manager can modify records
          delete: isAdminOrSuperAdmin, // ONLY Admins and Super Admins can clear/purge data logs
          create: () => true, // Essential: keeps public entry endpoint operational for site visitors
        },
      },
    }),
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },

      // If you use a custom domain or r2.dev subdomain:
    }),
  ],
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        // experimental: { remoteBindings: cloudflareRemoteBindings },
      } satisfies GetPlatformProxyOptions),
  )
}
// function isAdminOrSuperAdminOrFormManager(args: AccessArgs<any>): AccessResult | Promise<AccessResult> {
//   throw new Error('Function not implemented.')
// }

// function isAdminOrSuperAdminOrcanAccessFormSubmissions(args: AccessArgs<any>): AccessResult | Promise<AccessResult> {
//   throw new Error('Function not implemented.')
// }
