import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
