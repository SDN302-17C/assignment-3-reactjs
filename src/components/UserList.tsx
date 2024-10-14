/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import {
  Table,
  Spin,
  Button,
  message,
  Typography,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Switch,
} from "antd";
import IUser from "../models/User";
import { AuthContext } from "../context/AuthContext";
import {
  getUsers,
  deleteUser,
  putUser,
  postUser,
} from "../services/api/user.api";

const { Title } = Typography;
const { confirm } = Modal;

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [form] = Form.useForm();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { token } = authContext;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(token);
        const sortedData = data.sort(
          (a: IUser, b: IUser) => (b.admin ? 1 : 0) - (a.admin ? 1 : 0)
        );
        setUsers(sortedData);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const handleUpdate = (user: IUser) => {
    console.log(user);
    setCurrentUser(user);
    form.setFieldsValue({
      fullName: user.fullName,
      username: user.username,
      admin: user.admin,
    });
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setCurrentUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showDeleteConfirm = (userID: string) => {
    confirm({
      title: "Are you sure you want to delete this user?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      width: 600, 
      centered: true, 
      onOk: () => handleDelete(userID),
    });
  };

  const handleDelete = async (userID: string) => {
    const userToDelete = users.find((user) => user._id === userID);
    if (userToDelete?.admin) {
      message.error("Cannot delete an admin user");
      return;
    }
    try {
      await deleteUser(userID, token);
      setUsers(users.filter((user) => user._id !== userID));
      message.success("User deleted successfully");
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (currentUser) {
        const updatedUser = { _id: currentUser._id, admin: values.admin };
        await putUser(updatedUser, token);
        message.success("User updated successfully");
      } else {
        await postUser(values, token);
        message.success("User added successfully");
      }
      setIsModalVisible(false);
      const data = await getUsers(token);
      const sortedData = data.sort(
        (a: IUser, b: IUser) => (b.admin ? 1 : 0) - (a.admin ? 1 : 0)
      );
      setUsers(sortedData);
    } catch (error) {
      message.error("Failed to save user");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: ".No",
      key: "index",
      render: (_text: any, _record: IUser, index: number) => index + 1,
      width: "10%",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      width: "30%",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "20%",
    },
    {
      title: "Role",
      dataIndex: "admin",
      key: "isAdmin",
      render: (isAdmin: boolean) => (
        <Tag color={isAdmin ? "red" : "green"}>
          {isAdmin ? "ADMIN" : "USER"}
        </Tag>
      ),
      width: "10%",
    },
    {
      title: "Action",
      key: "action",
      render: (_text: any, record: IUser) =>
        !record.admin && (
          <Space>
            <Button type="primary" onClick={() => handleUpdate(record)}>
              Update
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => showDeleteConfirm(record._id)}
            >
              Delete
            </Button>
          </Space>
        ),
      width: "30%",
    },
  ];

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
              <Title
          level={2}
          style={{ textAlign: "center", fontSize: "36px", color: "#1890ff" }}
        >
          User List
        </Title>
      <Spin spinning={loading}>
        <Table
          dataSource={users}
          columns={columns}
          rowKey="_id"
          bordered
          pagination={{ pageSize: 7, position: ["bottomCenter"] }}
          title={() => (
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button type="primary" onClick={handleAdd}>
                Add User
              </Button>
            </div>
          )}
        />
      </Spin>
      <Modal
        title={
          <Typography.Title level={3} style={{ textAlign: "center" }}>
            {currentUser ? "Update User" : "Add User"}
          </Typography.Title>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered 
      >
        <Form form={form} layout="vertical">
          {!currentUser && (
            <>
              <Form.Item
                name="fullName"
                label="Full Name"
                rules={[
                  { required: true, message: "Please input the full name!" },
                ]}
              >
                <Input readOnly={!!currentUser} />
              </Form.Item>
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  { required: true, message: "Please input the username!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input the password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item name="admin" label="Admin" valuePropName="checked">
                <Switch />
              </Form.Item>
            </>
          )}
          {currentUser && (
            <>
              <Form.Item name="fullName" label="Full Name">
                <Input readOnly />
              </Form.Item>
              <Form.Item name="username" label="Username">
                <Input readOnly />
              </Form.Item>
              <Form.Item name="admin" label="Admin" valuePropName="checked">
                <Switch />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default UserList;
