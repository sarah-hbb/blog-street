import { useState } from "react";

const ExperienceCard = ({ experience, index }) => {
  const [position, setPositin] = useState("sticky");
  return (
    <div
      className={`mb-2 w-full flex flex-col md:flex-row md:gap-10 md:justify-start
      p-6 rounded-xl shadow-inner shadow-cyan-100/40 bg-cyan-950 ${position}`}
      style={{ top: `${index * 60}px` }}
      onScroll={(e) => setPositin("relative")}
    >
      <div className="w-full flex-[1]">
        <h2 className="text-xl font-bold text-cyan-400">{experience.role}</h2>
        <h3 className="text-md italic">{experience.company}</h3>
        <span className="text-sm text-gray-500">{experience.duration}</span>
      </div>
      <p className="mt-2 text-white w-full flex-[3]">
        {experience.description}
      </p>
    </div>
  );
};

export default ExperienceCard;
