import { ArrowRight } from 'lucide-react'
import type { DepartmentCardProps } from '@/types/department'
import { Link } from 'react-router'

export function DepartmentCard({
  id,
  name,
  school,
  hod,
  faculty,
  students,
  status = 'ACTIVE',
  headerColor = '#0B3D93',
  className ='',
}: DepartmentCardProps) {
  const slug = name.toLowerCase().replace(/\s+/g, "-")
  return (
    <div className={`bg-white rounded-xl border border-slate-200 overflow-hidden w-full shadow-sm mb-5 ${className}`}>

      {/* HEADER */}
      <div
        className="px-6 py-5 lg:py-15 text-white flex justify-between items-start"
        style={{ backgroundColor: headerColor }}
      >
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm opacity-80">{school}</p>
        </div>
        <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
          {status}
        </span>
      </div>
      {/* BODY */}
      <div className="p-6 space-y-5">
        {/* HOD */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-semibold">
            {hod
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)}
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase">
              Head of Department
            </p>
            <p className="text-sm font-semibold text-[#0F172A]">{hod}</p>
          </div>
        </div>

        {/* STATS */}

        <div className="flex gap-4">
          <div className="flex-1 bg-[#F1F5F9] rounded-lg p-4">
            <p className="text-xs text-slate-400">Faculty</p>
            <p className="text-lg font-semibold text-[#0F172A]">{faculty}</p>
          </div>
          <div className="flex-1 bg-[#F1F5F9] rounded-lg p-4">
            <p className="text-xs text-slate-400">Students</p>
            <p className="text-lg font-semibold text-[#0F172A]">{students}</p>
          </div>
        </div>

        {/* FOOTER */}
        
        <Link to={`/admin/departments/${id}/${slug}/view`}>
          <button className="w-full border border-slate-200 rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-medium text-blue-700 hover:bg-slate-50 transition cursor-pointer">
            View Details
            <ArrowRight size={16} />
          </button>
        </Link>
      </div>
    </div>
  )
}