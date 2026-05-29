type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium";

  const variantStyles = {
    primary: "bg-indigo-500 text-white hover:bg-indigo-600",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      {...props}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${className}
      `}
    />
  );
}
export default Button;
