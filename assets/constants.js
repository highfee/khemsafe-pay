import { GrMoney } from "react-icons/gr";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  FaChalkboardTeacher,
  FaNewspaper,
  FaUserGraduate,
} from "react-icons/fa";

export const sidebarItems = [
  { name: "Students", link: "students", icon: FaUserGraduate },
  { name: "School fees", link: "fees", icon: GrMoney },
  { name: "Programs", link: "programs", icon: FaNewspaper },
  { name: "Instructors", link: "instructors", icon: FaChalkboardTeacher },
];

export const filterYear = ["2022", "2023", "2024", "2025", "2026", "2027"];
export const filterProgram = ["Diploma", "Certificate", "Executive", "IT"];

export const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const headers = [
  [
    "NAME",
    "PROGRAM",
    "EXPECTED END DATE",
    "EXPECTED PAYMENT",
    "AMOUNT PAID",
    "BAL",
  ],
];
const generateExpectedEndDate = (date) => {
  const time = new Date(date);
  let period = time.toLocaleDateString();
  return period;
};

export const generateReport = (month, year, data, type) => {
  const unit = "pt";
  const size = "A4";
  const orientation = "portrait";
  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);
  doc.setFontSize(14);
  const title =
    type == "allStudent"
      ? `${month.toUpperCase() + " " + year} REPORT FOR ALL STUDENTS`
      : `${
          month.toUpperCase() + " " + year
        } REPORT FOR ALL STUDENTS WITH OUTSTANDING DEBT`;

  const students =
    type == "allStudent"
      ? data
      : data.filter((item) => {
          return item.totalAmountPaid < item.amountTobePaid;
        });
  const info = students.map((item) => [
    item.fullName,
    item.program,
    generateExpectedEndDate(item.endDate),
    item.amountTobePaid,
    item.totalAmountPaid,
    `${item.amountTobePaid - item.totalAmountPaid}`,
  ]);
  let content = {
    startY: 50,
    head: headers,
    body: info,
  };
  doc.text(title, marginLeft, 40);
  doc.autoTable(content);
  doc.save(
    `${year + " " + month} report(${
      type == "allStudent" ? "all" : "with debt"
    }).pdf`
  );
};
