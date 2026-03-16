import { useState } from 'react'
import Logo from '../../assets/Logo.svg'
import { GraduationCap } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import api from '../../services/api'
import { useNavigate } from 'react-router'
import type { User } from '../../store/authStore'
import { Spinner } from '@/components/common/Spinner'

interface LoginResponse {
  data: User
}

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError('')

      const res = await api.post<LoginResponse>('/api/auth/login', {
        email,
        password,
      })

      const user: User = res.data.data

      login(user)

      const dashboardRoutes = {
        ADMIN: '/admin/dashboard',
        FACULTY: '/faculty/dashboard',
        STUDENT: '/student/dashboard',
      }

      const route = dashboardRoutes[user.role]

      if (!route) {
        throw new Error('Invalid user role')
      }

      navigate(route)
    } catch (err: any) {
      console.log(err)
      console.log(err.response)

      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-[2000px] mx-auto w-full h-screen bg-slate-300">
      {/* Header */}
      <div className="flex justify-between items-center h-16 border-b bg-white border-gray-300 px-6">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Logo" />
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-[#1E293B]">GEC Sheikhpura</span>
            <span className="text-[10px] text-[#94A3B8]">ADMIN PANEL</span>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center w-lg bg-white rounded-2xl py-10 shadow-lg">
          <GraduationCap size={60} className="mb-3 bg-[#0B3D93]/10 p-2 rounded-full" />

          <h1 className="font-bold text-2xl">Academic ERP Portal</h1>

          {/* Email */}
          <div className="flex flex-col gap-2 w-full px-10 pt-5">
            <label>Email Address</label>
            <input
              type="email"
              required
              value={email}
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="bg-[#F8FAFC] p-3 rounded-xl"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 w-full px-10 pt-7">
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-[#F8FAFC] p-3 rounded-xl"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm pt-4">{error}</p>}

          {/* Button */}
          <div className="flex flex-col gap-2 w-full px-10 pt-7">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-900 p-3 rounded-xl text-white flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Spinner />
                  <span>Signing In...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
