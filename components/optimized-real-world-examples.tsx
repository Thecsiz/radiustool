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
          <p className="text-xs text-muted-foreground">Button</p>
          <button
            className="bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 border-2 border-primary example-button transition-all duration-150"
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
          <p className="text-xs text-muted-foreground">Card</p>
          <div
            className="bg-card border-2 border-border shadow-sm example-card transition-all duration-150"
            style={{
              borderRadius: `var(--example-radius)`,
              padding: `var(--card-padding)`,
              width: "120px",
              height: "80px",
            }}
          >
            <div
              className="bg-muted border border-border h-full flex items-center justify-center text-xs text-muted-foreground example-card-content transition-all duration-150"
              style={{ borderRadius: `var(--example-inner-radius)` }}
            >
              Content
            </div>
          </div>
        </div>

        {/* Input Field Example */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Input Field</p>
          <div
            className="bg-background border-2 border-input example-input-container transition-all duration-150"
            style={{
              borderRadius: `var(--example-radius)`,
              padding: `var(--input-padding)`,
            }}
          >
            <input
              className="w-full bg-muted border border-border px-2 py-1 text-xs text-foreground placeholder:text-muted-foreground example-input transition-all duration-150"
              style={{ borderRadius: `var(--example-inner-radius)` }}
              placeholder="Enter text..."
              readOnly
            />
          </div>
        </div>

        {/* Alert/Toast Example */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Alert</p>
          <div
            className="bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800 example-alert transition-all duration-150"
            style={{
              borderRadius: `var(--example-radius)`,
              padding: `var(--card-padding)`,
              width: "120px",
            }}
          >
            <div
              className="bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-700 px-2 py-1 text-xs text-green-800 dark:text-green-200 example-alert-content transition-all duration-150"
              style={{ borderRadius: `var(--example-inner-radius)` }}
            >
              Success!
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .example-button,
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
