import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import UserTableRow from "./UserTableRow";

const ListUser = () => {
  const [user, setUser] = useState({
    users: [],
  });

  useEffect(() => {
    let isSubscribed = true;
    axios.get("http://localhost:5000/users/").then((res) => {
      if (isSubscribed) {
        setUser({
          users: res.data,
        });
      }
    });
    return () => (isSubscribed = false);
  });

  const DataTable = () => {
    return user.users.map((res, i) => {
      return <UserTableRow obj={res} key={i} />;
    });
  };

  return (
    <>
      <div className="table-wrapper m-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{DataTable()}</tbody>
        </Table>
      </div>
    </>
  );
};

export default ListUser;
