'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import './Franchise.css'

export interface FranchiseStep {
  title: string
  description: string
}

export interface InvestmentDetail {
  title: string
  amount: string
}

export interface FranchiseBlock {
  title: string
  franchiseSteps: FranchiseStep[]
  investmentDetails: InvestmentDetail[]
  buttonText: string
  btn_variant: 'fill' | 'outline'

  className: string
  inlineStyle?: string
}

type FranchiseRendererProps = FranchiseBlock

const FranchiseRenderer: React.FC<FranchiseRendererProps> = ({
  title,
  franchiseSteps,
  investmentDetails,
  buttonText,
  btn_variant,
  className,
  inlineStyle,
}) => {
  const [expandedDetail, setExpandedDetail] = useState<number | null>(null)

  // Map theme values to corresponding CSS classes.
  const themeClasses: Record<string, string> = {
    'black-theme': 'franchise-black',
    'white-theme': 'franchise-white',
    'orange-theme': 'franchise-orange',
    'green-theme': 'franchise-green',
  }
  // const themeClass = themeClasses[theme] || themeClasses['orange-theme']

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
    <section id="franchise" className={`py-16 ${className}`} style={parseStyleString(inlineStyle)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Franchise Process */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Franchise Process</h3>
            <ol className="space-y-4">
              {franchiseSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-4">
                  {/* Step number */}
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-bold shrink-0">
                    {index + 1}
                  </span>
                  {/* Step content */}
                  <div>
                    <h4 className="font-semibold">{step.title}</h4>

                    <p className="text-sm opacity-80">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          {/* Investment Details */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Investment Details</h3>
            <div className="space-y-4">
              {investmentDetails.map((detail, index) => (
                <div
                  key={index}
                  className="border rounded-lg shadow-sm overflow-hidden bg-white/50"
                >
                  <button
                    className="w-full flex items-center justify-between p-4 hover:bg-black/5 transition"
                    onClick={() => setExpandedDetail(expandedDetail === index ? null : index)}
                  >
                    <span className="font-semibold">{detail.title}</span>
                    {expandedDetail === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {expandedDetail === index && (
                    <div className="p-4 border-t text-sm opacity-80">{detail.amount}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* CTA Button */}
        <div className="text-center">
          <button
            className={`  border-2 border-current
            px-6 py-3
            rounded-md
            font-semibold
            transition
             ${btn_variant === 'outline' ? 'btn-outline' : 'btn-fill'}`}
            style={parseStyleString(inlineStyle)}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  )
}

export default FranchiseRenderer
