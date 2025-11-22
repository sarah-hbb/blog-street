import { PiSpinnerGapThin } from "react-icons/pi";

const LoadingSpinner = ({ size, className }) => {
  return (
    <PiSpinnerGapThin
      className={`${className} ${
        size === "small" ? "text-2xl" : "text-6xl"
      }  text-cyan-200 animate-spin self-center`}
    />
  );
};

export default LoadingSpinner;
