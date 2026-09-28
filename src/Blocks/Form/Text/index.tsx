import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import React from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Error } from '../Error'
import { Width } from '../Width'

interface TextProps extends TextField {
  errors: Partial<FieldErrorsImpl>
  register: UseFormRegister<FieldValues>
}

export const Text: React.FC<TextProps> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required,
  width,
}) => {
  const hasError = Boolean(errors[name])

  return (
    <Width width={width}>
      <div className="space-y-2">
        <Label htmlFor={name} className="cursor-pointer text-base font-semibold text-gray-900 leading-none">
          {label}
          {required && (
            <span className="ml-1 text-destructive">
              * <span className="sr-only">(required)</span>
            </span>
          )}
        </Label>

        <Input
          id={name}
          type="text"
          defaultValue={defaultValue}
          className={hasError ? 'border-destructive focus-visible:ring-destructive' : ''}
          {...register(name, { required })}
        />

        {errors[name] && <Error />}
      </div>
    </Width>
  )
}