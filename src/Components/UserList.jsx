import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserForm from "./UserForm";
import "./style.css";
import { toast } from "react-toastify";

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (storedUsers.length === 0) {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          setUsers(response.data);
          localStorage.setItem("users", JSON.stringify(response.data));
        })
        .catch((err) => setError("Failed to fetch users from API"));
    } else {
      setUsers(storedUsers);
    }
  }, []);

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast.success("User Delete Successfully")

  };

  const handleUserCreated = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    navigate("/");
   

  };

  return (
    <div className="user-list">
      {error && <p className="error">{error}</p>}
      <UserForm onUserCreated={handleUserCreated} />

      <h1>User List</h1>
      <div className="user-card-container">

        {users.map((user) => (
          <div key={user.id} className="user-card">
            
            <h2 className="user-name">{user.name}</h2>
            <p className="user-email">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="user-phone">
              <strong>Phone:</strong> {user.phone}
            </p>
            <div className="user-actions">
              <Link className="view-button" to={`/user/${user.id}`}>
                View
              </Link>
              <Link className="edit-button" to={`/edit/${user.id}`}>
                Edit
              </Link>
              <button
                className="delete-button"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
