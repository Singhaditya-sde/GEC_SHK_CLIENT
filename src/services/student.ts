import api from "./api"
import type { StudentRegisterInput } from "@/types/student"

export const registerSingleStudent = async (
  data: StudentRegisterInput
) => {
  const response = await api.post(
    "/api/auth/register/student",
    data
  )

  return response.data
}