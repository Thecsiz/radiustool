"use client"

import { memo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RealWorldExamplesV4Props {
  borderRadius: number
  padding: number
  innerRadius: number
}

// Option 4: Popular Design Systems
const RealWorldExamplesV4 = memo(function RealWorldExamplesV4({
  borderRadius,
  padding,
  innerRadius,
}: RealWorldExamplesV4Props) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const designSystems = [
    {
      name: "iOS",
      color: "bg-blue-500",
      textColor: "text-white",
      description: "Apple's design language",
    },
    {
      name: "Material",
      color: "bg-green-500",
      textColor: "text-white",
      description: "Google's design system",
    },
    {
      name: "Fluent",
      color: "bg-purple-500",
      textColor: "text-white",
      description: "Microsoft's design system",
    },
  ]

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-sm">Design System Styles</h3>

      <Tabs defaultValue="iOS" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {designSystems.map((system) => (
            <TabsTrigger key={system.name} value={system.name} className="text-xs">
              {system.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {designSystems.map((system) => (
          <TabsContent key={system.name} value={system.name} className="space-y-3">
            {/* Button */}
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">{system.name} Button</div>
              <Button
                className={`${system.color} ${system.textColor} hover:opacity-90 transition-all duration-200`}
                style={{
                  borderRadius: `${borderRadius}px`,
                  padding: `${Math.max(padding / 2, 8)}px ${Math.max(padding, 12)}px`,
                }}
                onMouseEnter={() => setHoveredCard(`${system.name}-button`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {system.name} Style
              </Button>
            </div>

            {/* Card */}
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">{system.name} Card</div>
              <div
                className={`border-2 transition-all duration-200 ${
                  hoveredCard === `${system.name}-card` ? "shadow-lg scale-105" : "shadow-sm"
                }`}
                style={{
                  borderRadius: `${borderRadius}px`,
                  padding: `${padding}px`,
                  width: "140px",
                  height: "80px",
                }}
                onMouseEnter={() => setHoveredCard(`${system.name}-card`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`${system.color} ${system.textColor} h-full flex items-center justify-center text-xs font-medium transition-all duration-200`}
                  style={{ borderRadius: `${innerRadius}px` }}
                >
                  {system.description}
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
})

export default RealWorldExamplesV4
