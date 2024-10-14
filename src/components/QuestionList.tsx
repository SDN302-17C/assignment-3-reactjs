import React, { useEffect, useState, useContext } from "react";
import {
  Layout,
  Typography,
  List,
  Spin,
  Card,
  Divider,
  Modal,
  Tag,
  Pagination,
  Button,
  Form,
  Input,
  Select,
  message,
} from "antd";
import IQuestion from "../models/Question";
import { getQuestions, postQuestion } from "../services/api/question.api";
import { AuthContext } from "../context/AuthContext";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const QuestionList: React.FC = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [form] = Form.useForm();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { user, token } = authContext;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestions();
        setQuestions(data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const showModal = (question: IQuestion) => {
    setSelectedQuestion(question);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedQuestion(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedQuestion(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreateQuestion = async (values: IQuestion) => {
    try {
      const newQuestion = await postQuestion({ ...values, author: user }, token);
      setQuestions([...questions, newQuestion]);
      setIsCreateModalVisible(false);
      form.resetFields(); 
      message.success("Question created successfully!");
    } catch (error) {
      console.error("Failed to create question:", error);
      message.error("Failed to create question.");
    }
  };

  const cardStyle = { marginBottom: "20px", borderRadius: "10px" };
  const tagStyle = { marginBottom: "5px", padding: "10px", fontSize: "20px" };

  return (
    <Layout>
      <Content style={{ padding: "20px" }}>
        <Title
          level={2}
          style={{ textAlign: "center", fontSize: "36px", color: "#1890ff" }}
        >
          Questions List
        </Title>
        <Card style={{ margin: "0 auto" }}>
          <Button
            type="primary"
            style={{ marginBottom: "20px", float: "right" }}
            onClick={() => setIsCreateModalVisible(true)}
          >
            Create Question
          </Button>
          <Divider />
          {loading ? (
            <Spin size="large" style={{ display: "block", margin: "0 auto" }} />
          ) : (
            <>
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={questions.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )}
                renderItem={(question) => (
                  <List.Item onClick={() => showModal(question)}>
                    <Card
                      title={question.text}
                      hoverable
                      style={cardStyle}
                      bodyStyle={{ padding: "20px" }}
                      headStyle={{
                        backgroundColor: "#fafafa",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      <Tag color="red" style={tagStyle}>
                        {question.author ? question.author.fullName : "Unknown Author"}
                      </Tag>
                    </Card>
                  </List.Item>
                )}
              />
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={questions.length}
                onChange={handlePageChange}
                style={{ textAlign: "center", marginTop: "20px" }}
              />
            </>
          )}
        </Card>
      </Content>
      <Modal
        title={
          <Typography.Title level={3}>
            {selectedQuestion?.text}
          </Typography.Title>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        width={600}
      >
        {selectedQuestion && (
          <>
            {selectedQuestion.options.map((option, index) => (
              <Card
                key={index}
                style={{
                  marginBottom: "15px",
                  borderRadius: "10px",
                  padding: "0",
                  backgroundColor:
                    index === selectedQuestion.correctAnswerIndex
                      ? "#61f383"
                      : "#fff",
                  border:
                    index === selectedQuestion.correctAnswerIndex
                      ? "1px solid #61f383"
                      : "1px solid #f0f0f0",
                }}
                headStyle={{
                  backgroundColor: "#fafafa",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                {option}
              </Card>
            ))}
            <p>Keywords:</p>
            <div>
              {selectedQuestion.keywords.map((keyword, index) => (
                <Tag
                  key={index}
                  color="purple"
                  style={{
                    marginBottom: "15px",
                    padding: "10px",
                    fontSize: "20px",
                  }}
                >
                  {keyword}
                </Tag>
              ))}
            </div>
            <p>Author</p>
            <div>
              <Tag color="red" style={tagStyle}>
                {selectedQuestion.author?.fullName}
              </Tag>
            </div>
          </>
        )}
      </Modal>
      <Modal
        title={
          <Typography.Title level={3} style={{ textAlign: "center" }}>
            Create Question
          </Typography.Title>
        }
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
        centered
      >
        <Form form={form} layout="vertical" onFinish={handleCreateQuestion}>
          <Form.Item
            name="text"
            label="Question Text"
            rules={[{ required: true, message: "Please input the question text!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="options"
            label="Options"
            rules={[{ required: true, message: "Please input the options!" }]}
          >
            <Input.Group>
              <Form.Item name={['options', 0]} noStyle rules={[{ required: true, message: 'Option 1 is required' }]}>
                <Input placeholder="Option 1" />
              </Form.Item>
              <Form.Item name={['options', 1]} noStyle rules={[{ required: true, message: 'Option 2 is required' }]}>
                <Input placeholder="Option 2" />
              </Form.Item>
              <Form.Item name={['options', 2]} noStyle rules={[{ required: true, message: 'Option 3 is required' }]}>
                <Input placeholder="Option 3" />
              </Form.Item>
              <Form.Item name={['options', 3]} noStyle rules={[{ required: true, message: 'Option 4 is required' }]}>
                <Input placeholder="Option 4" />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item
            name="correctAnswerIndex"
            label="Correct Answer Index"
            rules={[{ required: true, message: "Please select the correct answer index!" }]}
          >
            <Select placeholder="Select the correct answer">
              <Option value={0}>Option 1</Option>
              <Option value={1}>Option 2</Option>
              <Option value={2}>Option 3</Option>
              <Option value={3}>Option 4</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="keywords"
            label="Keywords"
            rules={[{ required: true, message: "Please input the keywords!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default QuestionList;