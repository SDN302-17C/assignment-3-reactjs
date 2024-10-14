import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu, Avatar } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  const { user, setToken } = authContext || {};

  useEffect(() => {
    if (!authContext) {
      return;
    }
    if (user && !user.admin) {
      navigate("/");
    }
  }, [user, navigate, authContext]);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  if (!authContext) {
    return null;
  }

  const handleLogout = () => {
    if (setToken) {
      setToken(null);
    }
    navigate("/");
  };

  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        style={{ display: "flex" }}
      >
        <div style={{ display: "flex", flexGrow: 1 }}>
          <Menu.Item key="/">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/quizzes">
            <Link to="/quizzes">Quizzes</Link>
          </Menu.Item>
          <Menu.Item key="/questions">
            <Link to="/questions">Questions</Link>
          </Menu.Item>
          {user?.admin === true && (
            <Menu.Item key="/users">
              <Link to="/users">Users</Link>
            </Menu.Item>
          )}
        </div>
        <div style={{ display: "flex" }}>
          {user ? (
            <>
              <Menu.Item key="/profile">
                <Link to="/">
                  <Avatar src="/avatar.svg" style={{ marginRight: 8 }} />
                  {user.fullName}
                </Link>
              </Menu.Item>
              <Menu.Item key="logout" onClick={handleLogout}>
                Logout
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key="/login">
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item key="/register">
                <Link to="/register">Register</Link>
              </Menu.Item>
            </>
          )}
        </div>
      </Menu>
    </Header>
  );
};

export default AppHeader;