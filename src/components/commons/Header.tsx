import React, { useContext } from "react";
import { Layout, Menu, Avatar } from "antd";
import { Link, redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { user, setToken } = authContext;

  const handleLogout = () => {
    setToken(null);
    redirect("/");
  };

  return (
    <Header>
      <Menu theme="dark" mode="horizontal" style={{ display: "flex" }}>
        <div style={{ display: "flex", flexGrow: 1 }}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/quizzes">Quizzes</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/questions">Questions</Link>
          </Menu.Item>
          {user?.admin === true && (
            <Menu.Item key="4">
              <Link to="/users">Users</Link>
            </Menu.Item>
          )}
        </div>
        <div style={{ display: "flex" }}>
          {user ? (
            <>
              <Menu.Item key="5">
                <Link to="/">
                  <Avatar
                    src= "/avatar.svg"
                    style={{ marginRight: 8 }}
                  />
                  {user.fullName}
                </Link>
              </Menu.Item>
              <Menu.Item key="6" onClick={handleLogout}>
                Logout
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key="7">
                <Link to="/register">Register</Link>
              </Menu.Item>
              <Menu.Item key="8">
                <Link to="/login">Login</Link>
              </Menu.Item>
            </>
          )}
        </div>
      </Menu>
    </Header>
  );
};

export default AppHeader;
