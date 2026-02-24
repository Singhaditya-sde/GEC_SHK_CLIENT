import './index.css'
import { Routes, Route, Navigate } from 'react-router'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { AdminLayout } from './Layout/AminLayout'
import { AdminDashboard } from './modules/admin/admin_pages/Admin_Dashboard'
import { AdminStudentPage } from './modules/admin/admin_pages/Admin_Student_Page'
import { AdminBulkUploadPage } from './modules/admin/admin_pages/Admin_Bulk_UploadPage'
import { AdminFacultyPage } from './modules/admin/admin_pages/Admin_Faculty_Page'
import { AdminDepartmentPage } from './modules/admin/admin_pages/Admin_Department_Page'
import { StudentDirectory } from './components/Students/StudentDirectory'
import { AdminAddFacultyPage } from './modules/admin/admin_pages/Admin_Add_FacultyPage'
import { LoginPage } from './modules/login/Login_Page'
import { useAuthStore } from './store/authStore'

function App() {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const RootRedirect = () => {
    return isAuthenticated
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/login" replace />
  };

  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<LoginPage />} />

      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />

        <Route path="students">
          <Route index element={<AdminStudentPage />} />
          <Route path="bulk-upload" element={<AdminBulkUploadPage />} />
        </Route>

        <Route path="faculty">
          <Route index element={<AdminFacultyPage />} />
          <Route path="add_faculty" element={<AdminAddFacultyPage />} />
        </Route>

        <Route path="departments" element={<AdminDepartmentPage />} />
        <Route path="directory" element={<StudentDirectory />} />
      </Route>
    </Routes>
  )
}

export default App