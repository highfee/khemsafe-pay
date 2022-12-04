import axios from "axios";
import Head from "next/head";
import { useState } from "react";

import EditProgram from "../components/EditProgram";

const Fees = ({ data }) => {
  const [what, setWhat] = useState("");
  const [display, setDisplay] = useState(false);
  const [items, setItems] = useState(null);
  const admin = true;
  return (
    <div>
      <Head>
        <title>Fees</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <header className="p-3 border-b border-solid">
        <p className="text-3xl font-[400]">School Fees</p>
        <button
          className="mt-5 bg-slate-500 py-1 px-3 text-white hover:bg-slate-700"
          onClick={() => {
            setWhat("add");
            setDisplay(true);
          }}
        >
          Add new program
        </button>
      </header>
      <div className="p-4">
        <table className="table-data">
          <thead>
            <tr>
              <th className="text-xl pl-6">Program Type</th>
              <th className="text-xl">Duration</th>
              <th className="text-xl">Expected Payment</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => {
              return (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.duration} months</td>
                  <td>{item.price}</td>
                  {admin && (
                    <td>
                      <button
                        className="py-1 px-2 bg-gray-600 text-white"
                        onClick={() => {
                          setWhat("edit");
                          setDisplay(true);
                          setItems(i);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <EditProgram
        what={what}
        display={display}
        setDisplay={setDisplay}
        item={data[items]}
      />
    </div>
  );
};

export const getServerSideProps = async () => {
  const resP = await axios.get("http://localhost:3000/api/programs");
  return {
    props: {
      data: resP.data,
    },
  };
};

export default Fees;
