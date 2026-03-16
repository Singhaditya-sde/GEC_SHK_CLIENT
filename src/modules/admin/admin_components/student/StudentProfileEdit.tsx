import { useParams, useNavigate } from 'react-router'
import { useState } from 'react'
import { UserPlus, Bed, CheckCircle, UserCheck } from 'lucide-react'
import { students } from '@/data/students'
import type { StudentDirectoryProp } from '@/types/student'
import { ToggleCard } from '@/components/ui common/ToggleCard'
import { Spinner } from '@/components/ui common/Spinner'

export default function StudentProfileEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const student = students.find((s) => s.id === Number(id))

  const [formData, setFormData] = useState<StudentDirectoryProp>(
    student ?? ({} as StudentDirectoryProp)
  )
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!student) {
    return <div className="p-10 text-red-500">Student Not Found</div>
  }

  const numberFields = ['deptId', 'semId', 'batchId']

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: numberFields.includes(name) ? Number(value) : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setLoading(true)

      await new Promise((res) => setTimeout(res, 800))

      const index = students.findIndex((s) => s.id === Number(id))

      if (index !== -1) {
        students[index] = { ...students[index], ...formData }
      }

      setSuccess(true)

      setTimeout(() => {
        navigate(`/admin/students/${id}`)
      }, 1200)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-5">
      {/* HEADER */}

      <div>
        <h1 className="text-2xl font-semibold pt-5 text-[#0F172A]">Edit Student Profile</h1>
        <p className="text-sm text-[#64748B]">Update student information in the system.</p>
      </div>

      <div className="bg-white p-6 mt-5 rounded-xl mb-5">
        <div className="flex gap-3 items-center">
          <div className="bg-slate-200 w-12 h-12 flex items-center justify-center rounded-lg">
            <UserPlus size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-md text-[#0F172A]">Student Edit Form</h2>
            <p className="text-sm text-[#64748B]">Modify the student details and save changes.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* PERSONAL INFO */}

          <div className="space-y-2 mt-6">
            <h1 className="text-sm text-slate-500 font-medium">PERSONAL INFORMATION</h1>
            <div className="w-full h-px bg-slate-300"></div>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#334155]">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#334155]">
                Gender <span className="text-red-400">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border border-[#E2E8F0]  bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#334155]">Phone Number</label>
              <input
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 ">
              <label className="text-sm font-medium text-[#334155]">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-[#E2E8F0]  bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* ACADEMIC */}

          <div className="space-y-2 mt-8">
            <h1 className="text-sm text-slate-500 font-medium">ACADEMIC DETAILS</h1>
            <div className="w-full h-px bg-slate-300"></div>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#334155]">
                Roll Number <span className="text-red-400">*</span>
              </label>
              <input
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#334155]">
                Registration Number <span className="text-red-400">*</span>
              </label>
              <input
                name="regNo"
                value={formData.regNo}
                onChange={handleChange}
                className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#334155]">
                Section <span className="text-red-400">*</span>
              </label>
              <input
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#334155]">
                Semester <span className="text-red-400">*</span>
              </label>
              <select
                name="semId"
                value={formData.semId}
                onChange={handleChange}
                className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#334155]">
                Department ID <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="deptId"
                value={formData.deptId}
                onChange={handleChange}
                className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#334155]">
                Batch ID <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="batchId"
                value={formData.batchId}
                onChange={handleChange}
                className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* ADMISSION */}

          <div className="space-y-2 mt-8">
            <h1 className="text-sm text-slate-500 font-medium">ADMISSION DETAILS</h1>
            <div className="w-full h-px bg-slate-300"></div>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#334155]">
                Admission Type <span className="text-red-400">*</span>
              </label>
              <select
                name="admissionType"
                value={formData.admissionType}
                onChange={handleChange}
                className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="">Select</option>
                <option value="REGULAR">Regular</option>
                <option value="LATERAL">Lateral</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#334155]">
                Admission Date <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* PARENT */}

          <div className="space-y-2 mt-8">
            <h1 className="text-sm text-slate-500 font-medium">PARENT / GUARDIAN INFORMATION</h1>
            <div className="w-full h-px bg-slate-300"></div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#334155]">
                Parent Name <span className="text-red-400">*</span>
              </label>
              <input
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#334155]">
                Parent Phone <span className="text-red-400">*</span>
              </label>
              <input
                name="parentPhoneNo"
                value={formData.parentPhoneNo}
                onChange={handleChange}
                className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* STATUS */}

          <div className="space-y-2 mt-8">
            <h1 className="text-sm text-slate-500 font-medium">STATUS & ACCOMMODATION</h1>
            <div className="w-full h-px bg-slate-300"></div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <ToggleCard
              label="Hosteller"
              description="Is the student staying in hostel?"
              checked={formData.hosteller}
              icon={Bed}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  hosteller: value,
                }))
              }
            />

            <ToggleCard
              label="Active Student"
              description="Is the student currently active?"
              checked={formData.isActive}
              icon={UserCheck}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  isActive: value,
                }))
              }
            />
          </div>

          {/* SUBMIT */}

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-[#E2E8F0] rounded-xl text-sm cursor-pointer"
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
                  Updated Successfully
                </>
              ) : (
                'Update Student'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
