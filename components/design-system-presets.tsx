"use client"

import { Button } from "@/components/ui/button"

export interface PresetConfig {
  name: string
  borderRadius: number
  padding: number
  dimension: number
  description: string
  category: string
}

export const DESIGN_PRESETS: PresetConfig[] = [
  // iOS Human Interface Guidelines
  {
    name: "iOS Button",
    borderRadius: 8,
    padding: 12,
    dimension: 180,
    description: "Standard iOS button",
    category: "iOS",
  },
  {
    name: "iOS Card",
    borderRadius: 12,
    padding: 16,
    dimension: 180,
    description: "iOS card component",
    category: "iOS",
  },
  { name: "iOS Modal", borderRadius: 16, padding: 24, dimension: 180, description: "iOS modal/sheet", category: "iOS" },
  {
    name: "iOS Large Card",
    borderRadius: 20,
    padding: 32,
    dimension: 180,
    description: "Large iOS card",
    category: "iOS",
  },

  // Material Design
  {
    name: "Material Button",
    borderRadius: 4,
    padding: 8,
    dimension: 180,
    description: "Material Design button",
    category: "Material",
  },
  {
    name: "Material Card",
    borderRadius: 8,
    padding: 16,
    dimension: 180,
    description: "Material Design card",
    category: "Material",
  },
  {
    name: "Material FAB",
    borderRadius: 28,
    padding: 16,
    dimension: 180,
    description: "Floating Action Button",
    category: "Material",
  },
  {
    name: "Material Sheet",
    borderRadius: 16,
    padding: 24,
    dimension: 180,
    description: "Bottom sheet",
    category: "Material",
  },

  // Modern Web
  {
    name: "Subtle Button",
    borderRadius: 6,
    padding: 12,
    dimension: 180,
    description: "Modern subtle button",
    category: "Web",
  },
  {
    name: "Dashboard Card",
    borderRadius: 12,
    padding: 20,
    dimension: 180,
    description: "Dashboard component",
    category: "Web",
  },
  {
    name: "Hero Section",
    borderRadius: 24,
    padding: 48,
    dimension: 180,
    description: "Large hero container",
    category: "Web",
  },
]

interface DesignSystemPresetsProps {
  onApplyPreset: (preset: PresetConfig) => void
}

export function DesignSystemPresets({ onApplyPreset }: DesignSystemPresetsProps) {
  const categories = [...new Set(DESIGN_PRESETS.map((p) => p.category))]

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">Design System Presets</h3>
      {categories.map((category) => (
        <div key={category} className="space-y-2">
          <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wide">{category}</h4>
          <div className="grid grid-cols-2 gap-2">
            {DESIGN_PRESETS.filter((p) => p.category === category).map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                className="h-auto p-2 text-left flex flex-col items-start"
                onClick={() => onApplyPreset(preset)}
              >
                <span className="font-medium text-xs">{preset.name}</span>
                <span className="text-xs text-gray-500">{preset.borderRadius}px radius</span>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
