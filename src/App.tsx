import './index.css'
import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import ScrollToTop from './components/common/ScrollToTop'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { AdminLayout } from './Layout/AminLayout'
import { AdminDashboard } from './modules/admin/admin_pages/Admin_Dashboard'
import AdminStudentPage from './modules/admin/admin_pages/Admin_Student_Page'
import { AdminBulkUploadPage } from './modules/admin/admin_pages/Admin_Bulk_UploadPage'
import { AdminFacultyPage } from './modules/admin/admin_pages/Admin_Faculty_Page'
import { AdminDepartmentPage } from './modules/admin/admin_pages/Admin_Department_Page'
import { AdminAddFacultyPage } from './modules/admin/admin_pages/Admin_Add_FacultyPage'
import { LoginPage } from './modules/login/Login_Page'
import { useAuthStore } from './store/authStore'
import { Spinner } from './components/common/Spinner'
import { AddSingleStudentForm } from './modules/admin/admin_components/AddSingleStudentForm'
import StudentProfileView from './modules/admin/admin_components/StudentProfileView'
import StudentProfileEdit from './modules/admin/admin_components/StudentProfileEdit'
import FacultyProfileView from './modules/admin/admin_components/FacultyProfileView'
import FacultyProfileEdit from './modules/admin/admin_components/FacultyProfileEdit'

function App() {
  const user = useAuthStore((state) => state.user)

  const checkAuth = useAuthStore((state) => state.checkAuth)

  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner size={32} />
      </div>
    )
  }

  const RootRedirect = () => {
    if (!user) {
      return <LoginPage />
    }

    if (user.role === 'ADMIN') {
      return <Navigate to="/admin/dashboard" replace />
    }

    if (user.role === 'FACULTY') {
      return <Navigate to="/faculty/dashboard" replace />
    }

    if (user.role === 'STUDENT') {
      return <Navigate to={`/student/dashboard/${user.id}`} replace />
    }

    return <LoginPage />
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<RootRedirect />} />

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
            <Route path="add-student" element={<AddSingleStudentForm />} />
            <Route path="bulk-upload" element={<AdminBulkUploadPage />} />
            <Route path=":id">
              <Route index element={<StudentProfileView />} />
              <Route path="edit" element={<StudentProfileEdit />} />
            </Route>
          </Route>

          <Route path="faculty">
            <Route index element={<AdminFacultyPage />} />
            <Route path="add_faculty" element={<AdminAddFacultyPage />} />
            <Route path=":id">
              <Route index element={<FacultyProfileView />} />
              <Route path="edit" element={<FacultyProfileEdit />} />
            </Route>
          </Route>

          <Route path="departments" element={<AdminDepartmentPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
