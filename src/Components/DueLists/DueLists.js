import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
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
	}, [props.chit_id]);
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
				{dues.map((row) =>
					row.DueAmount !== 0 ? (
						<tr>
							<td>{row.MemberName}</td>
							<td>{row.DueAmount}</td>

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
					) : null
				)}
			</tbody>
		</Table>
	);
};
export default DueLists;
