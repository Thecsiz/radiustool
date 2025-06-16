"use client"

import React, { useState, useRef, useCallback, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useDebouncedValue } from "./hooks/use-debounced-value"
import { useThrottledCallback } from "./hooks/use-throttled-callback"
import OptimizedVisualPreview from "./components/optimized-visual-preview"
import OptimizedSlider from "./components/optimized-slider"
import OptimizedRealWorldExamples from "./components/optimized-real-world-examples"
import { DesignSystemPresets, type PresetConfig } from "./components/design-system-presets"
import { ExportOptions } from "./components/export-options"
import { EducationalSection } from "./components/educational-section"

export default function BorderRadiusTool() {
  // Core state
  const [borderRadius, setBorderRadius] = useState(30)
  const [padding, setPadding] = useState(20)
  const [dimension, setDimension] = useState(200)

  // UI state
  const [individualCorners, setIndividualCorners] = useState(false)
  const [isDragging, setIsDragging] = useState<"radius" | "padding" | null>(null)

  // Corner radii state
  const [cornerRadii, setCornerRadii] = useState({
    topLeft: 30,
    topRight: 30,
    bottomRight: 30,
    bottomLeft: 30,
  })

  const visualRef = useRef<HTMLDivElement>(null)

  // Debounced values for expensive operations
  const debouncedBorderRadius = useDebouncedValue(borderRadius, 50)
  const debouncedPadding = useDebouncedValue(padding, 50)

  // Memoized calculations
  const innerRadius = useMemo(() => Math.max(0, borderRadius - padding), [borderRadius, padding])
  const outerRadius = useMemo(() => borderRadius, [borderRadius])
  const maxPadding = useMemo(() => Math.floor(dimension / 2 - 10), [dimension])

  // Optimized callbacks
  const handleBorderRadiusChange = useCallback(
    (value: number) => {
      setBorderRadius(value)
      if (individualCorners) {
        setCornerRadii({
          topLeft: value,
          topRight: value,
          bottomRight: value,
          bottomLeft: value,
        })
      }
    },
    [individualCorners],
  )

  const handlePaddingChange = useCallback((value: number) => {
    setPadding(value)
  }, [])

  const handleDimensionChange = useCallback((value: number) => {
    setDimension(value)
  }, [])

  const handleCornerRadiusChange = useCallback((corner: string, value: number) => {
    setCornerRadii((prev) => ({ ...prev, [corner]: value }))
  }, [])

  // Throttled mouse handlers for better performance
  const handleMouseMove = useThrottledCallback((e: MouseEvent) => {
    if (!isDragging || !visualRef.current) return

    const rect = visualRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2))

    if (isDragging === "radius") {
      const newRadius = Math.max(0, Math.min(50, Math.round(distance / 4)))
      setBorderRadius(newRadius)
    } else if (isDragging === "padding") {
      const newPadding = Math.max(0, Math.min(maxPadding, Math.round(distance / 6)))
      setPadding(newPadding)
    }
  }, 16) // ~60fps

  const handleMouseDown = useCallback((e: React.MouseEvent, type: "radius" | "padding") => {
    e.preventDefault()
    setIsDragging(type)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsDragging(null)
  }, [])

  // Preset application
  const applyPreset = useCallback(
    (preset: PresetConfig) => {
      setBorderRadius(preset.borderRadius)
      setPadding(preset.padding)
      setDimension(preset.dimension)

      if (individualCorners) {
        setCornerRadii({
          topLeft: preset.borderRadius,
          topRight: preset.borderRadius,
          bottomRight: preset.borderRadius,
          bottomLeft: preset.borderRadius,
        })
      }
    },
    [individualCorners],
  )

  // Mouse event listeners
  React.useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Visual */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center space-y-4">
            <p className="text-green-500 font-bold text-sm select-none">{outerRadius}px</p>

            <div ref={visualRef} className="relative">
              <OptimizedVisualPreview
                borderRadius={borderRadius}
                padding={padding}
                dimension={dimension}
                innerRadius={innerRadius}
                individualCorners={individualCorners}
                cornerRadii={cornerRadii}
                onMouseDown={handleMouseDown}
                isDragging={isDragging}
              />
            </div>

            <p className="text-gray-500 font-bold text-sm text-center select-none">{padding}px</p>

            {/* Real-world examples */}
            <div className="w-full max-w-md">
              <OptimizedRealWorldExamples
                borderRadius={debouncedBorderRadius}
                padding={debouncedPadding}
                innerRadius={Math.max(0, debouncedBorderRadius - debouncedPadding)}
              />
            </div>
          </div>

          {/* Controls Panel */}
          <Card className="p-6 h-fit">
            <Tabs defaultValue="controls" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="controls">Controls</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
                <TabsTrigger value="export">Export</TabsTrigger>
              </TabsList>

              <TabsContent value="controls" className="space-y-6 mt-6">
                {/* Individual corners toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Individual corners</label>
                  <Switch checked={individualCorners} onCheckedChange={setIndividualCorners} />
                </div>

                {/* Border Radius Controls */}
                {!individualCorners ? (
                  <OptimizedSlider
                    label="Border Radius"
                    value={borderRadius}
                    min={0}
                    max={100}
                    onChange={handleBorderRadiusChange}
                  />
                ) : (
                  <div className="space-y-3">
                    <label className="block text-black font-medium text-sm">Individual Corner Radius</label>
                    {Object.entries(cornerRadii).map(([corner, value]) => (
                      <OptimizedSlider
                        key={corner}
                        label={corner.replace(/([A-Z])/g, " $1")}
                        value={value}
                        min={0}
                        max={100}
                        onChange={(newValue) => handleCornerRadiusChange(corner, newValue)}
                        className="mb-2"
                      />
                    ))}
                  </div>
                )}

                {/* Padding Control */}
                <OptimizedSlider
                  label={`Padding (max: ${maxPadding}px)`}
                  value={padding}
                  min={0}
                  max={maxPadding}
                  onChange={handlePaddingChange}
                />

                {/* Dimension Control */}
                <OptimizedSlider
                  label="Dimension"
                  value={dimension}
                  min={100}
                  max={500}
                  onChange={handleDimensionChange}
                />

                {/* Values Summary */}
                <div className="flex flex-row gap-4 w-full pt-2 border-t">
                  <p className="text-green-500 font-bold text-sm select-none">{outerRadius}px</p>
                  <p className="text-gray-500 font-bold text-sm select-none">{padding}px</p>
                  <p className="text-blue-500 font-bold text-sm select-none">{innerRadius}px</p>
                </div>

                {/* Design System Presets */}
                <div className="border-t pt-4">
                  <DesignSystemPresets onApplyPreset={applyPreset} />
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6 mt-6">
                <EducationalSection borderRadius={borderRadius} padding={padding} innerRadius={innerRadius} />
              </TabsContent>

              <TabsContent value="export" className="space-y-6 mt-6">
                <ExportOptions
                  borderRadius={borderRadius}
                  padding={padding}
                  innerRadius={innerRadius}
                  dimension={dimension}
                />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}
