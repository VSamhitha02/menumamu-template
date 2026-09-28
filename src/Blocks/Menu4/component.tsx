'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Utensils,
  ShoppingBag,
  MapPin,
  Users,
  ArrowRight,
} from 'lucide-react'

export interface MenuItem {
  title: string
  description: string
  buttonText?: string
  buttonLink?: string
  iconName?: 'kitchen' | 'pantry' | 'location' | 'groups'
  backgroundColor?: string
  textColor?: string
}

export interface MenuBlockData {
  title?: string
  className?: string
  inlineStyle?: string
  items?: MenuItem[]
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
}

const defaultItems: MenuItem[] = [
  {
    title: 'Dine With Us',
    description:
      'Enjoy hot, authentic South Indian delicacies freshly prepared in a hygienic, warm atmosphere.',
    buttonText: 'Find Nearby Outlet',
    buttonLink: '/menu',
    iconName: 'kitchen',
    backgroundColor: '#8B2224',
  },

  {
    title: 'Taaza Pantry',
    description:
      'Take home freshly ground batters, signature chutneys, and ready-to-cook kitchen essentials.',
    buttonText: 'Order Express',
    buttonLink: '/store',
    iconName: 'pantry',
    backgroundColor: '#2D5A27',
  },

  {
    title: 'Bulk & Event Catering',
    description:
      'Bring live food counters and authentic flavors to your private celebrations or corporate events.',
    buttonText: 'Request Quote',
    buttonLink: '/bulk-order',
    iconName: 'groups',
    backgroundColor: '#211D1C',
  },

  {
    title: 'Visit Our Kitchens',
    description:
      'Locate our nearest branch, check live opening hours, and get step-by-step directions.',
    buttonText: 'View Map',
    buttonLink: '/locations',
    iconName: 'location',
    backgroundColor: '#F3EFE6',
  },
]

