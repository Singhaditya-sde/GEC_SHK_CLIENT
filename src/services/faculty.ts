import api from "./api";
import type { FacultyForm } from "@/types/faculty";

export async function registerFaculty(data: FacultyForm) {
  const res = await api.post("/api/auth/register/faculty",data)
  return res.data
}