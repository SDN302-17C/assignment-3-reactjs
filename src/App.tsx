import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import AppHeader from "./components/commons/Header";
import AppFooter from "./components/commons/Footer";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";

const { Content } = Layout;

const HomePage = lazy(() => import("./components/HomePage"));
const RegisterPage = lazy(() => import("./components/auth/Register"));
const LoginPage = lazy(() => import("./components/auth/Login"));
const UserList = lazy(() => import("./components/UserList"));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AppHeader />
          <Content style={{ padding: "0 50px", flex: 1, overflow: "auto" }}>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/users" element={<UserList />} />
              </Routes>
            </Suspense>
          </Content>
          <AppFooter />
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
