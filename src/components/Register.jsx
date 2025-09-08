import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    age: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const usersData = JSON.parse(localStorage.getItem("usersData")) || [];

    if (usersData.find(u => u.username === form.username)) {
      alert("Username already exists!");
      return;
    }

    if (usersData.find(u => u.email === form.email)) {
      alert("Email already registered!");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newUser = { ...form, id: Date.now(), friends: [] };
    delete newUser.confirmPassword; // confirmPassword պահել պետք չի

    localStorage.setItem("usersData", JSON.stringify([...usersData, newUser]));
    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="register-page">
      <div className="register-left">
        <h1>FriendSphere</h1>
        <p>Connect with friends and share your moments.</p>
      </div>
      <div className="register-right">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <label className="show-password">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>

          <button type="submit">Register</button>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
