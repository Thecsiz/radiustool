"use client"

import { memo } from "react"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Star, Zap } from "lucide-react"

interface RealWorldExamplesV5Props {
  borderRadius: number
  padding: number
  innerRadius: number
}

// Option 5: Dashboard/Analytics Style
const RealWorldExamplesV5 = memo(function RealWorldExamplesV5({
  borderRadius,
  padding,
  innerRadius,
}: RealWorldExamplesV5Props) {
  const metrics = [
    {
      icon: TrendingUp,
      label: "Growth",
      value: "24%",
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950/20",
    },
    { icon: Users, label: "Users", value: "1.2k", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/20" },
    { icon: Star, label: "Rating", value: "4.9", color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-950/20" },
    { icon: Zap, label: "Speed", value: "98ms", color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/20" },
  ]

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-sm">Dashboard Components</h3>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={`${metric.bg} border transition-all duration-200 hover:shadow-md`}
            style={{
              borderRadius: `${borderRadius}px`,
              padding: `${padding}px`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`${metric.color} p-1`} style={{ borderRadius: `${Math.max(innerRadius - 4, 2)}px` }}>
                <metric.icon className="w-3 h-3" />
              </div>
              <span className="text-xs text-muted-foreground">{metric.label}</span>
            </div>
            <div className="font-bold text-lg">{metric.value}</div>
          </div>
        ))}
      </div>

      {/* Chart Card */}
      <div
        className="bg-card border-2 border-border"
        style={{
          borderRadius: `${borderRadius}px`,
          padding: `${padding}px`,
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-sm">Analytics</h4>
          <Badge variant="secondary" style={{ borderRadius: `${Math.max(innerRadius - 2, 2)}px` }}>
            Live
          </Badge>
        </div>
        <div
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border h-16 flex items-end justify-center gap-1"
          style={{ borderRadius: `${innerRadius}px` }}
        >
          {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
            <div
              key={i}
              className="bg-blue-500 w-2 transition-all duration-300 hover:bg-blue-600"
              style={{
                height: `${height}%`,
                borderRadius: `${Math.max(innerRadius / 4, 1)}px`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
})

export default RealWorldExamplesV5
