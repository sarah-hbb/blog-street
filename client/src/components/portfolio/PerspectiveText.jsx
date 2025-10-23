const PerspectiveText = () => {
  return (
    <div className="flex min-h-full md:pt-24 pl-6 pt-10 md:pb-32 pb-3 group ">
      <ul
        className={`
        text-cyan-200 
        my-0 mx-auto list-none text-[34px] sm:text-[68px] font-[900] tracking-[-2px] uppercase 
        [transform:translate3d(0,0,0)] antialiased [-webkit-font-kerning:normal] [-webkit-text-size-adjust:100%]
        [&>li]:h-[35px] sm:[&>li]:h-[70px] [&>li]:overflow-hidden 
        [&>li:nth-child(odd)]:[transform:skew(60deg,-30deg)_scaleY(0.66667)] 
        [&>li:nth-child(even)]:[transform:skew(0deg,-30deg)_scaleY(1.33333)]
        [&_p]:h-[35px] sm:[&_p]:h-[70px] [&_p]:leading-[33px] sm:[&_p]:leading-[65px] 
        [&_p]:py-0  [&_p]:transition-all [&_p]:duration-[300ms] [&_p]:ease-in-out
        transform-[translate3d(0,0,0)]  whitespace-nowrap
        group-hover:[&_p]:[transform:translate3d(0,-35px,0)]
        sm:group-hover:[&_p]:[transform:translate3d(0,-70px,0)]
        `}
      >
        <li>
          <p>&nbsp;</p>
          <p>Your Next</p>
        </li>
        <li>
          <p>Your Next</p>
          <p>Front-end</p>
        </li>
        <li>
          <p>Front-end</p>
          <p>project</p>
        </li>
        <li>
          <p>project</p>
          <p>Starts here!</p>
        </li>
        <li>
          <p>Starts here!</p>
          <p>&nbsp;</p>
        </li>
      </ul>
    </div>
  );
};

export default PerspectiveText;

/*      [transform:translate3d(0,0,0)] antialiased [-webkit-font-kerning:normal] [-webkit-text-size-adjust:100%]
      [&>li]:h-[50px] [&>li]:overflow-hidden [&>li]:relative]
    [&:nth-child(1)]:[left:29px]
      [&:nth-child(2)]:[left:58px]
      [&:nth-child(3)]:[left:87px]
      [&:nth-child(4)]:[left:116px]
            [&>li:nth-child(odd)]:skew-x-[30deg] [&>li:nth-child(odd)]:skew-y-[-30deg] [&>li:nth-child(odd)]:scale-y-[0.66667] 
      [&>li:nth-child(even)]:skew-x-[0deg] [&>li:nth-child(even)]:skew-y-[-30deg] [&>li:nth-child(even)]:scale-y-[0.66667]

      */
