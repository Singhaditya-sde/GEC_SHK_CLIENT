import { ToggleCard } from "@/components/ToggleCard";
import { useState } from "react";
import { ShieldCheck , CheckCircle } from "lucide-react";
import type { FacultyForm } from "@/types/faculty";

export function AdminAddFacultyPage() {

const [loading, setLoading] = useState(false)
const [success, setSuccess] = useState(false)
const [errors, setErrors] = useState<Partial<Record<keyof FacultyForm, string>>>({})

//this is the function for the validate the form
function validateForm(): boolean {
  const newErrors: Partial<Record<keyof FacultyForm, string>> = {}

  if (!formData.name.trim()) {
    newErrors.name = "Full Name is required"
  }

  if (!formData.phoneNo.trim()) {
    newErrors.phoneNo = "Phone Number is required"
  }

  if (!formData.regNo.trim()) {
    newErrors.regNo = "Registration Number is required"
  }

  if (!formData.deptId) {
    newErrors.deptId = "Department is required"
  }

  setErrors(newErrors)

  return Object.keys(newErrors).length === 0
}

// this is function is for the handle the form submit
function handleSubmit(e: React.FormEvent) {
  e.preventDefault()

  if (!validateForm()) return

  setLoading(true)

  setTimeout(() => {
    setLoading(false)
    setSuccess(true)

    // reset after showing success message
    setTimeout(() => {
      setSuccess(false)
      setFormData({
        name: "",
        phoneNo: "",
        regNo: "",
        deptId: "",
        isHOD: false
      })
    }, 2000)

  }, 1000)
}

  const [formData, setFormData] = useState<FacultyForm>({
  name: "",
  phoneNo: "",
  regNo: "",
  deptId: 0,
  isHOD: false
  });

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
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
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
                onChange={(e) =>
                  setFormData({ ...formData, phoneNo: e.target.value })
                }
                className="border bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              {errors.phoneNo && (
                <p className="text-red-500 text-xs mt-1">{errors.phoneNo}</p>
              )}
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
                onChange={(e) =>
                  setFormData({ ...formData, regNo: e.target.value })
                }
                className="border bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              {errors.regNo && (
                <p className="text-red-500 text-xs mt-1">{errors.regNo}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#334155]">
                Department <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.deptId}
                onChange={(e) =>
                  setFormData({ ...formData, deptId: Number(e.target.value) })
                }
                className="border bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="">Select Department</option>
                <option value={1}>CSE</option>
                <option value={2}>EE</option>
                <option value={3}>ECE</option>
                <option value={4}>ME</option>
              </select>
              {errors.deptId && (
                <p className="text-red-500 text-xs mt-1">{errors.deptId}</p>
              )}
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
                onChange={(value) => setFormData({...formData, isHOD: value})}
               />
               {errors.isHOD && (
                <p className="text-red-500 text-xs mt-1">{errors.isHOD}</p>
              )}
            </div>
          </div>

          <div className="space-y-2 mt-5 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`
                  px-10 py-3 text-white text-sm rounded-2xl flex items-center gap-3 
                  transition-all duration-300 ease-in-out cursor-pointer
                  ${success ? "bg-green-600" : "bg-[#0B3D93]"}
                  ${loading ? "opacity-70 cursor-not-allowed" : ""}
                `}
              >
                {loading ? ("Submitting...") : success ? 
                (
                  <> 
                    <CheckCircle size={20} className="animate-scaleIn" /> Registered Successfully
                  </>
                ) : (
                  "Register Faculty"
                )}
              </button>
            </div>
        </form>
      </div> 
  </div>
  )
}
