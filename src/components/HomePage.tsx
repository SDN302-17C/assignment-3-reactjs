import React from 'react';
import { Layout, Row, Col, Card, Typography, Button } from 'antd';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function HomePage() {
  return (
    <Layout>
      <Content style={{ padding: '200px' }}>
        <Row gutter={[16, 16]} justify="center">
          <Col span={24}>
            <Title level={2} style={{ textAlign: 'center' }}>Welcome to Baka Quizzes</Title>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Card hoverable>
              <Title level={4}>Quizzes List</Title>
              <Paragraph>
                Description of Quizzes Management. This is a brief description to explain what this feature is about.
              </Paragraph>
              <Button type="primary">Explore Now!</Button>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Card hoverable>
              <Title level={4}>Questions List</Title>
              <Paragraph>
                Description of Questions List. This is a brief description to explain what this feature is about.
              </Paragraph>
              <Button type="primary">Explore Now!</Button>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}