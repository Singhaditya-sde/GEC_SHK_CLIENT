import { useParams } from "react-router"
import { useState } from "react"
import { departments } from "@/data/departments"
import type { Department, Lab } from "@/types/department"
import {
  Info,
  FlaskConical,
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react"


export default function DepartmentEditPage() {
  const { id } = useParams()
  const department = departments.find((d) => d.id === Number(id))
  if (!department) {
    return <p className="p-6 text-red-500">Department not found</p>
  }

  const [activeTab, setActiveTab] = useState<"general" | "labs">("general")
  const [formData, setFormData] = useState<Department>(department)
  const [showLabModal, setShowLabModal] = useState(false)
  const [editingLab, setEditingLab] = useState<Lab | null>(null)
  const [originalData] = useState<Department>(department!)
  const [labForm, setLabForm] = useState<Lab>({
    id: 0,
    name: "",
    desc: "",
    room: "",
  })

  const isDirty = JSON.stringify(formData) !== JSON.stringify(originalData)

  function handleDiscard() {
    setFormData(originalData)
  }

  function handleSave() {
    console.log("Updated Department:", formData)

    // later you will call API
    // await updateDepartment(id, formData)
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleLabChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setLabForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function openRegisterLab() {
    setEditingLab(null)
    setLabForm({
      id: Date.now(),
      name: "",
      desc: "",
      room: "",
    })
    setShowLabModal(true)
  }

  function openEditLab(lab: Lab) {
    setEditingLab(lab)
    setLabForm(lab)
    setShowLabModal(true)
  }

  function saveLab() {
    if (editingLab) {
      setFormData((prev) => ({
        ...prev,
        labs: prev.labs.map((l) => (l.id === labForm.id ? labForm : l)),
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        labs: [...prev.labs, labForm],
      }))
    }
    setShowLabModal(false)
  }

  function deleteLab(id: number) {
    setFormData((prev) => ({
      ...prev,
      labs: prev.labs.filter((l) => l.id !== id),
    }))
  }


  return (
    <div className="px-5 space-y-5">
      {/* HEADER */}
      <div className="flex justify-between items-center pt-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#0F172A]">
            {formData.name}
          </h1>
          <p className="text-sm text-[#64748B]">
            Departments › {formData.school}
          </p>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={handleDiscard}
            className="px-5 py-2 border rounded-lg text-sm text-slate-600 cursor-pointer">
              Discard
          </button>
          <button
            disabled={!isDirty}
            onClick={handleSave}
            className={`px-5 py-2 rounded-lg text-sm text-white ${
              isDirty ? "bg-[#0B3D93]" : "bg-slate-400 cursor-not-allowed"
            }`}
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* TABS */}

      <div className="flex border-b border-slate-200 text-sm gap-5">
        <button
          onClick={() => setActiveTab("general")}
          className={`px-4 py-3 flex items-center gap-2 border-b-2 cursor-pointer ${
            activeTab === "general"
              ? "border-blue-600 text-blue-700"
              : "text-slate-500"
          }`}
        >
          <Info size={16} />
          General Information 
        </button>

        <button
          onClick={() => setActiveTab("labs")}
          className={`px-4 py-3 flex items-center gap-2 border-b-2 cursor-pointer ${
            activeTab === "labs"
              ? "border-blue-600 text-blue-700"
              : "text-slate-500"
          }`}
        >
          <FlaskConical size={16} />
          Department Labs
        </button>

      </div>

      {/* GENERAL INFO */}

      {activeTab === "general" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="py-5">
          <h2 className="text-lg font-semibold text-[#0F172A]">
            Computer Science Core details
          </h2>
          <p className="text-sm text-[#64748B]">
            Manage department laboratories and resources
          </p>
        </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase text-[#334155] font-semibold">
                Department Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl px-3 py-2"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase text-[#334155] font-semibold">
                School
              </label>
              <input
                name="school"
                value={formData.school}
                onChange={handleChange}
                className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl px-3 py-2"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase text-[#334155] font-semibold">
                Head of Department
              </label>

              <select
                name="hod"
                value={formData.hod}
                onChange={handleChange}
                className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl px-3 py-2 text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
              >
                {formData.facultyList.map((faculty) => (
                  <option key={faculty.id} value={faculty.name}>
                    {faculty.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* LAB DASHBOARD */}

      {activeTab === "labs" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-[#0F172A]">
                Lab Operations Dashboard
              </h2>
              <p className="text-sm text-[#64748B]">
                Manage department laboratories and resources
              </p>
            </div>

            <div className="flex">
              <button
                onClick={openRegisterLab}
                className="flex items-center gap-2 px-4 py-2 bg-[#0B3D93] text-white rounded-lg text-sm cursor-pointer"
              >
                <Plus size={16} />
                Register Lab
              </button>
            </div>
          </div>

          {/* LAB TABLE */}

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-3 text-left">Lab Name</th>
                  <th className="px-5 py-3 text-left">Room</th>
                  <th className="px-5 py-3 text-left">Description</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {formData.labs.map((lab) => (
                  <tr key={lab.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-medium">
                      {lab.name}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {lab.room}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {lab.desc}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-3">
                        <Pencil
                          size={16}
                          className="cursor-pointer"
                          onClick={() => openEditLab(lab)}
                        />
                        <Trash2
                          size={16}
                          className="cursor-pointer text-red-500"
                          onClick={() => deleteLab(lab.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* LAB MODAL */}

      {showLabModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[480px] space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">
                {editingLab ? "Edit Lab" : "Register Lab"}
              </h3>
              <X
                size={18}
                className="cursor-pointer"
                onClick={() => setShowLabModal(false)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Lab Name</label>
              <input
                name="name"
                value={labForm.name}
                onChange={handleLabChange}
                className="border rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Room</label>
              <input
                name="room"
                value={labForm.room}
                onChange={handleLabChange}
                className="border rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Description</label>
              <textarea
                name="desc"
                value={labForm.desc}
                onChange={handleLabChange}
                className="border rounded-lg px-3 py-2"
              />
            </div>
            <button
              onClick={saveLab}
              className="w-full bg-[#0B3D93] text-white py-2 rounded-lg cursor-pointer"
            >
              Save Lab
            </button>
          </div>
        </div>
      )}
    </div>
  )
}