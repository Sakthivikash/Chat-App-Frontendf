import { Button } from "bootstrap";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Home() {
  return (
    <Row>
      <Col
        md={6}
        className="d-flex flex-direction-column align-items-center justify-content-center"
      >
        <div>
          <h1>Share the world with your friends</h1>
          <p>Chat App lets you connect with the world</p>
          <LinkContainer to="/chat">
            <h4 className="start-btn">
              Get Started <i className="fas fa-comments home-message-icon"></i>
            </h4>
          </LinkContainer>
        </div>
      </Col>
      <Col md={6} className="home-bg"></Col>
    </Row>
  );
}
