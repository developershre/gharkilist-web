import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-emerald/10 text-emerald hover:bg-emerald/15",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        mint: "border-transparent bg-mint/15 text-emerald hover:bg-mint/20",
        saffron: "border-transparent bg-saffron/15 text-amber-800 hover:bg-saffron/20",
        whatsapp: "border-transparent bg-whatsapp/15 text-emerald-800",
        outline: "border-slate/20 text-slate/70",
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
