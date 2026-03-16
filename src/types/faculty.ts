export interface FacultyForm {
  name: string
  email: string
  phoneNo: string
  regNo: string
  password: string
  deptId: number
  isHOD: boolean

  designation: string
  publications: number
  experience: number
  projects: number
  skills: string
  summary: string
}

export interface Faculty {
  id: number
  name: string
  designation: string
  contact: number
  email: string
  department: string
  publications: number
  experience: number
  projects: number
  skills: string
  summary: string
}
