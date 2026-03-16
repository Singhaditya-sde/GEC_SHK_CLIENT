import { Route } from "react-router"
import { ProtectedRoute } from "@/routes/ProtectedRoute"
import { AdminLayout } from "@/components/layout/AminLayout"

import { AdminDashboard } from "@/modules/admin/admin_pages/dashboard/Admin_Dashboard"
import AdminStudentPage from "@/modules/admin/admin_pages/student/Admin_Student_Page"
import { AddSingleStudentForm } from "@/modules/admin/admin_components/student/AddSingleStudentForm"
import { AdminBulkUploadPage } from "@/modules/admin/admin_pages/upload/Admin_Bulk_UploadPage"
import StudentProfileView from "@/modules/admin/admin_components/student/StudentProfileView"
import StudentProfileEdit from "@/modules/admin/admin_components/student/StudentProfileEdit"

import { AdminFacultyPage } from "@/modules/admin/admin_pages/faculty/Admin_Faculty_Page"
import { AdminAddFacultyPage } from "@/modules/admin/admin_pages/faculty/Admin_Add_FacultyPage"

import { AdminDepartmentPage } from "@/modules/admin/admin_pages/department/Admin_Department_Page"
import DepartmentDetailView from "@/modules/admin/admin_pages/department/Department_Detail_View_Page"
import DepartmentEditPage from "@/modules/admin/admin_pages/department/Department_Edit_Page"

import AdminCoursePage from "@/modules/admin/admin_pages/course/Admin_Course_Page"
import AdminAttendancePage from "@/modules/admin/admin_pages/attendance/Admin_Attendance_Page"

export const AdminRoutes = (
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
      <Route path="bulk-upload" element={<AdminBulkUploadPage />}/>

      <Route path=":id">
        <Route index element={<StudentProfileView />} />
        <Route path="edit" element={<StudentProfileEdit />} />
      </Route>
    </Route>

    <Route path="faculty">
      <Route index element={<AdminFacultyPage />} />
      <Route path="add_faculty" element={<AdminAddFacultyPage />} />
    </Route>

    <Route path="departments">
      <Route index element={<AdminDepartmentPage />} />
      <Route path=":id/:name/view" element={<DepartmentDetailView />} />
      <Route path=":id/:name/edit" element={<DepartmentEditPage />} />
    </Route>

    <Route path="course" element={<AdminCoursePage />} />
    <Route path="attendance" element={<AdminAttendancePage />} />
  </Route>
)