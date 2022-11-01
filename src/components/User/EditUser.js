import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
    const { userId } = useParams(); //It will grab the user Id from url and return it
    alert(userId);
  const navigate = useNavigate();
  const initialState = {
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  };
  const [user, setUser] = useState(initialState);

  const { name, username, email, phone, website } = user; //object destructuring

  const onChangeInput = (event) => {
    //console.log(event);
    //console.log(event.target);
    //console.log(event.target.value);
    //spread operator appends to existing data
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  useEffect(()=>{
    fetchUser();

  }, []);
  const fetchUser = async () => {
        const response = await axios.get(`http://localhost:5000/users/${userId}`);
        //console.log(response);
        setUser(response.data)
  }

  const onFormSubmit = async (event) => {
    event.preventDefault();
    if (!user.name) {
      alert("Name cannot be empty");
      return;
    }
    if (!user.username) {
      alert("Username cannot be empty");
      return;
    }
    if (!user.email) {
      alert("Email cannot be empty");
      return;
    }
    if (!user.phone) {
      alert("Phone cannot be empty");
      return;
    }
    if (!user.website) {
      alert("Website cannot be empty");
      return;
    }
    await axios.put(`http://localhost:5000/users/${userId}`, user);
    navigate({ pathname: "/" });
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto p-5 shadow-sm">
        <h2 className="text-center mb-4">Edit User</h2>
        <form onSubmit={(event) => onFormSubmit(event)}>
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your full name"
              name="Fullname"
              value={name}
              onChange={(event) => onChangeInput(event)}
            />
          </div>
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your user name"
              name="Username"
              value={username}
              onChange={(event) => onChangeInput(event)}
            />
          </div>
          <div className="form-group mb-2">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(event) => onChangeInput(event)}
            />
          </div>
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your Phone number"
              name="Phone"
              value={phone}
              onChange={(event) => onChangeInput(event)}
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your website"
              name="website"
              value={website}
              onChange={(event) => onChangeInput(event)}
            />
          </div>
          <button type="submit" className="btn btn-info text-white col-12">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
