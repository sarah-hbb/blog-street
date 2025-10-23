import React from "react";

const TitleHeader = ({ title, sub, className }) => {
  return (
    <div className={` ${className}  text-cyan-200 mb-8`}>
      <div className="flex flex-row items-center justify-stretch gap-2 mb-2">
        <span
          className="uppercase text-3xl font-bold text-nowrap text-transparent bg-clip-text bg-gradient-to-l
        from-cyan-400 to-pink-300"
        >
          {title}
        </span>
        <span
          className="h-[1px] w-full bg-gradient-to-r
         from-cyan-400 to-pink-300"
        ></span>
      </div>

      {sub && <span className="text-sm block font-normal">{sub}</span>}
    </div>
  );
};

export default TitleHeader;
