import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUserNew = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUserName] = useState("");
  const [website, setWebsite] = useState("");

  const onNameChange = e => {
    setName(e.target.value);
  }
   const onEmailChange = (e) => {
     setEmail(e.target.value);
   };
 const onPhoneChange = (e) => {
   setPhone(e.target.value);
 };
 const onUserNameChange = (e) => {
   setUserName(e.target.value);
 };
 const onWebsiteChange = (e) => {
   setWebsite(e.target.value);
 };


  const onFormSubmit = async (event) => {
    event.preventDefault();
    if (!name) {
      alert("Name cannot be empty");
      return;
    }
    if (!username) {
      alert("Username cannot be empty");
      return;
    }
    if (!email) {
      alert("Email cannot be empty");
      return;
    }
    if (!phone) {
      alert("Phone cannot be empty");
      return;
    }
    if (!website) {
      alert("Website cannot be empty");
      return;
    }


    const user = { name: name, email: email, username: username, phone: phone, website: website}
    await axios.post("http://localhost:5000/users", user);
    navigate({ pathname: "/" });
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto p-5 shadow-sm">
        <h2 className="text-center mb-4">Add User</h2>
        <div>
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your full name"
              name="Fullname"
              value={name}
              onChange={(event) => onNameChange(event)}
            />
          </div>
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your user name"
              name="Username"
              value={username}
              onChange={(event) => onUserNameChange(event)}
            />
          </div>
          <div className="form-group mb-2">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(event) => onEmailChange(event)}
            />
          </div>
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your Phone number"
              name="Phone"
              value={phone}
              onChange={(event) => onPhoneChange(event)}
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your website"
              name="website"
              value={website}
              onChange={(event) => onWebsiteChange(event)}
            />
          </div>
          <button onClick={(event) => onFormSubmit(event)} className="btn btn-info text-white col-12">
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserNew;
