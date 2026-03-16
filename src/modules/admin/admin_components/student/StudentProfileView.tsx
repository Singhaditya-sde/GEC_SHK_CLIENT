import { useParams, Link } from 'react-router'
import { GraduationCap, Users } from 'lucide-react'
import { BatchCard } from '../batch/BatchCard'
import { useEffect, useState } from 'react'
import { getStudentById } from '@/services/studentApi'
import { Spinner } from '@/components/ui common/Spinner'
import type { StudentProfile, Enrollment, Assessment } from "@/types/student"




export default function StudentProfileView() {
  
  const { id } = useParams()
  const [student, setStudent] = useState<StudentProfile | null>(null)
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
  const fetchStudent = async () => {
    try {
      const data = await getStudentById(Number(id))

      setStudent(data.student)
      setAssessments(data.studentAssessment || [])
    } catch (error) {
      console.error("Failed to fetch student", error)
    } finally {
      setLoading(false)
    }
  }

  fetchStudent()
}, [id])

  const StudentProfilePageStats = [
    {
      id: 'cgpa',
      icon: GraduationCap,
      iconColor: '#0B3D93',
      iconBgColor: 'rgba(11, 61, 147, 0.1)',
      title: 'CGPA',
      value: student?.cgpa ?? "N/A",
    },
    {
      id: 'attendance',
      icon: Users,
      iconColor: '#4F46E5',
      iconBgColor: 'rgba(79, 70, 229, 0.1)',
      title: 'Attendance',
      value: '80%',
    },
  ]

const results =
  student?.enrollment?.map((e: Enrollment) => {
    const courseId = e.offering.course.id

    const assessment = assessments.find(
      (a: Assessment) => a.courseId === courseId
    )

    return {
      id: courseId,
      subject: e.offering.course.title,
      score: assessment?.marks ?? "N/A",
      maxmarks: assessment?.maxMarks ?? "N/A",
      component: assessment?.componentName ?? "N/A",
      faculty: "Prof. K. Verma",
      date: "Nov 12, 2023",
    }
  }) ?? []

  if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner size={28}/>
    </div>
  )
}

if (!student) {
  return <div className="p-10 text-red-500">Student Not Found</div>
}
  
  const studentInfo = [
  { id: 1, label: 'Roll Number', value: student.rollNo },
  { id: 2, label: 'Registration Number', value: student.regNo },
  { id: 3, label: 'Email', value: student.user?.email },
  { id: 4, label: 'Phone Number', value: student.phoneNo },
  { id: 5, label: 'Parent Name', value: student.parentName },
  { id: 6, label: 'Parent Phone', value: student.parentPhoneNo },
  { id: 7, label: 'Section', value: student.section },
  { id: 9, label: 'Hosteller', value: student.hosteller ? 'Yes' : 'No' },
  { id: 10, label: 'Admission Type', value: student.admissionType },
  { id: 11, label: 'Admission Date', value: new Date(student.admissionDate).toLocaleDateString() },
  { id: 12, label: 'Batch', value: `${student.batch?.startYear}-${student.batch?.endYear}` },
]

  return (
    <>
      <p className="text-xl font-medium text-[#0F172A] px-5 pt-5">Student Profile</p>
      <div className=" flex gap-5 p-5 ">
        <div className="bg-white rounded-xl shadow p-8 w-full">
          <div className="flex justify-between items-center gap-5 border-b pb-5">
            <div className="flex gap-5">
              <div className="w-30 h-30 rounded-xl bg-[#0B3D93] text-white flex items-center justify-center    text-3xl font-semibold">
                {student.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-semibold">{student.name}</h1>
                <p className="text-gray-500">B.Tech - {student.dept.name}</p>
                <p className="text-gray-500">
                  Semester - {student.sem.number} 
                </p>
                <div className=" flex gap-5">
                  <span className="mt-2 inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                    Batch {student.batch.startYear} - {student.batch.endYear}
                  </span>
                  {/* <span
                    className={`mt-2 inline-block text-xs px-3 py-1 rounded-full ${
                      student.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {student.isActive ? 'ACTIVE' : 'NOT ACTIVE'}
                  </span> */}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 items-center">
              <Link to="edit">
                <button className="w-40 py-3 bg-[#0B3D93] text-white rounded-2xl text-sm font-medium flex items-center justify-center hover:bg-[#0a2f70] transition cursor-pointer">
                  Edit Profile
                </button>
              </Link>
              <Link to="download-report">
                <button className="w-40 py-3 bg-[#E5E9EB] border border-slate-300 text-black rounded-2xl text-sm font-semibold flex items-center justify-center hover:bg-slate-200 transition cursor-pointer">
                  Download Report
                </button>
              </Link>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-y-5 gap-x-12">
            {studentInfo.map((item) => (
              <div key={item.id} className="flex gap-2 text-[15px]">
                <span className="text-[#64748B]">{item.label}:</span>
                <span className="font-medium text-[#0F172A]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-5">
          {StudentProfilePageStats.map(({ id, icon, iconColor, iconBgColor, title, value }) => (
            <BatchCard
              key={id}
              icon={icon}
              iconColor={iconColor}
              iconBgColor={iconBgColor}
              title={title}
              value={value}
              className="py-13"
            />
          ))}
        </div>
      </div>

      <div className="px-5 mb-5">
        <p className="text-xl font-medium text-[#0F172A] pb-5">Recent Performance </p>
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-5 py-3 text-left">Course ID</th>
                <th className="px-5 py-3 text-left">Subject Name</th>
                <th className="px-5 py-3 text-left">Score</th>
                <th className="px-5 py-3 text-left">Faculty</th>
                <th className="px-5 py-3 text-left">Date Released</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {results.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium">{course.id}</td>
                  <td className="px-5 py-4 text-gray-600">{course.subject}</td>
                  <td className="px-5 py-4">{course.score} / {course.maxmarks}</td>
                  <td className="px-5 py-4 text-gray-600">{course.faculty}</td>
                  <td className="px-5 py-4 text-gray-600">{course.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
