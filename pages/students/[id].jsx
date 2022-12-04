import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import UpdateStudent from "../../components/UpdateStudent";

const Student = ({ student }) => {
  let startDate = new Date(student.startDate);
  let endDate = new Date(student.endDate);
  const [start, setStart] = useState(startDate.toLocaleDateString());
  const [end, setEnd] = useState(endDate.toLocaleDateString());
  const [display, setDisplay] = useState(false);
  const [finishModal, setFinishModal] = useState(false);

  return (
    <div>
      <Head>
        <title>{student.fullName}</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <header className="p-3 border-b border-solid flex justify-between">
        <p className="text-4xl font-[600]">
          {student.fullName}{" "}
          <span className="text-gray-500 text-2xl">
            ({student.status ? "active" : "completed"})
          </span>
        </p>
        <div className="flex gap-3">
          <button
            className="bg-slate-500 py-1 px-3 text-white hover:bg-slate-700"
            onClick={() => {
              setDisplay(true);
            }}
          >
            Update Student
          </button>
          {student.status && (
            <button
              className="bg-red-500 py-1 px-3 text-white hover:bg-red-700"
              onClick={() => {
                setFinishModal(true);
              }}
            >
              Completed?
            </button>
          )}
        </div>
      </header>
      <main className="p-3 mt-5">
        {/* <p className="text-3xl font-[600]">Student Details</p> */}
        <section className="flex justify-end ">
          <div className="h-[150px] w-[150px] border border-solid border-gray-400 mr-12"></div>
        </section>
        <section className="m-5 flex gap-3 bg-white shadow-xl p-5 py-9">
          <div className="flex-1">
            <p className="text-xl mb-4">
              Registration Number:{" "}
              <span className="text-base">{student?.regNumber}</span>
            </p>
            <p className="text-xl mb-4">
              Program: <span className="text-base">{student?.program}</span>
            </p>
            <p className="text-xl mb-4">
              Phone Number: <span className="text-base">{student?.tel}</span>
            </p>
            <p className="text-xl mb-4">
              Email address: <span className="text-base">{student?.email}</span>
            </p>
            <p className="text-xl mb-4">
              Residential address:{" "}
              <span className="text-base">{student?.address}</span>
            </p>
          </div>
          <div className="flex-1">
            <div className=" border-b border-solid border-gray-400">
              <p className="text-l mb-4">
                Expected starting date:{" "}
                <span className="text-base">{start}</span>
              </p>
              <p className="text-l mb-4">
                Expected end date: <span className="text-base">{end}</span>
              </p>
            </div>
            <div className="mt-4">
              <p className="text-l mb-4">
                Expected amount to be paid:{" "}
                <span className="text-base">N{student.price}</span>
              </p>
              <p className="text-l mb-4">
                Amount to be paid(after discount):{" "}
                <span className="text-base">N{student.amountTobePaid}</span>
              </p>
              <p className="text-l mb-4">
                Amount paid:{" "}
                <span className="text-base">N{student.totalAmountPaid}</span>
              </p>
              <p className="text-l mb-4">
                Balance:{" "}
                <span className="text-base">
                  N{student.amountTobePaid - student.totalAmountPaid}
                </span>
              </p>
              <p className="text-l mb-4">
                Reciept numbers:{" "}
                {
                  student.receiptNumber?.map((item,i) => {
                      return (<span className="text-base" key={i}>
                      {item}{", "}
                    </span>)
                  })
                }
                
              </p>
            </div>
          </div>
        </section>
      </main>
      <UpdateStudent
        student={student}
        display={display}
        setDisplay={setDisplay}
      />
      <FinishModal
        finishModal={finishModal}
        setFinishModal={setFinishModal}
        student={student}
      />
    </div>
  );
};

const FinishModal = ({ finishModal, setFinishModal, student }) => {
  const handleClick = async () => {
    setFinishModal(false);
    const res = await axios.put(
      `http://localhost:3000/api/students/${student._id}`,
      {
        purpose: "setFinished",
        programId: student.programId,
      }
    );
    location.reload();
  };
  return (
    <div
      className="h-[120px] w-[600px] bg-slate-600 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
      style={{ display: `${finishModal ? "block" : "none"}` }}
    >
      <div className="p-5">
        <h1 className="text-xl text-white">
          Are you sure you want to set student&apos;s status to completed?
        </h1>
        <div className="flex justify-end gap-3 mt-5">
          <button
            className="bg-slate-400 py-1 px-3 text-white hover:bg-slate-700"
            onClick={handleClick}
          >
            Ok
          </button>
          <button
            className="bg-red-500 py-1 px-3 text-white hover:bg-red-700"
            onClick={() => setFinishModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const res = await axios.get(
    `http://localhost:3000/api/students/${ctx.params.id}`
  );
console.log(res.data)
  if (!res) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      student: res.data,
    },
  };
};

export default Student;
