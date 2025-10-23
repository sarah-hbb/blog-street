import HomeSection from "../../layout/HomeSection";
import TitleHeader from "../../ui/TitleHeader";
const techStackIcons = [
  {
    name: "HTML",
    iconPath: "/images/techStackIcons/html.png",
  },
  {
    name: "CSS",
    iconPath: "/images/techStackIcons/css.png",
  },
  {
    name: "JavaScript",
    iconPath: "/images/techStackIcons/javascript.png",
  },
  {
    name: "React",
    iconPath: "/images/techStackIcons/react.png",
  },
  {
    name: "Next.js",
    iconPath: "/images/techStackIcons/nextjs.png",
    bg: true,
  },
  {
    name: "Typescript",
    iconPath: "/images/techStackIcons/typescript.png",
  },
  {
    name: "Node.js",
    iconPath: "/images/techStackIcons/nodejs.png",
  },

  {
    name: "Graphql",
    iconPath: "/images/techStackIcons/graphql.png",
  },
];

const Stack = () => {
  return (
    <HomeSection
      title={"Technology Stack"}
      sub={"Skills I bring to the table?"}
    >
      <div className="flex flex-wrap justify-center gap-8 p-4">
        {techStackIcons.map((icon) => (
          <div key={icon.name} className="flex flex-col items-center">
            <div
              className={`w-20 h-20 mb-2 rounded-lg flex items-center justify-center shadow-md ${
                icon.bg ? "bg-white" : ""
              }`}
            >
              <img src={icon.iconPath} alt={icon.name} />
            </div>
            <span className="text-sm font-medium">{icon.name}</span>
          </div>
        ))}
      </div>
    </HomeSection>
  );
};

export default Stack;
