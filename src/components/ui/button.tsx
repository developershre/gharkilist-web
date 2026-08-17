import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-emerald-light shadow-md shadow-emerald/15",
        emerald: "bg-emerald text-white hover:bg-emerald-light shadow-sm shadow-emerald/15",
        mint: "bg-mint text-white hover:bg-mint/90 shadow-sm shadow-mint/20",
        saffron: "bg-saffron text-slate hover:bg-saffron/90 font-bold shadow-sm shadow-saffron/20",
        whatsapp: "bg-whatsapp text-white hover:bg-whatsapp/90 shadow-md shadow-whatsapp/20",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-slate/15 bg-white text-slate hover:bg-slate/5 hover:border-slate/30",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-slate/5 text-slate hover:text-emerald",
        link: "text-emerald underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-[14px]",
        sm: "h-9 rounded-full px-4 text-[13px]",
        lg: "h-12 rounded-full px-8 text-[15px]",
        icon: "h-9 w-9 rounded-full",
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
