import HomeSection from "../../layout/HomeSection";
import ExperienceCard from "./ExperienceCard";

const experience = [
  {
    role: "Data assistant",
    company: "Nikrad International statistical resarchers",
    duration: "May 2012 - Nov 2012",
    description:
      "Assisted in data collection and analysis for various research projects. Utilized statistical software to organize and interpret data sets.",
  },
  {
    role: "Data analyst",
    company: "Bel",
    duration: "Jan 2014 -Sep 2014",
    description:
      "Conducted data analysis to support business decisions. Created visualizations and reports to communicate findings to stakeholders.",
  },
  {
    role: "Sales data analyst",
    company: "IranTalent.com",
    duration: "Mar 2016 - sep 2020",
    description:
      "Analyzed sales data to identify trends and opportunities for growth. Collaborated with sales teams to develop strategies based on data insights.",
  },
  {
    role: "Frontend Developer",
    company: "Instapro/Werkspot",
    duration: "Dec 2022 - Sep 2024",
    description:
      "Developing and maintaining the front end of the platform using Next.js and typescript. Collaborating with designers and backend developers to create a seamless user experience.",
  },
];

const Experience = () => {
  return (
    <HomeSection title={"Experience"} sub={"My Journey So Far"}>
      <div className="flex flex-col gap-2 relative h-80 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ">
        {experience.map((exp, i) => (
          <ExperienceCard key={i} experience={exp} index={i} />
        ))}
      </div>
    </HomeSection>
  );
};

export default Experience;
