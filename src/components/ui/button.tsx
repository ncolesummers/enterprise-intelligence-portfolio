import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// A button on a drawing is a ruled box with a label in it, not a raised or
// filled plane. The annotation red is a rule and a label color here, never a
// fill — filling with it would make the one annotation color into decoration.
const buttonVariants = cva(
  "type-label inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "rule-object hover:bg-muted bg-transparent",
        accent:
          "rule-object border-annotation text-annotation hover:bg-annotation/10 bg-transparent",
        destructive:
          "rule-object border-destructive text-destructive hover:bg-destructive/10 bg-transparent",
        outline: "rule-leader hover:bg-muted bg-transparent",
        secondary: "rule-leader text-muted-foreground hover:text-foreground",
        ghost: "hover:bg-muted border-transparent",
        link: "hover:text-annotation underline underline-offset-4",
      },
      size: {
        default: "h-10 px-5 has-[>svg]:px-4",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 px-7 has-[>svg]:px-5",
        icon: "size-10",
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
