import React from 'react'
import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import { cn } from '@/utilities/ui'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'
interface MediaImage {
  url: string
  alt?: string
  width?: number
  height?: number
  caption?: string
}

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
  inlineStyle?: string

}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    inlineStyle,
  } = props

  // Cast media to any so we can access the caption property.
  // const caption = media && typeof media === 'object' ? (media as any)?.caption : undefined
  const image = (media && typeof media === 'object' ? media : undefined) as MediaImage | undefined
const caption = image?.caption

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
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
      style={parseStyleString(inlineStyle)}
    >
      {(media || staticImage) && (
        <>
          {media ? (
            <Image
              className={cn('border border-border rounded-[0.8rem]', imgClassName)}
              // src={(media as any).url}
              // alt={(media as any).alt || 'Media'}
              // width={(media as any).width || 800}
              // height={(media as any).height || 600}
                src={image?.url || ''}
                alt={image?.alt || 'Media'}
                width={image?.width || 800}
                height={image?.height || 600}
            />
          ) : (
            <Image
              className={cn('border border-border rounded-[0.8rem]', imgClassName)}
              src={staticImage?.src as string}
              alt="Static media"
              width={800}
              height={600}
            />
          )}
        </>
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <p>{caption}</p>
        </div>
      )}
    </div>
  )
}
