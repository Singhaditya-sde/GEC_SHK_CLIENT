import { useParams, Link } from 'react-router'
import { facultyData } from '@/data/faculty'
import { BatchCard } from './BatchCard'
import { BookOpen, Briefcase, FolderKanban } from 'lucide-react'

export default function FacultyProfileView() {
  const { id } = useParams()
  const faculty = facultyData.find((f) => f.id === Number(id))
  if (!faculty) {
    return <div className="p-6 text-red-500">Faculty not found</div>
  }

  const skills = faculty.skills.split(',')

  const initials = faculty.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className="px-5 space-y-6">
      {/* PAGE HEADER */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold pt-5 text-[#0F172A]">Faculty Management</h1>
          <p className="text-sm text-[#64748B]">
            Manage directory, department assignments, and status.
          </p>
        </div>
      </div>

      {/* TOP GRID */}

      <div className="flex gap-6 items-start">
        {/* LEFT PROFILE CARD */}

        <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col gap-6 min-h-[580px]">
          <div className="flex justify-between">
            <div className="flex gap-6">
              {/* Avatar */}

              <div className="w-30 h-30 rounded-xl bg-[#0B3D93] text-white flex items-center justify-center text-3xl font-semibold">
                {initials}
              </div>

              {/* Basic Info */}

              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold text-[#0F172A]">{faculty.name}</h2>
                <p className="text-[#64748B] text-sm">
                  {faculty.designation} • {faculty.department}
                </p>
                <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full w-fit mt-1">
                  FACULTY
                </span>
                <div className="flex gap-10 mt-3 text-sm text-[#334155]">
                  <p>
                    Email: <span className="font-medium">{faculty.email}</span>
                  </p>
                  <p>
                    Contact: <span className="font-medium">{faculty.contact}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}

            <div className="flex flex-col gap-4">
              <Link to="edit">
                <button className="px-10 py-3 w-40 bg-[#0B3D93] text-white rounded-2xl text-sm font-medium cursor-pointer">
                  Edit Profile
                </button>
              </Link>
              <button className="px-10 py-3 w-40 bg-[#E5E9EB] border border-slate-300 text-sm font-semibold rounded-2xl cursor-pointer">
                Download Report
              </button>
            </div>
          </div>

          {/* PROFESSIONAL SUMMARY */}

          <div className="border-t border-slate-200 pt-4">
            <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Professional Summary</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">{faculty.summary}</p>
          </div>

          {/* SKILLS (MOVED INSIDE PROFILE CARD) */}

          <div className="border-t border-slate-200 pt-4">
            <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Specialized Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="text-xs bg-slate-100 px-3 py-1 rounded-lg">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE STATS */}

        <div className="flex flex-col gap-6">
          <BatchCard
            icon={BookOpen}
            iconColor="#2563EB"
            iconBgColor="#DBEAFE"
            title="Publications"
            value={faculty.publications}
          />

          <BatchCard
            icon={Briefcase}
            iconColor="#9333EA"
            iconBgColor="#F3E8FF"
            title="Experience"
            value={`${faculty.experience} yrs`}
          />

          <BatchCard
            icon={FolderKanban}
            iconColor="#16A34A"
            iconBgColor="#DCFCE7"
            title="Projects"
            value={faculty.projects}
          />
        </div>
      </div>
    </div>
  )
}
