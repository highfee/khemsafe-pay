import { FaChevronDown, FaUser } from "react-icons/fa";

const Header = () => {
  const isAdmin = false;
  return (
    <div className="flex justify-end items-center bg-gray-400 h-[64px] px-10">
      {!isAdmin && (
        <div className="flex items-center gap-3 text-gray-100 cursor-pointer">
          <FaUser />
          <p className="text-lg">Admin</p>
          <FaChevronDown />
        </div>
      )}
    </div>
  );
};

export default Header;
