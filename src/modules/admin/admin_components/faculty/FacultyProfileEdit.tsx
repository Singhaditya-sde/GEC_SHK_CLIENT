import { useParams, useNavigate } from 'react-router'
import { useState } from 'react'
import { facultyData } from '@/data/faculty'
import type { Faculty } from '@/types/faculty'
import { Spinner } from '@/components/ui common/Spinner'
import { CheckCircle } from 'lucide-react'

export default function FacultyProfileEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const faculty = facultyData.find((f) => f.id === Number(id))
  if (!faculty) {
    return <div className="p-6 text-red-500">Faculty not found</div>
  }

  const [formData, setFormData] = useState<Faculty>({ ...faculty })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      setLoading(true)
      await new Promise((res) => setTimeout(res, 700))
      const index = facultyData.findIndex((f) => f.id === Number(id))
      if (index !== -1) {
        facultyData[index] = { ...facultyData[index], ...formData }
      }
      setSuccess(true)
      setTimeout(() => {
        navigate(`/admin/faculty/${id}`)
      }, 1200)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-5 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold pt-5 text-[#0F172A]">Edit Faculty Profile</h1>
        <p className="text-sm text-[#64748B]">Update faculty information and research details.</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* BASIC INFO */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#334155]">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-slate-300 bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#334155]">
                Designation <span className="text-red-400">*</span>
              </label>
              <input
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="border border-slate-300 bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#334155]">
                Department <span className="text-red-400">*</span>
              </label>
              <input
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="border border-slate-300 bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#334155]">
                Contact <span className="text-red-400">*</span>
              </label>
              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="border border-slate-300 bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 col-span-2">
              <label className="text-sm font-medium text-[#334155]">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-slate-300 bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* RESEARCH DETAILS */}
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#334155]">
                Publications <span className="text-red-400">*</span>
              </label>
              <input
                name="publications"
                value={formData.publications}
                onChange={handleChange}
                className="border border-slate-300 bg-[#F8FAFC] rounded-xl px-3 py-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#334155]">
                Experience (Years) <span className="text-red-400">*</span>
              </label>
              <input
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="border border-slate-300 bg-[#F8FAFC] rounded-xl px-3 py-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#334155]">
                Projects <span className="text-red-400">*</span>
              </label>
              <input
                name="projects"
                value={formData.projects}
                onChange={handleChange}
                className="border border-slate-300 bg-[#F8FAFC] rounded-xl px-3 py-2"
              />
            </div>
          </div>

          {/* SUMMARY */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#334155]">
              Professional Summary <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={4}
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className="border border-slate-300 bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* SKILLS */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#334155]">
              Skills (comma separated) <span className="text-red-400">*</span>
            </label>
            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="border border-slate-300 bg-[#F8FAFC] rounded-xl px-3 py-2"
            />
          </div>

          {/* SUBMIT */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-slate-300 rounded-xl text-sm cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-10 py-3 text-white text-sm rounded-2xl flex items-center gap-3 cursor-pointer ${
                success ? 'bg-green-600' : 'bg-[#0B3D93]'
              }`}
            >
              {loading ? (
                <>
                  <Spinner />
                  Updating...
                </>
              ) : success ? (
                <>
                  <CheckCircle size={20} />
                  Updated
                </>
              ) : (
                'Update Faculty'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
