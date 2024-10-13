import React, { useState, useContext } from "react";
import { Form, Input, Button, message, Card, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import IUser from "../../models/User";
import { login } from "../../services/api/auth.api";
import { AuthContext } from "../../context/AuthContext";

const { Text } = Typography;
const { Title } = Typography;

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { setToken } = authContext;

  const onFinish = async (values: IUser) => {
    setLoading(true);
    try { 
      const token = await login(values.username, values.password);
      setToken(token);
      message.success("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error){
      console.error("Login error:", error);
      message.error("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        bordered={false}
        style={{ width: 600, textAlign: "center", marginTop: 100 }}
      >
        <Title level={3}>Login</Title>
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
            >
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <Text>
              Don't have an account? <Link to="/register">Register</Link>
            </Text>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;