import Header from "./header/Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="bg-[#1b1b1b] font-nunito min-h-screen w-full pt-16 flex flex-col justify-between text-slate-400">
      <Header />
      <div className="flex flex-col flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
