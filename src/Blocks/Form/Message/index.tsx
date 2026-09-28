import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

import { Width } from '../Width'

interface MessageProps {
  message?: SerializedEditorState | string | null
  width?: string
}

export const Message: React.FC<MessageProps> = ({ message, width = '100' }) => {
  if (!message) return null

  return (
    <Width className="my-6" width={width}>
      <div className="prose dark:prose-invert max-w-none text-neutral-800">
        {typeof message === 'string' ? (
          <p>{message}</p>
        ) : (
          <RichText data={message} />
        )}
      </div>
    </Width>
  )
}