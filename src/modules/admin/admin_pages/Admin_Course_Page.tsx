import { useState } from "react"
import { BatchCard } from "../admin_components/BatchCard"
import { Search, SlidersHorizontal, Plus } from "lucide-react"
import { BookOpen, Zap, Layers, Building2 } from "lucide-react"
import { courses } from "@/data/course"


export default function AdminCoursePage() {
  const [search, setSearch] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("All")
  const [semesterFilter, setSemesterFilter] = useState("All")
  const filteredCourses = courses.filter((course) => {
  const matchesSearch =
    course.name.toLowerCase().includes(search.toLowerCase()) ||
    course.id.toLowerCase().includes(search.toLowerCase())

  const matchesDepartment =
    departmentFilter === "All" || course.department === departmentFilter

  return matchesSearch && matchesDepartment
  })

  const courseStats = [
  {
    icon: BookOpen,
    iconColor: "#2563EB",
    iconBgColor: "#DBEAFE",
    title: "Total Courses",
    value: "48",
  },
  {
    icon: Zap,
    iconColor: "#9333EA",
    iconBgColor: "#F3E8FF",
    title: "Active Courses",
    value: "42",
  },
  {
    icon: Layers,
    iconColor: "#F59E0B",
    iconBgColor: "#FEF3C7",
    title: "Elective Courses",
    value: "12",
  },
  {
    icon: Building2,
    iconColor: "#16A34A",
    iconBgColor: "#DCFCE7",
    title: "Departments Covered",
    value: "5",
  },
]

  return (
    <div className="px-5 space-y-5 mb-5">

      {/* PAGE HEADER */}

      <div>
        <h1 className="text-2xl font-semibold pt-5 text-[#0F172A]">
          Course Management
        </h1>
        <p className="text-sm text-[#64748B]">
          Manage academic courses, credits and department offerings.
        </p>
      </div>

      {/* STATS USING BATCHCARD */}

      <div className="flex gap-5 ">
        {courseStats.map(({ icon, iconColor, iconBgColor, title, value }) => (
          <BatchCard
            key={title}
            icon={icon}
            iconColor={iconColor}
            iconBgColor={iconBgColor}
            title={title}
            value={value}
            className='w-full lg:py-13'
          />
        ))}
      </div>

      {/* SEARCH + FILTER BAR */}

      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4">

        {/* SEARCH */}

        <div className="flex items-center gap-3 flex-1 bg-[#F8FAFC] border border-slate-200 rounded-full px-4 py-3">
          <Search size={18} className="text-slate-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by course name or ID..."
            className="bg-transparent outline-none text-sm flex-1"
          />
        </div>

        {/* DEPARTMENT FILTER */}

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="border border-slate-200 bg-[#F8FAFC] rounded-full px-4 py-3 text-sm"
        >
          <option value="All">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Electrical">Electrical</option>
          <option value="General">General</option>
        </select>

        {/* SEMESTER FILTER */}
        <select
          className="border border-slate-200 bg-[#F8FAFC] rounded-full px-4 py-3 text-sm"
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
        >
          <option>All</option>
          <option>1st</option>
          <option>3rd</option>
          <option>4th</option>
          <option>5th</option>
          <option>6th</option>
        </select>

        {/* FILTER BUTTON */}

        <button className="flex items-center gap-2 border border-slate-200 bg-[#F8FAFC] rounded-full px-4 py-3 text-sm">
          <SlidersHorizontal size={16} />
          Filters
        </button>

      </div>

      {/* COURSE DIRECTORY HEADER */}

      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-xl font-semibold text-[#0F172A]">
            Course Directory
          </h2>

          <p className="text-sm text-[#64748B]">
            Manage and audit academic offerings across departments.
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-[#0B3D93] text-white rounded-lg text-sm">
          <Plus size={16} />
          Add New Course
        </button>

      </div>

      {/* COURSE TABLE */}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-slate-100 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-3 text-left">Course ID</th>
              <th className="px-5 py-3 text-left">Course Name</th>
              <th className="px-5 py-3 text-left">Department</th>
              <th className="px-5 py-3 text-left">Semester</th>
              <th className="px-5 py-3 text-left">Credits</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">

            {filteredCourses.map((course) => (
              <tr key={course.id} className="hover:bg-slate-50">

                <td className="px-5 py-4 font-medium text-blue-700">
                  {course.id}
                </td>

                <td className="px-5 py-4">
                  {course.name}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {course.department}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {course.semester}
                </td>

                <td className="px-5 py-4">
                  <span className="bg-slate-100 px-2 py-1 rounded text-xs">
                    {course.credits}
                  </span>
                </td>

                <td className="px-5 py-4 text-right">
                  <button className="px-3 py-1 text-xs bg-slate-200 rounded">
                    Manage
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}