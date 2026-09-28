import type { CollectionConfig, CollectionSlug, CollectionBeforeChangeHook } from 'payload'

// Import your blocks
import { FormBlock } from '@/Blocks/Form/config'
import { MediaBlock } from '@/Blocks/MediaBlock/config'
import NavigationBlock from '@/Blocks/Navigation/config'
import HeroBlock from '@/Blocks/Hero1/config'
import Hero2Block from '@/Blocks/Hero2/config'
import Location1Block from '@/Blocks/SingleLocation/config'
import MultiLocationBlock from '@/Blocks/MultiLocation/config'
import GalleryBlock from '@/Blocks/Gallary/config'
import FranchiseBlock from '@/Blocks/Franchise/config'
import MenuBlock from '@/Blocks/Menu/config'
import ContactBlock from '@/Blocks/Contact/config'
import AboutBlock from '@/Blocks/About/config'
import FooterBlock from '@/Blocks/Footer/config'
import RestaurantBlock from '@/Blocks/Restaurant/config'

// Import utility functions – ensure these files exist and export the corresponding functions.
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { slugField } from '@/utilities/slugField'
import LocationBlock from '@/Blocks/Location/config'
import LocationScrollBlock from '@/Blocks/LocationScroll/config'
import FoodCourtBlock from '@/Blocks/FoodCourt/config'
import ChefDetailsBlock from '@/Blocks/Chefs/config'
import About1Block from '@/Blocks/About1/config'
import ChefScrollDetailsBlock from '@/Blocks/ChefScroll/config'
import ContactUsBlock from '@/Blocks/ContactUs/config'
import TestimonialsBlock from '@/Blocks/TestimonialsOne/config'
import AboutTwoBlock from '@/Blocks/AboutTwo/config'
import ContactOneBlock from '@/Blocks/ContactOne/config'
import NavigationDropDownBlock from '@/Blocks/navigationscroll/config'
import Hero3Block from '@/Blocks/Hero3/config'

