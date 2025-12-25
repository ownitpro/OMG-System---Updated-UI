import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-600 ease-premium-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B2A2A] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        // Primary emerald button with glow
        default:
          "bg-[#47BD79] text-white hover:bg-[#3da86a] focus-visible:ring-[#47BD79] shadow-lg shadow-[#47BD79]/25 hover:shadow-xl hover:shadow-[#47BD79]/35 hover:scale-[1.02]",
        // Destructive with glow
        destructive:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/35",
        // Outline with glow on hover
        outline:
          "border-2 border-[#47BD79] bg-transparent text-[#47BD79] hover:bg-[#47BD79]/10 hover:shadow-[0_0_20px_rgba(71,189,121,0.3)] focus-visible:ring-[#47BD79]",
        // Secondary glass-like
        secondary:
          "bg-white/10 backdrop-blur-glass-medium text-white border border-white/20 hover:bg-white/15 hover:border-white/30 focus-visible:ring-white/30",
        // Ghost with subtle hover
        ghost:
          "text-white/80 hover:text-white hover:bg-white/10 focus-visible:ring-white/20",
        // Link style
        link:
          "text-[#47BD79] underline-offset-4 hover:underline focus-visible:ring-[#47BD79]",
        // Enhanced glass with blur
        glass:
          "bg-white/10 backdrop-blur-glass-medium text-white border border-white/20 hover:bg-white/15 hover:border-[#47BD79]/40 hover:shadow-[0_0_25px_rgba(71,189,121,0.25)] focus-visible:ring-white/30",
        // Glass with green glow border
        "glass-glow":
          "bg-white/10 backdrop-blur-glass-medium text-white border border-[#47BD79]/30 shadow-[0_0_15px_rgba(71,189,121,0.2)] hover:bg-white/15 hover:border-[#47BD79]/50 hover:shadow-[0_0_30px_rgba(71,189,121,0.4)] focus-visible:ring-[#47BD79]/50",
        // Gradient primary button
        "gradient-primary":
          "bg-gradient-to-r from-[#47BD79] to-[#3da86a] text-white hover:from-[#5fcd8f] hover:to-[#47BD79] shadow-lg shadow-[#47BD79]/30 hover:shadow-xl hover:shadow-[#47BD79]/40 hover:scale-[1.02]",
        // Purple accent
        "accent-purple":
          "bg-[#A855F7] text-white hover:bg-[#9333ea] focus-visible:ring-[#A855F7] shadow-lg shadow-[#A855F7]/25 hover:shadow-xl hover:shadow-[#A855F7]/35 hover:scale-[1.02]",
        // Blue accent
        "accent-blue":
          "bg-[#3B82F6] text-white hover:bg-[#2563eb] focus-visible:ring-[#3B82F6] shadow-lg shadow-[#3B82F6]/25 hover:shadow-xl hover:shadow-[#3B82F6]/35 hover:scale-[1.02]",
        // Glass with purple glow
        "glass-purple":
          "bg-white/10 backdrop-blur-glass-medium text-white border border-[#A855F7]/30 shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:bg-white/15 hover:border-[#A855F7]/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] focus-visible:ring-[#A855F7]/50",
        // Glass with blue glow
        "glass-blue":
          "bg-white/10 backdrop-blur-glass-medium text-white border border-[#3B82F6]/30 shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-white/15 hover:border-[#3B82F6]/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] focus-visible:ring-[#3B82F6]/50",
      },
      size: {
        default: "h-10 px-5 py-2 rounded-xl",
        sm: "h-9 px-4 py-2 rounded-lg text-xs",
        lg: "h-12 px-8 py-3 rounded-xl text-base",
        xl: "h-14 px-10 py-4 rounded-2xl text-lg font-semibold",
        icon: "h-10 w-10 rounded-xl",
        "icon-sm": "h-8 w-8 rounded-lg",
        "icon-lg": "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
