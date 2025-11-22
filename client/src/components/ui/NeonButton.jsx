const NeonButton = ({ children, className, ...rest }) => {
  return (
    <button
      {...rest}
      className={`${className} 
      "font-nunito relative inline-block px-6 py-3 font-semibold text-cyan-400
     uppercase transition-all ease-in tracking-widest hover:tracking-widest overflow-hidden
    hover:bg-cyan-600 hover:text-black hover:shadow-cyan-800 hover:shadow-lg
     hover:[-webkit-box-reflect:below_1px_linear-gradient(transparent,rgba(0,0,0,0.2))] [&>span]:absolute [&>span]:block
     
    [&>span:nth-child(1)]:top-0 [&>span:nth-child(1)]:left-0 [&>span:nth-child(1)]:w-[100%] [&>span:nth-child(1)]:h-0.5 
    [&>span:nth-child(1)]:bg-gradient-to-r [&>span:nth-child(1)]:from-transparent [&>span:nth-child(1)]:via-cyan-400 [&>span:nth-child(1)]:to-transparent
    [&>span:nth-child(1)]:animate-slideRight 

    [&>span:nth-child(2)]:top-[-100%] [&>span:nth-child(2)]:right-0 [&>span:nth-child(2)]:w-0.5 [&>span:nth-child(2)]:h-[100%] 
    [&>span:nth-child(2)]:bg-gradient-to-b [&>span:nth-child(2)]:from-transparent [&>span:nth-child(2)]:via-cyan-400 [&>span:nth-child(2)]:to-transparent
    [&>span:nth-child(2)]:animate-slideDown [&>span:nth-child(2)]:[animation-delay:0.25s]

    [&>span:nth-child(3)]:bottom-0 [&>span:nth-child(3)]:right-0 [&>span:nth-child(3)]:w-[100%] [&>span:nth-child(3)]:h-0.5
    [&>span:nth-child(3)]:bg-gradient-to-l [&>span:nth-child(3)]:from-transparent [&>span:nth-child(3)]:via-cyan-400 [&>span:nth-child(3)]:to-transparent
    [&>span:nth-child(3)]:animate-slideLeft [&>span:nth-child(3)]:[animation-delay:0.5s]

    [&>span:nth-child(4)]:bottom-0 [&>span:nth-child(4)]:left-0 [&>span:nth-child(4)]:w-0.5 [&>span:nth-child(4)]:h-[100%]
    [&>span:nth-child(4)]:bg-gradient-to-t [&>span:nth-child(4)]:from-transparent [&>span:nth-child(4)]:via-cyan-400 [&>span:nth-child(4)]:to-transparent
    [&>span:nth-child(4)]:animate-slideUp [&>span:nth-child(4)]:[animation-delay:0.75s]

    "
      `}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {children}
    </button>
  );
};

export default NeonButton;
