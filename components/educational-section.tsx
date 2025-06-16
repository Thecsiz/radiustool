"use client"

import { memo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Info } from "lucide-react"

interface EducationalSectionProps {
  borderRadius: number
  padding: number
  innerRadius: number
}

const EducationalSection = memo(function EducationalSection({
  borderRadius,
  padding,
  innerRadius,
}: EducationalSectionProps) {
  const isOptimal = innerRadius > 0 && innerRadius >= borderRadius * 0.3

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-sm mb-4">Apple's Border Radius Formula</h3>
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Inner Radius = Outer Radius - Padding</CardTitle>
            <CardDescription>
              This formula ensures visual harmony and prevents the "floating" effect in nested elements.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg border">
              <div className="font-mono text-sm">
                <div className="text-muted-foreground">Current calculation:</div>
                <div className="mt-1">
                  <span className="text-blue-500">{innerRadius}px</span> ={" "}
                  <span className="text-green-500">{borderRadius}px</span> -{" "}
                  <span className="text-muted-foreground">{padding}px</span>
                </div>
              </div>
            </div>

            <Alert
              className={`border-2 ${isOptimal ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30" : "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/30"}`}
            >
              {isOptimal ? (
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              ) : (
                <Info className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              )}
              <AlertDescription
                className={isOptimal ? "text-green-800 dark:text-green-200" : "text-yellow-800 dark:text-yellow-200"}
              >
                {isOptimal
                  ? "Perfect! Your border radius follows Apple's guidelines for optimal visual harmony."
                  : innerRadius === 0
                    ? "The inner radius is 0. Consider reducing padding or increasing the outer radius for better visual balance."
                    : "The inner radius is quite small. Consider adjusting the ratio for better visual balance."}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-4">Why This Works</h3>
        <div className="grid gap-4">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <CardTitle className="text-sm">Correct Approach</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                Using the formula creates a natural, continuous curve that feels intentional and harmonious. The inner
                element appears properly nested within its container.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" />
                <CardTitle className="text-sm">Common Mistake</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                Using the same radius for both containers creates a "floating" effect where the inner element appears to
                be cut out rather than naturally nested.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-4">Design Guidelines</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <div>
              <strong className="text-foreground">Minimum inner radius:</strong> Aim for at least 30% of the outer
              radius for optimal visual balance.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <div>
              <strong className="text-foreground">Consistent application:</strong> Apply this formula consistently
              across your design system for cohesive user interfaces.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <div>
              <strong className="text-foreground">Platform consideration:</strong> This approach is used by Apple,
              Google, and other major design systems.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export { EducationalSection }
