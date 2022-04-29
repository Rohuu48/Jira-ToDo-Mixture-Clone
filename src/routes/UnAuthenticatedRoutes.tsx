import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthRedirectToDashboard } from "./Redirection";
import { RootStateOrAny, useSelector } from "react-redux";
import Fallback from "components/Fallback";

const Homepage = lazy(() => import("screens/Homepage"));
const LoginPage = lazy(() => import("screens/Login"));
const SignupPage = lazy(() => import("screens/Signup"));

const UnAuthenticatedRoutes = () => {
  const isLoggedIn = useSelector(
    (state: RootStateOrAny) => state.auth.isLoggedIn
  );

  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/login"
          element={
            <AuthRedirectToDashboard
              isLoggedIn={isLoggedIn}
              redirectTo="/dashboard"
            >
              <LoginPage />
            </AuthRedirectToDashboard>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRedirectToDashboard
              isLoggedIn={isLoggedIn}
              redirectTo="/dashboard"
            >
              <SignupPage />
            </AuthRedirectToDashboard>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default UnAuthenticatedRoutes;
