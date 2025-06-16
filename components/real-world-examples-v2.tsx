"use client"

import { memo } from "react"
import { Badge } from "@/components/ui/badge"

interface RealWorldExamplesV2Props {
  borderRadius: number
  padding: number
  innerRadius: number
}

// Option 2: Before/After Comparison
const RealWorldExamplesV2 = memo(function RealWorldExamplesV2({
  borderRadius,
  padding,
  innerRadius,
}: RealWorldExamplesV2Props) {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-sm">Before vs After</h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Before - Wrong approach */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="destructive" className="text-xs">
              Wrong
            </Badge>
            <span className="text-xs text-muted-foreground">Same radius</span>
          </div>
          <div
            className="bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800 relative"
            style={{
              borderRadius: `${borderRadius}px`,
              padding: `${padding}px`,
              width: "120px",
              height: "80px",
            }}
          >
            <div
              className="bg-white dark:bg-gray-800 border border-red-300 dark:border-red-700 h-full flex items-center justify-center text-xs"
              style={{ borderRadius: `${borderRadius}px` }} // Wrong: same radius
            >
              Floating
            </div>
          </div>
        </div>

        {/* After - Correct approach */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-xs bg-green-600">
              Correct
            </Badge>
            <span className="text-xs text-muted-foreground">Formula applied</span>
          </div>
          <div
            className="bg-green-50 dark:bg-green-950/20 border-2 border-green-200 dark:border-green-800"
            style={{
              borderRadius: `${borderRadius}px`,
              padding: `${padding}px`,
              width: "120px",
              height: "80px",
            }}
          >
            <div
              className="bg-white dark:bg-gray-800 border border-green-300 dark:border-green-700 h-full flex items-center justify-center text-xs"
              style={{ borderRadius: `${innerRadius}px` }} // Correct: calculated radius
            >
              Nested
            </div>
          </div>
        </div>
      </div>

      {/* Visual explanation */}
      <div className="bg-muted p-4 rounded-lg border">
        <div className="text-xs font-medium mb-2">Why the formula works:</div>
        <div className="text-xs text-muted-foreground space-y-1">
          <div>• Left: Inner element appears "cut out" or floating</div>
          <div>• Right: Inner element feels naturally nested</div>
          <div>• The {innerRadius}px inner radius creates visual continuity</div>
        </div>
      </div>
    </div>
  )
})

export default RealWorldExamplesV2
