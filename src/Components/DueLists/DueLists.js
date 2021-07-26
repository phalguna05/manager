import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
const DueLists = (props) => {
	const [dues, setDues] = useState([]);
	useEffect(() => {
		axios
			.post("http://localhost:5001/api/getDues", {
				chit_id: props.chit_id,
			})
			.then((res) => {
				if (res.data.status === "success") {
					setDues(res.data.DueLists);
				}
			})
			.catch();
	}, []);
	console.log(dues);
	return (
		<Table hover size="md">
			<thead style={{ textAlign: "center" }}>
				<tr>
					<th>Member</th>
					<th>Previous Due</th>
					<th></th>
				</tr>
			</thead>
			<tbody style={{ textAlign: "center" }}>
				{dues.map((row) => (
					<tr>
						<td>{row.MemberName}</td>
						<td>{row.Amount}</td>

						<td>
							<Button
								variant="outline-dark"
								style={{
									width: "10vw",
									padding: "4px",
								}}
								size="md"
							>
								Paid
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};
export default DueLists;
