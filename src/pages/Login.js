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

import vector from "../images/undraw_join.svg";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = () => {
    if (username === null || password === null) {
      alert("Please enter a username and password");
      return;
    }

    const bodyFormData = new FormData();
    bodyFormData.append("username", username);
    bodyFormData.append("password", password);

    axios
      .post("https://chefshack-backend.herokuapp.com/members/login_user", bodyFormData)
      .then((res) => {
        if (res.data.success === true) {
          // login user
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
        <Col id="login-image-col">
          <img src={vector} alt="join" />
        </Col>

        <Col>
          <h1>Login</h1>

          <Link to="/signup" className="link">
            Don't have an account?{" "}
            <span className="text-success underline">Create one for free</span>
          </Link>

          <FloatingLabel label="Username" className="mt-4 mb-4">
            <FormControl
              type="text"
              placeholder="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </FloatingLabel>

          <FloatingLabel label="Password">
            <FormControl
              type="password"
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
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

export default Login;
