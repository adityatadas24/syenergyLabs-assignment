import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './style.css'; 
import { toast } from "react-toastify";

function UserForm({ onUserCreated }) {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    if (id) {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const localUser = storedUsers.find((u) => u.id === parseInt(id));

      if (localUser) {
        setUser(localUser);
      } else {
        axios
          .get(`https://jsonplaceholder.typicode.com/users/${id}`)
          .then((response) => setUser(response.data))
          .catch((err) => setError("Failed to fetch user from API"));
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (id) {
      const updatedUsers = storedUsers.map((u) =>
        u.id === parseInt(id) ? { ...user, id: parseInt(id) } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      toast.success("User Edit Successfully")
    } else {
      const newUser = { ...user, id: Date.now() };
      storedUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(storedUsers));
      toast.success("User Create Successfully")
       
      if (onUserCreated) {
        onUserCreated(newUser);
      }
    }
   
    
    setUser({ name: "", email: "", phone: "" });
    navigate("/"); 
  };

  return (
    <div className="user-form">
      <h1 className="form-title">{id ? "Edit User" : "Create User"}</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            placeholder="phone no."
            value={user.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="submit-button">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
