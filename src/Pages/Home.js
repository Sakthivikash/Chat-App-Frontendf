import { Button } from "bootstrap";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  function getStarted() {
    if (!user) {
      setTimeout(() => navigate("/login"), 3000);
      toast.info("Plase login to view the page", { theme: "colored" });
    } else {
      navigate("/chat");
    }
  }

  return (
    <Row>
      <Col
        md={6}
        className="d-flex flex-direction-column align-items-center justify-content-center"
      >
        <div>
          <h1>Share the world with your friends</h1>
          <p>Chat App lets you connect with the world</p>
          <h4
            className="start-btn"
            onClick={getStarted}
            style={{ cursor: "pointer" }}
          >
            Get Started <i className="fas fa-comments home-message-icon"></i>
          </h4>
        </div>
      </Col>
      <Col md={6} className="home-bg"></Col>
    </Row>
  );
}
