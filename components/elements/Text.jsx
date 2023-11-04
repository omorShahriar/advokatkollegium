import { cn } from "@/lib/utils";

export function Text({
  as: Component = "p",
  className,
  color = "default",
  size = "copy",
  children,
  ...props
}) {
  const colorClasses = {
    default: "inherit",
    white: "text-white",
    orange: "text-theme-orange",
  };

  const sizeClasses = {
    copy: "text-base",
    fine: "text-sm",
    subHeading:
      "text-base font-bold text-theme-orange uppercase tracking-[1px] leading-5",
    heading: "text-xl lg:text-2xl font-medium font-dm-serif ",
    display: "text-4xl lg:text-6xl  font-dm-serif py-10",
  };

  const classes = cn(colorClasses[color], sizeClasses[size], className);

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
