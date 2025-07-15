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
import BookDetails from "./pages/BookDetails";
import Graphs from "./pages/Graphs";
import Suggestions from "./pages/Suggestions";

import { useSuggestionSync } from "./hooks/useSuggestionSync";
import About from "./pages/About";

interface Props {
  token: string | null;
}

const InnerApp: React.FC<Props> = ({ token }) => {
  useSuggestionSync();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <About />
          </Layout>
        }
      />
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
      <Route
        path="/book/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <BookDetails />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/graphs"
        element={
          <ProtectedRoute>
            <Layout>
              <Graphs />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/suggestions"
        element={
          <ProtectedRoute>
            <Layout>
              <Suggestions />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={<Navigate to={token ? "/dashboard" : "/"} replace />}
      />
    </Routes>
  );
};

export default InnerApp;
