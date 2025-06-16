"use client"

import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { useState } from "react"

interface ExportOptionsProps {
  borderRadius: number
  padding: number
  innerRadius: number
  dimension: number
}

export function ExportOptions({ borderRadius, padding, innerRadius, dimension }: ExportOptionsProps) {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null)

  const copyToClipboard = async (text: string, format: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedFormat(format)
    setTimeout(() => setCopiedFormat(null), 2000)
  }

  const formats = {
    css: `/* CSS */
.outer-container {
  width: ${dimension}px;
  height: ${dimension}px;
  border-radius: ${borderRadius}px;
  padding: ${padding}px;
  border: 4px solid #d1d5db;
  background: #f9fafb;
}

.inner-container {
  width: 100%;
  height: 100%;
  border-radius: ${innerRadius}px;
  border: 4px solid #93c5fd;
  background: #dbeafe;
}`,

    scss: `// SCSS Variables
$outer-radius: ${borderRadius}px;
$padding: ${padding}px;
$inner-radius: ${innerRadius}px;
$dimension: ${dimension}px;

.outer-container {
  width: $dimension;
  height: $dimension;
  border-radius: $outer-radius;
  padding: $padding;
  border: 4px solid #d1d5db;
  background: #f9fafb;
}

.inner-container {
  width: 100%;
  height: 100%;
  border-radius: $inner-radius;
  border: 4px solid #93c5fd;
  background: #dbeafe;
}`,

    tailwind: `<!-- Tailwind Classes -->
<div class="border-4 border-gray-300 bg-gray-50" 
     style="width: ${dimension}px; height: ${dimension}px; border-radius: ${borderRadius}px; padding: ${padding}px;">
  <div class="w-full h-full border-4 border-blue-300 bg-blue-100" 
       style="border-radius: ${innerRadius}px;">
  </div>
</div>`,

    cssInJs: `// CSS-in-JS (styled-components/emotion)
const OuterContainer = styled.div\`
  width: ${dimension}px;
  height: ${dimension}px;
  border-radius: ${borderRadius}px;
  padding: ${padding}px;
  border: 4px solid #d1d5db;
  background: #f9fafb;
\`;

const InnerContainer = styled.div\`
  width: 100%;
  height: 100%;
  border-radius: ${innerRadius}px;
  border: 4px solid #93c5fd;
  background: #dbeafe;
\`;`,

    designTokens: `{
  "border-radius": {
    "outer": {
      "value": "${borderRadius}px",
      "type": "borderRadius"
    },
    "inner": {
      "value": "${innerRadius}px",
      "type": "borderRadius"
    }
  },
  "spacing": {
    "padding": {
      "value": "${padding}px",
      "type": "spacing"
    }
  },
  "sizing": {
    "dimension": {
      "value": "${dimension}px",
      "type": "sizing"
    }
  }
}`,

    swift: `// Swift (iOS)
let outerRadius: CGFloat = ${borderRadius}
let padding: CGFloat = ${padding}
let innerRadius: CGFloat = ${innerRadius}
let dimension: CGFloat = ${dimension}

outerView.layer.cornerRadius = outerRadius
outerView.layer.borderWidth = 4
outerView.layer.borderColor = UIColor.systemGray3.cgColor

innerView.layer.cornerRadius = innerRadius
innerView.layer.borderWidth = 4
innerView.layer.borderColor = UIColor.systemBlue.cgColor`,
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">Export Options</h3>

      {/* Quick Copy Values */}
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => copyToClipboard(`${borderRadius}px`, "outer")}
        >
          {copiedFormat === "outer" ? "✓" : <Copy className="w-3 h-3" />}
          Outer: {borderRadius}px
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => copyToClipboard(`${padding}px`, "padding")}
        >
          {copiedFormat === "padding" ? "✓" : <Copy className="w-3 h-3" />}
          Padding: {padding}px
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => copyToClipboard(`${innerRadius}px`, "inner")}
        >
          {copiedFormat === "inner" ? "✓" : <Copy className="w-3 h-3" />}
          Inner: {innerRadius}px
        </Button>
      </div>

      {/* Format Export Buttons */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-gray-600">Export Formats</h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(formats).map(([format, code]) => (
            <Button
              key={format}
              variant="outline"
              size="sm"
              className="text-xs justify-start"
              onClick={() => copyToClipboard(code, format)}
            >
              {copiedFormat === format ? "✓ Copied!" : <Copy className="w-3 h-3 mr-1" />}
              {format.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
