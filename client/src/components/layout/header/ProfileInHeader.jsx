import { useEffect, useRef, useState } from "react";
import AvatarIcon from "../../ui/AvatarIcon";
import TextLink from "../../ui/TextLink";
import useSignout from "../../../hooks/useSignout";

const ProfileInHeader = ({ currentUser }) => {
  const [profileDropDownOpen, setProfileOpenDropDown] = useState(false);
  const showProfileDropDown = currentUser && profileDropDownOpen;
  const dropDownRef = useRef();

  const toggleDropDown = () => {
    setProfileOpenDropDown((prvShowProfileDropDown) => !prvShowProfileDropDown);
  };

  // close the dropdown when clicking outside of the profile dropdown in header
  useEffect(() => {
    const handler = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setProfileOpenDropDown(false);
      }
    };
    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [dropDownRef]);

  const handleSignout = useSignout();

  return (
    <div
      className="relative flex-col z-10 cursor-pointer"
      onClick={toggleDropDown}
      ref={dropDownRef}
    >
      <AvatarIcon avatarPicture={currentUser.profilePicture} size={"small"} />
      <div
        className={`
        ${showProfileDropDown ? "block" : "hidden "}
        absolute right-0 mt-3  text-cyan-600 shadow-cyan-900 shadow-2xl rounded-lg
        before:border-solid
        before:border-r-8 before:border-r-transparent
        before:border-l-8 before:border-l-transparent
        before:border-b-8 before:border-b-cyan-200
        before:content-['']
        before:absolute
        before:right-3 before:-top-2 animate-dropdown
      `}
      >
        <div
          className="cursor-default px-3 py-2 w-full flex-col bg-cyan-200 rounded-lg [&>*]:py-2 [&>*]:px-3 
"
        >
          <div>@{currentUser.username}</div>
          <div className="border-b-2 border-cyan-600">{currentUser.email}</div>
          <TextLink
            path="/dashboard?tab=profile"
            className="border-b-2 border-cyan-600"
          >
            Profile
          </TextLink>
          <div
            onClick={handleSignout}
            className="hover:text-cyan-800 hover:font-semibold"
          >
            Sign out
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInHeader;
