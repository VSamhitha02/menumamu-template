// components/SaveInDraftsButton.tsx
'use client'

import React from 'react'
import { Button, useForm, useAllFormFields } from '@payloadcms/ui'

export const SaveInDraftsButton: React.FC = () => {
  const { submit } = useForm()
  const [, dispatchFields] = useAllFormFields()

  const handleSaveDraft = async () => {
    // 1. Force the hidden status field state to draft
    dispatchFields({
      type: 'UPDATE',
      path: '_status',
      value: 'draft',
    })

    // 2. Submit the form, forcing Payload to treat this as a draft modification save action
    await submit({
      overrides: {
        _status: 'draft',
      },
      // Passing draft: true ensures it commits purely to versions/draft states 
      // instead of routing into the main publish operation pipeline
      action: window.location.pathname + '?draft=true', 
    })
  }

  return (
    <Button
      buttonStyle="secondary"
      onClick={handleSaveDraft}
      size="small"
    >
      Save in Drafts
    </Button>
  )
}

export default SaveInDraftsButton