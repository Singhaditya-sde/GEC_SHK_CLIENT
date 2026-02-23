import { UserPlus } from 'lucide-react'
import { useState } from 'react'
import { ToggleCard } from '../../../components/ToggleCard'
import { Bed, ShieldCheck, Check, RotateCcw, Rocket } from 'lucide-react'
import { Link } from 'react-router'

interface StudentFormDataProp {
  name: string
  phoneNo: string
  gender: 'Male' | 'Female' | 'Prefer Not to Say' | ''
  rollNo: string
  regNo: string
  section: string
  admissionType: string
  admissionDate: string
  parentName: string
  parentPhoneNo: string
  isHosteller: boolean
  isActive: boolean
  email: string
  department: string
  Semester: string
}

export function AdminStudentPage() {
  const initialFormState: StudentFormDataProp = {
    name: '',
    phoneNo: '',
    gender: '',
    rollNo: '',
    regNo: '',
    section: '',
    admissionType: '',
    admissionDate: '',
    parentName: '',
    parentPhoneNo: '',
    isHosteller: false,
    isActive: true,
    email: '',
    department: '',
    Semester: '',
  }

  const [formData, setFormData] = useState(initialFormState)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof StudentFormDataProp, string>>>({})

  //function for Vlaidation of the from feilds
  function validateForm(): boolean {
    const newErrors: Partial<Record<keyof StudentFormDataProp, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required'
    }
    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = 'Phone Number is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required'
    }
    if (!formData.rollNo.trim()) {
      newErrors.rollNo = 'Roll Number is required'
    }
    if (!formData.regNo.trim()) {
      newErrors.regNo = 'Registration Number is required'
    }
    if (!formData.section) {
      newErrors.section = 'Section is required'
    }
    if (!formData.department) {
      newErrors.department = 'Department is required'
    }
    if (!formData.admissionType) {
      newErrors.admissionType = 'Admission Type is required'
    }
    if (!formData.admissionDate) {
      newErrors.admissionDate = 'Admission Date is required'
    }
    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Parent Name is required'
    }
    if (!formData.parentPhoneNo.trim()) {
      newErrors.parentPhoneNo = 'Parent Phone is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // for handle change in form
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = e.target
    setFormData((prev) => ({
      ...prev,
      [target.name]:
        target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value,
    }))
  }

  // for handle the form summit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const isValid = validateForm()

    if (!isValid) {
      return
    }

    try {
      setLoading(true)
      console.log('Submitting:', formData)
      // await for create student
      setFormData(initialFormState) // reset only after the submiting
    } catch (error) {
      console.error('Submission failed', error)
    } finally {
      setLoading(false)
    }
  }

  // Function To handle Reset Button
  function handleResetFrom() {
    setFormData(initialFormState)
  }

  return (
    <div className="px-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold pt-5 text-[#0F172A]">Add New Student</h1>
          <p className="text-sm text-[#64748B]">
            Enter student details manually to create a new record in the system.
          </p>
        </div>
        <div className="pt-4">
          <Link
            to="/admin/students/bulk-upload"
            className="px-10 py-3 bg-[#0B3D93] text-white rounded-2xl text-sm flex items-center gap-3 cursor-pointer"
          >
            <Rocket size={18} />
            Bulk Student Upload
          </Link>
        </div>
      </div>

      <div className="bg-white  p-5 mt-5 rounded-xl">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <div className="bg-slate-200 w-12 h-12 flex items-center justify-center rounded-lg">
              <UserPlus size={20} />
            </div>
            <div className="flex flex-col">
              <h2 className="font-semibold text-md text-[#0F172A]">Student Registration Form</h2>
              <p className="text-sm text-[#64748B]">
                Please fill in all mandatory fields marked with *
              </p>
            </div>
          </div>
          <div className="">
            <button
              type="button"
              onClick={handleResetFrom}
              className="flex  items-center gap-3 text-[#64748B] cursor-pointer"
            >
              <RotateCcw size={18} /> Reset
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-3 flex flex-col ">
            <div className="space-y-2 mt-5">
              <h1 className="text-sm text-slate-500 font-medium flex items-center gap-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded-full">1</span>
                PERSONAL INFORMATION
              </h1>
              <div className="w-full h-px bg-slate-300"></div>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#334155]">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`border bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none 
                  ${errors.name ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#334155]">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  id="phoneNo"
                  name="phoneNo"
                  type="number"
                  placeholder="91 - 1234567890"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className={`border bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none 
                  ${errors.name ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#334155]">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`border bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none 
                  ${errors.name ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#334155]">
                  Gender <span className="text-red-400">*</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`border bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none 
                  ${errors.name ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer Not to Say">Prefer Not to Say</option>
                </select>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
            </div>

            <div className="space-y-2 mt-5">
              <h1 className="text-sm text-slate-500 font-medium flex items-center gap-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded-full">2</span>
                ACADEMIC DETAILS
              </h1>
              <div className="w-full h-px bg-slate-300"></div>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#334155]">
                  Roll Number <span className="text-red-400">*</span>
                </label>
                <input
                  id="rollNo"
                  name="rollNo"
                  type="text"
                  placeholder="Enter Roll Number"
                  value={formData.rollNo}
                  onChange={handleChange}
                  className={`border bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none 
                  ${errors.name ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#334155]">
                  Registration Number <span className="text-red-400">*</span>
                </label>
                <input
                  id="regNo"
                  name="regNo"
                  type="number"
                  placeholder="23105157000"
                  value={formData.regNo}
                  onChange={handleChange}
                  className={`border bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none 
                  ${errors.name ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#334155]">
                  Section <span className="text-red-400">*</span>
                </label>
                <select
                  id="section"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  className={`border bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none 
                  ${errors.name ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                >
                  <option value="">Select Section</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#334155]">
                  Department <span className="text-red-400">*</span>
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={`border bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none 
                  ${errors.name ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                >
                  <option value="">Select Department</option>
                  <option value="CSE">Computer Science Engineering (CSE)</option>
                  <option value="ECE">Electronics & Communication Engineering (ECE)</option>
                  <option value="EE">Electrical Engineering (EE)</option>
                  <option value="ME">Mechanical Engineering (ME)</option>
                  <option value="CE">Civil Engineering (CE)</option>
                  <option value="MECH">Mechatronics Engineering (MECH)</option>
                </select>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#334155]">
                  Admission Type <span className="text-red-400">*</span>
                </label>
                <select
                  id="admissionType"
                  name="admissionType"
                  value={formData.admissionType}
                  onChange={handleChange}
                  className={`border bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none 
                  ${errors.name ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                >
                  <option value="">Quata</option>
                  <option value="Regular">Regular</option>
                  <option value="Lateral">Lateral</option>
                </select>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#334155]">
                  Admission Date <span className="text-red-400">*</span>
                </label>
                <input
                  id="admissionDate"
                  name="admissionDate"
                  type="date"
                  value={formData.admissionDate}
                  onChange={handleChange}
                  className={`border bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none 
                  ${errors.name ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
            </div>

            <div className="space-y-2 mt-5">
              <h1 className="text-sm text-slate-500 font-medium flex items-center gap-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded-full">3</span>
                PARENT / GUARDIAN INFORMATION
              </h1>
              <div className="w-full h-px bg-slate-300"></div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#334155]">
                  Parent Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="parentName"
                  name="parentName"
                  type="text"
                  placeholder="Guardian Full Name"
                  value={formData.parentName}
                  onChange={handleChange}
                  className={`border bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none 
                  ${errors.name ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#334155]">
                  Parent Phone <span className="text-red-400">*</span>
                </label>
                <input
                  id="parentPhoneNo"
                  name="parentPhoneNo"
                  type="number"
                  placeholder="91 - 1234567890"
                  value={formData.parentPhoneNo}
                  onChange={handleChange}
                  className={`border bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none 
                  ${errors.name ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
            </div>

            <div className="space-y-2 mt-5">
              <h1 className="text-sm text-slate-500 font-medium flex items-center gap-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded-full">4</span>
                STATUS & ACCOMODATION
              </h1>
              <div className="w-full h-px bg-slate-300"></div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-3">
              <ToggleCard
                label="Hosteller"
                description="Is the student staying in the hostel?"
                checked={formData.isHosteller}
                icon={Bed}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    isHosteller: value,
                  }))
                }
              />
              <ToggleCard
                label="Status Active"
                description="Is the student currently active?"
                icon={ShieldCheck}
                checked={formData.isActive}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: value,
                  }))
                }
              />
            </div>

            <div className="space-y-2 mt-5 flex justify-end ">
              <button
                type="submit"
                disabled={loading}
                className="px-10 py-3 bg-[#0B3D93] text-white text-sm rounded-2xl flex items-center gap-3 cursor-pointer"
              >
                <Check size={19} /> {loading ? 'Submitting...' : 'Register Student'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
