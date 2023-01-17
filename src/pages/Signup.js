import {
  Container,
  Col,
  Row,
  FloatingLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import vector from "../images/undraw_interface.svg";

const Signup = () => {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleSubmit = () => {
    if (username === null || password === null || email === null || confirmPassword === null) {
      alert("Invalid input");
      return;
    }

    if(password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    const bodyFormData = new FormData();
    bodyFormData.append("username", username);
    bodyFormData.append("password", password);
    bodyFormData.append("email", email);

    axios
      .post("http://localhost:8000/members/register_user", bodyFormData)
      .then((res) => {
        if (res.data.success === true) {
          // account has been created, so also login the user
          window.localStorage.setItem("username", res.data.user);
          window.localStorage.setItem("authenticated", true);

          // success! redirect the user
          window.location.href = "/recipes"
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        <Col id="signup-image-col">
          <img src={vector} alt="join" />
        </Col>

        <Col>
          <h1>Create an Account</h1>

          <Link to="/login" className="link">
            Already have an account?{" "}
            <span className="text-success underline">Log in</span>
          </Link>

          <FloatingLabel label="Email" className="mt-4 mb-4">
            <FormControl
              type="email"
              placeholder="Email"
              onChange={({ target }) => setEmail(target.value)}
            />
          </FloatingLabel>

          <FloatingLabel label="Username" className="mt-4 mb-4">
            <FormControl
              type="text"
              placeholder="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </FloatingLabel>

          <FloatingLabel label="Password" className="mb-4">
            <FormControl
              type="password"
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </FloatingLabel>

          <FloatingLabel label="Confirm Password">
            <FormControl
              type="password"
              placeholder="Confirm Password"
              onChange={({ target }) => setConfirmPassword(target.value)}
            />
          </FloatingLabel>

          <div className="d-grid gap-2">
            <Button
              onClick={handleSubmit}
              className="mt-4"
              variant="success"
              size="lg"
            >
              Confirm
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
