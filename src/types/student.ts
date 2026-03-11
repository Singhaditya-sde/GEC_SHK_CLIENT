// Used for FORM STATE (UI layer)
export interface StudentFormData {
  email: string
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

// This is for the Student Directory
export interface StudentDirectoryProp {
  id: number;
  name: string;
  phoneNo: string;
  parentName: string;
  parentPhoneNo: string;
  rollNo: string;
  regNo: string;
  section: string;
  gender: "MALE" | "FEMALE";
  hosteller: boolean;
  admissionType: "REGULAR" | "LATERAL";
  admissionDate: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  userId: number;
  deptId: number;
  semId: number;
  batchId: number;
}