import { Building2, FlaskConical, Landmark } from 'lucide-react'
import { BatchCard } from '@/modules/admin/admin_components/BatchCard'
import { DepartmentCard } from '@/modules/admin/admin_components/DepartmentCard'
import { departments } from '@/data/departments'



export function AdminDepartmentPage() {
  
  const totalDepartments = departments.length
  const totalFaculty = departments.reduce((acc, dept) => acc + dept.faculty, 0)
  const totalStudents = departments.reduce((acc, dept) => acc + dept.students, 0)

  const stats = [
  {
    icon: Building2,
    iconColor: "#2563EB",
    iconBgColor: "#DBEAFE",
    title: "Total Departments",
    value: totalDepartments,
  },
  {
    icon: FlaskConical,
    iconColor: "#7C3AED",
    iconBgColor: "#EDE9FE",
    title: "Total Faculty",
    value: totalFaculty,
  },
  {
    icon: Landmark,
    iconColor: "#16A34A",
    iconBgColor: "#DCFCE7",
    title: "Total Students",
    value: totalStudents,
  },
  {
    icon: Landmark,
    iconColor: "#16A34A",
    iconBgColor: "#DCFCE7",
    title: "Total Students",
    value: totalStudents,
  },
]
  return (
    <div className="px-5 space-y-6">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-semibold pt-5 text-[#0F172A]">
          Department Management
        </h1>
        <p className="text-sm text-[#64748B]">
          Manage academic departments, faculty allocation and department performance.
        </p>
      </div>

      {/* STATS */}
      <div className="flex gap-6">
        {stats.map((stat, index) => (
          <BatchCard
            key={index}
            icon={stat.icon}
            iconColor={stat.iconColor}
            iconBgColor={stat.iconBgColor}
            title={stat.title}
            value={stat.value}
            className='w-full lg:py-13'
          />
        ))}
      </div>
      {/* DEPARTMENT GRID */}

      <div className="grid grid-cols-3 gap-6">
        {departments.map((dept) => (
          <DepartmentCard
            key={dept.id}
            id={dept.id}
            name={dept.name}
            status={dept.status}
            school={dept.school}
            hod={dept.hod}
            faculty={dept.faculty}
            students={dept.students}
            headerColor={dept.headerColor}
          />
        ))}
      </div>
    </div>
  )
}