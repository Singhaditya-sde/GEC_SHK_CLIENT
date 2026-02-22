import './index.css'
import { Routes, Route ,Navigate } from 'react-router'
import { AdminLayout } from './Layout/AminLayout'
import { AdminDashboard } from './modules/admin/admin_pages/Admin_Dashboard'
import { AdminStudentPage } from './modules/admin/admin_pages/Admin_Student_Page'
import { AdminBulkUploadPage } from './modules/admin/admin_pages/Admin_Bulk_UploadPage'
import { AdminFacultyPage } from './modules/admin/admin_pages/Admin_Faculty_Page'
import { AdminDepartmentPage } from './modules/admin/admin_pages/Admin_Department_Page'
import { StudentDirectory } from './components/Students/StudentDirectory'
import { AdminAddFacultyPage } from './modules/admin/admin_pages/Admin_Add_FacultyPage'



function App() {
  return (
    <>
      <Routes>

      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        {/* Students Parent Route */}
        <Route path="students">
          <Route index element={<AdminStudentPage />} />
          <Route path="bulk-upload" element={<AdminBulkUploadPage />} />
        </Route>
        <Route path='faculty'>
          <Route index element={<AdminFacultyPage />}/>
          <Route path='add_faculty' element={<AdminAddFacultyPage />}/>
        </Route>
        <Route path="departments" element={<AdminDepartmentPage />} />
        <Route path="directory" element={<StudentDirectory />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
