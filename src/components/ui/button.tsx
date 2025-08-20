import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "btn-gradient-ocean shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/35 hover:scale-105 active:scale-95",
        outline:
          "border-2 border-primary/30 bg-background/50 backdrop-blur-sm hover:bg-gradient-ocean-subtle hover:border-primary/50 hover:scale-105 shadow-sm hover:shadow-md transition-all duration-300",
        secondary: "btn-gradient-sunset shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
        ghost:
          "hover:bg-gradient-ocean-subtle hover:text-primary backdrop-blur-sm hover:scale-105 transition-all duration-300",
        link: "text-primary underline-offset-4 hover:underline hover:text-secondary transition-colors",
        cosmic: "btn-gradient-cosmic shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
        gradient:
          "bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:scale-105 active:scale-95",
      },
      size: {
        default: "h-10 px-6 py-2 has-[>svg]:px-4",
        sm: "h-8 rounded-lg gap-1.5 px-4 has-[>svg]:px-3 text-xs",
        lg: "h-12 rounded-xl px-8 has-[>svg]:px-6 text-base",
        xl: "h-14 rounded-2xl px-10 has-[>svg]:px-8 text-lg",
        icon: "size-10 rounded-xl",
        "icon-sm": "size-8 rounded-lg",
        "icon-lg": "size-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
