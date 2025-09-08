import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = ({ setUser }) => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showReset, setShowReset] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [resetEmail, setResetEmail] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();
		const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
		const foundUser = usersData.find(
			(u) => u.username === username && u.password === password
		);
		if (foundUser) {
			setUser(foundUser);
			localStorage.setItem("currentUser", JSON.stringify(foundUser));
			navigate("/home");
		} else {
			alert("Invalid credentials");
		}
	};

	const handleReset = (e) => {
		e.preventDefault();
		const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
		const foundUser = usersData.find((u) => u.email === resetEmail);

		if (foundUser) {
			alert(`Your password is: ${foundUser.password}`);
			setShowReset(false);
			setResetEmail("");
		} else {
			alert("No account found with this email.");
		}
	};

	return (
		<div className="login-page">
			<div className="login-left">
				<h1>FriendSphere</h1>
				<p>Connect with friends and share your moments.</p>
			</div>
			<div className="login-right">
				<form onSubmit={handleLogin}>
					<h2>Login</h2>
					<input
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>

					<input
						type={showPassword ? "text" : "password"}
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
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

					<button type="submit">Login</button>

					<p className="forgot-text">
						<span
							onClick={() => setShowReset(true)}
							className="forgot-link"
						>
							Forgot Password?
						</span>
					</p>

					<p className="register-text">
						Don't have an account?{" "}
						<Link to="/register" className="register-link">
							Register here
						</Link>
					</p>
				</form>

				{/* Password Reset Modal */}
				{showReset && (
					<div className="reset-modal">
						<div className="reset-box">
							<h3>Reset Password</h3>
							<form onSubmit={handleReset}>
								<input
									type="email"
									placeholder="Enter your email"
									value={resetEmail}
									onChange={(e) =>
										setResetEmail(e.target.value)
									}
									required
								/>
								<div className="reset-actions">
									<button type="submit">Recover</button>
									<button
										type="button"
										className="cancel-btn"
										onClick={() => setShowReset(false)}
									>
										Cancel
									</button>
								</div>
							</form>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Login;
