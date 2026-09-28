import type { CheckboxField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { Label } from '@/components/ui/label'

import { Error } from '../Error'
import { Width } from '../Width'

export const Checkbox: React.FC<
  CheckboxField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue = false, errors, label, register, required, width }) => {
  const { setValue, control } = useFormContext()

  register(name, { required })
  const checked = Boolean(useWatch({ control, name, defaultValue }))

  return (
    <Width width={width}>
      <div className="flex items-center space-x-2.5">
        <input
          type="checkbox"
          id={name}
          checked={checked}
          onChange={(e) => {
            setValue(name, e.target.checked, { shouldValidate: true })
          }}
          className="h-4 w-4 rounded border-2 border-gray-600 bg-white text-black accent-black focus:ring-0 focus:outline-none"
        />
        <Label htmlFor={name} className="cursor-pointer text-sm font-medium leading-none text-neutral-800">
          {label}
          {required && (
            <span className="ml-1 text-destructive">
              * <span className="sr-only">(required)</span>
            </span>
          )}
        </Label>
      </div>
      {errors[name] && <Error />}
    </Width>
  )
}