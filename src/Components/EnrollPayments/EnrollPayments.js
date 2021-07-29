import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { makePayment } from "../../Actions/actions";
import { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { format } from "date-fns";
const EnrollPayments = (props) => {
	const Customers = useSelector((state) => state.Customers);
	const [template, setTemplate] = useState();
	const [payments, setPayments] = useState([]);
	var paymentList = [];
	payments.map((obj) => {
		paymentList.push(obj.PaidTo);
		return null;
	});
	const dispatch = useDispatch();
	const install = (row) => {
		var arr = [];
		if (row.Chits.length > 0) {
			arr = row.Chits.filter((obj) => obj.ChitId === props.chitdetails._id);
			if (arr[0].IsPaidInstallment) {
				return true;
			} else {
				return false;
			}
		}
	};

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
		axios
			.post("http://localhost:5001/api/getPayments", {
				chit_id: props.chitdetails._id,
			})
			.then((res) => {
				if (res.data.status === "success") {
					setPayments(res.data.ChitPayments);
				}
			})
			.catch();
	}, [props.chitdetails.Template, props.chitdetails._id]);
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
					  ).map((row, index) => (
							<tr key={index}>
								<td>
									{paymentList.includes(row._id) ? <BsFillStarFill /> : null}
									&nbsp;
									{row.CustomerName}
								</td>
								<td>
									{
										template[0].Schema[props.chitdetails.CurrentMonth - 1]
											.Installment
									}
								</td>
								<td>
									{install(row) ? (
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
										disabled={install(row)}
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
										Recieved
									</Button>
									<Button
										style={{
											width: "10vw",
											padding: "4px",
											marginLeft: "10px",
										}}
										variant="outline-dark"
										disabled={paymentList.includes(row._id) ? true : false}
										onClick={() => {
											axios
												.post("http://localhost:5001/api/makeChitPayment", {
													chit_id: props.chitdetails._id,
													amount: parseInt(
														template[0].Schema[
															props.chitdetails.CurrentMonth - 1
														].Payment
													),
													paidto: row._id,
													month: props.chitdetails.CurrentMonth,
													date: format(new Date(), "dd/MM/yyyy"),
												})
												.then((res) => {
													if (res.data.status === "success") {
														setPayments(res.data.ChitPayments);
														alert("Succesfully recorded payment!!!");
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
