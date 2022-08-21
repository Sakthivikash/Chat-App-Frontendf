import React, { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../images/profile.png";
import { useSignupUserMutation } from "../services/appApi";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ThreeDots } from "react-loader-spinner";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  //Image upload states
  const [image, setImage] = useState(null);
  const [upladingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size is 1mb");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "m61hjyvt");
    try {
      setUploadingImg(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/dbhtjsfnh/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!image) return alert("Please upload your profile picture");
    const url = await uploadImage(image);
    console.log(url);
    signupUser({ name, email, password, picture: url }).then(({ data }) => {
      if (data) {
        console.log(data);
        navigate("/login");
      }
    });
  }
  return (
    <Container className="shadow-lg p-3 mb-5 bg-white rounded">
      <Row className="container-row">
        <Col md={7} className="signup-bg"></Col>
        <Col
          md={5}
          className="d-flex flex-direction-column align-items-center justify-content-center"
        >
          <Form
            style={{ width: "80%", maxWidth: "500px" }}
            onSubmit={handleSubmit}
          >
            <h1 className="text-center">Create Account</h1>
            <div className="signup-profile-pic-container">
              <img
                src={imagePreview || Profile}
                className="signup-profile-pic"
              />
              {error && <p className="alert alert-danger">{error.data}</p>}
              <Form.Group>
                <Form.Label
                  htmlFor="image-upload"
                  className="image-upload-lable"
                >
                  <i className="fas fa-plus-circle add-picture-icon"></i>
                </Form.Label>
                <Form.Control
                  type="file"
                  id="image-upload"
                  hidden
                  accept="image/png, image/jpeg"
                  onChange={validateImg}
                />
              </Form.Group>
            </div>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {upladingImg || isLoading ? (
                <ThreeDots color="#00BFFF" height={30} width={30} />
              ) : (
                "Signup"
              )}
            </Button>
            <div className="py-4">
              <p className="text-center">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
