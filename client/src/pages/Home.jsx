import Hero from "../components/portfolio/Hero";
import PerspectiveText from "../components/portfolio/PerspectiveText";
import ThreeDLaptop from "../components/portfolio/threeDModels/ThreeDLaptop";
import FeatureCards from "../components/portfolio/sections/FeatureCards";
import Stack from "../components/portfolio/sections/Stack";

import Experience from "../components/portfolio/sections/Experience";
import ContactMe from "../components/portfolio/sections/ContactMe";

const Home = () => {
  return (
    <main className="bg-[url('/public/images/wave2.jpg')] bg-cover bg-center">
      <div className="w-full flex flex-wrap md:flex-row flex-col items-center justify-center gap-10 mx-auto w-max-7xl ">
        <PerspectiveText />
        <figure>
          <ThreeDLaptop />
        </figure>
      </div>
      <Hero />
      <FeatureCards />
      <Stack />
      <Experience />
      <ContactMe />
    </main>
  );
};

export default Home;
