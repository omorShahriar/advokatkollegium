import clsx from "clsx";

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
    dark: "text-primary-950",
    light: "text-primary-600",
    white: "text-white",
    gray: "text-gray-300",
  };

  const sizeClasses = {
    copy: "text-base",
    fine: "text-sm",
    subheading: "text-lg font-medium",
    heading: "text-xl lg:text-2xl font-medium font-dm-serif",
    display: "text-3xl lg:text-4xl font-medium font-dm-serif",
  };

  const classes = clsx(colorClasses[color], sizeClasses[size], className);

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
