import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  return (
    <Header>
      <Menu theme="dark" mode="horizontal" style={{ display: "flex" }}>
        <div style={{ display: "flex", flexGrow: 1 }}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/quizzes">Quizzes</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/questions">Questions</Link>
          </Menu.Item>
        </div>
        <div style={{ display: "flex" }}>
          <Menu.Item key="5">
            <Link to="/register">Register</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/login">Login</Link>
          </Menu.Item>
        </div>
      </Menu>
    </Header>
  );
};

export default AppHeader;