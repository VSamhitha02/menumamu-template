// 'use client'
// import React, { useRef, useState, useEffect } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// // import { ChevronLeft, ChevronRight } from 'lucide-react'
// import './Menu.css'

// export interface Menu {
//   title: string
//   description?: string
//   rating: string
//   price: string
//   image?: {
//     filename: string
//   }
//   buttonText: string
//   buttonLink: string
// }

// export interface Category {
//   categoryName: string
//   items: Menu[]
// }

// export interface FoodCourtBlockData {
//
//   title: string
//   categories: Category[]
// }

// type FoodCourtRendererProps = FoodCourtBlockData

// const MenuTwoRenderer: React.FC<FoodCourtRendererProps> = ({ theme, title, categories }) => {
//   const themeClasses: Record<string, string> = {
//     'black-theme': 'menu-black',
//     'white-theme': 'menu-white',
//     'orange-theme': 'menu-orange',
//     'green-theme': 'menu-green',
//   }

//   const themeClass = themeClasses[theme] || themeClasses['orange-theme']
//   const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.categoryName)
//   const scrollRef = useRef<HTMLDivElement>(null)
//   const [showLeft, setShowLeft] = useState(false)
//   const [showRight, setShowRight] = useState(true)

//   const handleCategorySelect = (categoryName: string) => {
//     setSelectedCategory(categoryName)
//   }

//   const updateArrowVisibility = () => {
//     const container = scrollRef.current
//     if (!container) return

//     setShowLeft(container.scrollLeft > 0)
//     setShowRight(container.scrollLeft + container.clientWidth < container.scrollWidth - 5)
//   }

//   const scroll = (direction: 'left' | 'right') => {
//     if (scrollRef.current) {
//       const firstCard = scrollRef.current.querySelector('.menu-card') as HTMLDivElement
//       const scrollAmount = firstCard ? firstCard.offsetWidth + 32 : 500

//       scrollRef.current.scrollBy({
//         left: direction === 'left' ? -scrollAmount : scrollAmount,
//         behavior: 'smooth',
//       })
//     }
//   }

//   useEffect(() => {
//     const scrollContainer = scrollRef.current
//     if (!scrollContainer) return

//     updateArrowVisibility()
//     scrollContainer.addEventListener('scroll', updateArrowVisibility)

//     return () => scrollContainer.removeEventListener('scroll', updateArrowVisibility)
//   }, [selectedCategory, categories])

//   return (
//     <section className={`py-12 ${themeClass}`}>
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>

//         {/* Category Tabs */}
//         <div className="flex justify-center mb-6">
//           <div className="flex overflow-x-auto whitespace-nowrap space-x-4 px-6 py-3 rounded-full">
//             {categories.map((category) => (
//               <button
//                 key={category.categoryName}
//                 onClick={() => handleCategorySelect(category.categoryName)}
//                 className={`px-4 py-2 border-b-2 transition duration-200 font-medium bg-transparent text-gray-900 ${
//                   selectedCategory === category.categoryName
//                     ? 'border-gray-600 text-gray-900'
//                     : 'border-transparent hover:border-gray-600 hover:text-gray-700'
//                 }`}
//               >
//                 {category.categoryName}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Render selected category */}
//         {categories
//           .filter((category) => category.categoryName === selectedCategory)
//           .map((category) => {
//             return (
//               <div key={category.categoryName} className="mb-12">
//                 {/* Desktop and Tablet Scrollable Layout */}
//                 <div className="relative hidden md:block">
//                   {/* Left Navigation Arrow */}
//                   {/* {showLeft && (
//                     <button
//                       className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 text-gray-600 hover:bg-gray-100 transition z-10"
//                       onClick={() => scroll('left')}
//                     >
//                       <ChevronLeft size={24} />
//                     </button>
//                   )} */}

