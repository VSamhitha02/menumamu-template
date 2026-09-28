'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Media, Page } from '@/payload-types'
import './Navigation.css'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

type NavigationBlockData = Extract<Page['layout'][number], { blockType: 'navigation' }>
// Define additional interfaces needed for dropdown menu
interface SubMenuItem {
  text: string
  url: string
}

interface MenuItem {
  text: string
  url?: string
  submenu?: SubMenuItem[]
}

interface NavigationRendererProps extends NavigationBlockData {
  disableInnerContainer?: boolean
  menu?: MenuItem[]
  className: string
  inlineStyle?: string
}

const NavigationBlock: React.FC<NavigationRendererProps> = ({
  logo,
  links,
  buttons,
  menu,
  className,
  inlineStyle,
}) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null)
  // Mapping theme keys to CSS classes.
  const themeClasses: Record<string, string> = {
    'black-theme': 'navbar-black',
    'white-theme': 'navbar-white',
    'orange-theme': 'navbar-orange',
    'green-theme': 'navbar-green',
  }

  // Use provided theme; default to 'orange-theme' if not found.
  // const themeClass = themeClasses[theme] || themeClasses['orange-theme']

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
  }
  const onMenuItemClick = (index: number) => {
    console.log(`Menu item ${index} clicked`)
    // Add any additional logic here
  }
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
    <nav className={`navbar navigationdropdown`} style={parseStyleString(inlineStyle)}>
      <div className="navbar-inner">
        <div className="navbar-logo">
          <Link href="/">
            <Image
              // src={`/media/${(logo.image as Media).filename}`}
              src={(logo.image as Media)?.url || ''}
              alt={logo.alt}
              width={80}
              height={80}
              className="responsive-logo"
            />
          </Link>
        </div>
        <div className="navbar-menu-toggle" onClick={toggleMobileMenu}>
          <span className="hamburger-icon">{isMobileMenuOpen ? '✖' : '☰'}</span>
        </div>
        <ul className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
          {links?.map((link, index) => (
            <li key={index} className="inline-flex items-center">
              <a
                href={link.url}
                className="px-3 py-2 text-base font-medium hover:bg-opacity-20 hover:bg-gray-700 rounded-md"
              >
                {link.text}
              </a>
            </li>
          ))}
          {menu?.map((menuItem, index) => (
            <div key={`menu-${index}`} className="relative inline-flex items-center">
              {menuItem.submenu ? (
                <DropdownMenu
                  open={openMenuIndex === index}
                  onOpenChange={(open) => setOpenMenuIndex(open ? index : null)}
                >
                  <DropdownMenuTrigger className="flex items-center space-x-1 px-3 py-2 text-base font-medium hover:bg-opacity-20 hover:bg-gray-700 rounded-md transition-colors">
                    <span>{menuItem.text}</span>
                    <ChevronDown
                      size={16}
                      className={
                        openMenuIndex === index
                          ? 'transform rotate-180 transition-transform'
                          : 'transition-transform'
                      }
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="bg-white rounded-md shadow-lg py-1 mt-1 min-w-[200px] text-gray-800 border border-gray-200"
                    style={{ maxHeight: '300px', overflowY: 'auto', backgroundColor: 'white' }}
                  >
                    {menuItem.submenu.map((subItem, subIndex) => (
                      <DropdownMenuItem
                        key={subIndex}
                        className="focus:bg-gray-100 focus:outline-none"
                      >
                        <Link
                          href={subItem.url}
                          className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                        >
                          {subItem.text}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  onClick={() => onMenuItemClick(index)}
                  className="px-3 py-2 text-base font-medium hover:opacity-80 transition-opacity"
                >
                  {menuItem.text}
                </button>
              )}
            </div>
          ))}
        </ul>

        <div className={`navbar-buttons ${isMobileMenuOpen ? 'open' : ''}`}>
          {buttons?.map((button, index) => {
            const btnClass = button.style === 'fill' ? 'btn-fill' : 'btn-outline'
            const href = button.url.startsWith('#')
              ? button.url
              : button.url.startsWith('/')
                ? button.url
                : '/' + button.url
            return (
              <Link key={index} href={href} className={`btn ${btnClass}`}>
                {button.text}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default NavigationBlock
