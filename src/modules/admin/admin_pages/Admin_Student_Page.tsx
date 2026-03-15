import { GraduationCap, Users, Building2, Plus } from 'lucide-react'
import { StudentDirectory } from './StudentDirectory'
import { BatchCard } from '../admin_components/BatchCard'
import { Link } from 'react-router'

const StudentdashboardStats = [
  {
    id: 'students',
    icon: GraduationCap,
    iconColor: '#0B3D93',
    iconBgColor: 'rgba(11, 61, 147, 0.1)',
    title: 'Total Students',
    value: '2,204',
  },
  {
    id: 'students',
    icon: Users,
    iconColor: '#4F46E5',
    iconBgColor: 'rgba(79, 70, 229, 0.1)',
    title: 'Active Students',
    value: 40,
  },
  {
    id: 'students',
    icon: Building2,
    iconColor: '#0D9488',
    iconBgColor: 'rgba(13, 148, 136, 0.1)',
    title: 'Departments',
    value: 5,
  },
  {
    id: 'students',
    icon: GraduationCap,
    iconColor: '#DC2626',
    iconBgColor: 'rgba(220, 38, 38, 0.1)',
    title: 'New Adimission',
    value: 48,
  },
]

export default function AdminStudentPage() {
  return (
    <div className="">
      <div className="flex justify-between items-center p-5">
        <div>
          <h1 className="text-2xl font-semibold text-[#0F172A]">Academic Overview</h1>
          <p className="text-sm text-[#64748B]">
            Welcome back, Dr. Sharma. Here's what's happening at GEC Sheikhpura today.
          </p>
        </div>
        <div className="">
          <Link to="add-student">
            <button className="px-10 py-3 bg-[#0B3D93] text-white rounded-2xl text-sm flex items-center gap-3 cursor-pointer">
              <Plus size={18} />
              Add New Student
            </button>
          </Link>
        </div>
      </div>
      <div className="flex gap-5 px-5">
        {StudentdashboardStats.map(({ id, icon, iconColor, iconBgColor, title, value }) => (
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
      <div className="pb-5">
        <StudentDirectory />
      </div>
    </div>
  )
}
