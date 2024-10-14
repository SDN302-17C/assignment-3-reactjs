import React, { useState } from "react";
import { Form, Input, Button, message, Card, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import IUser from "../../models/User";
import { register } from "../../services/api/auth.api";

const { Text } = Typography;
const { Title } = Typography;

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = async (values: IUser) => {
    const modifiedValues = { ...values, _id: "" };
    setLoading(true);
    console.log("values:", values);
    console.log("Modified values:", modifiedValues);
    try { 
      await register(modifiedValues);
      message.success("Registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error){
      console.error("Registration error:", error);
      message.error("Registration failed.");
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
        style={{ width: 400, textAlign: "center", marginTop: 200 }}
      >
        <Title level={3}>Register</Title>
        <Form name="register" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: "Please input your full name!" }]}
          >
            <Input />
          </Form.Item>
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
              Register
            </Button>
          </Form.Item>
          <Form.Item>
            <Text>
              Already have an account? <Link to="/login">Login</Link>
            </Text>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;