import { Settings, BellRing } from 'lucide-react'
import { useLocation } from 'react-router'

export function Admin_TopBar() {
  const location = useLocation()

  const routeTitleMap: Record<string, string> = {
    '/admin': 'Dashboard',
    '/admin/dashboard': 'Dashboard',
    '/admin/students': 'Students',
    '/admin/faculty': 'Faculty',
    '/admin/departments': 'Departments',
    '/admin/directory': 'Student Directory',
    '/admin/students/bulk-upload': 'Bulk Student',
    '/admin/students/add-student': 'Add Single Student',
    '/admin/students/:id': 'Student Profile',
    '/admin/students/:id/edit': 'Edit Student Profile',
    '/admin/faculty/add_faculty' : 'Add Faculty'
  }

  const getRouteTitle = (pathname: string) => {
    for (const route in routeTitleMap) {
      const pattern = new RegExp('^' + route.replace(/:\w+/g, '[^/]+') + '$')
      if (pattern.test(pathname)) {
        return routeTitleMap[route]
      }
    }
    return 'Dashboard'
  }

  const title = getRouteTitle(location.pathname)

  return (
    <div className="sticky h-16 flex justify-between items-center w-full border-b border-gray-300 bg-white">
      <p className="text-[#94A3B8] p-5 transition-all">{title}</p>
      <div className="flex gap-8 mr-5 text-[#64748B]">
        <BellRing size={19} />
        <Settings size={19} />
      </div>
    </div>
  )
}
