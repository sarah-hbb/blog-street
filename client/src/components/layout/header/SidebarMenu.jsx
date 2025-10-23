import NavLinks from "./NavLinks";

const SidebarMenu = ({ isMenuOpen }) => {
  return (
    <div
      className={`absolute sm:hidden flex right-0 top-16 bg-gradient-to-b bg-cyan-200 
       bg-opacity-90 min-h-screen transition-all shadow-cyan-900 shadow-2xl z-10
       ${isMenuOpen ? "w-1/2" : "w-0 pointer-events-none"}`}
    >
      <NavLinks
        isInSideBar={true}
        className="flex flex-col w-full pt-3 text-cyan-600"
      />
    </div>
  );
};

export default SidebarMenu;
