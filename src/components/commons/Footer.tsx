import React from "react";
import { Layout, Typography } from "antd";

const { Footer } = Layout;
const { Title } = Typography;

const AppFooter: React.FC = () => {
  return (
    <Footer
      style={{
        textAlign: "center",
        position: "fixed",
        width: "100%",
        bottom: 0,
        backgroundColor: "#001529",
        margin: 0,
        padding: "10px 0",
      }}
    >
      <Title level={4} style={{ color: "white", margin: 0 }}>
        Baka Quizzes ©2024 - Develop with{" "}
        <a
          href="https://github.com/bakaqc"
          target="_blank"
          rel="noopener noreferrer"
        >
          bakaqc
        </a>
      </Title>
    </Footer>
  );
};

export default AppFooter;
