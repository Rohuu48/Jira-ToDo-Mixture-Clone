import Fallback from "components/Fallback";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./Redirection";

const Dashboard = lazy(() => import("screens/Dashboard"));

const AuthenticatedRoutes = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} redirectTo="/login">
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AuthenticatedRoutes;
