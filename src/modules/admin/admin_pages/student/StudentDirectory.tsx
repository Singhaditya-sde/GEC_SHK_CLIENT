import { Search, SlidersHorizontal, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getStudents } from '@/services/studentApi'
import { Link } from 'react-router'
import { Spinner } from '@/components/ui common/Spinner'

export function StudentDirectory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedBatch, setSelectedBatch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [students, setStudents] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState({
  search: "",
  department: "",
  batch: ""
  })
  const itemsPerPage = 20

const departmentIdMap: Record<string, number> = {
  ME: 1,
  CSE: 2,
  ECE: 3,
  CE: 4,
  EEE: 5
}

const batchIdMap: Record<string, number> = {
  "2025": 1,
  "2024": 2,
  "2023": 3,
  "2022": 4
}

const hasActiveFilters = 
  appliedFilters.search ||
  appliedFilters.department ||
  appliedFilters.batch

  useEffect(() => {
    const fetchStudents = async () => {
      try{
        setLoading(true)

        const data = await getStudents({
          page: currentPage,
          limit: itemsPerPage,
          search: appliedFilters.search,
          deptId: appliedFilters.department
            ? departmentIdMap[appliedFilters.department]
            : undefined,
          batchId: appliedFilters.batch
            ? batchIdMap[appliedFilters.batch]
            : undefined,
        })

        setStudents(data.students)
        setTotalPages(data.pagination.totalPages)
      } catch (error) {
        console.error("Failed to fetch students",error)
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [currentPage, appliedFilters])

  return (
    <div className="px-5">
      <div className="flex items-center gap-4 mt-5 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, roll number, or registration number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setAppliedFilters({
                  search: searchTerm,
                  department: selectedDepartment,
                  batch: selectedBatch
                })
                setCurrentPage(1)
              }
            }}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-slate-50 border border-slate-200 focus-visible:ring-1 focus-visible:ring-indigo-500"
          />
        </div>

        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-4 py-3 rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="ME">ME</option>
          <option value="CE">CE</option>
        </select>

        <select
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
          className="px-4 py-3 rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Batch Year</option>
          <option value="2025">2025-2029</option>
          <option value="2024">2024-2028</option>
          <option value="2023">2023-2027</option>
          <option value="2022">2022-2026</option>
        </select>

        <button
          disabled={loading}
          onClick={() => {
            if (hasActiveFilters) {
              // Clear the filters frist 
              setSearchTerm("")
              setSelectedDepartment("")
              setSelectedBatch("")
              setAppliedFilters({
                search: "",
                department: "",
                batch: ""
              })
            } else {
              // apply the filters
              setAppliedFilters({
                search: searchTerm,
                department: selectedDepartment,
                batch: selectedBatch
              })
            }

            setCurrentPage(1)
          }}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 transition cursor-pointer"
        >
          <SlidersHorizontal size={16} />
          {hasActiveFilters ? "Clear" : "Apply"}
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
                <th className="px-6 py-4">View</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
               {loading ? (
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <div className='flex justify-center items-center h-full'>
                        <Spinner size={28}/>
                    </div>
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-500">
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((student , index) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 text-slate-600">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="px-6 py-4 text-slate-600">{student.name}</td>
                  <td className="px-6 py-4 text-slate-600">{student.rollNo}</td>
                  <td className="px-6 py-4 text-slate-600">{student.regNo}</td>
                  <td className="px-6 py-4 text-slate-600">{student.dept?.deptCode}</td>
                  <td className="px-6 py-4 text-slate-600">{student.batch?.startYear}-{student.batch?.endYear}</td>
                  <td className="px-6 py-4 text-slate-600 ">
                    <Link to={`/admin/students/${student.id}`}>
                      <button className="p-1 rounded hover:text-yellow-500 cursor-pointer">
                        <Eye size={18} />
                      </button>
                    </Link>
                  </td>
                </tr>
              )))}
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
        </div>
      </div>
    </div>
  )
}
