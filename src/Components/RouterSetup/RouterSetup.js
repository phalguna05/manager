import React from "react";
import { Redirect, BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import AddCustomers from "../AddCustomer/AddCustomers";
import Home from "../Home/Home";
import Template from "../Template/Templates";
const RouterSetup = () => {
	return (
		<Router>
			<Route path="/" exact>
				<Redirect to="/Home"></Redirect>
			</Route>
			<Route path="/Home">
				<Home />
			</Route>
			<Route path="/Dashboard">
				<Dashboard />
			</Route>
			<Route path="/AddCustomers">
				<AddCustomers />
			</Route>
			<Route path="/Templates">
				<Template />
			</Route>
		</Router>
	);
};
export default RouterSetup;
