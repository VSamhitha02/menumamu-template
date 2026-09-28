// 'use client'

// import React from 'react'
// import YouTube from 'react-youtube'
// import './Menu.css'

// export interface TestimonialsBlockData {
//   theme:
//     | 'black-theme'
//     | 'white-theme'
//     | 'orange-theme'
//     | 'green-theme'
//     | 'modern-dark'
//     | 'modern-light'
//   title: string
//   videoId?: string
//   description?: string
//   mediaPosition?: 'left' | 'right'
// }

// const VideoThreeSection: React.FC<TestimonialsBlockData> = ({
//   theme,
//   title,
//   videoId,
//   description,
//   mediaPosition = 'left',
// }) => {
//   const themeClasses: Record<string, string> = {
//     'black-theme': 'menu-black',
//     'white-theme': 'menu-white',
//     'orange-theme': 'menu-orange',
//     'green-theme': 'menu-green',
//   }

//   const themeClass = themeClasses[theme] || themeClasses['orange-theme']

//   const opts = {
//     width: '100%',
//     height: '100%',
//     playerVars: {
//       rel: 0,
//       modestbranding: 1,
//     },
//   }

//   const isImageLeft = mediaPosition === 'left'

//   return (
//     <section className={`w-full ${themeClass} py-10`}>
//       <div className="max-w-5xl mx-auto text-center py-6 px-4 sm:px-6">
//         <h2 className="text-3xl sm:text-2xl md:text-3xl font-semibold">{title}</h2>
//       </div>

//       <div
//         className={`flex flex-col lg:flex-row ${
//           !isImageLeft ? 'lg:flex-row-reverse' : ''
//         } items-center gap-6 lg:gap-12 max-w-6xl mx-auto py-8 px-4`}
//       >
//         {/* Video */}
//         <div className="w-full lg:w-1/2">
//           {videoId ? (
//             <div className="relative w-full h-[60vw] max-h-[480px] sm:h-[400px] md:h-[480px] lg:h-[550px] overflow-hidden">
//               <YouTube
//                 videoId={videoId}
//                 opts={opts}
//                 className="absolute inset-0 w-full h-full"
//                 iframeClassName="w-full h-full"
//               />
//             </div>
//           ) : (
//             <div className="w-full h-[300px] flex items-center justify-center bg-gray-200">
//               <p>No video available</p>
//             </div>
//           )}
//         </div>

//         {/* Description */}
//         <div className="w-full lg:w-1/2 text-justify sm:text-justify lg:text-justify text-base sm:text-md lg:text-lg">
//           {description ? (
//             <p className="leading-relaxed">{description}</p>
//           ) : (
//             <p>No description available</p>
//           )}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default VideoThreeSection
'use client'

import React from 'react'
import YouTube from 'react-youtube'
import './Menu.css'

export interface TestimonialsBlockData {
  title: string
  videoId?: string
  className: string
  inlineStyle?: string
  description?: string
  mediaPosition?: 'left' | 'right'
}

// const getYouTubeID = (url: string | undefined) => {
//   if (!url) return null;
//   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//   const match = url.match(regExp);
//   return (match && match[2].length === 11) ? match[2] : url;
// }

const getYouTubeID = (url: string | undefined) => {
  if (!url) return null

  try {
    // 1. Try to parse the string as a URL
    const parsedUrl = new URL(url)

    // 2. Handle short links (e.g., https://youtu.be/VIDEO_ID)
    if (parsedUrl.hostname === 'youtu.be') {
      return parsedUrl.pathname.slice(1) // Removes the leading '/'
    }

    // 3. Handle standard links (e.g., https://www.youtube.com/watch?v=VIDEO_ID)
    if (parsedUrl.hostname.includes('youtube.com')) {
      // Check for the 'v' query parameter first
      const vParam = parsedUrl.searchParams.get('v')
      if (vParam) return vParam

      // Fallback for embed links (e.g., /embed/VIDEO_ID)
      return parsedUrl.pathname.split('/').pop()
    }

    // If it's a URL but not a recognizable YouTube format, return original
    return url
  } catch (_error) {
    // 4. If 'new URL()' fails, it means the input wasn't a valid URL
    // (e.g., it was just the ID "hro2rd5hc5E"), so we return it as is.
    return url
  }
}

const VideoThreeSection: React.FC<TestimonialsBlockData> = ({
  title,
  videoId,
  description,
  className,
  inlineStyle,
  mediaPosition = 'left',
}) => {
  const themeClasses: Record<string, string> = {
    'black-theme': 'menu-black',
    'white-theme': 'menu-white',
    'orange-theme': 'menu-orange',
    'green-theme': 'menu-green',
  }

  // const themeClass = themeClasses[theme] || themeClasses['orange-theme']

  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      rel: 0,
      modestbranding: 1,
    },
  }

  const isImageLeft = mediaPosition === 'left'
  const cleanVideoId = getYouTubeID(videoId)
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
    <section className={`w-full ${className} py-10`} style={parseStyleString(inlineStyle)}>
      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">{title}</h2>
      </div>

      <div
        className={`flex flex-col lg:${isImageLeft ? 'flex-row' : 'flex-row-reverse'}
        items-start gap-8 md:gap-12 lg:gap-16
        px-6 sm:px-10 lg:px-10
        max-w-7xl mx-auto py-8`}
      >
        {/* Video */}
        <div className="w-full lg:w-1/2">
          {videoId ? (
            <div className="relative w-full aspect-video overflow-hidden rounded-xl">
              <YouTube
                // videoId={videoId}
                videoId={cleanVideoId || ''}
                opts={opts}
                className="absolute inset-0 w-full h-full"
                iframeClassName="w-full h-full"
              />
            </div>
          ) : (
            <div className="w-full aspect-video flex items-center justify-center bg-gray-200 rounded-xl text-gray-600">
              <p>No video available</p>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="w-full lg:w-1/2 text-justify text-base md:text-lg leading-relaxed">
          {description ? <p>{description}</p> : <p>No description available</p>}
        </div>
      </div>
    </section>
  )
}

export default VideoThreeSection
