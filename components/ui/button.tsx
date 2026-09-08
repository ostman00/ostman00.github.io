import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium whitespace-nowrap",
    "rounded-[var(--radius-button)]",
    "transition-all duration-150 ease-out",
    "hover:-translate-y-[2px] active:scale-[0.98] active:translate-y-0",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-border-focus)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-action-primary)] text-[var(--color-text-on-action)] hover:bg-[var(--color-action-primary-hover)] active:bg-[var(--color-action-primary-active)]",
        secondary:
          "bg-[var(--color-surface-card)] text-[var(--color-text-primary)] border border-[var(--color-border-default)] hover:bg-[var(--color-surface-sunken)] active:bg-[var(--color-border-default)]",
        ghost:
          "text-[var(--color-text-primary)] hover:bg-[var(--color-surface-sunken)] active:bg-[var(--color-border-default)]",
        destructive:
          "bg-[var(--color-action-destructive)] text-[var(--color-text-on-action)] hover:bg-red-700 active:bg-red-800",
        link: "text-[var(--color-action-primary)] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-sm [&_svg]:size-4",
        md: "h-10 px-4 text-base [&_svg]:size-5",
        lg: "h-12 px-6 text-lg [&_svg]:size-6",
        icon: "h-10 w-10 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
              <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="sr-only">Loading</span>
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
