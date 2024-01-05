import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Text } from "@radix-ui/themes";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        destructiveCircle:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full",
        success: "bg-green-300 text-green-800 hover:bg-green-400/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        iconGhost: "hover:opacity-80",
        image: "hover:bg-accent hover:opacity-85 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        iconCircle:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-full",
      },
      size: {
        image: "h-fit w-fit",
        default: "h-10 px-4 py-2",
        carousel: "h-50 w-50",
        lg: "h-11 rounded-md px-8",
        sm: "h-9 rounded-md px-3",
        xs: "h-8 rounded-md px-2",
        icon: "h-10 w-10",
        xsIcon: "h-8 w-8 px-1 py-1",
        mini: "h-6 w-6",
        badge: "h-fit w-fit p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  buttonTip?: string;
  buttonInfo?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      buttonTip,
      buttonInfo,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    // Added if statement to check if buttonTip is present, if so, wrap the button in a tooltip
    // Reason for doing it like this is, that i don't understand forwardRef and how to pass it to the TooltipProvider
    if (buttonInfo) {
      return (
        <div className="flex flex-col items-center">
          <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
          />
          <Text size={"1"}>{buttonInfo}</Text>
        </div>
      );
    }
    if (buttonTip) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
              />
            </TooltipTrigger>
            <TooltipContent className="-ml-8">
              <p>{buttonTip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