//                   <div
//                     ref={scrollRef}
//                     className="flex gap-8 w-max scroll-smooth overflow-x-auto scrollbar-hide pr-10"
//                     style={{
//                       scrollBehavior: 'smooth',
//                       WebkitOverflowScrolling: 'touch',
//                       msOverflowStyle: 'none',
//                       scrollbarWidth: 'none',
//                     }}
//                   >
//                     {category.items.map((menu, index) => (
//                       <div
//                         key={index}
//                         className="menu-card min-w-[300px] max-w-[300px] shrink-0 shadow-md rounded-lg overflow-hidden"
//                       >
//                         {menu.image && (
//                           <div className="bg-slate-50">
//                             <Image
//                               src={`/media/${menu.image.filename}`}
//                               alt={menu.title}
//                               width={400}
//                               height={300}
//                               className="w-full h-48 object-contain"
//                             />
//                           </div>
//                         )}
//                         <div className="p-4">
//                           <h3 className="text-xl font-semibold text-center mb-2">{menu.title}</h3>
//                           {menu.description && (
//                             <p className="text-gray-500 text-center mb-2">{menu.description}</p>
//                           )}
//                           {menu.rating && (
//                             <p className="text-gray-600 text-center mb-2">{menu.rating}</p>
//                           )}
//                           {menu.price && (
//                             <p className="text-gray-600 text-center mb-4">{menu.price}</p>
//                           )}
//                           {menu.buttonText && (
//                             <Link
//                               href={menu.buttonLink}
//                               className="bg-green-600 text-white px-4 py-2 rounded font-bold text-base transition duration-300 ease-in-out hover:bg-green-700 active:scale-95"
//                             >
//                               {menu.buttonText}
//                             </Link>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Right Navigation Arrow */}
//                   {/* {showRight && (
//                     <button
//                       onClick={() => scroll('right')}
//                       className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 text-gray-600 hover:bg-gray-100 transition z-10"
//                     >
//                       <ChevronRight size={24} />
//                     </button>
//                   )} */}
//                 </div>

//                 {/* Mobile Layout: Horizontal Scroll */}
//                 <div className="flex md:hidden overflow-x-auto space-x-4 snap-x scroll-smooth pb-4 -mx-4 px-4">
//                   {category.items.map((menu, index) => (
//                     <div
//                       key={index}
//                       className="menu-card min-w-[85%] max-w-[90%] snap-start shrink-0 shadow-md rounded-lg overflow-hidden"
//                     >
//                       {menu.image && (
//                         <div className="bg-slate-50">
//                           <Image
//                             src={`/media/${menu.image.filename}`}
//                             alt={menu.title}
//                             width={400}
//                             height={300}
//                             className="w-full h-48 object-contain"
//                           />
//                         </div>
//                       )}
//                       <div className="p-4">
//                         <h3 className="text-xl font-semibold mb-2 text-center">{menu.title}</h3>
//                         {menu.description && (
//                           <p className="text-gray-500 mb-2 text-center">{menu.description}</p>
//                         )}
//                         {menu.rating && (
//                           <p className="text-gray-600 mb-2 text-center">{menu.rating}</p>
//                         )}
//                         {menu.price && (
//                           <p className="text-gray-600 mb-4 text-center">{menu.price}</p>
//                         )}
//                         {menu.buttonText && (
//                           <Link
//                             href={menu.buttonLink}
//                             className="bg-green-600 text-white px-4 py-2 rounded font-bold text-base transition duration-300 ease-in-out hover:bg-green-700 active:scale-95"
//                           >
//                             {menu.buttonText}
//                           </Link>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )
//           })}
//       </div>
//     </section>
//   )
// }

// export default MenuTwoRenderer
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './Menu.css'
import { Media } from '@/payload-types'

export interface Menu {
  title: string
  description?: string
  rating: string
  price: string
  // image?: {
  //   filename: string
  // }
  image?: Media
  buttonText: string
  buttonLink: string
  btn_variant: 'fill' | 'outline'
}

export interface Category {
  categoryName: string
  items: Menu[]
}

export interface FoodCourtBlockData {
  title: string
  categories: Category[]
  className: string
  inlineStyle?: string
}

type FoodCourtRendererProps = FoodCourtBlockData

