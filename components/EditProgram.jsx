import axios from "axios";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const EditProgram = ({ what, display, setDisplay, item }) => {
  const [data, setData] = useState({
    name: "",
    duration: "",
    price: "",
  });

  const [error, setError] = useState(false);

  // if (what == "edit") setData({ ...item });

  const handleChange = (e) => {
    setData((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    if (!data.name && !data.duration && !data.price) {
      e.preventDefault();
      return setError(true);
    }
    if (what === "edit") {
      // e.preventDefault();
      let res = await axios.put("http://localhost:3000/api/programs", {
        ...data,
        id: item._id,
      });
      // console.log(i);
      // console.log(res);
    }
    if (what === "add") {
      let res = await axios.post("http://localhost:3000/api/programs", data);
      // console.log(res);
    }
  };

  return (
    <div
      className="h-[400px] w-[600px] bg-slate-600 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
      style={{ display: `${display ? "block" : "none"}` }}
    >
      <div className="p-5">
        <h1 className="text-2xl text-white">
          {what == "add" ? "Add new Program" : "Edit Program"}
        </h1>
        {error && (
          <p className="text-xl mt-3 text-red-300">Pls fill out all fields</p>
        )}
        <form className="w-[90%] mx-auto mt-6" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Program name"
              className="w-full p-2"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Duration"
              className="w-full p-2"
              name="duration"
              value={data.duration || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Price"
              className="w-full p-2"
              name="price"
              value={data.price || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="submit"
              value="Done"
              className="w-[10] p-2 bg-white cursor-pointer"
            />
          </div>
        </form>
      </div>
      <FaTimes
        fill="#fff"
        size="20"
        className="absolute top-4 right-4 cursor-pointer"
        onClick={() => {
          setDisplay(false);
        }}
      />
    </div>
  );
};

export default EditProgram;
