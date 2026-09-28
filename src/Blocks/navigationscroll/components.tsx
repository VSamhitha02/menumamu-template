'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, User, ChevronDown, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import type { Media, Page } from '@/payload-types'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type NavigationBlockData = Extract<Page['layout'][number], { blockType: 'navigation' }>

interface SubMenuItem {
  text: string
  url: string
}

interface MenuItem {
  text: string
  url?: string
  submenu?: SubMenuItem[]
}

export interface NavigationTheme {
  navbar?: { textColor?: string | null; backgroundColor?: string | null }
  variants?: {
    fill?: { textColor?: string | null; backgroundColor?: string | null }
    outline?: { textColor?: string | null; borderColor?: string | null; backgroundColor?: string | null }
  }
}

interface NavigationRendererProps extends Partial<NavigationBlockData> {
  disableInnerContainer?: boolean
  theme?: NavigationTheme
  menu?: MenuItem[]
  className?: string
  inlineStyle?: string
}

interface CurrentUser {
  id: string
  name?: string
  email: string
}

const NavigationOneBlock: React.FC<NavigationRendererProps> = (props) => {
  const { logo, links, buttons, menu, className = '' } = props

  const theme: NavigationTheme = props.theme || {}

  const pathname = usePathname()
  const restaurant = pathname.split('/')[1] || ''

  const [user, setUser] = useState<CurrentUser | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Dynamic Theme Colors
  const navBg = theme.navbar?.backgroundColor || '#000000'
  const navText = theme.navbar?.textColor || '#FFFFFF'

  const fillBg = theme.variants?.fill?.backgroundColor
  const fillText = theme.variants?.fill?.textColor

  const outlineText = theme.variants?.outline?.textColor
  const outlineBorder = theme.variants?.outline?.borderColor
  const outlineBg = theme.variants?.outline?.backgroundColor || 'transparent'

  // CSS variables map matching NavigationBlock
  const cssVariables = {
    '--nav-bg': navBg,
    '--nav-text': navText,
    '--btn-fill-bg': fillBg || 'var(--primary, #000)',
    '--btn-fill-text': fillText || 'var(--primary-foreground, #fff)',
    '--btn-outline-text': outlineText || navText,
    '--btn-outline-border': outlineBorder || navText,
    '--btn-outline-bg': outlineBg,
  } as React.CSSProperties

  const fillButtonStyle: React.CSSProperties = {
    ...(fillBg ? { backgroundColor: fillBg } : {}),
    ...(fillText ? { color: fillText } : {}),
  }

  const outlineButtonStyle: React.CSSProperties = {
    backgroundColor: outlineBg,
    ...(outlineText ? { color: outlineText } : { color: navText }),
    ...(outlineBorder
      ? { borderColor: outlineBorder, borderWidth: '1px', borderStyle: 'solid' }
      : { borderColor: navText, borderWidth: '1px', borderStyle: 'solid' }),
  }

  const resolveUrl = (rawUrl: any) => {
    if (!rawUrl) return '#'
    if (typeof rawUrl === 'string') return rawUrl
    if (typeof rawUrl === 'object' && rawUrl.url) return rawUrl.url
    return '#'
  }

  useEffect(() => {
    let active = true
    async function fetchUser() {
      try {
        const res = await fetch('/api/users/me', { credentials: 'include' })
        if (res.ok) {
          const data = (await res.json()) as { user?: CurrentUser | null }
          if (active) setUser(data?.user ?? null)
        } else if (active) {
          setUser(null)
        }
      } catch {
        if (active) setUser(null)
      } finally {
        if (active) setCheckingAuth(false)
      }
    }
    fetchUser()
    return () => {
      active = false
    }
  }, [pathname])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleLogout() {
    try {
      await fetch('/api/users/logout', { method: 'POST', credentials: 'include' })
    } catch {
    } finally {
      setUser(null)
      setDropdownOpen(false)
      const currentPath = encodeURIComponent(window.location.pathname)
      window.location.href = `/login?redirect=${currentPath}`
    }
  }

  const RenderLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <ul
      className={cn(
        'list-none m-0 p-0 items-center',
        mobile ? 'flex flex-col items-center gap-4' : 'flex flex-row gap-6 lg:gap-8'
      )}
    >
      {/* Links */}
      {links?.map((link, index) => {
        const rawUrl = resolveUrl(link.url)
        const href = rawUrl.startsWith('/') ? rawUrl : `/${restaurant}${rawUrl}`

        return (
          <li key={`link-${index}`} className={cn(mobile ? 'w-full text-center' : 'w-auto')}>
            <Link
              href={href}
              style={{ color: navText }}
              className={cn(
                'nav-link font-medium block transition-opacity hover:opacity-80',
                mobile ? 'text-lg py-2' : 'text-sm lg:text-base py-1'
              )}
            >
              {link.text}
            </Link>
          </li>
        )
      })}

      {/* Menu / Dropdown Items */}
      {menu?.map((menuItem, index) => (
        <li key={`menu-${index}`} className={cn(mobile ? 'w-full text-center' : 'w-auto')}>
          {menuItem.submenu && menuItem.submenu.length > 0 ? (
            <DropdownMenu
              open={openMenuIndex === index}
              onOpenChange={(open) => setOpenMenuIndex(open ? index : null)}
            >
              <DropdownMenuTrigger
                style={{ color: navText }}
                className={cn(
                  'nav-link flex items-center gap-1 font-medium bg-transparent border-none cursor-pointer outline-none transition-opacity hover:opacity-80 p-0',
                  mobile ? 'text-lg py-2 w-full justify-center' : 'text-sm lg:text-base py-1'
                )}
              >
                {menuItem.text}
                <ChevronDown className="h-4 w-4 opacity-70" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" className="w-48 shadow-lg z-50">
                {menuItem.submenu.map((subItem, subIndex) => (
                  <DropdownMenuItem key={subIndex} asChild>
                    <Link
                      href={resolveUrl(subItem.url)}
                      className="w-full block px-3 py-2 text-sm cursor-pointer"
                    >
                      {subItem.text}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href={resolveUrl(menuItem.url)}
              style={{ color: navText }}
              className={cn(
                'nav-link font-medium block transition-opacity hover:opacity-80',
                mobile ? 'text-lg py-2' : 'text-sm lg:text-base py-1'
              )}
            >
              {menuItem.text}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )

  const filteredButtons = buttons?.filter((b) => b.text?.toLowerCase() !== 'sign in')

  const RenderButtons = ({ mobile = false }: { mobile?: boolean }) => (
    <div
      className={cn(
        mobile ? 'flex flex-col items-center gap-4 w-full' : 'flex flex-row items-center gap-3 lg:gap-4'
      )}
    >
      {filteredButtons?.map((button, index) => {
        const rawUrl = resolveUrl(button.url)
        const href = rawUrl.startsWith('#') || rawUrl.startsWith('/') ? rawUrl : '/' + rawUrl

        const isOutline = button.style === 'outline'
        const buttonStyle = isOutline ? outlineButtonStyle : fillButtonStyle

        return (
          <Button
            type="button"
            key={index}
            asChild
            style={buttonStyle}
            className={cn(
              'font-medium shadow-none transition-opacity hover:opacity-90',
              mobile ? 'w-full h-10 px-5 text-[14px] rounded-md' : 'h-10 px-5 text-[14px] rounded-md',
              isOutline ? 'btn-outline' : 'btn-fill'
            )}
          >
            <Link href={href}>{button.text}</Link>
          </Button>
        )
      })}
    </div>
  )

  const UserMenu = () => {
    if (checkingAuth) return null

    if (!user) {
      return (
        <Link href={`/login?redirect=${encodeURIComponent(pathname)}`}>
          <Button
            type="button"
            style={fillButtonStyle}
            className="h-10 px-5 text-[14px] rounded-md font-medium btn-fill hover:opacity-90 transition-opacity"
          >
            Sign In
          </Button>
        </Link>
      )
    }

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdownOpen((o) => !o)}
          style={{ color: navText, borderColor: `${navText}33`, backgroundColor: `${navText}15` }}
          className="nav-icon-button flex items-center gap-2 px-3 py-2 rounded-md border backdrop-blur-sm transition-colors"
        >
          <span className="flex items-center justify-center h-7 w-7 rounded-full bg-white/20">
            <User className="h-4 w-4" />
          </span>
          <ChevronDown className={cn('h-4 w-4 transition-transform', dropdownOpen && 'rotate-180')} />
        </button>

        {dropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg border py-1 z-50"
            style={fillButtonStyle}
          >
            <button
              type="button"
              onClick={handleLogout}
              style={fillButtonStyle}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-left btn-fill rounded-md"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <nav
      className={cn('fixed top-0 left-0 w-full z-50 navbar h-[64px] md:h-[72px] lg:h-[78px]', className)}
      style={{ ...cssVariables, backgroundColor: navBg, color: navText }}
    >
      <div className="max-w-[1230px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${restaurant}/home`} className="shrink-0 transition-transform hover:scale-105">
          <Image
            src={(logo?.image as Media)?.url || '/placeholder-logo.png'}
            alt={logo?.alt || 'Logo'}
            width={900}
            height={700}
            priority
            className="h-10 sm:h-11 md:h-10 lg:h-12 xl:h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop / Tablet Navigation */}
        <div className="hidden lg:flex items-center gap-5 lg:gap-6">
          <RenderLinks />
          <RenderButtons />
          <UserMenu />
        </div>

        {/* Mobile Navigation Sheet */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                style={{ color: navText, borderColor: `${navText}33` }}
                className="nav-icon-button group p-3 rounded-md border backdrop-blur-sm bg-transparent hover:bg-white/10"
              >
                <Menu className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              style={{ ...cssVariables, backgroundColor: navBg, color: navText }}
              className="w-full max-w-[360px] h-full mobile-nav-sheet flex flex-col p-0 border-none"
            >
              {/* Sheet User Header */}
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                {!checkingAuth && user ? (
                  <div className="flex items-center gap-3 nav-link" style={{ color: navText }}>
                    <div className="flex items-center justify-center p-2 rounded-full bg-white/10 w-10 h-10">
                      <User className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium truncate max-w-[150px]">
                      {user.name || user.email}
                    </span>
                  </div>
                ) : !checkingAuth ? (
                  <Link
                    href={`/login?redirect=${encodeURIComponent(pathname)}`}
                    className="flex items-center gap-3 nav-link"
                    style={{ color: navText }}
                  >
                    <div className="flex items-center justify-center p-2 rounded-full bg-white/10 w-10 h-10">
                      <User className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">Sign In</span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-6 px-6 mt-4 text-lg font-medium">
                <RenderLinks mobile />
              </div>

              {/* Bottom Mobile Action Buttons */}
              <div className="mt-auto px-5 pb-6 flex flex-col gap-4">
                <RenderButtons mobile />
                {!checkingAuth &&
                  (user ? (
                    <Button
                      type="button"
                      onClick={handleLogout}
                      style={fillButtonStyle}
                      className="w-full flex items-center justify-center gap-2 py-3 h-auto font-medium btn-fill"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  ) : (
                    <Link href={`/login?redirect=${encodeURIComponent(pathname)}`}>
                      <Button
                        type="button"
                        style={fillButtonStyle}
                        className="w-full py-3 h-auto font-medium btn-fill"
                      >
                        Sign In
                      </Button>
                    </Link>
                  ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

export default NavigationOneBlock