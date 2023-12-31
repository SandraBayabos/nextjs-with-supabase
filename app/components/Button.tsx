import { FC } from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      onClick={props.onClick}
      className={`btn text-slate-100 bg-gradient-to-tr from-sky-300 to-sky-500 rounded-md py-2 px-3 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
