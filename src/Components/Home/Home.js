import React, { useState } from "react";
import "./Home.css";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Background from "../../background.jpg";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../../Actions/actions";
const Home = () => {
	const history = useHistory();
	const userData = useSelector((state) => state.User);
	const dispatch = useDispatch();
	const [user, setUser] = useState({
		Username: "",
		Fullname: "",
		Password: "",
		Email: "",
		Mobile: "",
	});
	const [registered, setRegistered] = useState(true);
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUser({ ...user, [name]: value });
	};
	const handleRegister = () => {
		var variable = registered ? false : true;
		setRegistered(variable);
	};
	const handleLogin = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:5001/api/fetchUser", user)
			.then((res) => {
				if (
					res.data.status === "success" &&
					user.Username === res.data.User.UserName &&
					user.Password === res.data.User.Password
				) {
					// dispatch(addUser(res.data.User));
					history.push(`/${res.data.User._id}/Dashboard`);
				} else {
					alert("Invalid username or password");
				}
			})
			.catch();
	};
	const handleSignup = () => {
		axios
			.post("http://localhost:5001/api/addUser", user)
			.then((res) => {
				if (res.data.status === "success") {
					alert("Registered successfully");
					setRegistered(true);
				} else {
					alert("Invalid username or password");
				}
			})
			.catch();
	};
	return (
		<div className="home_screen">
			<div className="left_screen">
				<h1 className="title">Chit Manager</h1>
				<div className="main_text">
					<ul className="b">
						<span className="first">Digitalize Chits.</span>
						<span className="second">Maintain Transactions.</span>
						<span className="third">Connect with Customers.</span>
					</ul>
				</div>

				<img className="logo" src={Background}></img>
			</div>
			<div className="right_screen">
				{registered ? (
					<div className="login_card">
						<h2 className="login_title">Sign in</h2>
						<TextField
							onChange={handleChange}
							name="Username"
							className="input_field"
							id="outlined-basic"
							label="Username"
							variant="outlined"
							size="small"
						/>
						<br></br>
						<TextField
							onChange={handleChange}
							name="Password"
							className="input_field"
							id="outlined-basic"
							label="Password"
							type="password"
							variant="outlined"
							size="small"
						/>
						<br></br>
						<Button variant="outlined" color="primary" onClick={handleLogin}>
							Login
						</Button>
						<p className="register">
							Not Registerd?{" "}
							<Button href="#" color="primary" onClick={handleRegister}>
								Sign Up
							</Button>
						</p>
					</div>
				) : (
					<div className="sign_card">
						<h2 className="login_title">Sign Up</h2>
						<TextField
							onChange={handleChange}
							name="Username"
							className="input_field"
							id="outlined-basic"
							label="Username"
							variant="outlined"
							size="small"
						/>
						<br></br>
						<TextField
							onChange={handleChange}
							name="Fullname"
							className="input_field"
							id="outlined-basic"
							label="Full Name"
							variant="outlined"
							size="small"
						/>
						<br></br>
						<TextField
							onChange={handleChange}
							name="Email"
							className="input_field"
							id="outlined-basic"
							label="Email"
							type="email"
							variant="outlined"
							size="small"
						/>
						<br></br>
						<TextField
							onChange={handleChange}
							name="Mobile"
							className="input_field"
							id="outlined-basic"
							label="Mobile"
							type="tel"
							variant="outlined"
							size="small"
						/>
						<br></br>
						<TextField
							onChange={handleChange}
							name="Password"
							className="input_field"
							id="outlined-basic"
							label="Password"
							type="password"
							variant="outlined"
							size="small"
						/>
						<br></br>
						<Button variant="outlined" color="primary" onClick={handleSignup}>
							Sign Up
						</Button>
						<Button href="#" color="primary" onClick={handleRegister}>
							Cancel
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};
export default Home;
