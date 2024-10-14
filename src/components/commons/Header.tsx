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
    <Header style={{ backgroundColor: "#001529" }}>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        style={{ display: "flex", color: "white", fontWeight: "bold" }}
      >
        <div style={{ display: "flex", flexGrow: 1 }}>
          <Menu.Item key="/" style={{ color: "white", fontWeight: "bold" }}>
            <Link to="/" style={{ color: "white", fontWeight: "bold" }}>Home</Link>
          </Menu.Item>
          <Menu.Item key="/quizzes" style={{ color: "white", fontWeight: "bold" }}>
            <Link to="/quizzes" style={{ color: "white", fontWeight: "bold" }}>Quizzes</Link>
          </Menu.Item>
          <Menu.Item key="/questions" style={{ color: "white", fontWeight: "bold" }}>
            <Link to="/questions" style={{ color: "white", fontWeight: "bold" }}>Questions</Link>
          </Menu.Item>
          {user?.admin === true && (
            <Menu.Item key="/users" style={{ color: "white", fontWeight: "bold" }}>
              <Link to="/users" style={{ color: "white", fontWeight: "bold" }}>Users</Link>
            </Menu.Item>
          )}
        </div>
        <div style={{ display: "flex" }}>
          {user ? (
            <>
              <Menu.Item key="/profile" style={{ color: "white", fontWeight: "bold" }}>
                <Link to="/" style={{ color: "white", fontWeight: "bold" }}>
                  <Avatar src="/avatar.svg" style={{ marginRight: 8 }} />
                  {user.fullName}
                </Link>
              </Menu.Item>
              <Menu.Item key="logout" onClick={handleLogout} style={{ color: "white", fontWeight: "bold" }}>
                Logout
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key="/login" style={{ color: "white", fontWeight: "bold" }}>
                <Link to="/login" style={{ color: "white", fontWeight: "bold" }}>Login</Link>
              </Menu.Item>
              <Menu.Item key="/register" style={{ color: "white", fontWeight: "bold" }}>
                <Link to="/register" style={{ color: "white", fontWeight: "bold" }}>Register</Link>
              </Menu.Item>
            </>
          )}
        </div>
      </Menu>
    </Header>
  );
};

export default AppHeader;