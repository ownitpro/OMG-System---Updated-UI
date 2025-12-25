import * as React from "react"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "stat" | "chart" | "action" | "info" | "glass" | "glass-accent" | "glass-purple" | "glass-blue" | "glass-gradient" | "featured";
  gradient?: boolean;
  loading?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", gradient = false, loading = false, ...props }, ref) => {
    const variantClasses = {
      // Base dark card
      default: "rounded-2xl border border-white/10 bg-[#2B2A2A] text-white shadow-lg transition-all duration-600 ease-premium-out",
      // Stat card with hover glow
      stat: "rounded-2xl border border-white/10 bg-[#353434] text-white shadow-lg hover:shadow-xl hover:border-[#47BD79]/30 hover:shadow-[0_0_20px_rgba(71,189,121,0.15)] transition-all duration-600 ease-premium-out",
      // Chart container
      chart: "rounded-2xl border border-white/10 bg-[#2B2A2A] text-white shadow-lg transition-all duration-600 ease-premium-out",
      // Interactive action card
      action: "rounded-2xl border border-white/10 bg-[#2B2A2A] text-white shadow-lg hover:shadow-xl hover:border-[#47BD79]/40 hover:bg-[#353434] hover:shadow-[0_0_25px_rgba(71,189,121,0.2)] hover:-translate-y-1 transition-all duration-600 ease-premium-out cursor-pointer",
      // Info card with green tint
      info: "rounded-2xl border border-[#47BD79]/20 bg-[#47BD79]/10 text-white shadow-lg transition-all duration-600 ease-premium-out",
      // Base glass card
      glass: "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white shadow-glass hover:bg-white/10 hover:shadow-glass-hover transition-all duration-600 ease-premium-out",
      // Glass with green accent glow
      "glass-accent": "rounded-2xl border border-[#47BD79]/30 bg-white/8 backdrop-blur-xl text-white shadow-[0_0_20px_rgba(71,189,121,0.15)] hover:border-[#47BD79]/50 hover:shadow-[0_0_30px_rgba(71,189,121,0.25)] hover:-translate-y-1 transition-all duration-600 ease-premium-out",
      // Glass with purple accent glow
      "glass-purple": "rounded-2xl border border-[#A855F7]/30 bg-white/8 backdrop-blur-xl text-white shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:border-[#A855F7]/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] hover:-translate-y-1 transition-all duration-600 ease-premium-out",
      // Glass with blue accent glow
      "glass-blue": "rounded-2xl border border-[#3B82F6]/30 bg-white/8 backdrop-blur-xl text-white shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:border-[#3B82F6]/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:-translate-y-1 transition-all duration-600 ease-premium-out",
      // Glass with gradient border effect
      "glass-gradient": "rounded-2xl bg-white/8 backdrop-blur-xl text-white shadow-glass relative before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-r before:from-[#47BD79] before:to-[#A855F7] before:-z-10 before:opacity-50 hover:before:opacity-100 hover:shadow-glow-multi transition-all duration-600 ease-premium-out",
      // Featured card with gradient bg
      featured: "rounded-2xl border-2 border-[#47BD79]/30 bg-gradient-to-br from-[#2B2A2A] to-[#353434] text-white shadow-xl shadow-[#47BD79]/10 hover:border-[#47BD79]/50 hover:shadow-[#47BD79]/20 hover:-translate-y-1 transition-all duration-600 ease-premium-out",
    };

    const gradientClasses = gradient
      ? "bg-gradient-to-br from-[#47BD79] to-[#3da86a] text-white border-0 shadow-lg shadow-[#47BD79]/25"
      : "";

    return (
      <div
        ref={ref}
        className={cn(
          variantClasses[variant],
          gradientClasses,
          loading && "animate-pulse",
          className
        )}
        {...props}
      />
    );
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-white",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-[#7A7A73]", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Loading Skeleton Components - Dark theme
const CardSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-2xl border border-white/10 bg-[#2B2A2A] animate-pulse", className)}
    {...props}
  >
    <div className="p-6 space-y-4">
      <div className="h-4 bg-white/10 rounded-lg w-3/4"></div>
      <div className="h-4 bg-white/10 rounded-lg w-1/2"></div>
      <div className="h-20 bg-white/10 rounded-lg"></div>
    </div>
  </div>
))
CardSkeleton.displayName = "CardSkeleton"

const StatCardSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-2xl border border-white/10 bg-[#353434] shadow-lg animate-pulse", className)}
    {...props}
  >
    <div className="p-6 space-y-3">
      <div className="h-4 bg-white/10 rounded-lg w-1/2"></div>
      <div className="h-8 bg-white/10 rounded-lg w-1/3"></div>
      <div className="h-3 bg-white/10 rounded-lg w-2/3"></div>
    </div>
  </div>
))
StatCardSkeleton.displayName = "StatCardSkeleton"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardSkeleton,
  StatCardSkeleton,
}
