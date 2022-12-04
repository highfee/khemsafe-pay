import Head from "next/head";
import React from "react";

const Instructors = () => {
  return (
    <div>
      <Head>
        <title>Instructors</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <header className="p-3 border-b border-solid">
        <p className="text-3xl font-[400]">List of Instructors</p>
      </header>
    </div>
  );
};

export default Instructors;
