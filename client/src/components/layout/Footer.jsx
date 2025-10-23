import { SiGithub } from "react-icons/si";
import { SiLinkedin } from "react-icons/si";
import { LiaCopyrightSolid } from "react-icons/lia";

const Footer = () => {
  return (
    <div className="w-full flex justify-center items-center p-4 border-t border-gray-700">
      <span className="p-2 flex items-center justify-center text-gray-400">
        <LiaCopyrightSolid className="mr-1" />
        2025 Sarah Habibi
      </span>
      <div className="flex gap-x-6 ml-3">
        <div className="text-2xl text-cyan-400 flex gap-3">
          <a
            href="https://github.com/sarah-hbb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/sarah-habibi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
