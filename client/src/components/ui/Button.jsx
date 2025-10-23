export const buttonVariants = {
  base: `font-nunito flex items-center justify-center text-center rounded-3xl 
  hover:font-semibold focus:font-semibold hover:scale-105 transition-all duration-300
  border-cyan-600`,
  size: {
    sm: "py-2 px-3 text-sm",
    md: "py-2 px-6 text-md",
    lg: "sm:py-3 py-1 sm:px-8 px-4 sm:text-lg text-sm",
  },
  variant: {
    primary: `bg-gradient-to-br from-cyan-100 to-cyan-500 text-black hover:shadow-lg hover:shadow-cyan-800`,
    secondary: `bg-gradient-to-br from-cyan-900 to-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-400`,
    neon: `relative inline-block text-cyan-400 rounded-none
    uppercase tracking-widest hover:tracking-widest overflow-hidden
    hover:bg-cyan-600 hover:text-black hover:shadow-cyan-800 hover:shadow-lg
    hover:[-webkit-box-reflect:below_1px_linear-gradient(transparent,rgba(0,0,0,0.2))] [&>span]:absolute [&>span]:block
     
    [&>span:nth-child(1)]:top-0 [&>span:nth-child(1)]:left-0 [&>span:nth-child(1)]:w-[100%] [&>span:nth-child(1)]:h-0.5 
    [&>span:nth-child(1)]:bg-gradient-to-r [&>span:nth-child(1)]:from-transparent [&>span:nth-child(1)]:via-cyan-400
    [&>span:nth-child(1)]:to-transparent [&>span:nth-child(1)]:animate-slideRight 

    [&>span:nth-child(2)]:top-[-100%] [&>span:nth-child(2)]:right-0 [&>span:nth-child(2)]:w-0.5 [&>span:nth-child(2)]:h-[100%] 
    [&>span:nth-child(2)]:bg-gradient-to-b [&>span:nth-child(2)]:from-transparent [&>span:nth-child(2)]:via-cyan-400
    [&>span:nth-child(2)]:to-transparent [&>span:nth-child(2)]:animate-slideDown [&>span:nth-child(2)]:[animation-delay:0.25s]

    [&>span:nth-child(3)]:bottom-0 [&>span:nth-child(3)]:right-0 [&>span:nth-child(3)]:w-[100%] [&>span:nth-child(3)]:h-0.5
    [&>span:nth-child(3)]:bg-gradient-to-l [&>span:nth-child(3)]:from-transparent [&>span:nth-child(3)]:via-cyan-400 
    [&>span:nth-child(3)]:to-transparent [&>span:nth-child(3)]:animate-slideLeft [&>span:nth-child(3)]:[animation-delay:0.5s]

    [&>span:nth-child(4)]:bottom-0 [&>span:nth-child(4)]:left-0 [&>span:nth-child(4)]:w-0.5 [&>span:nth-child(4)]:h-[100%]
    [&>span:nth-child(4)]:bg-gradient-to-t [&>span:nth-child(4)]:from-transparent [&>span:nth-child(4)]:via-cyan-400 [&>span:nth-child(4)]:to-transparent
    [&>span:nth-child(4)]:animate-slideUp [&>span:nth-child(4)]:[animation-delay:0.75s]`,
    delete: "bg-red-400 hover:bg-red-600 text-black",
  },
};

const Button = ({
  type = "button",
  variant = "primary",
  size = "md",
  children,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`${className} ${buttonVariants.base} ${buttonVariants.variant[variant]}  ${buttonVariants.size[size]} `}
    >
      {variant === "neon" ? (
        <>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
