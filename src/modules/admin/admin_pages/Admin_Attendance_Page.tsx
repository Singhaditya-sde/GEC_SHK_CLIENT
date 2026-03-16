import { useState } from "react"
import { BatchCard } from "../admin_components/BatchCard"
import { CheckCheck, AlertTriangle, BarChart3, Download , Search , ChevronRight , ChevronLeft , Mail } from "lucide-react"

type Attendance = {
  roll: string
  name: string
  course: string
  classes: number
  attended: number
}

const attendanceData: Attendance[] = [
  { roll: "CS2021042", name: "Ethan Davidson", course: "Data Structures", classes: 42, attended: 38 },
  { roll: "CS2021089", name: "Sophia Martinez", course: "Data Structures", classes: 42, attended: 28 },
  { roll: "CS2021105", name: "Liam Bennett", course: "Data Structures", classes: 42, attended: 32 },
  { roll: "CS2021112", name: "Chloe Reynolds", course: "Data Structures", classes: 42, attended: 40 },
  { roll: "CS2021042", name: "Ethan Davidson", course: "Data Structures", classes: 42, attended: 38 },
  { roll: "CS2021089", name: "Sophia Martinez", course: "Data Structures", classes: 42, attended: 28 },
  { roll: "CS2021105", name: "Liam Bennett", course: "Data Structures", classes: 42, attended: 32 },
  { roll: "CS2021112", name: "Chloe Reynolds", course: "Data Structures", classes: 42, attended: 40 },
  { roll: "CS2021042", name: "Ethan Davidson", course: "Data Structures", classes: 42, attended: 38 },
  { roll: "CS2021089", name: "Sophia Martinez", course: "Data Structures", classes: 42, attended: 28 },
  { roll: "CS2021105", name: "Liam Bennett", course: "Data Structures", classes: 42, attended: 32 },
  { roll: "CS2021112", name: "Chloe Reynolds", course: "Data Structures", classes: 42, attended: 40 },
]

export default function AdminAttendancePage() {

  const [department, setDepartment] = useState("Computer Science")
  const [batch, setBatch] = useState("2021-2025")
  const [course, setCourse] = useState("Data Structures")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 5
  const totalPages = Math.ceil(attendanceData.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const currentStudents = attendanceData.slice(startIndex, endIndex)

  function percentage(classes: number, attended: number) {
    return Math.round((attended / classes) * 100)
  }

  const attendanceStats = [
  {
    icon: CheckCheck,
    iconColor: "#2563EB",
    iconBgColor: "#DBEAFE",
    title: "Today's Attendance",
    value: "94%",
    className: "w-72",
  },
  {
    icon: AlertTriangle,
    iconColor: "#DC2626",
    iconBgColor: "#FEE2E2",
    title: "Students Below 75%",
    value: "42",
    className: "w-72",
  },
  {
    icon: BarChart3,
    iconColor: "#0EA5E9",
    iconBgColor: "#E0F2FE",
    title: "Avg. Attendance (MTD)",
    value: "88.5%",
    className: "w-72",
  },
  {
    icon: BarChart3,
    iconColor: "#0EA5E9",
    iconBgColor: "#E0F2FE",
    title: "Avg. Attendance (MTD)",
    value: "88.5%",
    className: "w-72",
  },
]

  return (
    <div className="px-5 space-y-6">

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-semibold pt-5 text-[#0F172A]">
            Student Attendance
          </h1>

          <p className="text-sm text-[#64748B]">
            Portal / Student Records
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-[#0B3D93] text-white rounded-lg text-sm">
          <Download size={16} />
          Download Report
        </button>

      </div>

      {/* STATS USING BATCHCARD */}

      <div className="flex gap-5">

        {attendanceStats.map(
          ({ icon, iconColor, iconBgColor, title, value }) => (
            <BatchCard
              key={title}
              icon={icon}
              iconColor={iconColor}
              iconBgColor={iconBgColor}
              title={title}
              value={value}
              className='w-full lg:py-13'
            />
          )
        )}
      </div>

      {/* FILTER BAR */}

      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4">

        <div className="flex items-center gap-3 flex-1 bg-[#F8FAFC] border border-slate-200 rounded-full px-4 py-3">
          <Search size={18} className="text-slate-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by course name or ID..."
            className="bg-transparent outline-none text-sm flex-1"
          />
        </div>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border border-slate-200 bg-[#F8FAFC] rounded-full px-4 py-3 text-sm"
        >
          <option>Computer Science</option>
          <option>Electrical</option>
          <option>Mechanical</option>
        </select>

        <select
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          className="border border-slate-200 bg-[#F8FAFC] rounded-full px-4 py-3 text-sm"
        >
          <option>2021-2025</option>
          <option>2022-2026</option>
        </select>

        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="border border-slate-200 bg-[#F8FAFC] rounded-full px-4 py-3 text-sm"
        >
          <option>Data Structures</option>
          <option>Operating Systems</option>
        </select>

        <button className="flex text-center gap-2 ml-auto px-4 py-2 bg-red-100 text-red-600 text-sm rounded-full">
          <Mail size={18}/> Send Low Attendance Warning
        </button>

      </div>

      {/* ATTENDANCE TABLE */}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-slate-100 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-3 text-left">Roll No</th>
              <th className="px-5 py-3 text-left">Student Name</th>
              <th className="px-5 py-3 text-left">Course</th>
              <th className="px-5 py-3 text-left">Classes</th>
              <th className="px-5 py-3 text-left">Attended</th>
              <th className="px-5 py-3 text-left">Percentage</th>
              <th className="px-5 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">

            {currentStudents.map((student) => {

              const percent = percentage(student.classes, student.attended)

              const status = percent >= 75 ? "GOOD" : "WARNING"

              return (

                <tr key={student.roll} className="hover:bg-slate-50">

                  <td className="px-5 py-4 font-medium text-blue-700">
                    {student.roll}
                  </td>

                  <td className="px-5 py-4">
                    {student.name}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {student.course}
                  </td>

                  <td className="px-5 py-4">
                    {student.classes}
                  </td>

                  <td className="px-5 py-4">
                    {student.attended}
                  </td>

                  {/* PROGRESS BAR */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-32 bg-slate-200 h-2 rounded-full">

                        <div
                          style={{ width: `${percent}%` }}
                          className={`h-2 rounded-full ${
                            percent >= 75 ? "bg-[#0B3D93]" : "bg-red-500"
                          }`}
                        />

                      </div>

                      <span className="text-xs font-medium">
                        {percent}%
                      </span>

                    </div>

                  </td>

                  {/* STATUS */}

                  <td className="px-5 py-4">

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        status === "GOOD"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {status}
                    </span>

                  </td>

                </tr>

              )

            })}

          </tbody>

        </table>

      </div>

      {/* FOOTER */}

      <div className="flex gap-2 justify-end mb-5">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          className="px-5 py-1.5 text-sm rounded-lg border border-slate-300 flex items-center gap-1 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          className="px-5 py-1.5 text-sm rounded-lg border border-slate-300 flex items-center gap-1 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}