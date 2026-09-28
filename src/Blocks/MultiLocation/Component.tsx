'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import './MultipleLocation.css'

export interface MultipleLocationsBlock {
  title: string
  locations?: {
    id: number
    name: string
    address: string
    hours: string
    image?: { url: string }
  }[]
  rewardsTitle?: string
  rewardsDescription?: string
  buttonText?: string
  className?: string
  inlineStyle?: string
  btn_style?: 'fill' | 'outline'
}

type MultipleLocationsRendererProps = MultipleLocationsBlock & {
  disableInnerContainer?: boolean
}

const MultipleLocationsRenderer: React.FC<MultipleLocationsRendererProps> = (
  props,
) => {
  const {
    title,
    locations = [],
    rewardsTitle,
    rewardsDescription,
    buttonText,
    className = '',
    inlineStyle,
    btn_style = 'fill',
  } = props

  const [activeLocation, setActiveLocation] = useState(
    locations[0] || null,
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
        .filter((entry) => entry.length === 2),
    )
  }

  const selectedLocation = activeLocation || locations[0]

  return (
    <section
      id="multiple-locations"
      className={`py-16 ${className}`}
      style={parseStyleString(inlineStyle)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TITLE */}
        <h2 className="text-4xl font-bold text-center mb-12 !text-[color:var(--heading-color)]">
          {title || 'Locations'}
        </h2>

        {/* MAIN LOCATIONS AREA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-stretch">

          {/* LEFT SIDE */}
          <div className="flex flex-col min-w-0">

            <h3 className="text-2xl font-semibold mb-4 !text-[color:var(--heading-color)]">
              Our Locations
            </h3>

            <div className="space-y-4 flex-1">
              {locations.length > 0 ? (
                locations.map((location) => {
                  const isSelected = selectedLocation?.id === location.id

                  return (
                    <button
                      key={location.id}
                      type="button"
                      onClick={() => setActiveLocation(location)}
                      className="w-full text-left p-4 rounded-md transition-all duration-300 shadow-md btn-outline border-solid"
                      style={{
                        borderWidth: isSelected ? '2px' : '1px',
                      }}
                    >
                      <h4 className="font-semibold text-lg !text-[color:var(--heading-color)]">
                        {location.name}
                      </h4>

                      <p className="text-sm !text-[color:var(--description-color)]">
                        {location.address}
                      </p>
                    </button>
                  )
                })
              ) : (
                <p className="text-gray-500 !text-[color:var(--description-color)]">
                  No locations added yet.
                </p>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col min-w-0 h-full">

            {/* LOCATION DETAILS */}
            <div className="p-6 rounded-lg shadow-md">

              <h3 className="text-2xl font-semibold mb-4 !text-[color:var(--heading-color)]">
                {selectedLocation?.name || 'Select Location'}
              </h3>

              <p className="mb-3 flex items-start !text-[color:var(--description-color)]">
                <MapPin
                  className="mr-2 mt-1 flex-shrink-0"
                  size={18}
                />

                <span>
                  {selectedLocation?.address || 'N/A'}
                </span>
              </p>

              <p className="!text-[color:var(--description-color)]">
                <span className="font-semibold !text-[color:var(--heading-color)]">
                  Hours:
                </span>{' '}
                {selectedLocation?.hours || 'N/A'}
              </p>

            </div>

            {/* IMAGE */}
            {selectedLocation?.image?.url && (
              <div className="mt-4 relative flex-1 min-h-0 w-full rounded-lg overflow-hidden">

                <Image
                  src={selectedLocation.image.url}
                  alt={`${selectedLocation.name || 'Location'} image`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />

              </div>
            )}
          </div>
        </div>

        {/* REWARDS */}
        <div className="p-6 rounded-lg shadow-md">

          <h3 className="text-2xl font-semibold mb-4 !text-[color:var(--heading-color)]">
            {rewardsTitle || 'Rewards Program'}
          </h3>

          <p className="mb-4 !text-[color:var(--description-color)]">
            {rewardsDescription ||
              'Join our loyalty program and earn points with every visit. Redeem your points for exclusive discounts, free menu items, and special experiences.'}
          </p>

          <button
            type="button"
            className={`${
              btn_style === 'fill'
                ? 'btn-fill'
                : 'btn-outline'
            } px-6 py-3 rounded-md text-lg transition duration-300`}
          >
            {buttonText || 'Join Now'}
          </button>

        </div>
      </div>
    </section>
  )
}

export default MultipleLocationsRenderer