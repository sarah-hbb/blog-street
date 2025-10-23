import { useEffect, useRef } from "react";
const abilities = [
  {
    title: "Quality Focus",
    description:
      "I am committed to delivering high-quality work that meets and exceeds client expectations.",
    imgPath: "/images/featureCards/quality.png",
  },
  {
    title: "Effective Communication",
    description:
      "I prioritize clear and open communication to ensure that project goals are understood and met.",
    imgPath: "/images/featureCards/chat.png",
  },
  {
    title: "Problem-Solving Skills",
    description:
      "I excel at identifying challenges and finding innovative solutions to overcome them.",
    imgPath: "/images/featureCards/solution.png",
  },
  {
    title: "Adaptability",
    description:
      "I am flexible and adaptable, able to adjust to changing project requirements and environments.",
    imgPath: "/images/featureCards/adaptable.png",
  },
  {
    title: "Team Collaboration",
    description:
      "I work well in team settings, contributing to a positive and productive work environment.",
    imgPath: "/images/featureCards/team.png",
  },
  {
    title: "Time Management",
    description:
      "I effectively manage my time to meet deadlines and deliver projects on schedule.",
    imgPath: "/images/featureCards/time.png",
  },
];

const FeatureCard = ({ ability, className }) => {
  return (
    <div
      className={`p-4 flex flex-col items-center rounded-xl bg-cyan-800/20 hover:bg-cyan-900/70 transition-colors ${className} `}
    >
      <img
        src={ability.imgPath}
        alt={ability.title}
        className="sm:w-16 w-10 sm:h-16 h-10 mb-2"
      />
      <h3 className="text-xl font-semibold mb-2">{ability.title}</h3>
      <p className="">{ability.description}</p>
    </div>
  );
};

const GlowCard = () => {
  const cardContainer = useRef(null);

  const applyOverlayMask = (e) => {
    const documentTarget = e.currentTarget;
    if (!cardContainer.current) return;

    const x = e.pageX - cardContainer.current.offsetLeft;
    const y = e.pageY - cardContainer.current.offsetTop;
    documentTarget.setAttribute(
      "style",
      `--x: ${x}px; --y: ${y}px; --opacity: 0.7`
    );
  };

  useEffect(() => {
    document.body.addEventListener("pointermove", (e) => {
      applyOverlayMask(e);
    });
  }, []);

  return (
    <div className="rounded-xl">
      {/* cards container */}

      <div ref={cardContainer} className=" relative">
        {/* main cards */}
        <div className=" grid-cols-1 md:grid-cols-3 sm:grid-cols-2 grid gap-5 px-5 text-cyan-100">
          {abilities.map((ability, index) => (
            <FeatureCard key={index} ability={ability} />
          ))}
        </div>

        {/* twin cards */}
        <div
          className="grid-cols-1 md:grid-cols-3 sm:grid-cols-2 grid gap-5 px-5 
          text-transparent select-none pointer-events-none rounded-xl absolute inset-0"
          style={{
            opacity: "var(--opacity, 0.7)",
            mask: `radial-gradient(25rem 25rem at var(--x) var(--y), #000 1%, transparent 50%)`,
            WebkitMask: `radial-gradient(25rem 25rem at var(--x) var(--y), #000 1%, transparent 50%)`,
          }}
        >
          {abilities.map((ability, index) => (
            <FeatureCard
              key={index}
              ability={ability}
              className="bg-purple-200 "
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlowCard;
