import "./index.css"
import { Routes, Route, Navigate } from "react-router"
import { useEffect } from "react"

import ScrollToTop from "@/components/navigation/ScrollToTop"
import { useAuthStore } from "@/store/authStore"
import { Spinner } from "./components/ui common/Spinner"

import { AdminRoutes } from "@/routes/adminRoutes"
// import { FacultyRoutes } from "@/routes/facultyRoutes"
// import { StudentRoutes } from "@/routes/studentRoutes"

import { LoginPage } from "@/modules/login/Login_Page"

function App() {
  const { user, checkAuth, isCheckingAuth } = useAuthStore()

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
    if (!user) return <LoginPage />

    if (user.role === "ADMIN") return <Navigate to="/admin/dashboard" replace />
    if (user.role === "FACULTY") return <Navigate to="/faculty/dashboard" replace />
    if (user.role === "STUDENT")
      return <Navigate to={`/student/dashboard/${user.id}`} replace />

    return <LoginPage />
  }

  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<RootRedirect />} />
          {AdminRoutes}
          {/* {FacultyRoutes}
          {StudentRoutes} */}
      </Routes>
    </>
  )
}

export default App