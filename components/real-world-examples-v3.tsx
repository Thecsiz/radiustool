"use client"

import { memo } from "react"
import { Smartphone, Tablet, Monitor } from "lucide-react"

interface RealWorldExamplesV3Props {
  borderRadius: number
  padding: number
  innerRadius: number
}

// Option 3: Device Mockups
const RealWorldExamplesV3 = memo(function RealWorldExamplesV3({
  borderRadius,
  padding,
  innerRadius,
}: RealWorldExamplesV3Props) {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-sm">Device Previews</h3>

      <div className="grid grid-cols-3 gap-4">
        {/* Mobile */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Smartphone className="w-3 h-3" />
            Mobile
          </div>
          <div className="bg-gray-900 p-2 rounded-lg mx-auto" style={{ width: "60px" }}>
            <div className="bg-white rounded-sm p-1" style={{ height: "80px" }}>
              <div
                className="bg-blue-500 text-white text-[8px] flex items-center justify-center h-full"
                style={{
                  borderRadius: `${Math.max(borderRadius * 0.3, 2)}px`,
                  padding: `${Math.max(padding * 0.3, 2)}px`,
                }}
              >
                <div
                  className="bg-blue-400 w-full h-1/2 flex items-center justify-center"
                  style={{ borderRadius: `${Math.max(innerRadius * 0.3, 1)}px` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tablet */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Tablet className="w-3 h-3" />
            Tablet
          </div>
          <div className="bg-gray-900 p-2 rounded-lg mx-auto" style={{ width: "80px" }}>
            <div className="bg-white rounded-sm p-1" style={{ height: "60px" }}>
              <div
                className="bg-green-500 text-white text-[8px] flex items-center justify-center h-full"
                style={{
                  borderRadius: `${Math.max(borderRadius * 0.4, 2)}px`,
                  padding: `${Math.max(padding * 0.4, 2)}px`,
                }}
              >
                <div
                  className="bg-green-400 w-full h-1/2"
                  style={{ borderRadius: `${Math.max(innerRadius * 0.4, 1)}px` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Monitor className="w-3 h-3" />
            Desktop
          </div>
          <div className="bg-gray-900 p-1 rounded-sm mx-auto" style={{ width: "90px" }}>
            <div className="bg-white rounded-sm p-1" style={{ height: "50px" }}>
              <div
                className="bg-purple-500 text-white text-[8px] flex items-center justify-center h-full"
                style={{
                  borderRadius: `${Math.max(borderRadius * 0.5, 2)}px`,
                  padding: `${Math.max(padding * 0.5, 2)}px`,
                }}
              >
                <div
                  className="bg-purple-400 w-full h-1/2"
                  style={{ borderRadius: `${Math.max(innerRadius * 0.5, 1)}px` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground text-center">
        Your border radius scales appropriately across different screen sizes
      </div>
    </div>
  )
})

export default RealWorldExamplesV3
