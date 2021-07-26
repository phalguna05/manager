import react, { useState, useEffect } from "react";
import NavBar from "../Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Accordion, Card } from "react-bootstrap";
import "./AddCustomer.css";
import { addCustomer, addAllCustomers } from "../../Actions/actions";
import axios from "axios";
const AddCustomers = () => {
	const dispatch = useDispatch();
	const User = useSelector((state) => state.User);
	const customers = useSelector((state) => state.Customers);
	const [customer, setCustomer] = useState({
		CustomerName: "",
		Email: "",
		Mobile: "",
		UserId: User._id,
	});
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setCustomer({ ...customer, [name]: value });
	};
	const handleAdd = () => {
		axios
			.post("http://localhost:5001/api/addCustomer", customer)
			.then((res) => {
				if (res.data.status == "success") {
					dispatch(addCustomer(res.data.details));
					setCustomer({
						CustomerName: "",
						Email: "",
						Mobile: "",
						Chits: [],
						UserId: User._id,
					});
				} else {
					alert(res.data.message);
				}
			})
			.catch();
	};
	return (
		<div className="add_customer">
			<NavBar />
			<div className="drops">
				<Accordion>
					<Card>
						<Card.Header>
							<Accordion.Toggle as={Button} variant="link" eventKey="0">
								Add Customer
							</Accordion.Toggle>
						</Card.Header>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<div className="form-group">
									<input
										type="text"
										placeholder="Customer Name"
										className="form-control"
										name="CustomerName"
										onChange={handleChange}
										value={customer.CustomerName}
									/>
									<input
										placeholder="Email"
										className="form-control"
										type="email"
										name="Email"
										onChange={handleChange}
										value={customer.Email}
									/>
									<input
										type="text"
										placeholder="Mobile"
										className="form-control"
										name="Mobile"
										onChange={handleChange}
										value={customer.Mobile}
									/>
									<Button
										variant="outline-info"
										className="add_button"
										onClick={handleAdd}
									>
										Add Customer
									</Button>
								</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
			</div>
			<div className="table">
				<Table responsive="sm" striped borderd hover>
					<thead>
						<tr>
							<th>Customer Name</th>
							<th>Email</th>
							<th>Mobile</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{customers.map((cust) => (
							<tr>
								<td>{cust.CustomerName}</td>
								<td>{cust.Email}</td>
								<td>{cust.Mobile}</td>
								<td>
									<Button variant="outline-danger" size="sm">
										Remove
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</div>
	);
};
export default AddCustomers;
