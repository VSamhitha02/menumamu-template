import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import React from 'react'

import { Label } from '@/components/ui/label'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'

import { Error } from '../Error'
import { Width } from '../Width'

interface TextareaProps extends TextField {
  errors: Partial<FieldErrorsImpl>
  register: UseFormRegister<FieldValues>
  rows?: number
}

export const Textarea: React.FC<TextareaProps> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required,
  rows = 3,
  width,
}) => {
  const hasError = Boolean(errors[name])

  return (
    <Width width={width}>
      <div className="space-y-2">
        <Label htmlFor={name} className="cursor-pointer text-sm font-medium leading-none text-black">
          {label}
          {required && (
            <span className="ml-1 text-destructive">
              * <span className="sr-only">(required)</span>
            </span>
          )}
        </Label>

        <TextAreaComponent
          id={name}
          rows={rows}
          defaultValue={defaultValue}
          className={hasError ? 'border-destructive focus-visible:ring-destructive' : ''}
          {...register(name, { required })}
        />

        {errors[name] && <Error />}
      </div>
    </Width>
  )
}