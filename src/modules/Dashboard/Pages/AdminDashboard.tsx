// import Logo from "../../../assets/Logo.svg"
import {Sidebar} from "../components/Sidebar"
import { TopBar } from "../components/TopBar"

export function AdminDashboard() {
  return(
    <>
    <div>
        <Sidebar />
        <div>
          <TopBar />
          <main className="bg-[#F1F5F9] ml-64 mt-16 min-h-screen">
            <h1 className="font-semibold text-4xl p-6">Academic Overview</h1>
          </main>
        </div>
    </div>
    </>
  )
}