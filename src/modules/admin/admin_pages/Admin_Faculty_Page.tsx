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
} from 'lucide-react'
import { BatchCard } from '../admin_components/BatchCard'
import { useState } from 'react'

export interface FacultyDataProp {
  id: number
  name: string
  designation: string
  contact: number | string
  department: string
}

export const facultyData: FacultyDataProp[] = [
  // ================= CSE =================
  {
    id: 1,
    name: 'Dr. Ankit Sharma',
    designation: 'Professor',
    contact: 6201827501,
    department: 'CSE',
  },
  {
    id: 2,
    name: 'Dr. Meera Sinha',
    designation: 'Associate Professor',
    contact: 6201827502,
    department: 'CSE',
  },
  {
    id: 3,
    name: 'Mr. Rohit Kumar',
    designation: 'Assistant Professor',
    contact: 6201827503,
    department: 'CSE',
  },
  {
    id: 4,
    name: 'Ms. Pooja Verma',
    designation: 'Lecturer',
    contact: 6201827504,
    department: 'CSE',
  },
  {
    id: 5,
    name: 'Dr. Vikram Rao',
    designation: 'Professor',
    contact: 6201827505,
    department: 'CSE',
  },
  {
    id: 6,
    name: 'Dr. Neha Singh',
    designation: 'Associate Professor',
    contact: 6201827506,
    department: 'CSE',
  },
  {
    id: 7,
    name: 'Mr. Aman Raj',
    designation: 'Assistant Professor',
    contact: 6201827507,
    department: 'CSE',
  },
  {
    id: 8,
    name: 'Ms. Kriti Mishra',
    designation: 'Lecturer',
    contact: 6201827508,
    department: 'CSE',
  },
  {
    id: 9,
    name: 'Dr. Abhishek Jain',
    designation: 'Professor',
    contact: 6201827509,
    department: 'CSE',
  },
  {
    id: 10,
    name: 'Dr. Shruti Nair',
    designation: 'Assistant Professor',
    contact: 6201827510,
    department: 'CSE',
  },

  // ================= ECE =================
  {
    id: 11,
    name: 'Dr. Rahul Mehta',
    designation: 'Professor',
    contact: 6201827511,
    department: 'ECE',
  },
  {
    id: 12,
    name: 'Dr. Anjali Gupta',
    designation: 'Associate Professor',
    contact: 6201827512,
    department: 'ECE',
  },
  {
    id: 13,
    name: 'Mr. Sandeep Yadav',
    designation: 'Assistant Professor',
    contact: 6201827513,
    department: 'ECE',
  },
  {
    id: 14,
    name: 'Ms. Riya Kapoor',
    designation: 'Lecturer',
    contact: 6201827514,
    department: 'ECE',
  },
  {
    id: 15,
    name: 'Dr. Harsh Patel',
    designation: 'Professor',
    contact: 6201827515,
    department: 'ECE',
  },
  {
    id: 16,
    name: 'Dr. Kavita Reddy',
    designation: 'Associate Professor',
    contact: 6201827516,
    department: 'ECE',
  },
  {
    id: 17,
    name: 'Mr. Deepak Singh',
    designation: 'Assistant Professor',
    contact: 6201827517,
    department: 'ECE',
  },
  {
    id: 18,
    name: 'Ms. Priya Das',
    designation: 'Lecturer',
    contact: 6201827518,
    department: 'ECE',
  },
  {
    id: 19,
    name: 'Dr. Manish Verma',
    designation: 'Professor',
    contact: 6201827519,
    department: 'ECE',
  },
  {
    id: 20,
    name: 'Dr. Isha Khan',
    designation: 'Assistant Professor',
    contact: 6201827520,
    department: 'ECE',
  },

  // ================= EE =================
  {
    id: 21,
    name: 'Dr. Arjun Roy',
    designation: 'Professor',
    contact: 6201827521,
    department: 'EE',
  },
  {
    id: 22,
    name: 'Dr. Sneha Joshi',
    designation: 'Associate Professor',
    contact: 6201827522,
    department: 'EE',
  },
  {
    id: 23,
    name: 'Mr. Varun Shah',
    designation: 'Assistant Professor',
    contact: 6201827523,
    department: 'EE',
  },
  {
    id: 24,
    name: 'Ms. Tanvi Sharma',
    designation: 'Lecturer',
    contact: 6201827524,
    department: 'EE',
  },
  {
    id: 25,
    name: 'Dr. Karan Malhotra',
    designation: 'Professor',
    contact: 6201827525,
    department: 'EE',
  },
  {
    id: 26,
    name: 'Dr. Pooja Iyer',
    designation: 'Associate Professor',
    contact: 6201827526,
    department: 'EE',
  },
  {
    id: 27,
    name: 'Mr. Nikhil Jain',
    designation: 'Assistant Professor',
    contact: 6201827527,
    department: 'EE',
  },
  { id: 28, name: 'Ms. Aditi Rao', designation: 'Lecturer', contact: 6201827528, department: 'EE' },
  {
    id: 29,
    name: 'Dr. Vivek Sharma',
    designation: 'Professor',
    contact: 6201827529,
    department: 'EE',
  },
  {
    id: 30,
    name: 'Dr. Ritu Singh',
    designation: 'Assistant Professor',
    contact: 6201827530,
    department: 'EE',
  },

  // ================= ME =================
  {
    id: 31,
    name: 'Dr. Sanjay Kumar',
    designation: 'Professor',
    contact: 6201827531,
    department: 'ME',
  },
  {
    id: 32,
    name: 'Dr. Anu Prasad',
    designation: 'Associate Professor',
    contact: 6201827532,
    department: 'ME',
  },
  {
    id: 33,
    name: 'Mr. Ajay Verma',
    designation: 'Assistant Professor',
    contact: 6201827533,
    department: 'ME',
  },
  {
    id: 34,
    name: 'Ms. Simran Kaur',
    designation: 'Lecturer',
    contact: 6201827534,
    department: 'ME',
  },
  {
    id: 35,
    name: 'Dr. Mohit Sharma',
    designation: 'Professor',
    contact: 6201827535,
    department: 'ME',
  },
  {
    id: 36,
    name: 'Dr. Rakesh Das',
    designation: 'Associate Professor',
    contact: 6201827536,
    department: 'ME',
  },
  {
    id: 37,
    name: 'Mr. Harsh Vardhan',
    designation: 'Assistant Professor',
    contact: 6201827537,
    department: 'ME',
  },
  {
    id: 38,
    name: 'Ms. Nidhi Gupta',
    designation: 'Lecturer',
    contact: 6201827538,
    department: 'ME',
  },
  {
    id: 39,
    name: 'Dr. Suraj Tiwari',
    designation: 'Professor',
    contact: 6201827539,
    department: 'ME',
  },
  {
    id: 40,
    name: 'Dr. Ankita Roy',
    designation: 'Assistant Professor',
    contact: 6201827540,
    department: 'ME',
  },

  // ================= CE =================
  {
    id: 41,
    name: 'Dr. Rohan Mishra',
    designation: 'Professor',
    contact: 6201827541,
    department: 'CE',
  },
  {
    id: 42,
    name: 'Dr. Shalini Verma',
    designation: 'Associate Professor',
    contact: 6201827542,
    department: 'CE',
  },
  {
    id: 43,
    name: 'Mr. Gaurav Singh',
    designation: 'Assistant Professor',
    contact: 6201827543,
    department: 'CE',
  },
  {
    id: 44,
    name: 'Ms. Neetu Kumari',
    designation: 'Lecturer',
    contact: 6201827544,
    department: 'CE',
  },
  {
    id: 45,
    name: 'Dr. Prakash Yadav',
    designation: 'Professor',
    contact: 6201827545,
    department: 'CE',
  },
  {
    id: 46,
    name: 'Dr. Komal Shah',
    designation: 'Associate Professor',
    contact: 6201827546,
    department: 'CE',
  },
  {
    id: 47,
    name: 'Mr. Manav Arora',
    designation: 'Assistant Professor',
    contact: 6201827547,
    department: 'CE',
  },
  {
    id: 48,
    name: 'Ms. Rachita Sen',
    designation: 'Lecturer',
    contact: 6201827548,
    department: 'CE',
  },
  {
    id: 49,
    name: 'Dr. Alok Kumar',
    designation: 'Professor',
    contact: 6201827549,
    department: 'CE',
  },
  {
    id: 50,
    name: 'Dr. Divya Sinha',
    designation: 'Assistant Professor',
    contact: 6201827550,
    department: 'CE',
  },
]

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
