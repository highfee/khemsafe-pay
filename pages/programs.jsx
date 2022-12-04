import axios from "axios";
import Head from "next/head";
import React from "react";
import { programs } from "../assets/constants";

const Programs = ({ data }) => {
  // console.log(data)

  return (
    <div>
      <Head>
        <title>Programs</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="flex gap-16 p-4">
        {data.map((item) => {
          return (
            <div
              key={item.name}
              className="flex-1 flex justify-between h-[160px] bg-slate-700 p-3"
            >
              <div>
                <p className="text-5xl text-white">
                  {item.count} <span className="text-base">(active)</span>
                </p>
                <p className="text-lg text-white pt-5">{item.name}</p>
              </div>
              <div className="self-center">
                {/* <FaUserGraduate size="90px" opacity="0.5" /> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/programs");
  return {
    props: {
      data: res.data,
    },
  };
};

export default Programs;
