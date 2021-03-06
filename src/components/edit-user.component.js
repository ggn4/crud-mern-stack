import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const EditUser = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    let isSubscribed = true;
    axios
      .get("http://localhost:5000/users/edit-user/" + props.match.params.id)
      .then((res) => {
        if (isSubscribed) {
          setUser({
            name: res.data.name,
            email: res.data.email,
            password: res.data.password,
          });
        }
        return () => (isSubscribed = false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputs = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const onEdit = (event) => {
    event.preventDefault();

    const userObject = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    axios
      .put(
        "http://localhost:5000/users/update-user/" + props.match.params.id,
        userObject
      )
      .then((res) => {
        console.log("User updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });

    // // Redirect to User List
    props.history.push("/list-user");
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col lg={6}>
          <div className="form-wrapper m-4">
            <Form onSubmit={onEdit}>
              <Form.Group controlId="Name">
                <Form.Label className="float-left font-weight-bold text-secondary">
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={user.name}
                  onChange={handleInputs}
                  name="name"
                />
              </Form.Group>

              <Form.Group controlId="Email">
                <Form.Label className="float-left font-weight-bold text-secondary">
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={user.email}
                  onChange={handleInputs}
                  name="email"
                />
              </Form.Group>

              <Form.Group controlId="Password">
                <Form.Label className="float-left font-weight-bold text-secondary">
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  defaultValue={user.password}
                  onChange={handleInputs}
                  name="password"
                />
              </Form.Group>
              <Button variant="dark" size="lg" block="block" type="submit">
                <i className="fas fa-user-edit mr-1"></i> Update User
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default EditUser;
