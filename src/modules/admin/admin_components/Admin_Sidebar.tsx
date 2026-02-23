import Logo from '../../../assets/Logo.svg'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  BookUser,
  LogOut,
  type LucideIcon,
} from 'lucide-react'
import { NavLink } from 'react-router'

export interface SideBarMenuProp {
  id: string
  title: string
  path: string
  icon: LucideIcon
}

const SideBarMenu: SideBarMenuProp[] = [
  { id: 'menu', title: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { id: 'menu', title: 'Students', path: '/admin/students', icon: Users },
  { id: 'menu', title: 'Faculty', path: '/admin/faculty', icon: GraduationCap },
  { id: 'menu', title: 'Departments', path: '/admin/departments', icon: Building2 },
  { id: 'menu', title: 'Directory', path: '/admin/directory', icon: BookUser },
]

export function Admin_Sidebar() {
  const handleLogOut = (): void => {
    console.log('Log_Out')
  }
  return (
    <div className="flex flex-col justify-between w-64 h-full border-r border-gray-300">
      <div>
        {/*Logo + Title section*/}
        <div className="flex justify-between items-center h-16 border-b border-gray-300">
          <div className="flex justify-center items-center gap-3 h-16 px-6 ">
            <div className="">
              <img src={Logo} alt="Logo" className="" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-[#1E293B]">GEC Sheikhpura</span>
              <span className="text-[10px] text-[#94A3B8]">ADMIN PANEL</span>
            </div>
          </div>
        </div>
        {/*Logo + Title section*/}

        {/*Sidebar Menu section*/}
        <div className="flex flex-col gap-3 p-5">
          {SideBarMenu.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-1.5 rounded-md transition-all
                  ${
                    isActive
                      ? 'bg-[#0B3D93]/10 text-[#0B3D93]'
                      : 'text-[#475569] hover:bg-[#0B3D93]/10'
                  }`
                }
              >
                <Icon size={18} />
                <p className="text-base ">{item.title}</p>
              </NavLink>
            )
          })}
        </div>
        {/*Sidebar Menu section*/}
      </div>

      {/*Profile section*/}
      <div className="px-5 py-3 bg-[#F1F5F9] border-t border-gray-300">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-[#1E293B]">Dr. Ak Sinha</span>
            <span className="text-[12px] text-[#94A3B8]">Super Admin</span>
          </div>
          <button
            onClick={handleLogOut}
            className="text-[#94A3B8] hover:text-[#DC2626] transition cursor-pointer"
          >
            <LogOut size={19} />
          </button>
        </div>
      </div>
      {/*Profile section*/}
    </div>
  )
}
