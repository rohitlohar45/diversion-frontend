import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthProvider, useAuth } from "../../context/AuthProvider";
import img from "../../images/img.jpg";
function Auth() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("Corporate");
  const [token, setToken] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const { login } = useAuth();

  useEffect(() => {
    console.log(isRegistering);
  }, [isRegistering]);
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
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={img} alt="" />
      </div>
      <div className="max-w-[400px] w-full mx-auto  bg-purple-standard p-8 px-8">
        <div className="flex w-full  bg-gradient-to-r from-primary-1 via-primary-3 to-primary-5  text-transparent bg-clip-text text-3xl sm:text-7xl font-bold codeFont justify-center ">
          <span>&#123; ..SyncLink.. &#125;</span>
        </div>

        <h2 className="text-4xl text-primary-5 font-bold text-center">
          {isRegistering ? "Register" : "Login"}
        </h2>
        <div className="flex flex-col text-primary-5 py-2">
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:bg-primary-5 focus:text-primary-1 focus:outline-none"
          />
          {isRegistering && (
            <>
              <div className="flex flex-col text-primary-5 py-2">
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="rounded-lg bg-gray-700 mt-2 p-2  focus:bg-primary-5  focus:text-primary-1 focus:outline-none"
                />
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col text-primary-5 py-2">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg bg-gray-700 mt-2 p-2  focus:bg-primary-5 focus:text-primary-1 focus:outline-none"
          />
        </div>
        {isRegistering && (
          <>
            <div className="flex flex-col text-primary-5 py-2">
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-lg bg-gray-700 mt-2 p-2  focus:bg-primary-5 focus:text-primary-1 focus:outline-none"
              />
            </div>
            <select
              onChange={(e) => setUserType(e.target.value)}
              className=" mt-2 bg- rounded-lg px-4 py-2 text-primary-1 outline-none focus:bg-primary-5 focus:text-primary-1 focus:outline-none"
            >
              <option value="Corporate">Corporate</option>
              <option value="Personal">Personal</option>
            </select>

            <br />
          </>
        )}
        <div className=" mt-5 flex flex-col items-center">
          <button
            onClick={isRegistering ? handleRegister : handleLogin}
            className="w-1/2 my-5  bg-primary-4 hover:bg-primary-5  focus:outline-none  text-primary-1 font-bold py-2 px-4 shadow-md transition duration-300 ease-in-out rounded-lg"
          >
            {isRegistering ? "Register" : "Login"}
          </button>

          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="w-1/2 my-5  bg-primary-1 hover:bg-primary-2  focus:outline-none  text-primary-5 font-bold py-2 px-4 shadow-md transition duration-300 ease-in-out rounded-lg"
          >
            {isRegistering ? "Switch to Login" : "Switch to Register"}
          </button>
        </div>
        <br />
      </div>
    </div>
  );
}

export default Auth;
