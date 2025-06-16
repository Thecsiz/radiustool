"use client"

import type React from "react"
import { memo, useMemo } from "react"

interface OptimizedVisualPreviewProps {
  borderRadius: number
  padding: number
  dimension: number
  innerRadius: number
  individualCorners: boolean
  cornerRadii: {
    topLeft: number
    topRight: number
    bottomRight: number
    bottomLeft: number
  }
  onMouseDown: (e: React.MouseEvent, type: "radius" | "padding") => void
  isDragging: "radius" | "padding" | null
}

const OptimizedVisualPreview = memo(function OptimizedVisualPreview({
  borderRadius,
  padding,
  dimension,
  innerRadius,
  individualCorners,
  cornerRadii,
  onMouseDown,
  isDragging,
}: OptimizedVisualPreviewProps) {
  // Memoize CSS custom properties to avoid recalculation
  const cssVariables = useMemo(
    () =>
      ({
        "--outer-radius": `${borderRadius}px`,
        "--inner-radius": `${innerRadius}px`,
        "--padding": `${padding}px`,
        "--dimension": `${dimension}px`,
        "--scale": isDragging ? "1.02" : "1",
        "--tl-radius": `${cornerRadii.topLeft}px`,
        "--tr-radius": `${cornerRadii.topRight}px`,
        "--br-radius": `${cornerRadii.bottomRight}px`,
        "--bl-radius": `${cornerRadii.bottomLeft}px`,
        "--inner-tl": `${Math.max(0, cornerRadii.topLeft - padding)}px`,
        "--inner-tr": `${Math.max(0, cornerRadii.topRight - padding)}px`,
        "--inner-br": `${Math.max(0, cornerRadii.bottomRight - padding)}px`,
        "--inner-bl": `${Math.max(0, cornerRadii.bottomLeft - padding)}px`,
      }) as React.CSSProperties,
    [
      borderRadius,
      innerRadius,
      padding,
      dimension,
      isDragging,
      cornerRadii.topLeft,
      cornerRadii.topRight,
      cornerRadii.bottomRight,
      cornerRadii.bottomLeft,
    ],
  )

  const currentBorderRadius = useMemo(
    () =>
      individualCorners ? `var(--tl-radius) var(--tr-radius) var(--br-radius) var(--bl-radius)` : `var(--outer-radius)`,
    [individualCorners],
  )

  const innerBorderRadius = useMemo(
    () =>
      individualCorners ? `var(--inner-tl) var(--inner-tr) var(--inner-br) var(--inner-bl)` : `var(--inner-radius)`,
    [individualCorners],
  )

  return (
    <div style={cssVariables}>
      <figure
        className="border-4 flex flex-col items-start border-neutral-300 relative cursor-pointer visual-container"
        style={{
          padding: `var(--padding)`,
          borderRadius: currentBorderRadius,
          width: `var(--dimension)`,
          height: `var(--dimension)`,
          transform: `scale(var(--scale))`,
        }}
        onMouseDown={(e) => onMouseDown(e, "radius")}
      >
        {/* Corner indicators - memoized */}
        <CornerIndicators
          individualCorners={individualCorners}
          borderRadius={borderRadius}
          cornerRadii={cornerRadii}
          onMouseDown={onMouseDown}
        />

        <div
          className="border-4 bg-blue-100 border-blue-300 flex justify-center items-center h-full w-full relative cursor-pointer inner-container"
          style={{
            borderRadius: innerBorderRadius,
          }}
          onMouseDown={(e) => {
            e.stopPropagation()
            onMouseDown(e, "padding")
          }}
        >
          <p className="text-blue-500 font-bold select-none">{innerRadius}px</p>

          {/* Inner corner indicator */}
          {innerRadius > 0 && !individualCorners && (
            <aside
              className="border-t-4 border-l-4 border-blue-500 absolute bg-transparent cursor-grab active:cursor-grabbing inner-indicator"
              style={{
                top: "-4px",
                left: "-4px",
                borderTopLeftRadius: `var(--inner-radius)`,
                width: `calc(var(--inner-radius) * 2)`,
                height: `calc(var(--inner-radius) * 2)`,
              }}
              onMouseDown={(e) => {
                e.stopPropagation()
                onMouseDown(e, "padding")
              }}
            />
          )}
        </div>
      </figure>

      <style jsx>{`
        .visual-container {
          transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .inner-container {
          transition: border-radius 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .inner-indicator {
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  )
})

// Separate memoized component for corner indicators
const CornerIndicators = memo(function CornerIndicators({
  individualCorners,
  borderRadius,
  cornerRadii,
  onMouseDown,
}: {
  individualCorners: boolean
  borderRadius: number
  cornerRadii: any
  onMouseDown: (e: React.MouseEvent, type: "radius" | "padding") => void
}) {
  if (!individualCorners) {
    return (
      <aside
        className="border-t-4 border-l-4 border-green-500 absolute bg-transparent cursor-grab active:cursor-grabbing corner-indicator"
        style={{
          top: "-4px",
          left: "-4px",
          borderTopLeftRadius: `var(--outer-radius)`,
          width: `calc(var(--outer-radius) * 2)`,
          height: `calc(var(--outer-radius) * 2)`,
        }}
        onMouseDown={(e) => {
          e.stopPropagation()
          onMouseDown(e, "radius")
        }}
      />
    )
  }

  return (
    <>
      <aside
        className="border-t-4 border-l-4 border-green-500 absolute bg-transparent corner-indicator"
        style={{
          top: "-4px",
          left: "-4px",
          borderTopLeftRadius: `var(--tl-radius)`,
          width: `calc(var(--tl-radius) * 2)`,
          height: `calc(var(--tl-radius) * 2)`,
        }}
      />
      <aside
        className="border-t-4 border-r-4 border-green-500 absolute bg-transparent corner-indicator"
        style={{
          top: "-4px",
          right: "-4px",
          borderTopRightRadius: `var(--tr-radius)`,
          width: `calc(var(--tr-radius) * 2)`,
          height: `calc(var(--tr-radius) * 2)`,
        }}
      />
      <aside
        className="border-b-4 border-r-4 border-green-500 absolute bg-transparent corner-indicator"
        style={{
          bottom: "-4px",
          right: "-4px",
          borderBottomRightRadius: `var(--br-radius)`,
          width: `calc(var(--br-radius) * 2)`,
          height: `calc(var(--br-radius) * 2)`,
        }}
      />
      <aside
        className="border-b-4 border-l-4 border-green-500 absolute bg-transparent corner-indicator"
        style={{
          bottom: "-4px",
          left: "-4px",
          borderBottomLeftRadius: `var(--bl-radius)`,
          width: `calc(var(--bl-radius) * 2)`,
          height: `calc(var(--bl-radius) * 2)`,
        }}
      />
      <style jsx>{`
        .corner-indicator {
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  )
})

export default OptimizedVisualPreview
