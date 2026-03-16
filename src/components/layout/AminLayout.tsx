import { Outlet } from 'react-router'
import { Admin_Sidebar } from '@/modules/admin/admin_components/common/Admin_Sidebar'
import { Admin_TopBar } from '@/modules/admin/admin_components/common/Admin_TopBar'

export function AdminLayout() {
  return (
    <div className="min-h-dvh bg-[#F8FAFC]">
      <div className="flex max-w-[2000px] mx-auto w-full h-dvh overflow-hidden border-x border-slate-200">
        <Admin_Sidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Admin_TopBar />

          <main id="main-content" className="bg-[#E2E8F0] flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
