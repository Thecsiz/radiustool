"use client"

import { memo, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

interface ExportOptionsProps {
  borderRadius: number
  padding: number
  innerRadius: number
  dimension: number
}

const ExportOptions = memo(function ExportOptions({
  borderRadius,
  padding,
  innerRadius,
  dimension,
}: ExportOptionsProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  // Memoize export formats
  const exportFormats = useMemo(
    () => ({
      css: `/* Outer Container */
.outer-container {
  border-radius: ${borderRadius}px;
  padding: ${padding}px;
  width: ${dimension}px;
  height: ${dimension}px;
}

/* Inner Container */
.inner-container {
  border-radius: ${innerRadius}px;
}`,
      scss: `// Border Radius Variables
$outer-radius: ${borderRadius}px;
$padding: ${padding}px;
$inner-radius: ${innerRadius}px;
$dimension: ${dimension}px;

.outer-container {
  border-radius: $outer-radius;
  padding: $padding;
  width: $dimension;
  height: $dimension;
}

.inner-container {
  border-radius: $inner-radius;
}`,
      tailwind: `<!-- Outer Container -->
<div class="rounded-[${borderRadius}px] p-[${padding}px] w-[${dimension}px] h-[${dimension}px]">
  <!-- Inner Container -->
  <div class="rounded-[${innerRadius}px]">
    <!-- Content -->
  </div>
</div>`,
      cssInJs: `const styles = {
  outerContainer: {
    borderRadius: '${borderRadius}px',
    padding: '${padding}px',
    width: '${dimension}px',
    height: '${dimension}px',
  },
  innerContainer: {
    borderRadius: '${innerRadius}px',
  },
}`,
      designTokens: `{
  "border-radius": {
    "outer": "${borderRadius}px",
    "inner": "${innerRadius}px"
  },
  "spacing": {
    "padding": "${padding}px"
  },
  "size": {
    "dimension": "${dimension}px"
  }
}`,
      swift: `// iOS/Swift
let outerRadius: CGFloat = ${borderRadius}
let padding: CGFloat = ${padding}
let innerRadius: CGFloat = ${innerRadius}
let dimension: CGFloat = ${dimension}

// Usage
view.layer.cornerRadius = outerRadius
view.layoutMargins = UIEdgeInsets(top: padding, left: padding, bottom: padding, right: padding)
innerView.layer.cornerRadius = innerRadius`,
    }),
    [borderRadius, padding, innerRadius, dimension],
  )

  const copyToClipboard = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(format)
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const quickCopyValues = useMemo(
    () => [
      { label: "Outer Radius", value: `${borderRadius}px`, key: "outer" },
      { label: "Padding", value: `${padding}px`, key: "padding" },
      { label: "Inner Radius", value: `${innerRadius}px`, key: "inner" },
    ],
    [borderRadius, padding, innerRadius],
  )

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-sm mb-4">Quick Copy Values</h3>
        <div className="grid grid-cols-1 gap-2">
          {quickCopyValues.map((item) => (
            <Button
              key={item.key}
              variant="outline"
              size="sm"
              className="justify-between h-auto p-3"
              onClick={() => copyToClipboard(item.value, item.key)}
            >
              <div className="text-left">
                <div className="font-medium text-xs">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.value}</div>
              </div>
              {copiedItem === item.key ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-4">Export Formats</h3>
        <div className="space-y-3">
          {Object.entries(exportFormats).map(([format, code]) => (
            <div key={format} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {format === "cssInJs" ? "CSS-in-JS" : format}
                </h4>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(code, format)} className="h-6 px-2">
                  {copiedItem === format ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
              <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto border">
                <code>{code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})

export { ExportOptions }
