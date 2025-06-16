"use client"

import { memo, useCallback } from "react"
import { Slider } from "@/components/ui/slider"

interface OptimizedSliderProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  suffix?: string
  onChange: (value: number) => void
  className?: string
}

const OptimizedSlider = memo(function OptimizedSlider({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = "px",
  onChange,
  className = "",
}: OptimizedSliderProps) {
  const handleChange = useCallback(
    (newValue: number[]) => {
      onChange(newValue[0])
    },
    [onChange],
  )

  return (
    <div className={className}>
      <label className="block mb-2 text-black font-medium text-sm">
        {label}: {value}
        {suffix}
      </label>
      <Slider value={[value]} onValueChange={handleChange} max={max} min={min} step={step} className="w-full" />
    </div>
  )
})

export default OptimizedSlider