const MenuTwoRenderer: React.FC<FoodCourtRendererProps> = ({ title, categories, className, inlineStyle }) => {
  const themeClasses: Record<string, string> = {
    'black-theme': 'menu-black',
    'white-theme': 'menu-white',
    'orange-theme': 'menu-orange',
    'green-theme': 'menu-green',
  }

  // const themeClass = themeClasses[theme] || themeClasses['orange-theme']
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.categoryName)

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName)
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
    <section className={`py-12 ${className}`} style={parseStyleString(inlineStyle)}>
      {/* container */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>

        {/* Category Tabs */}
        <div className="flex justify-center mb-6">
          <div className="flex overflow-x-auto whitespace-nowrap space-x-4 px-6 py-3 rounded-full">
            {categories.map((category) => (
              <button
                key={category.categoryName}
                onClick={() => handleCategorySelect(category.categoryName)}
                className={`px-4 py-2 border-b-2 transition duration-200 font-medium bg-transparent text-gray-900 ${
                  selectedCategory === category.categoryName
                    ? 'border-gray-600 text-gray-900'
                    : 'border-transparent hover:border-gray-600 hover:text-gray-700'
                }`}
              >
                {category.categoryName}
              </button>
            ))}
          </div>
        </div>

        {/* Render selected category */}
        {categories
          .filter((category) => category.categoryName === selectedCategory)
          .map((category) => {
            return (
              <div key={category.categoryName} className="mb-12">
                {/* Desktop Grid Layout */}
                <div className="hidden lg:grid grid-cols-4 gap-6">
                  {category.items.map((menu, index) => (
                    <div
                      key={index}
                      className="
                    bg-white
                    rounded-xl
                    shadow-md
                    hover:shadow-lg
                    transition-all
                    duration-300
                    overflow-hidden
                    "
                    >
                      {menu.image && (
                        <div className="bg-slate-50">
                          <Image
                            // src={`/media/${menu.image.filename}`}
                            src={(menu.image as Media)?.url || ''}
                            alt={menu.title}
                            width={400}
                            height={300}
                            className="w-full h-48 object-contain"
                          />
                        </div>
                      )}
                      <div className="p-4 ">
                        <h3 className="text-xl font-semibold text-center mb-2">{menu.title}</h3>
                        {menu.description && (
                          <p className="text-gray-500 text-center mb-2">{menu.description}</p>
                        )}
                        {menu.rating && (
                          <p className="text-gray-600 text-center mb-2">{menu.rating}</p>
                        )}
                        {menu.price && (
                          <p className="text-gray-600 text-center mb-4">{menu.price}</p>
                        )}
                        {menu.buttonText && (
                          <Link
                            href={menu.buttonLink}
                            className={` ${menu.btn_variant === 'outline' ? 'btn-outline' : 'btn-fill'} inline-block
                         
                          active:scale-95
                          text-white
                          px-4
                          py-2
                          rounded-lg
                          font-semibold
                          transition-all
                          duration-300`}
                          >
                            {menu.buttonText}
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile Layout: Horizontal Scroll */}
                <div className="flex lg:hidden overflow-x-auto space-x-4 snap-x scroll-smooth pb-4 -mx-4 px-4">
                  {category.items.map((menu, index) => (
                    <div
                      key={index}
                      className="min-w-[85%]
                    bg-white
                    rounded-xl
                    shadow-md
                    overflow-hidden
                    shrink-0
                    "
                    >
                      {menu.image && (
                        <div className="bg-slate-50">
                          <Image
                            src={`/media/${menu.image.filename}`}
                            alt={menu.title}
                            width={400}
                            height={300}
                            className="w-full h-48 object-contain"
                          />
                        </div>
                      )}
                      <div className="p-4 ">
                        <h3 className="text-xl font-semibold mb-2 text-center">{menu.title}</h3>
                        {menu.description && (
                          <p className="text-gray-500 mb-2 text-center">{menu.description}</p>
                        )}
                        {menu.rating && (
                          <p className="text-gray-600 mb-2 text-center">{menu.rating}</p>
                        )}
                        {menu.price && (
                          <p className="text-gray-600 mb-4 text-center">{menu.price}</p>
                        )}
                        {menu.buttonText && (
                          <Link
                            href={menu.buttonLink}
                            className={` ${menu.btn_variant === 'outline' ? 'btn-outline' : 'btn-fill'} inline-block
                         
                          active:scale-95
                          text-white
                          px-4
                          py-2
                          rounded-lg
                          font-semibold
                          transition-all
                          `}
                          >
                            {menu.buttonText}
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
      </div>
    </section>
  )
}

export default MenuTwoRenderer
