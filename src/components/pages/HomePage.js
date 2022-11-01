import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [users, setUsers] = useState([]); //We are creating array and its setter method which will be empty array as default value
  const [loading, setloading] = useState("true");

  //called on load of the component on once because dependency array is empty
  useEffect(() => {
    // getAllUsers();
    getAllUsersWithAwait();
  }, []);

  const getAllUsersWithAwait = async () => {
    const result = await axios.get("http://localhost:5000/users");
    console.log(result);
    setUsers(result.data.reverse());
    console.log(false);
    console.log("after axios call");
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getAllUsersWithAwait();
  };

  const getAllUsers = () => {
    axios
      .get("http://localhost:5000/users")
      .then(function (response) {
        console.log(response.data);
        setUsers(response.data);
      }) // do somthing if data is fetched from api successfully
      .catch(function (error) {
        console.log(error);
      }); // do somthing if there was an error when fetching data  from api
    console.log("after axios call");
  };
  return (
    <div className="container">
      {users.length < 1 ? (
        <Spinner animation="grow" />
      ) : (
        <div>
          <h2 className="py-3">USER MANAGEMENT SYSTEM</h2>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th> Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>website</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.website}</td>
                    <td>
                      <Link
                        to={`/users/view/${user.id}`}
                        className="btn btn-info me-2"
                      >
                        View
                      </Link>
                      <Link
                        to={`/users/edit/${user.id}`}
                        className="btn btn-outline-info me-2"
                      >
                        Edit
                      </Link>
                      <Button
                        onClick={() => deleteUser(user.id)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
                /*
          {users.map((user, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            );
          })
        */
              }
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default HomePage;
