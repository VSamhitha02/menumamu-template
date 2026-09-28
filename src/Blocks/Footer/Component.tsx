'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './Footer.css'
import { Media } from '@/payload-types'
import { Facebook, Instagram, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface ThemeConfig {
  className?: string
  textColor?: string
  backgroundColor?: string
  containerBackground?: string
  headingColor?: string
  variants?: {
    fill?: {
      textColor?: string
      backgroundColor?: string
    }
    outline?: {
      textColor?: string
      borderColor?: string
      backgroundColor?: string
    }
  }
}

interface FooterBlockCustom {
  logo?: Media
  links: {
    label: string
    url: string
  }[]
  socialLinks?: {
    platform: 'facebook' | 'instagram' | 'youtube'
    url: string
  }[]
  copyright: string
}

type FooterRendererProps = FooterBlockCustom & {
  blockType: 'footer'
  className?: string
  inlineStyle?: string
  disableInnerContainer?: boolean
  theme?: ThemeConfig
  themes?: ThemeConfig[]
}

const getIcon = (platform: string) => {
  switch (platform) {
    case 'facebook':
      return <Facebook size={16} />
    case 'instagram':
      return <Instagram size={16} />
    case 'youtube':
      return <Youtube size={16} />
    default:
      return null
  }
}

const FooterRenderer: React.FC<FooterRendererProps> = ({
  logo,
  links,
  socialLinks,
  copyright,
  className = '',
  inlineStyle,
  theme,
  themes,
}) => {
  // 1. Resolve active theme configuration from Payload CMS (identical to ServiceOptionsRenderer)
  const activeTheme =
    theme ||
    themes?.find(
      (t) =>
        t.className === className ||
        t.className === 'footer'
    )

  const parseStyleString = (styleString?: string) => {
    if (!styleString) return {}

    return Object.fromEntries(
      styleString
        .split(';')
        .filter(Boolean)
        .map((style) => {
          const [key, value] = style.split(':')

          if (!key || !value) return []

          return [
            key
              .trim()
              .replace(/-([a-z])/g, (_, char) => char.toUpperCase()),
            value.trim(),
          ]
        })
        .filter((entry) => entry.length === 2)
    )
  }

  // 2. Derive dynamic fill styles matching button themes
  const dynamicFillStyle: React.CSSProperties = {
    ...(activeTheme?.variants?.fill?.backgroundColor && {
      backgroundColor: activeTheme.variants.fill.backgroundColor,
    }),
    ...(activeTheme?.variants?.fill?.textColor && {
      color: activeTheme.variants.fill.textColor,
    }),
  }

  const footerStyle: React.CSSProperties = {
    ...(activeTheme?.backgroundColor && {
      backgroundColor: activeTheme.backgroundColor,
    }),
    ...(activeTheme?.textColor && {
      color: activeTheme.textColor,
    }),
    ...parseStyleString(inlineStyle),
  }

  
   return (
  <footer
    className={`w-full footer mt-0 py-6 overflow-hidden ${className}`}
    style={footerStyle}
  >
    <div className="max-w-[1315px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        {/* Icons styled using the exact Button component & theme classes */}
        <div className="flex items-center justify-center w-full md:w-auto gap-3 md:ml-9 md:pt-5 md:pb-3">
          {socialLinks?.filter(item => item?.url).map((item, i) => (
            <Link
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.platform}
            >
              <Button
                size="icon"
                style={dynamicFillStyle}
                className="btn-fill h-9 w-9 p-2 rounded-lg flex items-center justify-center transition-all duration-200 hover:opacity-90 active:scale-95"
              >
                {getIcon(item.platform)}
              </Button>
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto text-center md:text-right md:mr-10">

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4">
            {links?.filter(l => l?.label && l?.url).map((link, i) => (
              <Link
                key={i}
                href={link.url}
                className="text-sm hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-medium md:text-base leading-relaxed break-words pb-2">
            {copyright}
          </p>

        </div>
      </div>
    </footer>
  )
}

export default FooterRenderer