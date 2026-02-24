// Used for FORM STATE (UI layer)
export interface StudentFormData {
  email: string
  password: string
  rollNo: string
  regNo: string
  name: string
  parentName: string
  parentPhoneNo: string
  phoneNo: string
  gender: "MALE" | "FEMALE" | "TRANSGENDER" | ""
  hosteller: boolean
  admissionType: "REGULAR" | "LATERAL_ENTRY" | ""
  admissionDate: string   // 🔥 string for input type="date"
  deptId: number
  semId: number
  batchId: number
}


// Used for BACKEND REQUEST (API layer)
export type StudentRegisterInput = {
  email: string
  password: string
  name: string
  phoneNo: string
  parentName: string
  parentPhoneNo: string
  rollNo: string
  regNo: string
  gender: "MALE" | "FEMALE" | "TRANSGENDER"
  hosteller: boolean
  admissionType: "REGULAR" | "LATERAL_ENTRY"
  admissionDate: Date   // 🔥 backend expects Date
  deptId: number
  semId: number
  batchId: number
}