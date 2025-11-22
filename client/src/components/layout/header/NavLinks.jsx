import TextLink from "../../ui/TextLink";
import { useSelector } from "react-redux";

const NavLinks = ({ className, isInSideBar }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className={className}>
      <TextLink path="/blog" isInSideBar={isInSideBar}>
        Blog
      </TextLink>
      <TextLink path="/sentimentalist" isInSideBar={isInSideBar}>
        Sentimentalist
      </TextLink>
      {currentUser && currentUser.isAdmin && (
        <TextLink path="/create-post" isInSideBar={isInSideBar}>
          Create Post
        </TextLink>
      )}
      {currentUser && !currentUser.isAdmin && (
        <TextLink path="/dashboard?tab=bookmarks" isInSideBar={isInSideBar}>
          Bookmarks
        </TextLink>
      )}
    </div>
  );
};

export default NavLinks;
