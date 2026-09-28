import React, { Fragment } from 'react'

// Import your block components
import { FormBlock } from '@/Blocks/Form/Component'
import { MediaBlock } from '@/Blocks/MediaBlock/Component'
import NavigationBlock from './Navigation/NavigationRenderer'
import HeroOne from './Hero1/component'
import Hero2Renderer from './Hero2/component'
import SingleLocationRenderer from './SingleLocation/Component'
import MultipleLocationsRenderer from './MultiLocation/Component'
import GalleryRenderer from './Gallary/Component'
import FranchiseRenderer from './Franchise/Component'
import MenuRenderer from './Menu/Component'
import ContactRenderer from './Contact/Component'
import AboutRenderer from './About/component'
import FooterRenderer from './Footer/Component'
import LocationRenderer from './Location/Component'
import RestaurantRenderer from './Restaurant/Component'
import LocationScrollRenderer from './LocationScroll/Component'
import FoodRenderer from './FoodCourt/Component'
import ChefRenderer from './Chefs/Component'
import About1Renderer from './About1/component'
import ChefScrollRenderer from './ChefScroll/Component'
import ContactUsRenderer from './ContactUs/Component'
import TestimonialsSection from './TestimonialsOne/component'
import AboutTwoRenderer from './AboutTwo/component'
import NavigationOneBlock from './navigationscroll/components'
import HeroThreeRenderer from './Hero3/component'
import ContactTwoServerWrapper from './ContactTwo/ServerWrapper'
import type { Page } from '@/payload-types'
import ContactOneRenderer from './ContactOne/component'
import MenuTwoRenderer from './Menu2/component'
import MenuDisplayRender from './MenuDisplay/component'
import MenuThreeRenderer from './Menu3/component'
import VideoSection from './VideoBlock/component'
import Menu1Renderer from './MenuOne/Component'
import VideoOneSection from './VideoOneBlock/component'
import VideoTwoSection from './VideoTwoBlock/component'
import VideoThreeSection from './VideoThreeBlock/component'
import GalleryOneRenderer from './Gallary1/component'
import TestimonialTwoSection from './TestimonialTwo/component'
import MainPageRenderer from './MainPageGallery/component'
import { MenuFourRender } from './Menu4/component'
import ServiceOptionsRenderer from './OrderType/Component'
import FoodOneRenderer from './FoodCourtOne/Component'
import ServiceOptionsTwoRenderer from './ServiceOptionsTwo/Component'
import MenuCategoryRenderer from './MenuCategories/component'
import NavigationTwoRenderer from './NavigationTwo/NavigationRenderer'
import NavigationThreeRenderer from './NavigationThree/components'
import { InstagramRenderer } from './Instagram/component'
import HeroVideoRenderer from './HeroVideo/component'
import ServiceOptionsThreeRenderer from './ServiceOptionThree/component'
import HeroFourRenderer from './Hero4/component'

type BlockType =
  | 'formBlock'
  | 'mediaBlock'
  | 'navigation'
  | 'heroOne'
  | 'heroTwo'
  | 'singleLocation'
  | 'multipleLocations'
  | 'gallery'
  | 'franchise'
  | 'menu'
  | 'contact'
  | 'about'
  | 'footer'
  | 'location'
  | 'restaurant'
  | 'location_scroll'
  | 'foodcourt'
  | 'chef_details'
  | 'about1'
  | 'testimonials'
  | 'chef_sroll_details'
  | 'contact_us'
  | 'abouttwo'
  | 'menu1'
  | 'contactus'
  | 'navigationDropDown'
  | 'heroThree'
  | 'contact_two'
  | 'menutwo'
  | 'menudisplay'
  | 'menuthree'
  | 'video'
  | 'videoone'
  | 'videotwo'
  | 'videothree'
  | 'galleryone'
  | 'testimonialtwo'
  | 'MainPage'
  | 'menufour'
  | 'serviceOptions'
  | 'foodcourtone'
  | 'serviceOptionsTwo'
  | 'menu-categories'
  | 'navigationTwo'
  | 'navigationThree'
  | 'instagram'
  | 'heroVideo'
  | 'serviceOptionsThree'
  | 'heroFour'

export type BlockData = NonNullable<Page['layout']>[number]

