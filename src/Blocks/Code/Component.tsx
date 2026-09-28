import React from 'react'

import { Code } from './Component.client'

export type CodeBlockProps = {
  code: string
  language?: string
  blockType: 'code'
}

type Props = CodeBlockProps & {
  className?: string
  inlineStyle?: string
}

export const CodeBlock: React.FC<Props> = ({ className, code, language, inlineStyle }) => {
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
    <div className={[className, 'not-prose'].filter(Boolean).join(' ')} style={parseStyleString(inlineStyle)}>
      <Code code={code} language={language} />
    </div>
  )
}
