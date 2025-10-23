import { Link } from "react-router-dom";

const TextLink = ({ children, className, path, isInSideBar }) => {
  return (
    <Link
      to={path}
      className={`block text-sm font-light transition-all ease-in-out ${className}
    ${
      isInSideBar
        ? " px-4 text-xl [&>*]:py-2 hover:text-cyan-800 hover:font-semibold active:bg-cyan-300 border-b-2 border-cyan-600"
        : "hover:scale-105 transition-transform ease-in-out"
    }
    `}
    >
      {children}
    </Link>
  );
};

export default TextLink;
