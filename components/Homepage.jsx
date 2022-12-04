import {
  FaChalkboardTeacher,
  FaNewspaper,
  FaUserGraduate,
} from "react-icons/fa";

const Homepage = ({ allStudents, allPrograms }) => {
  // console.log(allStudents, allPrograms);
  return (
    <div>
      <div className="flex gap-2 items-end border border-solid p-4">
        <p className="text-3xl font-[500]">Student records</p>
        <p className="text-base text-gray-400">Admin dashboard</p>
      </div>
      <div className="flex gap-16 p-4">
        <div className="flex-1 flex justify-between h-[160px] bg-slate-700 p-3">
          <div>
            <p className="text-5xl text-white">{allStudents.length}</p>
            <p className="text-lg text-white pt-5">Students</p>
          </div>
          <div className="self-center">
            <FaUserGraduate size="90px" opacity="0.5" />
          </div>
        </div>
        <div className="flex-1 flex justify-between h-[160px] bg-slate-500 p-3">
          <div>
            <p className="text-5xl text-white">0</p>
            <p className="text-lg text-white pt-5">Instructors</p>
          </div>
          <div className="self-center">
            <FaChalkboardTeacher size="90px" opacity="0.3" />
          </div>
        </div>
        <div className="flex-1 flex justify-between h-[160px] bg-slate-500 p-3">
          <div>
            <p className="text-5xl text-white">{allPrograms.length}</p>
            <p className="text-lg text-white pt-5">Programs</p>
          </div>
          <div className="self-center">
            <FaNewspaper size="90px" opacity="0.3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
