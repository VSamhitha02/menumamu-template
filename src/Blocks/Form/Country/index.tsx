import type { CountryField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form'

import React from 'react'
import { Controller } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Error } from '../Error'
import { Width } from '../Width'
import { countryOptions } from './options'

interface CountryProps extends CountryField {
  control: Control<FieldValues>
  errors: Partial<FieldErrorsImpl>
}

export const Country: React.FC<CountryProps> = ({
  name,
  control,
  errors,
  label,
  required,
  width,
}) => {
  const hasError = Boolean(errors[name])

  return (
    <Width width={width}>
      <div className="space-y-2">
        <Label htmlFor={name} className="cursor-pointer text-base font-semibold leading-none text-gray-900">
          {label}
          {required && (
            <span className="ml-1 text-destructive">
              * <span className="sr-only">(required)</span>
            </span>
          )}
        </Label>

        <Controller
          control={control}
          defaultValue=""
          name={name}
          rules={{ required }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger 
                id={name} 
                style={{ borderWidth: '2px', borderStyle: 'solid', borderColor: '#6b7280' }}
                className={`flex h-11 w-full items-center justify-between rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors hover:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-900 ${
                  hasError ? '!border-destructive focus:!ring-destructive' : ''
                }`}
              >
                <SelectValue placeholder={`Select ${label || 'a country'}...`} />
              </SelectTrigger>
              <SelectContent 
                position="popper" 
                sideOffset={4}
                className="bg-white border-2 border-gray-400 shadow-lg z-50 w-[var(--radix-select-trigger-width)]"
              >
                {countryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors[name] && <Error />}
      </div>
    </Width>
  )
}