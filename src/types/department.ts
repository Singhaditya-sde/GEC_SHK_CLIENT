export type DepartmentCardProps = {
  id: number
  name: string
  school: string
  status? : "ACTIVE" | "INACTIVE"
  hod: string
  faculty: number
  students: number
  headerColor: string
  className?: string
}

export type FacultyMember = {
  id: number
  name: string
  role: string
  specialization: string
  email: string
}

export type Lab = {
  id: number
  name: string
  desc: string
  room: string
}

export type Department = {
  id: number
  name: string
  school: string
  status: "ACTIVE" | "INACTIVE"
  hod: string
  faculty: number
  students: number
  research: number
  placementRate: string
  headerColor: string
  facultyList: FacultyMember[]
  labs: Lab[]
}