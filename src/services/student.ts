// import api from "./api"
// import type { StudentFormData } from "@/types/student"

// export const registerSingleStudent = async (
//   data: StudentFormData
// ) => {
//   const token = localStorage.getItem("token")

//   const response = await api.post(
//     "/api/auth/register/student",
//     data,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   )

//   return response.data
// }

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