import ContactTwoBlock from '@/Blocks/ContactTwo/config'
import Menu1Block from '@/Blocks/MenuOne/config'
import MenuTwoBlock from '@/Blocks/Menu2/config'
import MenuDisplayBlock from '@/Blocks/MenuDisplay/config'
import MenuThreeBlock from '@/Blocks/Menu3/config'
import VideoBlock from '@/Blocks/VideoBlock/config'
import VideoOneBlock from '@/Blocks/VideoOneBlock/config'
import VideoTwoBlock from '@/Blocks/VideoTwoBlock/config'
import VideoThreeBlock from '@/Blocks/VideoThreeBlock/config'
import GalleryOneBlock from '@/Blocks/Gallary1/config'
import TestimonialTwoBlock from '@/Blocks/TestimonialTwo/config'
import { MainPageBlock } from '@/Blocks/MainPageGallery/config'
import MenuFourBlock from '@/Blocks/Menu4/config'
import ServiceOptionsBlock from '@/Blocks/OrderType/config'
import FoodCourtOneBlock from '@/Blocks/FoodCourtOne/config'
import ServiceOptionsTwoBlock from '@/Blocks/ServiceOptionsTwo/config'
import MenuCategories from '@/Blocks/MenuCategories/config'
import NavigationTwoBlock from '@/Blocks/NavigationTwo/config'
import NavigationThreeBlock from '@/Blocks/NavigationThree/config'
import { Instagram } from '@/Blocks/Instagram/config'
import { HeroVideo } from '@/Blocks/HeroVideo/config'
import ServiceOptionsThreeBlock  from '@/Blocks/ServiceOptionThree/config'
import  HeroFourBlock  from '@/Blocks/Hero4/config'
import { SaveInDraftsButton } from '@/components/SaveInDraftsButton' // Adjust path if needed
import {
  canEditPages,
  isContentManager,
  isViewer,
  isAdmin,
  isAdminOrSuperAdminOrContentManagerOrViewer,
  isAdminOrSuperAdmin,
  isAdminOrSuperAdminOrContentManager,
  isAdminOrSuperAdminOrEditor,
} from '@/app/access'
import type { PayloadRequest } from 'payload'
const preventBlockCreation: CollectionBeforeChangeHook = async ({
  req,
  originalDoc,
  data,
  operation,
}) => {

    const role = req.user?.role

  const canPublish = ["0", "10"].includes(role as string)

  const wasDraft = originalDoc?._status === "draft"
  const willPublish = data?._status === "published"

  if (wasDraft && willPublish && !canPublish) {
    throw new Error("Only Admin and Super Admin can publish pages.")
  }

  // Check if the operation is an update and the user is a Content Manager (role '20')
  // if (operation === 'update' && req.user?.role === '20') {
  //   const oldBlocks = originalDoc?.layout || []
  //   const newBlocks = data?.layout || []

  //   const oldIds = oldBlocks.map((b: any) => b.id).filter(Boolean)
  //   const newIds = newBlocks.map((b: any) => b.id).filter(Boolean)

  //   const oldIdsSet = new Set(oldIds)
  //   const newIdsSet = new Set(newIds)

  //   // 1. Prevent Block Deletion
  //   for (const id of oldIdsSet) {
  //     if (!newIdsSet.has(id)) {
  //       throw new Error('Structure Lock: Content Managers cannot delete blocks from this layout.')
  //     }
  //   }

  //   // 2. Prevent Block Addition
  //   for (const block of newBlocks) {
  //     if (!block.id || !oldIdsSet.has(block.id)) {
  //       throw new Error('Structure Lock: Content Managers cannot add new blocks to this layout.')
  //     }
  //   }

  //   // 3. Prevent Block Reordering (Optional but recommended for strict content editing)
  //   if (JSON.stringify(oldIds) !== JSON.stringify(newIds)) {
  //     throw new Error('Structure Lock: Content Managers cannot change the order of the blocks.')
  //   }
  // }

  return data
}
export const Pages: CollectionConfig = {
  slug: 'pages',
  hooks: {
    beforeChange: [preventBlockCreation],
  },

  access: {
    read: isAdminOrSuperAdminOrContentManagerOrViewer,
    create: isAdminOrSuperAdminOrEditor,
    update: canEditPages,
    delete: isAdminOrSuperAdmin,
  },

  defaultPopulate: {
    title: true,
    slug: true,
  },
admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    components: {
      edit: {
        // Use the exact path alias from your project root (e.g., @/components/...)
        beforeDocumentControls: [
          '@/components/SaveInDraftsButton', 
        ],
      },
    },
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'restaurant', //
      type: 'text',
      required: false,
    },
    {
      name: 'path',
      type: 'text',
      label: 'Page Path',
      required: true,
      
    },
    {
      name: 'metadata',
      type: 'relationship',
      relationTo: 'metadata' as CollectionSlug,
      label: 'meta data',
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      admin: {
        initCollapsed: true,
        // isSortable only accepts a static boolean.
        // We set it to false to completely lock structural reordering for everyone in the UI,
        // OR you can remove this line completely and let the beforeChange hook manage it securely.
        isSortable: true,
      },
  access: {
    read: isAdminOrSuperAdminOrContentManagerOrViewer as any,
    create: isAdminOrSuperAdminOrEditor as any,
    update: canEditPages as any,
  },
      blocks: [
        NavigationBlock,
        HeroBlock,
        Hero2Block,
        Location1Block,
        MultiLocationBlock,
        GalleryBlock,
        FranchiseBlock,
        MenuBlock,
        ContactBlock,
        AboutBlock,
        FooterBlock,
        MediaBlock,
        FormBlock,
        RestaurantBlock,
        LocationBlock,
        LocationScrollBlock,
        FoodCourtBlock,
        ChefDetailsBlock,
        About1Block,
        TestimonialsBlock,
        ChefScrollDetailsBlock,
        ContactUsBlock,
        AboutTwoBlock,
        Menu1Block,
        ContactOneBlock,
        NavigationDropDownBlock,
        Hero3Block,
        ContactTwoBlock,
        MenuTwoBlock,
        MenuDisplayBlock,
        MenuThreeBlock,
        VideoBlock,
        VideoOneBlock,
        VideoTwoBlock,
        VideoThreeBlock,
        GalleryOneBlock,
        TestimonialTwoBlock,
        MainPageBlock,
        MenuFourBlock,
        ServiceOptionsBlock,
        FoodCourtOneBlock,
        ServiceOptionsTwoBlock,
        MenuCategories,
        NavigationTwoBlock,
        NavigationThreeBlock,
        Instagram,
        HeroVideo,
        ServiceOptionsThreeBlock,
        HeroFourBlock,
      ],
    },
    {
      name: 'theme',
      type: 'relationship',
      relationTo: 'themes' as CollectionSlug,
      required: true,
    },
    {
      name: 'mode',
      type: 'select',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
      defaultValue: 'light',
      required: true,
    },
    // This assumes slugField returns an array of field definitions.
    ...slugField(),
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100000,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