export function MenuFourRender({
  title,
  items = defaultItems,
  className = '',
  inlineStyle,
}: MenuBlockData) {
  /**
   * Convert Payload inline style string
   * into React style object.
   */
  const parseStyleString = (styleString?: string) => {
    if (!styleString) return {}

    return Object.fromEntries(
      styleString
        .split(';')
        .filter(Boolean)
        .map((style) => {
          const [key, ...valueParts] = style.split(':')
          const value = valueParts.join(':')

          return [
            key
              .trim()
              .replace(/-([a-z])/g, (_, char) =>
                char.toUpperCase(),
              ),
            value.trim(),
          ]
        }),
    )
  }

  /**
   * Render icons.
   */
  const renderIcon = (
    iconName?: string,
    index?: number,
  ) => {
    const iconProps = {
      className: 'w-[21px] h-[21px] stroke-[1.8]',
    }

    switch (iconName) {
      case 'kitchen':
        return <Utensils {...iconProps} />

      case 'pantry':
        return <ShoppingBag {...iconProps} />

      case 'location':
        return <MapPin {...iconProps} />

      case 'groups':
        return <Users {...iconProps} />

      default:
        if (index === 0) {
          return <Utensils {...iconProps} />
        }

        if (index === 1) {
          return <ShoppingBag {...iconProps} />
        }

        if (index === 2) {
          return <Users {...iconProps} />
        }

        return <MapPin {...iconProps} />
    }
  }

  /**
   * Format links.
   */
  const formatLink = (url?: string) => {
    if (!url) return '#'

    return url.startsWith('#') || url.startsWith('/')
      ? url
      : `/${url}`
  }

  return (
    <>
      <section
        className={`menu-four-section w-full py-12 lg:py-16 ${className}`}
        style={parseStyleString(inlineStyle)}
      >
        <div className="menu-four-container">

          {/* ================================
              SECTION TITLE
             ================================= */}
          {title && (
            <motion.h2
              initial={{
                opacity: 0,
                y: -15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.4,
              }}
              className="
                mb-10
                text-center
                text-3xl
                font-extrabold
                tracking-tight
                text-white
                sm:text-4xl
                !text-[color:var(--heading-color)]
              "
            >
              {title}
            </motion.h2>
          )}

          {/* ================================
              FOUR CARD GRID
             ================================= */}
          <motion.div
            className="menu-four-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
          >
            {items.map((item, index) => {
              const cardBg =
                item.backgroundColor ||
                defaultItems[
                  index % defaultItems.length
                ].backgroundColor

              const isLightBg =
                cardBg?.toLowerCase() === '#f3efe6'

              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  style={{
                    backgroundColor: cardBg,

                    ...(item.textColor
                      ? {
                          color: item.textColor,
                        }
                      : {}),
                  }}
                  className={`
                    menu-four-card

                    flex
                    flex-col
                    justify-between

                    rounded-[13px]

                    p-8

                    ${
                      isLightBg
                        ? 'text-zinc-900'
                        : 'text-white'
                    }
                  `}
                >
                  {/* ==========================
                      CARD CONTENT
                     ========================== */}
                  <div>

                    {/* Icon */}
                    <div
                      className={`
                        flex
                        h-[50px]
                        w-[50px]
                        shrink-0
                        items-center
                        justify-center

                        rounded-[12px]

                        border

                        ${
                          isLightBg
                            ? `
                              border-zinc-300
                              bg-black/[0.04]
                              text-zinc-800
                            `
                            : `
                              border-white/20
                              bg-white/[0.10]
                              text-white
                            `
                        }
                      `}
                    >
                      {renderIcon(
                        item.iconName,
                        index,
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className={`
                        mt-6
                        mb-2.5

                        text-[23px]
                        font-black
                        leading-[1.15]
                        tracking-[-0.4px]

                        ${
                          isLightBg
                            ? 'text-zinc-900'
                            : 'text-white'
                        }
                      `}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`
                        max-w-[290px]

                        text-[16px]
                        leading-[1.6]

                        ${
                          isLightBg
                            ? 'text-zinc-700'
                            : 'text-white/85'
                        }
                      `}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* ==========================
                      BUTTON
                     ========================== */}
                  <div className="mt-6">
                    <Link
                      href={formatLink(
                        item.buttonLink,
                      )}
                      className="
                        group
                        inline-flex
                        items-center
                        gap-2

                        text-[16px]
                        font-extrabold
                        leading-none
                      "
                    >
                      <span>
                        {item.buttonText ||
                          'Learn More'}
                      </span>

                      <ArrowRight
                        className="
                          h-[18px]
                          w-[18px]

                          transition-transform
                          duration-200

                          group-hover:translate-x-1
                        "
                      />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* =================================================
          RESPONSIVE LAYOUT
         ================================================= */}
      <style jsx global>{`

        /* ================================================
           BASE
           ================================================ */

        .menu-four-container {
          width: 100%;
          margin-left: auto;
          margin-right: auto;

          padding-left: 20px;
          padding-right: 20px;
        }

        .menu-four-grid {
          display: grid !important;

          width: 100% !important;

          grid-template-columns: 1fr !important;

          gap: 20px !important;
        }

        .menu-four-card {
          width: 100%;
          min-width: 0;
          min-height: 310px;
        }


        /* ================================================
           TABLET
           ================================================ */

        @media (min-width: 768px) {

          .menu-four-container {
            padding-left: 32px;
            padding-right: 32px;
          }

          .menu-four-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr))
              !important;

            gap: 20px !important;
          }
        }


        /* ================================================
           DESKTOP
           
           MATCH NAVIGATION WIDTH
           
           Navigation in your screenshot:
           
           Logo start  ≈ 148px
           Sign In end ≈ 1330px
           
           Content width ≈ 1182px
           ================================================ */

        @media (min-width: 1024px) {

          .menu-four-container {
            width: 100%;
            max-width: 1182px;

            padding-left: 0;
            padding-right: 0;

            margin-left: auto;
            margin-right: auto;
          }

          .menu-four-grid {
            grid-template-columns:
              repeat(4, minmax(0, 1fr))
              !important;

            gap: 22px !important;
          }

          .menu-four-card {
            width: 100%;
            height: 310px;
            min-height: 310px;
          }
        }


        /* ================================================
           LARGE DESKTOP
           
           Keep EXACT SAME width.
           Do NOT increase it.
           ================================================ */

        @media (min-width: 1280px) {

          .menu-four-container {
            max-width: 1182px;

            padding-left: 0;
            padding-right: 0;
          }

          .menu-four-grid {
            grid-template-columns:
              repeat(4, minmax(0, 1fr))
              !important;

            gap: 22px !important;
          }
        }


        /* ================================================
           VERY LARGE DESKTOP
           
           Still keep same navigation width.
           ================================================ */

        @media (min-width: 1600px) {

          .menu-four-container {
            max-width: 1182px;
          }

          .menu-four-grid {
            grid-template-columns:
              repeat(4, minmax(0, 1fr))
              !important;

            gap: 22px !important;
          }
        }


        /* ================================================
           MOBILE
           ================================================ */

        @media (max-width: 767px) {

          .menu-four-container {
            width: 100%;
            max-width: 100%;

            padding-left: 20px;
            padding-right: 20px;
          }

          .menu-four-card {
            min-height: 310px;
            height: auto;
          }
        }

      `}</style>
    </>
  )
}