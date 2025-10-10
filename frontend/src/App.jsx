import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import SignUp from "./pages/SignUp";
import Chatpage from "./pages/Chatpage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authuser, isCheckingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log(authuser);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* Decorators - Grid and glow shapes */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="absolute top-0 -left-4 size-96  bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />
      <Routes>
        <Route
          path="/"
          element={authuser ? <Chatpage /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/signup"
          element={!authuser ? <SignUp /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/login"
          element={!authuser ? <LoginPage /> : <Navigate to="/" />}
        ></Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
