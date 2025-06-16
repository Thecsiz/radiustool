"use client"

import { memo } from "react"
import { Slider } from "@/components/ui/slider"

interface OptimizedSliderProps {
  label: string
  value: number
  min: number
  max: number
  onChange: (value: number) => void
  className?: string
}

const OptimizedSlider = memo(function OptimizedSlider({
  label,
  value,
  min,
  max,
  onChange,
  className = "",
}: OptimizedSliderProps) {
  return (
    <div className={className}>
      <label className="block mb-2 text-foreground font-medium text-sm">
        {label}: {value}px
      </label>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        min={min}
        max={max}
        step={1}
        className="w-full"
      />
    </div>
  )
})

export default OptimizedSlider
