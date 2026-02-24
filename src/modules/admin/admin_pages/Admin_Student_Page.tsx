import { UserPlus } from 'lucide-react'
import { useState } from 'react'
import { ToggleCard } from '../../../components/ToggleCard'
import { Bed, Check, RotateCcw, Rocket , CheckCircle } from 'lucide-react'
import { Link } from 'react-router'
import { registerSingleStudent } from '../../../services/student'
import type { StudentFormData, StudentRegisterInput } from "@/types/student"

// export interface StudentFormDataProp {
//   name: string
//   phoneNo: string
//   gender: 'Male' | 'Female' | 'Prefer Not to Say' | ''
//   rollNo: string
//   regNo: string
//   section: string
//   admissionType: string
//   admissionDate: string
//   parentName: string
//   parentPhoneNo: string
//   isHosteller: boolean
//   isActive: boolean
//   email: string
//   department: string
//   semester: string
// }
function mapFormToPayload(
  form: StudentFormData
): StudentRegisterInput {
  return {
    email: form.email,
    password: form.password,
    name: form.name,
    phoneNo: form.phoneNo,
    parentName: form.parentName,
    parentPhoneNo: form.parentPhoneNo,
    rollNo: form.rollNo,
    regNo: form.regNo,
    gender: form.gender as "MALE" | "FEMALE" | "TRANSGENDER",
    hosteller: form.hosteller,
    admissionType: form.admissionType as "REGULAR" | "LATERAL_ENTRY",
    admissionDate: new Date(form.admissionDate),
    deptId: form.deptId,
    semId: form.semId,
    batchId: form.batchId,
  }
}

