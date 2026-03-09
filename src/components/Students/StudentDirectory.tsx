import { Search, SlidersHorizontal, Eye , ChevronLeft , ChevronRight } from "lucide-react"
import { useState  } from 'react'
import type { StudentDirectoryProp } from "@/types/student";
import { students } from '@/data/students';
import { StudentProfileModal } from "@/modules/admin/admin_components/StudentProfileModal";



export function StudentDirectory() {
const [profileView, setProfileView] = useState<StudentDirectoryProp | null>(null)
const [searchTerm, setSearchTerm] = useState('')
const [selectedDepartment, setSelectedDepartment] = useState('')
const [selectedBatch, setSelectedBatch] = useState('')
const [currentPage, setCurrentPage] = useState(1)
const itemsPerPage = 20;

const departmentMap: Record<number, string> = {
  1: "CSE",
  2: "EE",
  3: "ECE",
  4: "ME",
  5: "MECH"
};

// this is fro the filtering students

const filteredStudents = students.filter((filterchild) => {

  const matchedSearch = 
  filterchild.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  filterchild.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
  filterchild.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
  filterchild.phoneNo.includes(searchTerm) 

  const matchesDepartment = 
    selectedDepartment === "All" ||
    selectedDepartment === "" ||
    (selectedDepartment === "CSE" && filterchild.deptId === 1) ||
    (selectedDepartment === "EE" && filterchild.deptId === 2)

  const matchesBatch = 
    selectedBatch === "All" ||
    selectedBatch === "" ||
    filterchild.batchId.toString() === selectedBatch

  return matchedSearch && matchesDepartment && matchesBatch
})

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)

  const paginatedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, 
  currentPage * itemsPerPage)
  return (
    
    <div className="px-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold pt-5 text-[#0F172A]">Student Directory</h1>
          <p className="text-sm text-[#64748B]">
            Manage and view all registered student records for the current academic year.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-5 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, roll number, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-slate-50 border border-slate-200 focus-visible:ring-2 focus-visible:ring-indigo-500"
          />
        </div>

        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-4 py-3 rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="All">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EE">EE</option>
          <option value="ME">ME</option>
          <option value="MECH">MECH</option>
        </select>

        <select
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
          className="px-4 py-3 rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="All">Batch Year</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>

        <button className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 transition">
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-5">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-slate-600 uppercase text-xs tracking-wider">
                <th className="px-6 py-4">Sr.no</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Roll No</th>
                <th className="px-6 py-4">Reg No</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Batch</th>
                <th className="px-6 py-4">Gender</th>
                <th className="px-6 py-4">View</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 text-slate-600">{student.id}</td>
                  <td className="px-6 py-4 text-slate-600">{student.name}</td>
                  <td className="px-6 py-4 text-slate-600">{student.rollNo}</td>
                  <td className="px-6 py-4 text-slate-600">{student.regNo}</td>
                  <td className="px-6 py-4 text-slate-600">{departmentMap[student.deptId]}</td>
                  <td className="px-6 py-4 text-slate-600">{student.batchId}</td>
                  <td className="px-6 py-4 text-slate-600">{student.gender}</td>
                  <td className="px-6 py-4 text-slate-600 ">
                    <button
                      onClick={(e) => {
                        e.currentTarget.blur()
                        setProfileView(student)
                      }}
                      className="p-1 rounded hover:bg-slate-100 cursor-pointer"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center py-4 px-5  border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Page {currentPage} of {totalPages}
            </p>
          <div className="flex gap-2">
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
              <StudentProfileModal
                student={profileView}
                onClose={() => setProfileView(null)}
              />
        </div>
      </div>
    </div>
  )
}

