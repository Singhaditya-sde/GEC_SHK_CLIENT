import api from './api'
import type { StudentRegisterInput } from '@/types/student'

export const registerSingleStudent = async (data: StudentRegisterInput) => {
  const response = await api.post('/api/auth/register/student', data)
  return response.data
}

export const getStudents = async (params?: any) => {
  const res = await api.get("/api/student/" ,{params})
  return res.data.data
}

export const getStudentsForAdmin = async () => {
  const res = await api.get("/api/student/admin")
  return res.data.data
}

export const getStudentById = async (id: number) => {
  const res = await api.get(`/api/student/${id}`)
  return res.data.data
}
