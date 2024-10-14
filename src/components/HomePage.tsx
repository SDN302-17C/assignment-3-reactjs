import React from 'react';
import { Layout, Row, Col, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function HomePage() {
  const navigate = useNavigate();

  const navigateToQuizzes = () => {
    navigate('/quizzes');
  };

  const navigateToQuestions = () => {
    navigate('/questions');
  };

  return (
    <Layout>
      <Content style={{ padding: '100px', background: '#f0f2f5' }}>
        <Row gutter={[16, 16]} justify="center">
          <Col span={24}>
            <Title level={2} style={{ textAlign: 'center', fontSize: '36px', color: '#1890ff' }}>
              Dive into the World of Baka Quizzes!
            </Title>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              style={{ height: '100%' }}
              bodyStyle={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}
              onClick={navigateToQuizzes}
            >
              <div>
                <Title level={4} style={{ fontSize: '24px', textAlign: 'center' }}>Discover Exciting Quizzes</Title>
                <Paragraph style={{ fontSize: '20px' }}>
                  - Embark on a journey through a diverse range of quizzes.
                  <br />
                  - Challenge your intellect and compete with friends.
                  <br />
                  - From trivia to specialized subjects, there's something for everyone.
                  <br />
                  - Kickstart a quiz now and uncover your knowledge prowess! Whether you're aiming to learn or just have fun, our quizzes blend entertainment and education perfectly.
                </Paragraph>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              style={{ height: '100%' }}
              bodyStyle={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}
              onClick={navigateToQuestions}
            >
              <div>
                <Title level={4} style={{ fontSize: '24px', textAlign: 'center' }}>Explore Our Question Bank</Title>
                <Paragraph style={{ fontSize: '20px' }}>
                  - Dive into our extensive collection of questions. 
                  <br />
                  - Contribute your own questions and be part of our growing community.
                  <br />
                  - Each question is crafted to test and expand your knowledge across various subjects.
                  <br />
                  - Make learning interactive and enjoyable! Our questions span a wide array of topics, ensuring there's something for everyone. Join us and start contributing today!
                </Paragraph>
              </div>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}