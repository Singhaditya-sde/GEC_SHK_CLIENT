import { useState, } from 'react'
import Logo from '../../assets/Logo.svg'
import { GraduationCap } from 'lucide-react'
import { useAuthStore } from '../../store/authStore';
import api from '../../services/api';
import { useNavigate } from 'react-router';

export const LoginPage = () => {
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const login = useAuthStore((state) => state.login);


  const navigate = useNavigate();
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await api.post("/api/auth/login", {
  email,
  password,
});

    const user = res.data.data.user;

    login(user);

    if (user.role === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (user.role === "FACULTY") {
      navigate("/faculty/dashboard");
    } else {
      navigate("/student/dashboard");
    }

  } catch (error: any) {
    console.log(error.response?.data?.message);
  }
};
  return(
    <div className='w-full h-screen  bg-slate-300'>
      {/*Logo + Title section*/}
        <div className="flex justify-between items-center h-16 border-b bg-white border-gray-300 px-6">
          <div className="flex justify-center items-center gap-3 h-16  ">
            <div className="">
              <img src={Logo} alt="Logo" className="" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-[#1E293B]">GEC Sheikhpura</span>
              <span className="text-[10px] text-[#94A3B8]">ADMIN PANEL</span>
            </div>
          </div>
          <div className='flex justify-evenly gap-3 text-sm'>
            <button>Help</button>
            <p>|</p>
            <button>Contact</button>
          </div>
        </div>
        {/*Login Card Section*/}
        <form 
        onSubmit={handleSubmit}
        className="min-h-screen flex justify-center items-center ">
          <div className="flex flex-col items-center justify-center  w-lg h-3xl bg-white  rounded-2xl py-10 shadow-lg">
            <GraduationCap size={60} className='mb-3 bg-[#0B3D93]/10 p-2 rounded-full' />
            <h1 className="font-bold text-2xl">Academic ERP Portal</h1>
            <p className='text-sm text-[#64748B]'>Sign in to access your dashboard</p>
            <div className='flex flex-col gap-2 w-full px-10 pt-5'>
              <label>Email Address</label>
              <input
                type='email'
                name='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter Your Email'
                className='bg-[#F8FAFC] p-3 rounded-xl text-[#334155]'
              />
              {error && (
                <p className="text-red-500 text-sm px-10 pt-3">
                  {error}
                </p>
              )}
            </div>
            <div className='flex flex-col gap-2 w-full px-10 pt-7'>
              <label>Password</label>
              <input
                type='password'
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                name='password'
                placeholder='Password'
                className='bg-[#F8FAFC] p-3 rounded-xl text-[#334155]'
              />
              {error && (
                <p className="text-red-500 text-sm px-10 pt-3">
                  {error}
                </p>
              )}
            </div>
            
            <div className='flex flex-col gap-2 w-full px-10 pt-7'>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-900 p-3 w-full rounded-xl px-10 text-white disabled:opacity-60"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </div>
        </form>

    </div>
  )
}