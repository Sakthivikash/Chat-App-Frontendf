import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../Components/Sidebar";
import MessageBox from "../Components/MessageBox";

function Chat() {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Sidebar />
        </Col>
        <Col md={8}>
          <MessageBox />
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
