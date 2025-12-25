import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-400 ease-premium-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#2B2A2A]",
  {
    variants: {
      variant: {
        // Default emerald badge
        default:
          "border-transparent bg-[#47BD79] text-white hover:bg-[#3da86a]",
        // Secondary subtle badge
        secondary:
          "border-white/20 bg-white/10 text-white hover:bg-white/15",
        // Destructive red badge
        destructive:
          "border-transparent bg-red-600 text-white hover:bg-red-700",
        // Outline badge
        outline:
          "border-white/20 text-white bg-transparent hover:bg-white/5",
        // Success green badge
        success:
          "border-[#47BD79]/30 bg-[#47BD79]/20 text-[#47BD79] hover:bg-[#47BD79]/30",
        // Glass base badge
        glass:
          "border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/15",
        // Glass with green accent
        "glass-green":
          "border-[#47BD79]/30 bg-[#47BD79]/15 backdrop-blur-sm text-[#47BD79] hover:bg-[#47BD79]/25 hover:border-[#47BD79]/50",
        // Glass with purple accent
        "glass-purple":
          "border-[#A855F7]/30 bg-[#A855F7]/15 backdrop-blur-sm text-[#A855F7] hover:bg-[#A855F7]/25 hover:border-[#A855F7]/50",
        // Glass with blue accent
        "glass-blue":
          "border-[#3B82F6]/30 bg-[#3B82F6]/15 backdrop-blur-sm text-[#3B82F6] hover:bg-[#3B82F6]/25 hover:border-[#3B82F6]/50",
        // Premium glow badge
        "glow":
          "border-[#47BD79]/30 bg-[#47BD79]/20 text-[#47BD79] shadow-[0_0_10px_rgba(71,189,121,0.3)] hover:shadow-[0_0_15px_rgba(71,189,121,0.5)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }