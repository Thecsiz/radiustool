"use client"

import type React from "react"
import { memo, useMemo } from "react"

interface OptimizedRealWorldExamplesProps {
  borderRadius: number
  padding: number
  innerRadius: number
}

const OptimizedRealWorldExamples = memo(function OptimizedRealWorldExamples({
  borderRadius,
  padding,
  innerRadius,
}: OptimizedRealWorldExamplesProps) {
  // Memoize CSS variables for examples
  const exampleStyles = useMemo(
    () =>
      ({
        "--example-radius": `${borderRadius}px`,
        "--example-padding": `${Math.max(padding / 2, 8)}px ${Math.max(padding, 12)}px`,
        "--example-inner-radius": `${innerRadius}px`,
        "--card-padding": `${padding}px`,
        "--input-padding": `${Math.max(padding / 2, 4)}px`,
      }) as React.CSSProperties,
    [borderRadius, padding, innerRadius],
  )

  return (
    <div className="space-y-4" style={exampleStyles}>
      <h3 className="font-semibold text-sm">Real-World Examples</h3>
      <div className="grid grid-cols-2 gap-3">
        {/* Button Example */}
        <div className="space-y-2">
          <p className="text-xs text-gray-600">Button</p>
          <button
            className="bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 border-2 border-blue-600 example-button"
            style={{
              borderRadius: `var(--example-radius)`,
              padding: `var(--example-padding)`,
            }}
          >
            Click me
          </button>
        </div>

        {/* Card Example */}
        <div className="space-y-2">
          <p className="text-xs text-gray-600">Card</p>
          <div
            className="bg-white border-2 border-gray-200 shadow-sm example-card"
            style={{
              borderRadius: `var(--example-radius)`,
              padding: `var(--card-padding)`,
              width: "120px",
              height: "80px",
            }}
          >
            <div
              className="bg-gray-100 border border-gray-300 h-full flex items-center justify-center text-xs text-gray-600 example-card-content"
              style={{ borderRadius: `var(--example-inner-radius)` }}
            >
              Content
            </div>
          </div>
        </div>

        {/* Input Field Example */}
        <div className="space-y-2">
          <p className="text-xs text-gray-600">Input Field</p>
          <div
            className="bg-white border-2 border-gray-300 example-input-container"
            style={{
              borderRadius: `var(--example-radius)`,
              padding: `var(--input-padding)`,
            }}
          >
            <input
              className="w-full bg-gray-50 border border-gray-200 px-2 py-1 text-xs example-input"
              style={{ borderRadius: `var(--example-inner-radius)` }}
              placeholder="Enter text..."
              readOnly
            />
          </div>
        </div>

        {/* Alert/Toast Example */}
        <div className="space-y-2">
          <p className="text-xs text-gray-600">Alert</p>
          <div
            className="bg-green-50 border-2 border-green-200 example-alert"
            style={{
              borderRadius: `var(--example-radius)`,
              padding: `var(--card-padding)`,
              width: "120px",
            }}
          >
            <div
              className="bg-green-100 border border-green-300 px-2 py-1 text-xs text-green-800 example-alert-content"
              style={{ borderRadius: `var(--example-inner-radius)` }}
            >
              Success!
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .example-button {
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .example-card,
        .example-card-content,
        .example-input-container,
        .example-input,
        .example-alert,
        .example-alert-content {
          transition: border-radius 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  )
})

export default OptimizedRealWorldExamples
