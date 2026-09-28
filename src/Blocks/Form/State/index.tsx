import type { StateField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form'

import React, { useMemo } from 'react'
import { Controller, useWatch } from 'react-hook-form'
import { Country, State as CountryState } from 'country-state-city'

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

interface StateProps extends StateField {
  control: Control<FieldValues>
  errors: Partial<FieldErrorsImpl>
  countryFieldName?: string
}

export const State: React.FC<StateProps> = ({
  name,
  control,
  errors,
  label,
  required,
  width,
  countryFieldName = 'country',
}) => {
  const hasError = Boolean(errors[name])

  const formValues = useWatch({ control })

  const selectedCountry = useMemo(() => {
    if (formValues[countryFieldName]) {
      return formValues[countryFieldName]
    }
    
    const countryKey = Object.keys(formValues).find((key) =>
      key.toLowerCase().includes('country')
    )
    
    return countryKey ? formValues[countryKey] : undefined
  }, [formValues, countryFieldName])

  const stateOptions = useMemo(() => {
    if (!selectedCountry) return []

    const countryStr = String(selectedCountry).trim()

    let states = CountryState.getStatesOfCountry(countryStr)

    if (states.length === 0) {
      const allCountries = Country.getAllCountries()
      const matchedCountry = allCountries.find(
        (c) =>
          c.name.toLowerCase() === countryStr.toLowerCase() ||
          c.isoCode.toLowerCase() === countryStr.toLowerCase()
      )

      if (matchedCountry) {
        states = CountryState.getStatesOfCountry(matchedCountry.isoCode)
      }
    }

    return states.map((st) => ({
      label: st.name,
      value: st.isoCode,
    }))
  }, [selectedCountry])

  const isDisabled = !selectedCountry || stateOptions.length === 0

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
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={isDisabled}
            >
              <SelectTrigger
                id={name}
                style={{
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: isDisabled ? '#e5e7eb' : '#6b7280',
                }}
                className={`flex h-11 w-full items-center justify-between rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors hover:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 ${
                  hasError ? '!border-destructive focus:!ring-destructive' : ''
                }`}
              >
                <SelectValue
                  placeholder={
                    !selectedCountry
                      ? 'Select a country first...'
                      : `Select ${label || 'a state'}...`
                  }
                />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-gray-400 shadow-lg z-50">
                {stateOptions.map((option) => (
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