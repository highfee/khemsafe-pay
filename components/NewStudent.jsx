import React from "react";
import { FaTimes } from "react-icons/fa";
import Form from "./Form";

const NewStudent = ({
  showModal,
  setShowModal,
  program,
  students,
  setStudents,
}) => {
  return (
    <div
      className={`absolute inset-0 ${
        showModal ? "block" : "hidden"
      } transition-all`}
    >
      <div
        className={`max-h-[80vh] h-[900px] w-[80vw] max-w-[1100px] bg-slate-400 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] `}
      >
        <Form program={program} students={students} setStudents={setStudents} />
        <FaTimes
          className="absolute top-4 right-4 cursor-pointer"
          fill="#fff"
          size={25}
          onClick={() => setShowModal(false)}
        />
      </div>
    </div>
  );
};

export default NewStudent;
