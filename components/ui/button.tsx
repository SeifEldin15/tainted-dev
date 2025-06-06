import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center disabled:cursor-not-allowed whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 dark:text-white",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 dark:text-white",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground dark:border-transparent dark:text-white dark:hover:bg-accent/20",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 dark:text-white",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:text-white dark:hover:bg-accent/20",
        link: "text-primary underline-offset-4 hover:underline dark:text-white",
        // brand Color button
        brand:
          "bg-brand text-brand-foreground shadow-sm hover:bg-brand/90 text-black dark:text-white",
        // Attention Red Color button
        attention:
          "bg-red-500 text-destructive-foreground shadow-sm hover:bg-red-500/80 dark:text-white",
        // Warrning Red Color button
        warning:
          "bg-yellow-500 text-destructive-foreground shadow-sm hover:bg-yellow-500/80 dark:text-white",
      },
      size: {
        default: "h-9 px-4 py-2",
        xs: "h-6 rounded-md px-2 text-xs",
        sm: "h-8 rounded-md px-3 text-sm",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