export function AdminStudentPage() {
const initialFormState: StudentFormData = {
  email: "",
  password: "",
  rollNo: "",
  regNo: "",
  name: "",
  parentName: "",
  parentPhoneNo: "",
  phoneNo: "",
  gender: "",
  hosteller: false,
  admissionDate: "",
  admissionType: "",
  deptId: 0,
  semId: 0,
  batchId: 0,
};

  const [formData, setFormData] = useState(initialFormState)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof StudentFormData, string>>>({})

  //function for Vlaidation of the from feilds
  function validateForm(): boolean {
    const newErrors: Partial<Record<keyof StudentFormData, string>> = {}

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
    // if (!formData.section) {
    //   newErrors.section = 'Section is required'
    // }
    if (formData.deptId === 0) {
      newErrors.deptId = 'Department is required'
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
    if (formData.semId === 0) {
    newErrors.semId = 'Semester is required'
    }

    if (formData.batchId === 0) {
      newErrors.batchId = 'Batch is required'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // for handle change in form
  function handleChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) {
  const { name, value, type } = e.target

  setFormData((prev) => ({
    ...prev,
    [name]:
      name === "deptId" ||
      name === "semId" ||
      name === "batchId"
        ? Number(value)
        : type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value,
  }))
}

  // for handle the form summit
  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault()

  //   const isValid = validateForm()
  //   if (!isValid) return

  //   try {
  //     setLoading(true)

  //     const data = await registerSingleStudent(formData)

  //     console.log("Student registered:", data)

  //     setFormData(initialFormState)

  //   } catch (error: any) {
  //     console.error("Submission failed:", error.response?.data || error.message)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()

  if (!validateForm()) return

  try {
    setLoading(true)
    setSuccess(false)

    const payload = mapFormToPayload(formData)

    console.log("Sending Payload:", payload)

    await registerSingleStudent(payload)

    console.log("Student registered successfully")

    setSuccess(true)
    setFormData(initialFormState)

    setTimeout(() => {
      setSuccess(false)
    }, 4000);

  } catch (error: any) {
    console.error("Submission failed:", error.response?.data)
    setSuccess(false)
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
                  ${errors.phoneNo ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                />
                {errors.phoneNo && <p>{errors.phoneNo}</p>}
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
                  ${errors.email ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                />
                {errors.email && <p>{errors.email}</p>}
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
                  ${errors.gender ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="TRANSGENDER">Transgender</option>
                </select>
                {errors.gender && <p>{errors.gender}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#334155]">
                  Batch Id <span className="text-red-400">*</span>
                </label>
                <select
                  id="batchId"
                  name="batchId"
                  value={formData.batchId}
                  onChange={handleChange}
                  className={`border bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none 
                  ${errors.batchId ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                >
                  <option value="0">Select Batch</option>
                  <option value="1">2023-2027</option>
                  <option value="1">2024-2028</option>
                </select>
                {errors.batchId && <p>{errors.batchId}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#334155]">Password <span className="text-red-400">*</span></label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`border bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none
                  ${errors.password ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                />
                {errors.password && <p>{errors.password}</p>}
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
                  ${errors.rollNo ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                />
                {errors.rollNo && <p>{errors.rollNo}</p>}
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
                  ${errors.regNo ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                />
                {errors.regNo && <p>{errors.regNo}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#334155]">
                  Sem Id <span className="text-red-400">*</span>
                </label>
                <select
                  id="semId"
                  name="semId"
                  value={formData.semId}
                  onChange={handleChange}
                  className={`border bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none 
                  ${errors.semId ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                >
                  <option value="0">Select Semester</option>
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                  <option value="1">Semester 3</option>
                  <option value="2">Semester 4</option>
                  <option value="1">Semester 5</option>
                  <option value="2">Semester 6</option>
                  <option value="1">Semester 7</option>
                  <option value="2">Semester 8</option>
                </select>
                {errors.semId && <p>{errors.semId}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#334155]">
                  Department <span className="text-red-400">*</span>
                </label>
                <select
                  id="deptId"
                  name="deptId"
                  value={formData.deptId}
                  onChange={handleChange}
                  className={`border bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none 
                  ${errors.deptId ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                >
                  <option value="0">Select Department</option>
                  <option value="1">105 (CSE)</option>
                  <option value="104">104 (ECE)</option>
                  <option value="101">101 (EE)</option>
                  <option value="102">102 (ME)</option>
                  <option value="103">103 (CE)</option>
                </select>
                {errors.deptId && <p>{errors.deptId}</p>}
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
                  ${errors.admissionType ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                >
                  <option value="">Select Admission Type</option>
                  <option value="REGULAR">Regular</option>
                  <option value="LATERAL_ENTRY">Lateral Entry</option>
                </select>
                {errors.admissionType && <p>{errors.admissionType}</p>}
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
                  ${errors.admissionDate ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                />
                {errors.admissionDate && <p>{errors.admissionDate}</p>}
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
                  ${errors.parentName ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                />
                {errors.parentName && <p>{errors.parentName}</p>}
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
                  ${errors.parentPhoneNo ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                />
                {errors.parentPhoneNo && <p>{errors.parentPhoneNo}</p>}
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
                label="hosteller"
                description="Is the student staying in the hostel?"
                checked={formData.hosteller}
                icon={Bed}
                onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  hosteller: value,
                }))
              }
              />
              {/* <ToggleCard
                label="Status Active"
                description="Is the student currently active?"
                icon={ShieldCheck}
                checked={}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: value,
                  }))
                }
              /> */}
            </div>

            <div className="space-y-2 mt-5 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`
                  px-10 py-3 text-white text-sm rounded-2xl flex items-center gap-3 
                  transition-all duration-300 ease-in-out
                  ${success ? "bg-green-600" : "bg-[#0B3D93]"}
                  ${loading ? "opacity-70 cursor-not-allowed" : ""}
                `}
              >
                {loading ? (
                  "Submitting..."
                ) : success ? (
                  <>
                    <CheckCircle size={20} className="animate-scaleIn" />
                    Registered Successfully
                  </>
                ) : (
                  "Register Student"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
