import { useState } from "react";

export function AdminAddFacultyPage() {

  const [formData, setFormData] = useState({
  name: "",
  phoneNo: "",
  regNo: "",
  deptId: "",
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
        <form>
          <div className="grid grid-cols-2 gap-6 mt-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#334155]">
                Full Name <span className="text-red-400">*</span>
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
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#334155]">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phoneNo}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNo: e.target.value })
                }
                className="border bg-[#F8FAFC] rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#334155]">
                Full Name <span className="text-red-400">*</span>
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
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#334155]">
                Full Name <span className="text-red-400">*</span>
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
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#334155]">
                Full Name <span className="text-red-400">*</span>
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
            </div>
          </div>
        </form>
      </div> 
  </div>
  )
}