const blockComponents: Record<BlockType, React.ElementType> = {
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  navigation: NavigationBlock,
  heroOne: HeroOne,
  heroTwo: Hero2Renderer,
  singleLocation: SingleLocationRenderer,
  multipleLocations: MultipleLocationsRenderer,
  gallery: GalleryRenderer,
  franchise: FranchiseRenderer,
  menu: MenuRenderer,
  contact: ContactRenderer,
  about: AboutRenderer,
  footer: FooterRenderer,
  location: LocationRenderer,
  restaurant: RestaurantRenderer,
  location_scroll: LocationScrollRenderer,
  foodcourt: FoodRenderer,
  chef_details: ChefRenderer,
  chef_sroll_details: ChefScrollRenderer,
  about1: About1Renderer,
  testimonials: TestimonialsSection,
  contact_us: ContactUsRenderer,
  abouttwo: AboutTwoRenderer,
  menu1: Menu1Renderer,
  contactus: ContactOneRenderer,
  navigationDropDown: NavigationOneBlock,
  heroThree: HeroThreeRenderer,
  contact_two: ContactTwoServerWrapper,
  menutwo: MenuTwoRenderer,
  menudisplay: MenuDisplayRender,
  menuthree: MenuThreeRenderer,
  video: VideoSection,
  videoone: VideoOneSection,
  videotwo: VideoTwoSection,
  videothree: VideoThreeSection,
  galleryone: GalleryOneRenderer,
  testimonialtwo: TestimonialTwoSection,
  MainPage: MainPageRenderer,
  menufour: MenuFourRender,
  serviceOptions: ServiceOptionsRenderer,
  foodcourtone: FoodOneRenderer,
  serviceOptionsTwo: ServiceOptionsTwoRenderer,
  'menu-categories': MenuCategoryRenderer,
  navigationTwo: NavigationTwoRenderer,
  navigationThree: NavigationThreeRenderer,
  instagram: InstagramRenderer,
  heroVideo: HeroVideoRenderer,
  serviceOptionsThree: ServiceOptionsThreeRenderer,
  heroFour: HeroFourRenderer,
}

// Block types that should receive resolved theme data as a `theme` prop.
const NAVIGATION_BLOCK_TYPES = new Set<BlockType>([
  'navigation',
  'navigationTwo',
  'navigationThree',
  'navigationDropDown',
])

// Shape this to match your `Themes` collection's `navbar` / `variants` groups.
export interface ResolvedThemeDoc {
  navbar?: {
    textColor?: string
    backgroundColor?: string
    dark?: { textColor?: string; backgroundColor?: string }
  }
  variants?: {
    fill?: { textColor?: string; backgroundColor?: string }
    outline?: { textColor?: string; borderColor?: string; backgroundColor?: string }
  }
    // NEW — matches your Themes collection's customThemes array
  customThemes?: Array<{
    className: string
    textColor?: string
    backgroundColor?: string
    mode?: 'light' | 'dark'
  }>
}

export const RenderBlocks: React.FC<{
  blocks: BlockData[]
  pageMode?: 'light' | 'dark'
  theme?: ResolvedThemeDoc
}> = ({ blocks, pageMode, theme }) => {
  if (Array.isArray(blocks) && blocks.length > 0) {
    console.log('theme doc:', theme)
    
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockComponents[blockType]) {
            const Block = blockComponents[blockType]
            const prevBlock = blocks[index - 1]

            const isAfterNavigation =
              prevBlock?.blockType === 'navigation' ||
              prevBlock?.blockType === 'navigationTwo' ||
              prevBlock?.blockType === 'navigationThree' ||
              prevBlock?.blockType === 'navigationDropDown'

            // resolve per-block mode override, falling back to page-level mode
            const finalMode: 'light' | 'dark' | undefined =
              (block as any)?.mode && (block as any)?.mode !== 'inherit'
                ? (block as any).mode
                : pageMode

            // build the theme prop only for navigation-type blocks, picking
            // light/dark navbar colors based on the resolved mode
            let navTheme: { navbar?: any; variants?: any } | undefined
            if (NAVIGATION_BLOCK_TYPES.has(blockType as BlockType) && theme) {
              const useDark = finalMode === 'dark' && theme.navbar?.dark
              navTheme = {
                navbar: useDark
                  ? {
                      textColor: theme.navbar?.dark?.textColor,
                      backgroundColor: theme.navbar?.dark?.backgroundColor,
                    }
                  : {
                      textColor: theme.navbar?.textColor,
                      backgroundColor: theme.navbar?.backgroundColor,
                    },
                variants: theme.variants,
              }
            }

                        // globals.css's .formBlock, .about, .hero1, etc.
            const blockClassName = (block as any)?.className as string | undefined
            console.log('block className:', blockClassName, 'blockType:', blockType)
            const customTheme = blockClassName
              ? theme?.customThemes?.find((c) => c.className === blockClassName)
              : undefined

            const cssVarStyle: React.CSSProperties | undefined = customTheme
              ? {
                  ...(customTheme.backgroundColor
                    ? ({ '--bg-color': customTheme.backgroundColor } as React.CSSProperties)
                    : {}),
                  ...(customTheme.textColor
                    ? ({ '--text-color': customTheme.textColor } as React.CSSProperties)
                    : {}),
                }
                : undefined

            return (
              <div
                key={index}
                className={isAfterNavigation ? 'pt-[64px] md:pt-[72px] lg:pt-[78px]' : ''}
                style={cssVarStyle}
              >
                <Block
                  {...block}
                  disableInnerContainer={true}
                  mode={finalMode}
                  {...(navTheme ? { theme: navTheme } : {})}
                />
              </div>
            )
          }

          return null
        })}
      </Fragment>
    )
  }

  return null
}