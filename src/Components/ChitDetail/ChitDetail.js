import react, { useState } from "react";
import { Tab, Tabs, Form, Button, Table } from "react-bootstrap";
import EnrollPayments from "../EnrollPayments/EnrollPayments";
import { useSelector, useDispatch } from "react-redux";
import {
	updateMembers,
	removeMember,
	addChitToCustomer,
} from "../../Actions/actions";
import "./ChitDetail.css";
import DueLists from "../DueLists/DueLists";
import axios from "axios";
import Transactions from "../Transactions/Transactions";
const ChitDetail = (props) => {
	const Customers = useSelector((state) => state.Customers);
	const dispatch = useDispatch();
	const [selectedCustomer, setSelectedCustomer] = useState("");
	const handleCustomerRemove = (id) => {
		var data = { chit_id: props.info._id, customer_id: id };
		axios
			.post("http://localhost:5001/api/removeMemberFromChit", data)
			.then((res) => {
				if (res.data.status == "success") {
					console.log("hello");
				} else {
					alert(res.data.message);
				}
			})
			.catch();
		axios
			.post("http://localhost:5001/api/removeChitFromCustomer", data)
			.then((res) => {
				if (res.data.status == "success") {
					console.log("hello");
				} else {
					alert(res.data.message);
				}
			})
			.catch();
	};
	const handleAdd = () => {
		const row = Customers.filter((obj) => {
			return obj._id === selectedCustomer;
		});
		axios
			.post("http://localhost:5001/api/addMember", {
				chit_id: props.info._id,
				customer_id: selectedCustomer,
			})
			.then((res) => {
				if (res.data.status == "success") {
					dispatch(
						updateMembers({
							chit_members: res.data.ChitMembers,
							chit_id: props.info._id,
						})
					);
				} else {
					alert(res.data.message);
				}
			})
			.catch();
		axios
			.post("http://localhost:5001/api/addChit", {
				customer_id: selectedCustomer,
				chit_id: props.info._id,
			})
			.then((res) => {
				if (res.data.status == "success") {
					dispatch(
						addChitToCustomer({
							customer_id: selectedCustomer,
							chit_id: props.info._id,
						})
					);
				} else {
					alert(res.data.message);
				}
			})
			.catch();
		axios
			.post("http://localhost:5001/api/setDue", {
				customer_name: row[0].CustomerName,
				customer_id: selectedCustomer,
				chit_id: props.info._id,
				amount: 0,
			})
			.then((res) => {
				if (res.data.status == "success") {
					console.log("hel");
				} else {
					alert(res.data.message);
				}
			})
			.catch();
	};
	return (
		<div className="chit_details_card">
			<Tabs fill defaultActiveKey="payments" id="uncontrolled-tab-example">
				<Tab eventKey="payments" title="Enroll Payments">
					<div style={{ overflow: "auto" }}>
						<EnrollPayments chitdetails={props.info} />
					</div>
				</Tab>
				<Tab eventKey="transactions" title="Transactions">
					<Transactions chit_id={props.info._id} />
				</Tab>
				<Tab eventKey="dues" title="Due List">
					<DueLists chit_id={props.info._id} />
				</Tab>
				<Tab eventKey="add" title="Add Members">
					<div className="add_members">
						<div style={{ display: "flex", marginTop: "5px" }}>
							<p
								style={{
									fontFamily: "Times New Roman, Times, serif",
									fontWeight: "bold",
									marginLeft: "25vw",
									fontSize: "15px",
								}}
							>
								Maximum members allowed : <u>{props.info.Members}</u>
							</p>
							<p
								style={{
									fontFamily: "Times New Roman, Times, serif",
									fontWeight: "bold",
									fontSize: "15px",
								}}
							>
								&nbsp; Current members : <u>{props.info.ChitMembers.length}</u>{" "}
							</p>
						</div>
						<div className="add_top_section">
							<Form.Control
								as="select"
								className="dropdown"
								value={selectedCustomer}
								onChange={(e) => setSelectedCustomer(e.target.value)}
							>
								<option>Select User</option>
								{Customers.filter(
									(obj) => !props.info.ChitMembers.includes(obj._id)
								).map((cust) => (
									<option value={cust._id}>{cust.CustomerName}</option>
								))}
							</Form.Control>
							<Button
								className="btn_add"
								variant="outline-info"
								onClick={handleAdd}
								disabled={
									props.info.Members === props.info.ChitMembers.length
										? true
										: false
								}
							>
								Add Customer
							</Button>
						</div>

						<div className="add_bottom_section">
							<Table responsive="sm" borderd hover>
								<thead>
									<tr>
										<th>Member Name</th>
										<th>Member Id</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{Customers.filter((obj) =>
										props.info.ChitMembers.includes(obj._id)
									).map((cust) => (
										<tr>
											<td>{cust.CustomerName}</td>
											<td style={{ overflow: "hidden" }}>{cust._id}</td>
											<td style={{ float: "left" }}>
												<Button
													variant="outline-danger"
													size="sm"
													onClick={() => {
														var data = {
															chit_id: props.info._id,
															member: cust._id,
														};
														dispatch(removeMember(data));
														handleCustomerRemove(cust._id);
													}}
												>
													Remove From Chit
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
					</div>
				</Tab>
			</Tabs>
		</div>
	);
};
export default ChitDetail;
