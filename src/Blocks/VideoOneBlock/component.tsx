// 'use client'

// import React from 'react'
// import YouTube from 'react-youtube'

// export interface TestimonialsBlockData {
//   theme:
//     | 'black-theme'
//     | 'white-theme'
//     | 'orange-theme'
//     | 'green-theme'
//     | 'modern-dark'
//     | 'modern-light'
//   title: string
//   videoId?: string // YouTube video ID
// }

// const VideoOneSection: React.FC<TestimonialsBlockData> = ({ theme, title, videoId }) => {
//   const themeClasses: Record<string, string> = {
//     'black-theme': 'bg-black text-white',
//     'white-theme': 'bg-white text-black',
//     'orange-theme': 'bg-orange-500 text-white',
//     'green-theme': 'bg-green-600 text-white',
//     'modern-dark': 'bg-zinc-900 text-white',
//     'modern-light': 'bg-zinc-100 text-black',
//   }

//

//   return (
//     <section className={`py-12 px-4 sm:px-6 md:px-10 ${themeClass}`}>
//       <div className="max-w-5xl mx-auto text-center">
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8">{title}</h2>
//         {videoId && (
//           <div className="aspect-video w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg">
//             <YouTube videoId={videoId} className="w-full h-full" iframeClassName="w-full h-full" />
//           </div>
//         )}
//       </div>
//     </section>
//   )
// }

// export default VideoOneSection
'use client'

import React from 'react'
import YouTube from 'react-youtube'
import './Menu.css'
export interface TestimonialsBlockData {
  theme:
    | 'black-theme'
    | 'white-theme'
    | 'orange-theme'
    | 'green-theme'
    | 'modern-dark'
    | 'modern-light'
  title: string
  videoId?: string
  className: string
  inlineStyle?: string
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

const VideoOneSection: React.FC<TestimonialsBlockData> = ({ theme, title, videoId, className, inlineStyle }) => {
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

  const cleanVideoId = getYouTubeID(videoId)

  console.log('Original Input:', videoId)
  console.log('Extracted ID:', cleanVideoId)
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
    <section className={`w-full ${className} py-10`} 
    style={parseStyleString(inlineStyle)}>
      <div className="max-w-5xl mx-auto text-center py-6 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">{title}</h2>
      </div>
      <div className="px-0 lg:px-10">
        <div className="relative w-full aspect-video overflow-hidden rounded-xl">
          {videoId ? (
            <YouTube
              // videoId={videoId}
              videoId={cleanVideoId || ''}
              opts={opts}
              className="absolute inset-0 w-full h-full lg:px-10"
              iframeClassName="w-full h-full"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-600">
              <p className="text-sm sm:text-base">No video available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default VideoOneSection
