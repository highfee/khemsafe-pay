import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { filterYear } from "../../assets/constants";
import Link from "next/link";
import NewStudent from "../../components/NewStudent";

const Table = ({ datas }) => {
  return (
    <section className="mt-8">
      <table className="table-data">
        <thead>
          <tr>
            <th colSpan="4" className="text-2xl pl-6">
              Students
            </th>

            <th className="relative">
              <select className="border border-solid p-1 absolute right-2 top-[50%] translate-y-[-50%]">
                <option>10</option>
                <option>50</option>
                <option>100</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {datas?.map((item) => {
            return (
              <tr key={item?._id}>
                <td className="px-10">{item?.regNumber}</td>
                <td>{item?.fullName}</td>
                <td>{item?.program}</td>
                <td>{item?.status ? "active" : "finished"}</td>
                <td>
                  <Link href={`students/${item?._id}`} passHref>
                    <button className="bg-slate-500 text-white p-1">
                      Payment advice
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
const Students = ({ data, program }) => {
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState(data);
  const [searchText, setSearchText] = useState("");
  const [searched, setSearched] = useState(false);
  const [year, setYear] = useState("");
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await axios.get(
      `http://localhost:3000/api/students?search=${searchText}`
    );
    setStudents(res.data);
    setSearched(true);
  };
  // useEffect(() => {
  //   handleFilterByYear();
  // }, [year]);
  // const handleFilterByYear = () => {
  //   if (!year) return setStudents(students);
  //   setStudents(students);
  //   setStudents(
  //     students?.filter((item) => {
  //       let endYear = new Date(item?.endDate);
  //       let expectedEndYear = endYear.getFullYear();
  //       console.log(expectedEndYear, year);
  //       return expectedEndYear == year;
  //     })
  //   );
  // };
  const handleFilterByProgram = (filter) => {
    if (filter === "All") {
      return setStudents(data);
    }
    setStudents(
      students.filter((item) => {
        return item.status == true && item.program === filter;
      })
    );
  };

  return (
    <div className="p-4">
      <Head>
        <title>Students</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <header className="flex justify-between">
        <div>
          <form onSubmit={handleSearch} className="flex items-center gap-1">
            <input
              type="text"
              placeholder="Search for student"
              value={searchText}
              className="border border-solid border-gray-500 p-2 text-l w-[400px]"
              onChange={handleChange}
              spellCheck="false"
            />
            {searched && (
              <FaTimes
                className="cursor-pointer"
                onClick={() => {
                  setSearched(false);
                  setStudents(data);
                  setSearchText("");
                }}
              />
            )}
          </form>
        </div>
        <div className="flex gap-3">
          <select
            className="border border-solid border-gray-500"
            onChange={(item) => {
              setYear(item.target.value);
            }}
          >
            <option selected hidden>
              Year
            </option>
            {filterYear.map((item, i) => {
              return (
                <option value={item} key={i}>
                  {item}
                </option>
              );
            })}
          </select>
          <select
            className="border border-solid border-gray-500"
            onChange={(e) => {
              handleFilterByProgram(e.target.value);
            }}
          >
            <option selected hidden>
              Program
            </option>
            <option value="All">All</option>
            {program.map((item, i) => {
              return (
                <option key={i} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
      </header>
      <button
        className="mt-5 bg-slate-500 py-1 px-3 text-white hover:bg-slate-700"
        onClick={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}
      >
        Add new student
      </button>
      <Table datas={students} />
      <NewStudent
        showModal={showModal}
        setShowModal={setShowModal}
        program={program}
        students={students}
        setStudents={setStudents}
      />
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/students");
  const res2 = await axios.get("http://localhost:3000/api/programs");

  return {
    props: {
      data: res.data,
      program: res2.data,
    },
  };
};

export default Students;
