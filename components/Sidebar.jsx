import Link from "next/link";
import { FaChevronLeft, FaUserTie } from "react-icons/fa";
import { sidebarItems } from "../assets/constants";
const Sidebar = () => {
  let isAdmin = false;

  return (
    <div className="w-[260px] h-[100vh] bg-gray-200">
      <div className="bg-gray-500">
        <Link href="/" passHref>
          <h1 className="text-center text-2xl text-white font-[700] py-4 cursor-pointer">
            KHEMSAFE TRAINING
          </h1>
        </Link>
      </div>
      <div>
        {sidebarItems.map((item) => {
          return (
            <Link key={item.name} href={`/${item.link}`} passHref>
              <div className="flex items-center justify-between p-4  border-solid border-b border-slate-400 cursor-pointer">
                <div className="flex gap-3 items-center">
                  <item.icon />
                  <p className="text-lg font-[400]">{item.name}</p>
                </div>
                <FaChevronLeft fill="#424242" />
              </div>
            </Link>
          );
        })}
        {!isAdmin && (
          <Link href="/report" passHref>
            <div className="flex items-center justify-between p-4  border-solid border-b border-slate-400 cursor-pointer">
              <div className="flex gap-3 items-center">
                <FaUserTie fill="#333" />
                <p className="text-lg font-[400]">Report</p>
              </div>
              <FaChevronLeft fill="#424242" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
