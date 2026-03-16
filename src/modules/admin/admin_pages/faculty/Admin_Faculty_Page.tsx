import { Link } from 'react-router'
import {
  Plus,
  Users,
  UserMinus,
  CheckCircle,
  Building2,
  Search,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  Eye,
} from 'lucide-react'
import { BatchCard } from '../../admin_components/batch/BatchCard'
import { useState } from 'react'
import { facultyData } from '@/data/faculty'

const FacultyCardStats = [
  {
    id: 'total_faculty',
    icon: Users,
    iconColor: '#0B3D93',
    iconBgColor: 'rgba(11, 61, 147, 0.1)',
    title: 'Total Faculty',
    value: 40,
  },
  {
    id: 'active_faculty',
    icon: CheckCircle,
    iconColor: '#059669',
    iconBgColor: 'rgba(5, 150, 105, 0.1)',
    title: 'Active Faculty',
    value: 35,
  },
  {
    id: 'faculty_on_leave',
    icon: UserMinus,
    iconColor: '#EA580C',
    iconBgColor: 'rgba(234, 88, 12, 0.1)',
    title: 'Faculty on Leave',
    value: 4,
  },
  {
    id: 'departments',
    icon: Building2,
    iconColor: '#7C3AED',
    iconBgColor: 'rgba(124, 58, 237, 0.1)',
    title: 'Departments',
    value: 5,
  },
]

export function AdminFacultyPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectDepartment, setSelectDepartment] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  {
    /*this function fro the filtering */
  }
  const filteredFaculty = facultyData.filter((faculty) => {
    const matchesSearch =
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = selectDepartment === 'All' || faculty.department === selectDepartment

    return matchesSearch && matchesDepartment
  })

  const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage)

  const paginatedFaculty = filteredFaculty.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="px-5">
      {/*this is for the headline and add faulty button*/}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold pt-5 text-[#0F172A]">Faculty Management</h1>
          <p className="text-sm text-[#64748B]">
            Manage directory, department assignments, and status.
          </p>
        </div>
        <div className="pt-4">
          <Link
            to="/admin/faculty/add_faculty"
            className="px-10 py-3 bg-[#0B3D93] text-white rounded-2xl text-sm flex items-center gap-3 cursor-pointer"
          >
            <Plus size={18} />
            Add Faculty
          </Link>
        </div>
      </div>

      {/*this fro the faculty stats cards*/}
      <div className="flex justify-between gap-5 mt-5">
        {FacultyCardStats.map(({ id, icon, iconColor, iconBgColor, title, value }) => (
          <BatchCard
            key={id}
            icon={icon}
            iconColor={iconColor}
            iconBgColor={iconBgColor}
            title={title}
            value={value}
            className='w-full lg:py-13'
          />
        ))}
      </div>

      {/*this is for the filter tab and the search tab*/}
      <div className="flex items-center gap-4 mt-5 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select
          value={selectDepartment}
          onChange={(e) => setSelectDepartment(e.target.value)}
          className="px-4 py-3 rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="All">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EE">EE</option>
          <option value="ME">ME</option>
          <option value="MECH">MECH</option>
        </select>

        <button className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 transition">
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      {/*this is for the table of faculty to be shown*/}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-5">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            {/* table headers */}
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-slate-600 uppercase text-xs tracking-wider">
                <th className="px-6 py-4 w-20">SR.NO</th>
                <th className="px-6 py-4">FACULTY NAME</th>
                <th className="px-6 py-4">DESIGNATION</th>
                <th className="px-6 py-4">CONTACT</th>
                <th className="px-6 py-4">DEPARTMENT</th>
                <th className="px-6 py-4">PROFILE</th>
              </tr>
            </thead>

            {/* table body */}
            <tbody className="divide-y divide-slate-100">
              {paginatedFaculty.map((faculty, index) => (
                <tr key={faculty.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-medium text-slate-500">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>

                  <td className="px-6 py-4 font-semibold text-slate-800">{faculty.name}</td>

                  <td className="px-6 py-4 text-slate-600">{faculty.designation}</td>

                  <td className="px-6 py-4 text-slate-600">{faculty.contact}</td>

                  <td className="px-6 py-4 text-slate-600 ">{faculty.department}</td>

                  <td className="px-6 py-4 text-slate-600 ">
                    <Link to={`/admin/faculty/${faculty.id}`}>
                      <button className="p-1 rounded hover:text-yellow-500 cursor-pointer">
                        <Eye size={18} />
                      </button>
                    </Link>
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
        </div>
      </div>
    </div>
  )
}
