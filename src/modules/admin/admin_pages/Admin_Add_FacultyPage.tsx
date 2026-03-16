import { ToggleCard } from '@/components/ToggleCard'
import { useState } from 'react'
import { ShieldCheck, CheckCircle, AlertCircle } from 'lucide-react'
import type { FacultyForm } from '@/types/faculty'
import { registerFaculty } from '@/services/faculty'
import { Spinner } from '@/components/common/Spinner'

export function AdminAddFacultyPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FacultyForm, string>>>({})
  const [serverError, setServerError] = useState('')
  const [formData, setFormData] = useState<FacultyForm>({
    name: '',
    email: '',
    phoneNo: '',
    regNo: '',
    password: '',
    deptId: 0,
    isHOD: false,

    designation: '',
    publications: 0,
    experience: 0,
    projects: 0,
    skills: '',
    summary: '',
  })

  //this is the function for the validate the form
  function validateForm(): boolean {
    const newErrors: Partial<Record<keyof FacultyForm, string>> = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required'
    }

    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = 'Phone Number is required'
    }

    if (!formData.regNo.trim()) {
      newErrors.regNo = 'Registration Number is required'
    }

    if (!formData.deptId) {
      newErrors.deptId = 'Department is required'
    }

    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required'
    }

    if (!formData.skills.trim()) {
      newErrors.skills = 'Skills are required'
    }

    if (!formData.summary.trim()) {
      newErrors.summary = 'Summary is required'
    }

    if (!formData.experience) {
      newErrors.experience = 'Experience is required'
    }

    if (!formData.publications && formData.publications !== 0) {
      newErrors.publications = 'Publications count required'
    }
    
    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  // this is function is for the handle the form submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setLoading(true)
      setErrors({})
      setServerError('')

      await registerFaculty(formData)

      setSuccess(true)

      setFormData({
        name: '',
        email: '',
        phoneNo: '',
        regNo: '',
        password: '',
        deptId: 0,
        isHOD: false,

        designation: '',
        publications: 0,
        experience: 0,
        projects: 0,
        skills: '',
        summary: '',
      })

      setTimeout(() => {
        setSuccess(false)
      }, 2000)
    } catch (err: any) {
      const message = err.response?.data?.message || 'Internal server error'

      if (message === 'email already exists') {
        setErrors((prev) => ({
          ...prev,
          email: message,
        }))
      } else if (message === 'faculty data already exists') {
        setErrors((prev) => ({
          ...prev,
          regNo: 'Registration number already exists',
        }))
      } else {
        setServerError(message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-5">
      <div>
        <h1 className="text-2xl font-semibold pt-5 text-[#0F172A]">Add New Faculty</h1>
        <p className="text-sm text-[#64748B]">
          Enter Faculty details to create a new record in the system.
        </p>
      </div>

      <div className="bg-white p-5 mt-5 rounded-xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-10 mt-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#334155]">
                Faculty Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Faculty Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full border bg-[#F8FAFC] rounded-xl px-3 py-2 text-md 
                  focus:ring-2 focus:ring-indigo-500 outline-none appearance-none
                  ${errors.name ? 'border-red-500' : 'border-[#E2E8F0]'}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#334155]">
                Faculty Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter the Email"
                value={formData.email}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                  setErrors((prev) => ({ ...prev, email: '' }))
                }}
                className={`w-full border bg-[#F8FAFC] rounded-xl px-3 py-2 text-md 
                  focus:ring-2 focus:ring-indigo-500 outline-none appearance-none
                  ${errors.email ? 'border-red-500' : 'border-[#E2E8F0]'}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 mt-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#334155]">
                Faculty Reg No <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Registration Number"
                value={formData.regNo}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    regNo: e.target.value,
                  }))
                  setErrors((prev) => ({ ...prev, regNo: '' }))
                }}
                className={`w-full border bg-[#F8FAFC] rounded-xl px-3 py-2 text-md 
                  focus:ring-2 focus:ring-indigo-500 outline-none appearance-none
                  ${errors.regNo ? 'border-red-500' : 'border-[#E2E8F0]'}`}
              />
              {errors.regNo && <p className="text-red-500 text-xs mt-1">{errors.regNo}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#334155]">
                Department <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.deptId}
                onChange={(e) => setFormData({ ...formData, deptId: Number(e.target.value) })}
                className={`w-full border bg-[#F8FAFC] rounded-xl px-3 py-2 text-md 
                  focus:ring-2 focus:ring-indigo-500 outline-none appearance-none
                  ${errors.deptId ? 'border-red-500' : 'border-[#E2E8F0]'}`}
              >
                <option value={0}>Select Department</option>
                <option value={1}>CSE</option>
                <option value={2}>EE</option>
                <option value={3}>ECE</option>
                <option value={4}>ME</option>
              </select>
              {errors.deptId && <p className="text-red-500 text-xs mt-1">{errors.deptId}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 mt-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#334155]">
                Phone No <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                placeholder="Enter Phone No"
                pattern="[0-9]{10}"
                maxLength={10}
                value={formData.phoneNo}
                onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                className={`w-full border bg-[#F8FAFC] rounded-xl px-3 py-2 text-md 
                  focus:ring-2 focus:ring-indigo-500 outline-none appearance-none
                  ${errors.phoneNo ? 'border-red-500' : 'border-[#E2E8F0]'}`}
              />
              {errors.phoneNo && <p className="text-red-500 text-xs mt-1">{errors.phoneNo}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#334155]">
                Password <span className="text-red-400">*</span>
              </label>
              <input
                type="password"
                placeholder="Password Min of 8"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full border bg-[#F8FAFC] rounded-xl px-3 py-2 text-md 
                  focus:ring-2 focus:ring-indigo-500 outline-none appearance-none
                  ${errors.password ? 'border-red-500' : 'border-[#E2E8F0]'}`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 mt-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#334155]">
                Designation <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Professor / Associate Professor"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className={`w-full border bg-[#F8FAFC] rounded-xl px-3 py-2 text-md 
                  focus:ring-2 focus:ring-indigo-500 outline-none appearance-none
                  ${errors.designation ? 'border-red-500' : 'border-[#E2E8F0]'}`}
              />
              {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#334155]">
                Publications <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                value={formData.publications}
                onChange={(e) => setFormData({ ...formData, publications: Number(e.target.value) })}
                className={`w-full border bg-[#F8FAFC] rounded-xl px-3 py-2 text-md 
                  focus:ring-2 focus:ring-indigo-500 outline-none appearance-none
                  ${errors.publications ? 'border-red-500' : 'border-[#E2E8F0]'}`}
              />
              {errors.publications && <p className="text-red-500 text-xs mt-1">{errors.publications}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 mt-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#334155]">
                Experience (Years) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
                className={`w-full border bg-[#F8FAFC] rounded-xl px-3 py-2 text-md 
                  focus:ring-2 focus:ring-indigo-500 outline-none appearance-none
                  ${errors.experience ? 'border-red-500' : 'border-[#E2E8F0]'}`}
              />
              {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#334155]">
                Projects <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                value={formData.projects}
                onChange={(e) => setFormData({ ...formData, projects: Number(e.target.value) })}
                className={`w-full border bg-[#F8FAFC] rounded-xl px-3 py-2 text-md 
                  focus:ring-2 focus:ring-indigo-500 outline-none appearance-none
                  ${errors.projects ? 'border-red-500' : 'border-[#E2E8F0]'}`}
              />
              {errors.projects && <p className="text-red-500 text-xs mt-1">{errors.projects}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 mt-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#334155]">
                 Skills (comma separated) <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={4}
                placeholder='AI, Machine Learning, Cloud Computing'
                value={formData.skills}
                onChange={(e) =>
                  setFormData({ ...formData, skills: e.target.value })
                }
                className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl px-3 py-2
                focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#334155]">
                Professional Summary <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={4}
                placeholder='Write Summary'
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl px-3 py-2
                focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              {errors.summary && <p className="text-red-500 text-xs mt-1">{errors.summary}</p>}
            </div>
          </div>

          <div className="grid grid-cols gap-10 mt-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#334155]">
                Assign as HOD <span className="text-red-400">*</span>
              </label>
              <ToggleCard
                label="Mark this faculty as the Head of Department."
                description="Assign this faculty member as the Head of Department for the selected department.
                Only one HOD can be assigned per department."
                checked={formData.isHOD}
                icon={ShieldCheck}
                onChange={(value) => setFormData({ ...formData, isHOD: value })}
              />
              {errors.isHOD && <p className="text-red-500 text-xs mt-1">{errors.isHOD}</p>}
            </div>
          </div>

          <div className="mt-5 flex justify-end items-center gap-4">
            {serverError && (
              <div className="h-[44px] px-6 bg-red-100 text-red-700 text-sm rounded-2xl flex items-center gap-2">
                <AlertCircle size={16} />
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`
                h-[44px] px-10 text-white text-sm rounded-2xl flex items-center gap-3
                transition-all duration-300 ease-in-out cursor-pointer
                ${success ? 'bg-green-600' : 'bg-[#0B3D93]'}
                ${loading ? 'opacity-70 cursor-not-allowed' : ''}
              `}
            >
              {loading ? (
                <>
                  <Spinner />
                  Submitting...
                </>
              ) : success ? (
                <>
                  <CheckCircle size={20} className="animate-scaleIn" />
                  Registered Successfully
                </>
              ) : (
                'Register Faculty'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
