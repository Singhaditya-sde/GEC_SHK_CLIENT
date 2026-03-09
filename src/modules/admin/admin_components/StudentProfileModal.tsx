import type { StudentDirectoryProp } from "@/types/student"

interface StudentProfileModalProps {
  student: StudentDirectoryProp | null
  onClose: () => void
}

export function StudentProfileModal({ student, onClose }: StudentProfileModalProps) {
  if (!student) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="bg-white w-[550px] rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800">
            Student Profile
          </h2>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-red-500 text-sm"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">

          <div>
            <p className="text-slate-400 text-xs">Name</p>
            <p className="font-medium text-slate-800">{student.name}</p>
          </div>

          <div>
            <p className="text-slate-400 text-xs">Roll No</p>
            <p className="font-medium text-slate-800">{student.rollNo}</p>
          </div>

          <div>
            <p className="text-slate-400 text-xs">Registration No</p>
            <p className="font-medium text-slate-800">{student.regNo}</p>
          </div>

          <div>
            <p className="text-slate-400 text-xs">Phone</p>
            <p className="font-medium text-slate-800">{student.phoneNo}</p>
          </div>

          <div>
            <p className="text-slate-400 text-xs">Parent Name</p>
            <p className="font-medium text-slate-800">{student.parentName}</p>
          </div>

          <div>
            <p className="text-slate-400 text-xs">Parent Phone</p>
            <p className="font-medium text-slate-800">{student.parentPhoneNo}</p>
          </div>

          <div>
            <p className="text-slate-400 text-xs">Section</p>
            <p className="font-medium text-slate-800">{student.section}</p>
          </div>

          <div>
            <p className="text-slate-400 text-xs">Gender</p>
            <p className="font-medium text-slate-800">{student.gender}</p>
          </div>

          <div>
            <p className="text-slate-400 text-xs">Hosteller</p>
            <p className="font-medium text-slate-800">
              {student.hosteller ? "Yes" : "No"}
            </p>
          </div>

          <div>
            <p className="text-slate-400 text-xs">Admission Type</p>
            <p className="font-medium text-slate-800">{student.admissionType}</p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg bg-slate-900 text-white hover:bg-slate-700 transition"
          >
            Close
          </button>
        </div>

      </div>

    </div>
  )
}