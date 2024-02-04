import React, { useEffect, useState } from "react";
import ReactGA from "react-ga";
import { useAuth0 } from "@auth0/auth0-react";
import { Login, Logout } from "./auth/Auth0";
import { useAuth } from "../context/AuthProvider";
// import "Preview.css";
export default function Preview({ docId }) {
	// const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userType, setUserType] = useState("");
	const [user, setUser] = useState({});
	const { isAuthenticated } = useAuth();
	useEffect(() => {
		ReactGA.pageview("preview-screen");
	}, []);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		setUserType(user.userType);
		setUser(user);
		console.log("userType", user["userType"], user.userType);
	}, []);

	console.log("isAuthenticated", isAuthenticated, user);

	const joinRoomViaRoomId = () => {
		const roomId = document.getElementById("roomIdInput");
		const roomIdValue = roomId.value;

		if (roomIdValue.includes("http") || roomIdValue.includes("https")) {
			const url = new URL(roomIdValue);
			const path = url.pathname;
			ReactGA.event({
				category: `button.clicked`,
				action: `Join Room`,
				label: `from copied url`,
			});
			window.location.href = `${path}`;
		} else {
			ReactGA.event({
				category: `button.clicked`,
				action: `Join Room`,
				label: `from input url`,
			});
			window.location.href = `/${roomIdValue}`;
		}
	};

	return (
		<div className="bg-gradient-to-r from-primary-1 via-primary-3 to-primary-5 select-none flex items-center justify-center h-full w-full ">
			<div className="bg-primary-white p-6 rounded-xl  bg-opacity-90">
				<div className="mb-20 flex flex-col items-center">
					<div className="flex w-full text-primary-1 text-3xl sm:text-7xl font-bold codeFont justify-center ">
						<span>&#123; ..SyncLink.. &#125;</span>
					</div>

					<div className="flex flex-col mt-20 justify-center  text-primary-1">
						{userType == "Personal" ? (
							<div className="mt-10 flex">
								<input
									id="roomIdInput"
									placeholder="Enter Room ID"
									type="text"
									className=" duration-300 rounded w-80  bg-primary-5 focus:shadow-xl shadow-md text-primary-1 outline-none focus:outline-none px-4 py-3 codeFont"
								/>
								<button
									onClick={joinRoomViaRoomId}
									className="hover:shadow-lg duration-300 hover:bg-primary-3 px-4 ml-2 py-2 rounded-lg shadow bg-primary-5 font-medium"
								>
									Join Room
								</button>
							</div>
						) : (
							<>
								<button
									onClick={() => {
										ReactGA.event({
											category: `button.clicked`,
											action: `Create Room`,
										});
										window.location.href = `/${docId}`;
									}}
									className=" hover:shadow-xl duration-150 px-4 py-2 rounded-lg shadow text-primary-3 bg-primary-5 border border-primary-4 font-semibold transform transition-transform hover:-translate-y-4"
								>
									Create Room
								</button>
								<div className="mt-10 flex">
									<input
										id="roomIdInput"
										placeholder="Enter Room ID"
										type="text"
										className=" duration-300 rounded w-80  bg-primary-5 focus:shadow-xl shadow-md text-primary-1 outline-none focus:outline-none px-4 py-3 codeFont"
									/>
									<button
										onClick={joinRoomViaRoomId}
										className="hover:shadow-lg duration-300 hover:bg-primary-3 px-4 ml-2 py-2 rounded-lg shadow bg-primary-5 font-medium"
									>
										Join Room
									</button>
								</div>
							</>
						)}

						{/* <button className=" hover:shadow-md duration-300 px-4 mx-2 py-2 rounded-lg shadow bg-blue-600 font-medium">Sign Up</button> */}

						{/* <div className="absolute bottom-24 flex justify-center items-center w-96 left-1/2 transform -translate-x-1/2">
                        {
                            !isAuthenticated ? <Login /> : <Logout />
                        }

                    </div> */}
					</div>
				</div>
			</div>
		</div>
	);
}
