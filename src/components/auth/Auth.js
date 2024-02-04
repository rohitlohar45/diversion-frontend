import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthProvider, useAuth } from "../../context/AuthProvider";

function Auth() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [userType, setUserType] = useState("Corporate");
	const [token, setToken] = useState("");
	const [isRegistering, setIsRegistering] = useState(false);

	const { login } = useAuth();

	const handleRegister = async () => {
		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		try {
			const response = await axios.post("http://localhost:3002/register", {
				email,
				username,
				userType,
				password,
			});
			console.log(response.data);
			setIsRegistering(false); // After successful registration, switch to login form
		} catch (error) {
			console.error(error);
		}
	};

	const handleLogin = async () => {
		try {
			const response = await axios.post("http://localhost:3002/login", {
				email,
				password,
			});
			localStorage.setItem("user", JSON.stringify(response.data));
			login();
		} catch (error) {
			console.error(error);
		}
	};

	const handleProtectedRoute = async () => {
		try {
			const response = await axios.get("http://localhost:3000/protected", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h1>{isRegistering ? "Register" : "Login"}</h1>
			<label>Email:</label>
			<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
			{isRegistering && (
				<>
					<label>Username:</label>
					<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
					<br />
				</>
			)}
			<label>Password:</label>
			<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
			<br />
			{isRegistering && (
				<>
					<label>Confirm Password:</label>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<br />
					<select onChange={(e) => setUserType(e.target.value)}>
						<option value="Corporate">Corporate</option>
						<option value="Personal">Personal</option>
					</select>

					<br />
				</>
			)}
			<button onClick={isRegistering ? handleRegister : handleLogin}>
				{isRegistering ? "Register" : "Login"}
			</button>

			<br />
			<button onClick={() => setIsRegistering(!isRegistering)}>
				{isRegistering ? "Switch to Login" : "Switch to Register"}
			</button>
			<br />
			<button onClick={handleProtectedRoute}>Access Protected Route</button>
		</div>
	);
}

export default Auth;
