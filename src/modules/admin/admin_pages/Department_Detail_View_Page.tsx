import { useParams, Link } from 'react-router'
import { departments } from '@/data/departments'
import { BatchCard } from '@/modules/admin/admin_components/BatchCard'

import {
  Users,
  GraduationCap,
  FileText,
  TrendingUp,
  Brain,
  Network,
  ShieldCheck,
  ArrowRight,
  User
} from 'lucide-react'

export default function DepartmentDetailView() {
  const { id } = useParams()

  const department = departments.find(
    (dept) => dept.id === Number(id)
  )

  if (!department) {
    return <div className="p-6 text-red-500">Department not found</div>
  }
  const slug = department.name.toLowerCase().replace(/\s+/g, "-")

  const departmentStats = [
  {
    icon: Users,
    title: "Total Faculty",
    value: department.faculty,
  },
  {
    icon: GraduationCap,
    title: "Student Enrollment",
    value: department.students,
  },
  {
    icon: FileText,
    title: "Research Output",
    value: department.research,
  },
  {
    icon: TrendingUp,
    title: "Placement Rate",
    value: department.placementRate,
  },
]

  return (
    <div className="px-5 space-y-6">

      {/* HEADER */}

      <div className="flex justify-between items-center pt-5">
        <div>
          <h1 className="text-2xl font-semibold text-[#0F172A]">
            {department.name}
          </h1>
          <div className="flex items-center gap-4 text-sm text-[#64748B] mt-1">
            <span className="flex items-center gap-1">
              <User size={18} />
              HOD: <span className='text-black font-medium'>{department.hod}</span>
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white">
            Generate Report
          </button>
          <Link to={`/admin/departments/${department.id}/${slug}/edit`}>
            <button className="px-4 py-2 bg-[#0B3D93] text-white rounded-lg text-sm">
              Edit Department
            </button>
          </Link>
        </div>
      </div>

      {/* STATS */}

      <div className="flex gap-6">
        {departmentStats.map(({ icon, title, value }) => (
          <BatchCard
            key={title}
            icon={icon}
            iconColor="#2563EB"
            iconBgColor="#DBEAFE"
            title={title}
            value={value}
            className='w-full lg:py-13'
          />
          ))}
      </div>

      {/* MAIN GRID */}

      <div className="grid grid-cols-[2fr_1fr] gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* FACULTY DIRECTORY */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

  <table className="w-full text-sm">

    {/* TABLE HEADER */}

    <thead className="bg-slate-100 text-xs uppercase text-slate-500">
      <tr>
        <th className="px-5 py-3 text-left">Name & Role</th>
        <th className="px-5 py-3 text-left">Specialization</th>
        <th className="px-5 py-3 text-left">Contact</th>
        <th className="px-5 py-3 text-right"></th>
      </tr>
    </thead>

    {/* TABLE BODY */}

    <tbody className="divide-y divide-slate-100">

      {department.facultyList.map((faculty) => {

        const initials = faculty.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()

        return (
          <tr
            key={faculty.id}
            className="hover:bg-slate-50 transition-colors"
          >

            {/* NAME + ROLE */}

            <td className="px-5 py-4">

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold">
                  {initials}
                </div>

                <div>
                  <p className="text-sm font-medium text-[#0F172A]">
                    {faculty.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {faculty.role}
                  </p>
                </div>

              </div>

            </td>

            {/* SPECIALIZATION */}

            <td className="px-5 py-4 text-slate-600">
              {faculty.specialization}
            </td>

            {/* CONTACT */}

            <td className="px-5 py-4 text-slate-600">
              {faculty.email}
            </td>

            {/* ACTION */}

            <td className="px-5 py-4 text-right">
              <ArrowRight
                size={16}
                className="text-slate-400 inline-block"
              />
            </td>

          </tr>
        )
      })}

    </tbody>

  </table>

</div>

          {/* ACADEMIC PERFORMANCE */}

          <div className="bg-white border border-slate-200 rounded-xl p-6">

            <div className="flex justify-between items-center mb-4">

              <div>
                <h3 className="font-semibold text-[#0F172A]">
                  Academic Performance
                </h3>

                <p className="text-xs text-slate-500">
                  Average student SGPA trend across semesters
                </p>
              </div>

              <div className="flex gap-4 text-xs">

                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#0B3D93] rounded-full" />
                  2023
                </span>

                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-slate-300 rounded-full" />
                  2022
                </span>

              </div>

            </div>

            {/* SIMPLE BAR GRAPH */}

            <div className="flex items-end gap-3 h-40">

              {[60, 70, 65, 80, 75, 85].map((value, i) => (
                <div
                  key={i}
                  className="bg-[#0B3D93] w-6 rounded"
                  style={{ height: `${value}%` }}
                />
              ))}

            </div>

          </div>

        </div>

        {/* RIGHT COLUMN */}

        <div className="space-y-4">

          <div className="bg-white border border-slate-200 rounded-xl p-5">

            <h3 className="font-semibold text-[#0F172A] mb-4">
              Specialized Labs
            </h3>

            <div className="space-y-4">

              {department.labs.map((lab, index) => {

                const icons = [Brain, Network, ShieldCheck]
                const Icon = icons[index % icons.length]

                return (
                  <div
                    key={lab.id}
                    className="flex gap-3 border rounded-lg p-4"
                  >

                    <div className="p-2 bg-slate-100 rounded-lg">
                      <Icon size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">
                        {lab.name}
                      </p>

                      <p className="text-xs text-slate-500">
                        {lab.desc}
                      </p>

                      <p className="text-xs text-blue-600 mt-1">
                        {lab.room}
                      </p>

                    </div>

                  </div>
                )
              })}

            </div>

            <button className="mt-4 w-full border border-slate-200 rounded-lg py-2 text-sm">
              Manage Lab Access
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}