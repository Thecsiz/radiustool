"use client"

import React, { useState, useRef, useCallback, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useDebouncedValue } from "./hooks/use-debounced-value"
import { useThrottledCallback } from "./hooks/use-throttled-callback"
import OptimizedVisualPreview from "./components/optimized-visual-preview"
import OptimizedSlider from "./components/optimized-slider"
import { DesignSystemPresets, type PresetConfig } from "./components/design-system-presets"
import { ExportOptions } from "./components/export-options"
import { EducationalSection } from "./components/educational-section"
import RealWorldExamplesV1 from "./components/real-world-examples-v1"

export default function BorderRadiusTool() {
  // Core state
  const [borderRadius, setBorderRadius] = useState(30)
  const [padding, setPadding] = useState(20)
  const [dimension, setDimension] = useState(200)

  // UI state
  const [individualCorners, setIndividualCorners] = useState(false)
  const [isDragging, setIsDragging] = useState<"radius" | "padding" | null>(null)

  // Theme
  const { theme, setTheme } = useTheme()

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
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <div className="container mx-auto p-8">
        {/* Header with theme toggle */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Border Radius Tool</h1>
            <p className="text-muted-foreground">
              Professional border radius calculator following Apple Human Interface Guidelines
            </p>
          </div>
          <Button variant="outline" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

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

            <p className="text-muted-foreground font-bold text-sm text-center select-none">{padding}px</p>

            {/* Social Media Card Example */}
            <div className="w-full max-w-md">
              <RealWorldExamplesV1
                borderRadius={debouncedBorderRadius}
                padding={debouncedPadding}
                innerRadius={Math.max(0, debouncedBorderRadius - debouncedPadding)}
              />
            </div>
          </div>

          {/* Controls Panel */}
          <Card className="p-6 h-fit border-border bg-card">
            <Tabs defaultValue="controls" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted">
                <TabsTrigger value="controls" className="data-[state=active]:bg-background">
                  Controls
                </TabsTrigger>
                <TabsTrigger value="advanced" className="data-[state=active]:bg-background">
                  Advanced
                </TabsTrigger>
                <TabsTrigger value="export" className="data-[state=active]:bg-background">
                  Export
                </TabsTrigger>
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
                    <label className="block text-foreground font-medium text-sm">Individual Corner Radius</label>
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
                <div className="flex flex-row gap-4 w-full pt-2 border-t border-border">
                  <p className="text-green-500 font-bold text-sm select-none">{outerRadius}px</p>
                  <p className="text-muted-foreground font-bold text-sm select-none">{padding}px</p>
                  <p className="text-blue-500 font-bold text-sm select-none">{innerRadius}px</p>
                </div>

                {/* Design System Presets */}
                <div className="border-t border-border pt-4">
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
