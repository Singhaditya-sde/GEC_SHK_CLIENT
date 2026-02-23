import { GraduationCap, Users, Building2, Download } from 'lucide-react'
import { BatchCard } from '../admin_components/BatchCard'
import { AttendanceTrendChart } from '../admin_components/AttendanceTrendChart'
import { DepartmentalSGPAChart } from '../admin_components/DepartmentalSGPAChart'

const dashboardStats = [
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
    title: 'Faculty Members',
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
    title: 'Active Courses',
    value: 48,
  },
]

// This is For the Main page of the ADMINDASHBOARD
export function AdminDashboard() {
  const handleGenerateRes = () => {
    console.log('Generate Response Comming Soon')
  }
  return (
    <>
      <div className="bg-[#E2E8F0]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold px-5 pt-5 text-[#0F172A]">Academic Overview</h1>
              <p className="text-sm px-5 text-[#64748B]">
                Welcome back, Dr. Sharma. Here's what's happening at GEC Sheikhpura today.
              </p>
            </div>
            <div className="px-5 pt-5">
              <button
                onClick={handleGenerateRes}
                className="text-white font-medium text-sm bg-[#0B3D93] px-4 py-2 rounded-lg flex gap-2 cursor-pointer"
              >
                <Download size={18} />
                Genrate Response
              </button>
            </div>
          </div>
          <div className=" flex gap-5 p-5">
            {dashboardStats.map(({ id, icon, iconColor, iconBgColor, title, value }) => (
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

          <div className="px-5 flex gap-5">
            <AttendanceTrendChart />
            <DepartmentalSGPAChart />
          </div>
        </div>
      </div>
    </>
  )
}
