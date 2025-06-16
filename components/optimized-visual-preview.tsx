"use client"

import type React from "react"
import { memo, useMemo } from "react"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

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
  // Memoize styles for better performance
  const containerStyles = useMemo(
    () => ({
      width: `${dimension}px`,
      height: `${dimension}px`,
      borderRadius: individualCorners
        ? `${cornerRadii.topLeft}px ${cornerRadii.topRight}px ${cornerRadii.bottomRight}px ${cornerRadii.bottomLeft}px`
        : `${borderRadius}px`,
      padding: `${padding}px`,
    }),
    [dimension, borderRadius, padding, individualCorners, cornerRadii],
  )

  const innerStyles = useMemo(
    () => ({
      borderRadius: individualCorners
        ? `${Math.max(0, cornerRadii.topLeft - padding)}px ${Math.max(0, cornerRadii.topRight - padding)}px ${Math.max(0, cornerRadii.bottomRight - padding)}px ${Math.max(0, cornerRadii.bottomLeft - padding)}px`
        : `${innerRadius}px`,
    }),
    [innerRadius, individualCorners, cornerRadii, padding],
  )

  // Memoize corner indicator styles
  const outerCornerStyle = useMemo(
    () => ({
      borderTopLeftRadius: individualCorners ? `${cornerRadii.topLeft}px` : `${borderRadius}px`,
      width: `${Math.max(borderRadius * 2, 40)}px`,
      height: `${Math.max(borderRadius * 2, 40)}px`,
    }),
    [borderRadius, individualCorners, cornerRadii.topLeft],
  )

  const innerCornerStyle = useMemo(
    () => ({
      borderTopLeftRadius: individualCorners ? `${Math.max(0, cornerRadii.topLeft - padding)}px` : `${innerRadius}px`,
      width: `${Math.max(innerRadius * 2, 20)}px`,
      height: `${Math.max(innerRadius * 2, 20)}px`,
      left: `${padding}px`,
      top: `${padding}px`,
    }),
    [innerRadius, individualCorners, cornerRadii.topLeft, padding],
  )

  return (
    <TooltipProvider>
      <div className="relative">
        {/* Main Container */}
        <figure
          className={`
          border-4 border-muted-foreground bg-background relative cursor-pointer transition-all duration-150
          ${isDragging === "radius" ? "scale-105 shadow-lg" : ""}
        `}
          style={containerStyles}
          onMouseDown={(e) => onMouseDown(e, "radius")}
        >
          {/* Outer corner radius indicator */}
          <aside
            className="border-t-4 border-l-4 border-green-500 absolute bg-transparent pointer-events-none transition-all duration-150"
            style={{
              ...outerCornerStyle,
              top: "-4px",
              left: "-4px",
            }}
          />

          {/* Inner Container */}
          <div
            className={`
            border-4 border-blue-500 bg-blue-100 dark:bg-blue-900/30 flex justify-center items-center h-full w-full cursor-pointer transition-all duration-150
            ${isDragging === "padding" ? "scale-105" : ""}
          `}
            style={innerStyles}
            onMouseDown={(e) => {
              e.stopPropagation()
              onMouseDown(e, "padding")
            }}
          >
            <p className="text-blue-600 dark:text-blue-400 font-bold text-sm select-none">{innerRadius}px</p>
          </div>

          {/* Inner corner radius indicator */}
          {innerRadius > 0 && (
            <aside
              className="border-t-4 border-l-4 border-blue-500 absolute bg-transparent pointer-events-none transition-all duration-150"
              style={innerCornerStyle}
            />
          )}
        </figure>

        {/* Tooltip with drag instructions */}
        <div className="mt-4 flex justify-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="p-2 rounded-full hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label="Interaction help"
              >
                <Info className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs text-center" sideOffset={8}>
              <div className="space-y-1 text-xs">
                <p>Click and drag the outer area to adjust radius</p>
                <p>Click and drag the inner area to adjust padding</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
})

export default OptimizedVisualPreview
