import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./assets/pages/Dashbored/dashboard";
import Login from "./assets/pages/Authentication/login";
import SignUp from "./assets/pages/Authentication/signup";
import ResetPassword from "./assets/pages/Authentication/resetpassword";
import Sidebar from "./assets/pages/Sidebar/sidebar";
import Subscription from "./assets/pages/Subscription/subscription";
import Accounts from "./assets/pages/Accounts/accounts";
import Advertise from "./assets/pages/Advertise/advertise";
import Template from "./assets/pages/Template/template";
import GlobalBox from "./assets/pages/utilis/globalbox";
import Product from "./assets/pages/Product/product";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { useAuthStore } from "./assets/zustand/useAuthStore.js";

import "./App.css";
import HelpAndSupport from "./assets/pages/Support/helpandsupport.jsx";
import Success from "./assets/pages/Subscription/success.jsx";
import Failed from "./assets/pages/Subscription/failed.jsx";
import LandingPage from "./assets/pages/Landing/landing.jsx";

const Layout = ({
  children,
  showSidebar = true,
  showGlobalBox = true,
  showToastContainer = true,
}) => {
  window.document.title='Create Your Product Page | Notrious'
  const [close, setClose] = useState(true);

  const contentClass = showSidebar
    ? close
      ? "content-shrink"
      : "content-expand"
    : "content-full";
   
    

  return (
    <>
      {showGlobalBox && <GlobalBox />}
      
      <div className="app-container">
        {showSidebar && <Sidebar close={close} setClose={setClose} />}
        {showToastContainer && <ToastContainer />}
        <div className={`content ${contentClass}`}>{children}</div>
      </div>
    </>
  );
};

// ✅ ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  return authUser ? children : <Navigate to="/login" replace />;
};

// ✅ Redirect logged-in users away from auth pages
const PublicRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  return authUser ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  return (
    <Routes>
      {/* Protected Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/p/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <Product />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/subscription"
        element={
          <ProtectedRoute>
            <Layout>
              <Subscription />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/accounts"
        element={
          <ProtectedRoute>
            <Layout>
              <Accounts />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/advertise"
        element={
          <ProtectedRoute>
            <Layout>
              <Advertise />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/templates"
        element={
          <ProtectedRoute>
            <Layout>
              <Template />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/helpandsupport"
        element={
          <ProtectedRoute>
            <Layout>
              <HelpAndSupport />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment/success"
        element={
          <ProtectedRoute>
            <Layout showGlobalBox={false} showSidebar={false}>
              <Success />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment/failed"
        element={
          <ProtectedRoute>
            <Layout showGlobalBox={false} showSidebar={false}>
              <Failed />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Public Auth Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Layout showGlobalBox={false} showSidebar={false}>
              <Login />
            </Layout>
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Layout showGlobalBox={false} showSidebar={false}>
              <SignUp />
            </Layout>
          </PublicRoute>
        }
      />
      <Route
        path="/resetpassword"
        element={
          <PublicRoute>
            <Layout showGlobalBox={false} showSidebar={false}>
              <ResetPassword />
            </Layout>
          </PublicRoute>
        }
      />

      <Route
        path="/"
        element={
          
            <Layout showGlobalBox={false} showSidebar={false}>
              <LandingPage />
            </Layout>
         
        }
      />
    </Routes>
  );
}

export default App;
