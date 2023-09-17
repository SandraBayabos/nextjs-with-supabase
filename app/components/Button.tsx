import { FC } from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`btn text-slate-100 bg-gradient-to-tr from-sky-300 to-sky-500 rounded-md py-2 px-3 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
