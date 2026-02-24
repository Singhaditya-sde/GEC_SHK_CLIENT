import { useState } from 'react'
import Logo from '../../assets/Logo.svg'
import { GraduationCap } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import api from '../../services/api'
import { useNavigate } from 'react-router'

export const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError("")

      const res = await api.post("/api/auth/login", {
        email,
        password,
      })

      // ✅ Your backend returns: res.data.data.user
      const user = res.data.data.user

      // ✅ Correct login call
      login(user)

      if (user.role === "ADMIN") {
        navigate("/admin/dashboard")
      } else if (user.role === "FACULTY") {
        navigate("/faculty/dashboard")
      } else {
        navigate("/student/dashboard")
      }

    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-[1500px] mx-auto w-full h-screen bg-slate-300'>
      
      {/* Header */}
      <div className="flex justify-between items-center h-16 border-b bg-white border-gray-300 px-6">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Logo" />
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-[#1E293B]">
              GEC Sheikhpura
            </span>
            <span className="text-[10px] text-[#94A3B8]">
              ADMIN PANEL
            </span>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <form 
        onSubmit={handleSubmit}
        className="min-h-screen flex justify-center items-center"
      >
        <div className="flex flex-col items-center w-lg bg-white rounded-2xl py-10 shadow-lg">

          <GraduationCap
            size={60}
            className='mb-3 bg-[#0B3D93]/10 p-2 rounded-full'
          />

          <h1 className="font-bold text-2xl">
            Academic ERP Portal
          </h1>

          {/* Email */}
          <div className='flex flex-col gap-2 w-full px-10 pt-5'>
            <label>Email Address</label>
            <input
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter Your Email'
              className='bg-[#F8FAFC] p-3 rounded-xl'
            />
          </div>

          {/* Password */}
          <div className='flex flex-col gap-2 w-full px-10 pt-7'>
            <label>Password</label>
            <input
              type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className='bg-[#F8FAFC] p-3 rounded-xl'
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm pt-4">
              {error}
            </p>
          )}

          {/* Button */}
          <div className='flex flex-col gap-2 w-full px-10 pt-7'>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-900 p-3 rounded-xl text-white disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>

        </div>
      </form>
    </div>
  )
}