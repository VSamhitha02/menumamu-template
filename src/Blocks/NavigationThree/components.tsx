'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Media, Page } from '@/payload-types'
import { cn } from '@/lib/utils'

type NavigationBlockData = Extract<Page['layout'][number], { blockType: 'navigation' }>

interface NavigationRendererProps extends NavigationBlockData {
  disableInnerContainer?: boolean
  colorScheme?: string
  className: string
  inlineStyle?: string
}

const NavigationThreeBlock: React.FC<NavigationRendererProps> = ({
  logo,

  links,
  buttons,
  colorScheme,
  className,
  inlineStyle,
}) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  console.log('colorScheme', colorScheme)
  const parseStyleString = (styleString?: string) => {
  if (!styleString) return {}

  return Object.fromEntries(
    styleString
      .split(';')
      .filter(Boolean)
      .map((style) => {
        const [key, value] = style.split(':')

        return [
          key
            .trim()
            .replace(/-([a-z])/g, (_, char) => char.toUpperCase()),
          value.trim(),
        ]
      }),
  )
}
  return (
    <nav
      className={`fixed top-0 left-0 z-[1000] w-full shadow transition-all duration-300  navbar`}
    style={parseStyleString(inlineStyle)}>
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src={(logo.image as Media)?.url || ''}
              alt={logo.alt || 'Logo'}
              width={80}
              height={80}
              className="h-auto w-[80px] transition-transform duration-300 hover:scale-110 md:w-[100px]"
            />
          </Link>
        </div>
        <h1>This is heading</h1>

        {/* Hamburger */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="block text-2xl md:hidden"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? '✖' : '☰'}
        </button>

        {/* Links */}
        <ul
          className={cn(
            isMobileMenuOpen ? 'flex' : 'hidden',
            'w-full flex-col items-center theme-link gap-6 pt-4 text-center md:flex md:w-auto md:flex-row md:gap-6 md:pt-0',
          )}
        >
          {links?.map((link, index) => (
            <li key={index}>
              <Link
                href={link.url || '#'}
                className="text-base  font-medium transition-opacity hover:opacity-80"
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div
          className={cn(
            isMobileMenuOpen ? 'flex' : 'hidden',
            'w-full flex-col items-center gap-4 pt-4 md:flex md:w-auto md:flex-row md:pt-0',
          )}
        >
          {buttons?.map((button, index) => {
            if (!button.url) return null

            return (
              <Link
                key={index}
                href={button.url}
                className={
                  'rounded-md px-5 py-2 text-base font-bold shadow transition-transform btn-primary duration-300 hover:-translate-y-0.5 btn-outline'
                }
              >
                {button.text}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default NavigationThreeBlock
