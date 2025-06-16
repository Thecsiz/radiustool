"use client"

import { Card } from "@/components/ui/card"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"

interface EducationalSectionProps {
  borderRadius: number
  padding: number
  innerRadius: number
}

export function EducationalSection({ borderRadius, padding, innerRadius }: EducationalSectionProps) {
  const wrongInnerRadius = borderRadius // Common mistake: using same radius
  const correctInnerRadius = innerRadius

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm flex items-center gap-2">
        <AlertCircle className="w-4 h-4" />
        Why Apple's Formula Works
      </h3>

      <Card className="p-4 space-y-4">
        <div className="text-sm text-gray-700">
          <p className="mb-3">
            Apple's Human Interface Guidelines use the formula:{" "}
            <code className="bg-gray-100 px-1 rounded">inner = outer - padding</code>
          </p>
          <p className="text-xs text-gray-600">
            This maintains visual consistency by ensuring the inner element doesn't appear to "float" within its
            container.
          </p>
        </div>

        {/* Visual Comparison */}
        <div className="grid grid-cols-2 gap-4">
          {/* Wrong Way */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-red-700">Wrong</span>
            </div>
            <div
              className="bg-gray-200 border-2 border-gray-400 relative"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: `${borderRadius}px`,
                padding: `${Math.min(padding, 16)}px`,
              }}
            >
              <div
                className="bg-red-100 border-2 border-red-300 w-full h-full flex items-center justify-center"
                style={{ borderRadius: `${wrongInnerRadius}px` }}
              >
                <span className="text-xs text-red-600">Floats</span>
              </div>
            </div>
            <p className="text-xs text-gray-600">Inner radius = {wrongInnerRadius}px</p>
          </div>

          {/* Right Way */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-700">Correct</span>
            </div>
            <div
              className="bg-gray-200 border-2 border-gray-400 relative"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: `${borderRadius}px`,
                padding: `${Math.min(padding, 16)}px`,
              }}
            >
              <div
                className="bg-green-100 border-2 border-green-300 w-full h-full flex items-center justify-center"
                style={{ borderRadius: `${correctInnerRadius}px` }}
              >
                <span className="text-xs text-green-600">Perfect</span>
              </div>
            </div>
            <p className="text-xs text-gray-600">Inner radius = {correctInnerRadius}px</p>
          </div>
        </div>

        {/* Formula Breakdown */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Formula Breakdown:</h4>
          <div className="text-sm font-mono space-y-1">
            <div>
              Outer radius: <span className="text-green-600">{borderRadius}px</span>
            </div>
            <div>
              Padding: <span className="text-gray-600">{padding}px</span>
            </div>
            <div className="border-t pt-1">
              Inner radius:{" "}
              <span className="text-blue-600">
                {borderRadius} - {padding} = {correctInnerRadius}px
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
