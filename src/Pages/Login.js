import React, { useContext, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../services/appApi";
import { AppContext, socket } from "../context/appContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { socket } = useContext(AppContext);
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  function handleSubmit(e) {
    e.preventDefault();
    // login logic
    loginUser({ email, password }).then(({ data }) => {
      if (data) {
        socket.emit("new-user");
        navigate("/chat");
      }
    });
  }
  return (
    <Container className="shadow-lg p-3 mb-5 bg-white rounded">
      <Row>
        <Col md={7} className="login-bg"></Col>
        <Col
          md={5}
          className="d-flex flex-direction-column align-items-center justify-content-center"
        >
          <Form
            style={{ width: "80%", maxWidth: "500px" }}
            onSubmit={handleSubmit}
          >
            <h1 className="text-center">Login Account</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <div className="py-4">
              <p className="text-center">
                Don't have an account? <Link to="/signup">Signup</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
