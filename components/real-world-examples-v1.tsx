"use client"

import { memo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, MessageCircle, Share, User } from "lucide-react"

interface RealWorldExamplesV1Props {
  borderRadius: number
  padding: number
  innerRadius: number
}

// Option 1: Interactive Social Media Card
const RealWorldExamplesV1 = memo(function RealWorldExamplesV1({
  borderRadius,
  padding,
  innerRadius,
}: RealWorldExamplesV1Props) {
  const [liked, setLiked] = useState(false)
  const [followed, setFollowed] = useState(false)

  return (
    <div className="flex justify-center">
      {/* Social Media Post */}
      <Card
        className="p-0 overflow-hidden border-2 transition-all duration-200 w-full max-w-sm"
        style={{ borderRadius: `${borderRadius}px` }}
      >
        <div style={{ padding: `${padding}px` }}>
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm"
              style={{ borderRadius: `${innerRadius}px` }}
            >
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">Design System</div>
              <div className="text-xs text-muted-foreground">2 hours ago</div>
            </div>
            <Button
              variant={followed ? "default" : "outline"}
              size="sm"
              onClick={() => setFollowed(!followed)}
              style={{ borderRadius: `${Math.max(innerRadius - 4, 4)}px` }}
            >
              {followed ? "Following" : "Follow"}
            </Button>
          </div>

          {/* Content */}
          <div className="mb-3">
            <p className="text-sm mb-2">
              Just implemented the perfect border radius formula! The visual harmony is incredible ✨
            </p>
            <div
              className="bg-gradient-to-r from-pink-100 to-blue-100 dark:from-pink-900/20 dark:to-blue-900/20 p-4 border"
              style={{ borderRadius: `${innerRadius}px` }}
            >
              <div className="text-xs text-muted-foreground">Preview</div>
              <div className="font-mono text-sm mt-1">border-radius: {borderRadius}px</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLiked(!liked)}
              className={`gap-2 ${liked ? "text-red-500" : ""}`}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
              {liked ? "24" : "23"}
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageCircle className="w-4 h-4" />5
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Share className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
})

export default RealWorldExamplesV1
