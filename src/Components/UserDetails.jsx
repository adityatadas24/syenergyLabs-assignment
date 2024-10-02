import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function UserDetails() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams(); 

  useEffect(() => {
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
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-details-container">
      <div className="user-card details">
        <h1>User Detail</h1>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <Link
          to="/"
          className="back-button"
        >
          Back to List
        </Link>
      </div>
    </div>
  );
}

export default UserDetails;
