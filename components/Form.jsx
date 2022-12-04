import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

const Form = ({ program, students, setStudents }) => {
  const [date, setDate] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState({});

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  const handleSelect = (duration) => {
    setStartDate(duration.selection.startDate.toLocaleDateString());
    setEndDate(duration.selection.endDate.toLocaleDateString());
    console.log(duration);
  };

  const handleChange = (e) => {
    setData((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const res = await axios.post("http://localhost:3000/api/students", {
      ...data,
      startDate,
      endDate,
    });
    // setStudents(students.push(res.data));
  };
  return (
    <div className="mt-10 p-5">
      <p className="text-3xl text-white">Add New Student</p>
      <form
        className=" w-[88%] h-[400px] mx-auto mt-4 p-8"
        autoComplete="off"
        onSubmit={handleSubmit}
        noValidate
      >
        <main className="flex gap-8">
          <section className=" flex-1">
            <div>
              <input
                type="text"
                placeholder="Fullname"
                className="form_input"
                name="fullName"
                value={data.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="form_input"
                name="tel"
                value={data.tel}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="date"
                className="form_input"
                name="dob"
                value={data.dob}
                onChange={handleChange}
              />
            </div>
            <div>
              <select
                className="form_input"
                name="maritalStatus"
                value={data.maritalStatus}
                onChange={handleChange}
              >
                <option value="" selected hidden>
                  Marital status
                </option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>
          </section>
          <section className="flex-1">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="form_input"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Reg number"
                className="form_input"
                name="regNumber"
                value={data.regNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Place of birth"
                className="form_input"
                name="placeOfBirth"
                value={data.placeOfBirth}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Nationality"
                className="form_input"
                name="nationality"
                value={data.nationality}
                onChange={handleChange}
              />
            </div>
          </section>
        </main>
        <section>
          <div>
            <textarea
              rows="6"
              className="resize-none address"
              placeholder="Address"
              name="address"
              value={data.address}
              onChange={handleChange}
            ></textarea>
          </div>
        </section>
        <main className="flex gap-8 mt-3">
          <section className="flex-1">
            <div>
              <select
                className="form_input"
                name="program"
                value={data.program}
                onChange={handleChange}
              >
                <option value="" selected hidden>
                  Program
                </option>
                {program.map((item) => {
                  return (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* <div>
              <input
                type="text"
                placeholder="Nationality"
                className="form_input"
              />
            </div> */}
          </section>
          <section className="flex-1">
            <input
              type="text"
              placeholder="Duration"
              className="form_input"
              onFocus={() => setDate(!date)}
              value={`${startDate} - ${endDate}`}
            />
            <div className="relative">
              {date && (
                <>
                  <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                    months={2}
                    preventSnapRefocus={true}
                    moveRangeOnFirstSelection={false}
                    editableDateInputs={true}
                    minDate={new Date()}
                    direction="horizontal"
                    className="absolute left-[-320px] top-[-180px] date shadow-xl"
                  />
                  <div className="absolute right-[-350px] cursor-pointer">
                    <FaTimes
                      size={25}
                      fill="#fff"
                      onClick={() => setDate(!date)}
                    />
                  </div>
                </>
              )}
            </div>
          </section>
          <section className="flex-1">
            <div>
              <input
                type="tel"
                placeholder="Amount to be paid"
                className="form_input"
                name="amountTobePaid"
                value={data.amountTobePaid}
                onChange={handleChange}
              />
            </div>
          </section>
        </main>
        <button className="bg-slate-700 text-white cursor-pointer p-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
