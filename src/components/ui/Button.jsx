import { cn } from "../../lib/cn";

const variants = {
  solid:
    "bg-accent text-background-primary hover:bg-accent-hover focus-visible:ring-accent-active",
  ghost:
    "border border-border-subtle bg-background-primary text-text-primary hover:border-accent focus-visible:ring-accent-active",
};

export default function Button({
  as: Component = "button",
  variant = "solid",
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
