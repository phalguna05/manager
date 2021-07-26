import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { format } from "date-fns";
const Transactions = (props) => {
	const [transactions, setTransactions] = useState([]);
	const Customers = useSelector((state) => state.Customers);
	useEffect(() => {
		axios
			.post("http://localhost:5001/api/getTransactions", {
				chit_id: props.chit_id,
			})
			.then((res) => {
				if (res.data.status === "success") {
					setTransactions(res.data.Transactions);
				}
			})
			.catch();
	}, []);
	console.log(transactions);
	return (
		<Table hover size="md">
			<thead style={{ textAlign: "center" }}>
				<tr>
					<th>Name</th>
					<th>Amount</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody style={{ textAlign: "center" }}>
				{transactions.map((row) => (
					<tr>
						<td>{row.Name}</td>
						<td style={{ color: "green" }}>{row.Amount}</td>
						<td>{format(new Date(row.DateAndTime), "dd MMM yy")}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};
export default Transactions;
