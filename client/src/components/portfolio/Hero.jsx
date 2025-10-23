const words = ["ideas", "designs", "concepts", "dreams"];

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden flex mx-auto sm:max-w-5xl w-full p-8 animate-slideRightToView"
    >
      <div className="p-5 text-cyan-200 sm:[&_h1]:text-3xl text-2xl font-extralight ">
        <h1 className="mb-2 text-amber-300 font-bold italic">
          I am Sarah Habibi
        </h1>
        <span className="mb-2 text-lg">
          a passionate front-end developer, based in the Netherlands
        </span>
        <div className="flex gap-2 justify-start items-center overflow-hidden nowrap mt-3">
          <h1>Turning</h1>
          {/* wrapper */}
          <span className=" sm:h-9 h-8 animate-wordSlide uppercase">
            {words.map((word, index) => (
              <h1
                className="text-transparent bg-clip-text bg-gradient-to-r 
              from-yellow-500 to-pink-500 text-nowrap font-bold"
                key={index}
              >
                {word}
              </h1>
            ))}
          </span>
        </div>

        <h1>into real projects</h1>
        <h1>which are intuitive and perform reliably.</h1>
      </div>
    </section>
  );
};

export default Hero;
