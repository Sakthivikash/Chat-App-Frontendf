import React from "react";
import { Nav, Navbar, Container, Button, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutUserMutation } from "../services/appApi";
import logo from "../images/logo.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();
  async function handleLogout(e) {
    e.preventDefault();
    await logoutUser(user);
    // redirect to home page
    window.location.replace("/");
  }

  function getStarted() {
    if (!user) {
      setTimeout(() => navigate("/login"), 3000);
      toast.info("Plase login to view the page", { theme: "colored" });
    } else {
      navigate("/chat");
    }
  }
  return (
    <Navbar
      bg="light"
      expand="lg"
      className="shadow p-3 mb-5 bg-white rounded"
      id="navbar"
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="logo">
            <img
              src={logo}
              alt="logo-image"
              style={{
                width: 40,
                height: 40,
                filter: "drop-shadow(3px 3px 5px black)",
              }}
            />
            <h4 style={{ color: "white" }}>ChatApp</h4>
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          id="nav-icon"
          style={{ backgroundColor: "white" }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              style={{ color: "white", cursor: "pointer" }}
              onClick={getStarted}
            >
              Chat
            </Nav.Link>
            {!user && (
              <LinkContainer to="/login" style={{ color: "white" }}>
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
            {user && (
              <>
                <Nav.Link
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  Logout
                </Nav.Link>
                <NavDropdown
                  title={
                    <>
                      <img
                        src={user.picture}
                        style={{
                          width: 30,
                          height: 30,
                          marginRight: 10,
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                      <span style={{ color: "white" }}>{user.name}</span>
                    </>
                  }
                  id="basic-nav-dropdown"
                ></NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
