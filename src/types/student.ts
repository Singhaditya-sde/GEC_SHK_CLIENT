export interface StudentFormData {
  email: string
  rollNo: string
  regNo: string
  name: string
  parentName: string
  parentPhoneNo: string
  phoneNo: string
  gender: 'MALE' | 'FEMALE' | 'TRANSGENDER' | ''
  hosteller: boolean
  admissionType: 'REGULAR' | 'LATERAL_ENTRY' | ''
  admissionDate: string 
  deptId: number
  semId: number
  batchId: number
}

export type StudentRegisterInput = {
  email: string
  name: string
  phoneNo: string
  parentName: string
  parentPhoneNo: string
  rollNo: string
  regNo: string
  gender: 'MALE' | 'FEMALE' | 'TRANSGENDER'
  hosteller: boolean
  admissionType: 'REGULAR' | 'LATERAL_ENTRY'
  admissionDate: string 
  deptId: number
  semId: number
  batchId: number
}


export interface StudentDirectoryProp {
  id: number
  name: string
  email: string
  phoneNo: string
  parentName: string
  parentPhoneNo: string
  rollNo: string
  regNo: string
  section: string
  gender: 'MALE' | 'FEMALE'
  hosteller: boolean
  admissionType: 'REGULAR' | 'LATERAL'
  admissionDate: string
  createdAt: string
  updatedAt: string
  isActive: boolean
  userId: number
  deptId: number
  semId: number
  batchId: number
}


export type Course = {
  id: number
  title: string
}

export type Offering = {
  course: Course
}

export type Enrollment = {
  offering: Offering
}

export type Assessment = {
  courseId: number
  courseTitle: string
  componentName: string
  maxMarks: number
  marks: number | null
}

export type Department = {
  id: number
  deptCode: string
  name: string
}

export type Semester = {
  id: number
  number: number
}

export type User = {
  id: number
  email: string
}

export type Batch = {
  startYear: number
  endYear: number
}

export type StudentProfile = {
  id: number
  name: string
  phoneNo: string
  parentName: string
  parentPhoneNo: string
  rollNo: string
  regNo: string
  section: string
  hosteller: boolean
  admissionDate: string
  admissionType: string
  cgpa: string | number

  dept: Department
  sem: Semester
  user: User
  batch: Batch

  enrollment: Enrollment[]
}