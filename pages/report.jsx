import Head from "next/head";
import { useState, useEffect } from "react";
import { months, generateReport } from "../assets/constants";
import axios from "axios";

const Report = ({ data }) => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  useEffect(() => {
    setMonth(month);
    // doThis()
  }, [month]);

  // const doThis = async () => {
  //   const  date = new Date()
  //   date.setMonth(month)
  //   const passedDate = date.toISOString()
  //   const res = await axios.get(`http://localhost:3000/api/report/${date}`)
  //   console.log(res.data);
  // }
  return (
    <div>
      <Head>
        <title>Report</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <header className="p-3 border-b border-solid flex justify-between items-center">
        <div>
          <p className="text-3xl font-[400]">
            Generate report
            <span className="text-xl"> ({year + " " + months[month]})</span>
          </p>
        </div>
        <div>
          <select
            className="border border-solid p-2"
            onChange={(e) => setMonth(e.target.value)}
          >
            <option selected hidden>
              Change Month
            </option>
            {months.map((item, i) => {
              return (
                <option key={item} value={i}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </header>
      <div className="p-4">
        <div className="flex gap-5 items-center">
          <p className="text-xl">Generate report for all students</p>
          <button
            className=" bg-slate-500 py-1 px-3 text-white hover:bg-slate-700"
            onClick={() => {
              generateReport(months[month], year, data, "allStudent");
            }}
          >
            Print
          </button>
        </div>
        <div className="flex gap-5 items-center mt-5">
          <p className="text-xl">
            Generate report for all students with outstandig
          </p>
          <button
            className=" bg-slate-500 py-1 px-3 text-white hover:bg-slate-700"
            onClick={() => {
              generateReport(months[month], year, data, "outstanding");
            }}
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(`http://localhost:3000/api/report`);
  return {
    props: {
      data: res.data,
    },
  };
};

export default Report;
