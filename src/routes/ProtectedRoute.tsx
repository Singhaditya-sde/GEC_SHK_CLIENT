// import { Navigate } from "react-router";
// import { useAuthStore } from "../store/authStore";
// export function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const { isAuthenticated, isLoading } = useAuthStore();

//   if (isLoading) return null;

//   if (!isAuthenticated) {
//     return <Navigate to="/" />;
//   }

//   return <>{children}</>;
// }

import { Navigate } from "react-router";
import { useAuthStore } from "@/store/authStore";

export const ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};