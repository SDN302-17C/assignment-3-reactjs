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
      }}
    >
      <Title level={5}>
        Quizzes App ©2024 - Develop with{" "}
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
