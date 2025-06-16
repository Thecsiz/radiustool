"use client"

interface RealWorldExamplesProps {
  borderRadius: number
  padding: number
  innerRadius: number
}

export function RealWorldExamples({ borderRadius, padding, innerRadius }: RealWorldExamplesProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">Real-World Examples</h3>
      <div className="grid grid-cols-2 gap-3">
        {/* Button Example */}
        <div className="space-y-2">
          <p className="text-xs text-gray-600">Button</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 text-sm font-medium hover:bg-blue-600 transition-all duration-200 border-2 border-blue-600"
            style={{
              borderRadius: `${borderRadius}px`,
              padding: `${Math.max(padding / 2, 8)}px ${Math.max(padding, 12)}px`,
            }}
          >
            Click me
          </button>
        </div>

        {/* Card Example */}
        <div className="space-y-2">
          <p className="text-xs text-gray-600">Card</p>
          <div
            className="bg-white border-2 border-gray-200 shadow-sm transition-all duration-200"
            style={{
              borderRadius: `${borderRadius}px`,
              padding: `${padding}px`,
              width: "120px",
              height: "80px",
            }}
          >
            <div
              className="bg-gray-100 border border-gray-300 h-full flex items-center justify-center text-xs text-gray-600 transition-all duration-200"
              style={{ borderRadius: `${innerRadius}px` }}
            >
              Content
            </div>
          </div>
        </div>

        {/* Input Field Example */}
        <div className="space-y-2">
          <p className="text-xs text-gray-600">Input Field</p>
          <div
            className="bg-white border-2 border-gray-300 transition-all duration-200"
            style={{
              borderRadius: `${borderRadius}px`,
              padding: `${Math.max(padding / 2, 4)}px`,
            }}
          >
            <input
              className="w-full bg-gray-50 border border-gray-200 px-2 py-1 text-xs transition-all duration-200"
              style={{ borderRadius: `${innerRadius}px` }}
              placeholder="Enter text..."
              readOnly
            />
          </div>
        </div>

        {/* Alert/Toast Example */}
        <div className="space-y-2">
          <p className="text-xs text-gray-600">Alert</p>
          <div
            className="bg-green-50 border-2 border-green-200 transition-all duration-200"
            style={{
              borderRadius: `${borderRadius}px`,
              padding: `${padding}px`,
              width: "120px",
            }}
          >
            <div
              className="bg-green-100 border border-green-300 px-2 py-1 text-xs text-green-800 transition-all duration-200"
              style={{ borderRadius: `${innerRadius}px` }}
            >
              Success!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
