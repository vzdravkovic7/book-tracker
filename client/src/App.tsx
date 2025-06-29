import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BookForm from "./components/books/BookForm";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

const App: React.FC = () => {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public routes */}
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />

      {/* Protected routes */}
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
        path="/add"
        element={
          <ProtectedRoute>
            <Layout>
              <BookForm />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <BookForm />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <Layout>
              <EditProfile />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Fallback route: handle unknown paths */}
      <Route
        path="*"
        element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
};

export default App;
