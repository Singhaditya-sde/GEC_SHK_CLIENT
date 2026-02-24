import { Search, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
export function StudentDirectory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectDepartment, setSelectDepartment] = useState('')

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

        <select
          value={selectDepartment}
          onChange={(e) => setSelectDepartment(e.target.value)}
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
    </div>
  )
}
