import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CreateUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [successMsg, setSuccessMsg] = useState(false);

  const handleInputs = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const onCreate = (event) => {
    event.preventDefault();

    const userObject = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    axios
      .post("http://localhost:5000/users/create-user", userObject)
      .then((res) => console.log());

    setUser({ name: "", email: "", password: "" });
    setSuccessMsg(true);
  };

  return (
    <>
      {successMsg ? (
        <p className="alert-success p-2 font-weight-bolder text-center">
          User Created Successfully!
        </p>
      ) : (
        ""
      )}
      <Row className="justify-content-center">
        <Col lg={6}>
          <div className="form-wrapper m-4">
            <Form onSubmit={onCreate}>
              <Form.Group controlId="Name">
                <Form.Label className="float-left font-weight-bold text-secondary">
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  value={user.name}
                  onChange={handleInputs}
                  name="name"
                  required
                />
              </Form.Group>

              <Form.Group controlId="Email">
                <Form.Label className="float-left font-weight-bold text-secondary">
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  value={user.email}
                  onChange={handleInputs}
                  name="email"
                  required
                />
              </Form.Group>

              <Form.Group controlId="Password">
                <Form.Label className="float-left font-weight-bold text-secondary">
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  value={user.password}
                  onChange={handleInputs}
                  name="password"
                  required
                />
              </Form.Group>
              <Button variant="dark" size="lg" block="block" type="submit">
                <i className="fas fa-user-plus mr-1"></i> Create User
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CreateUser;
