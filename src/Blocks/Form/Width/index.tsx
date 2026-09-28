import * as React from 'react'

interface WidthProps {
  children: React.ReactNode
  className?: string
  width?: number | string
}

export const Width: React.FC<WidthProps> = ({ children, className = '', width }) => {
  // Format numeric width values to percentage strings safely
  const widthStyle =
    width !== undefined
      ? typeof width === 'number'
        ? `${width}%`
        : width
      : undefined

  return (
    <div
      className={`w-full ${className}`}
      style={{
        flex: widthStyle ? `0 0 ${widthStyle}` : undefined,
        maxWidth: widthStyle,
      }}
    >
      {children}
    </div>
  )
}