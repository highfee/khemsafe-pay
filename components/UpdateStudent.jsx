import axios from "axios";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const UpdateStudent = ({ student, display, setDisplay }) => {
  const [error, setError] = useState(false);

  const [data, setData] = useState({
    amountPaid: "",
    amountTobePaid: "",
    receiptNumber: ""
  });
  const handleChange = (e) => {
    setData((values) => ({ ...values, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    // e.preventDefault();
    const res = await axios.put(
      `http://localhost:3000/api/students/${student._id}`,
      {
        totalAmountPaid: student.totalAmountPaid + Number(data.amountPaid),
        receiptNumber: data.receiptNumber.toString()
      }
    );
    location.reload();
    console.log(res.data)
  };
  let balance = false;
  return (
    <div
      className="h-[400px] w-[600px] bg-slate-600 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
      style={{ display: `${display ? "block" : "none"}` }}
    >
      <div className="p-5">
        <h1 className="text-2xl text-white">Update Student</h1>
        {error && (
          <p className="text-xl mt-3 text-red-300">Pls fill out all fields</p>
        )}
        <form className="w-[90%] mx-auto mt-6" onSubmit={handleSubmit}>
          <div className="mb-3 flex items-center gap-3">
            <label className="min-w-max text-white ">Expected Payment</label>
            <input
              type="text"
              placeholder="Program name"
              className="w-full p-2"
              name="name"
              value={"N" + student.price}
              disabled={true}
            />
          </div>
          <div className="mb-3 flex items-center gap-3">
            <label className="min-w-max text-white ">Amount to be paid</label>
            <input
              type="text"
              placeholder="Amount to be paid(After discount)"
              className="w-full p-2"
              name="amountTobePaid"
              value={student.amountTobePaid}
              onChange={handleChange}
              disabled={true}
            />
          </div>
          <div className="mb-3 flex items-center gap-3">
            <label className="min-w-max text-white ">Total amount paid</label>
            <input
              type="text"
              placeholder="Total Amount paid"
              className="w-full p-2"
              name="totalAmountPaid"
              value={student.totalAmountPaid}
              onChange={handleChange}
              disabled={true}
            />
          </div>
          {!balance && (
            <div className="mb-3 flex items-center gap-3">
              <label className="min-w-max text-white ">Amount paid</label>
              <input
                type="text"
                placeholder="Amount paid"
                className="w-full p-2"
                name="amountPaid"
                onChange={handleChange}
                disabled={
                  student.totalAmountPaid >= student.amountTobePaid && true
                }
              />
            </div>
          )}
          
            <div className="mb-3 flex items-center gap-3">
              <label className="min-w-max text-white ">Receipt number</label>
              <input
                type="text"
                placeholder="Receipt number"
                className="w-full p-2"
                name="receiptNumber"
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

export default UpdateStudent;
