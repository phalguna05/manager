import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { makePayment } from "../../Actions/actions";
import { useState } from "react";
import { format } from "date-fns";
const EnrollPayments = (props) => {
	const Customers = useSelector((state) => state.Customers);
	const [template, setTemplate] = useState();
	const dispatch = useDispatch();
	console.log(Customers);
	useEffect(() => {
		axios
			.post("http://localhost:5001/api/getTemplateById", {
				template_id: props.chitdetails.Template,
			})
			.then((res) => {
				if (res.data.status === "success") {
					setTemplate(res.data.Templates);
				}
			})
			.catch();
	}, []);
	return (
		<Table hover size="md">
			<thead style={{ textAlign: "center" }}>
				<tr>
					<th>Member</th>
					<th>Installment</th>
					<th>Status</th>
					<th></th>
				</tr>
			</thead>
			<tbody style={{ textAlign: "center" }}>
				{template !== undefined
					? Customers.filter((obj) =>
							props.chitdetails.ChitMembers.includes(obj._id)
					  ).map((row) => (
							<tr>
								<td>{row.CustomerName}</td>
								<td>
									{
										template[0].Schema[props.chitdetails.CurrentMonth - 1]
											.Installment
									}
								</td>
								<td>
									{row.IsPaidInstallment ? (
										<p style={{ color: "green" }}>Paid</p>
									) : (
										<p style={{ color: "red" }}>Not Paid</p>
									)}
								</td>
								<td>
									<Button
										variant="outline-dark"
										style={{
											width: "10vw",
											padding: "4px",
										}}
										disabled={row.IsPaidInstallment ? true : false}
										size="md"
										onClick={() => {
											axios
												.post(
													"http://localhost:5001/api/makeTransactionInChit",
													{
														chit_id: props.chitdetails._id,
														from: row._id,
														name: row.CustomerName,
														amount:
															template[0].Schema[
																props.chitdetails.CurrentMonth - 1
															].Installment,
														date: format(new Date(), "yyyy/MM/dd"),
													}
												)
												.then((res) => {
													if (res.data.status === "success") {
														console.log("");
													}
												})
												.catch();
											axios
												.post(
													"http://localhost:5001/api/makeTransactionInCustomerAccount",
													{
														chit_id: props.chitdetails._id,
														customer_id: row._id,
														amount:
															template[0].Schema[
																props.chitdetails.CurrentMonth - 1
															].Installment,
														date: format(new Date(), "dd/MM/yyyy"),
													}
												)
												.then((res) => {
													if (res.data.status === "success") {
														dispatch(makePayment({ customer_id: row._id }));
													}
												})
												.catch();
										}}
									>
										Make Payment
									</Button>
								</td>
							</tr>
					  ))
					: null}
			</tbody>
		</Table>
	);
};
export default EnrollPayments;
