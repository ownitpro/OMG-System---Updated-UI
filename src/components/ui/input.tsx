import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base glass styling
          "flex h-11 w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-glass-light px-4 py-2 text-sm text-white",
          // Ring and focus states
          "ring-offset-[#2B2A2A] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/40",
          // Enhanced focus glow effect
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47BD79]/40 focus-visible:border-[#47BD79]/50 focus-visible:shadow-[0_0_20px_rgba(71,189,121,0.2)]",
          // Hover state
          "hover:border-white/20 hover:bg-white/8",
          // Disabled and transition
          "disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-600 ease-premium-out",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
