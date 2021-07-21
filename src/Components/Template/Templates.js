import react, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Template.css";
import { Accordion, Card, Button, Table } from "react-bootstrap";
const Template = () => {
	const [newTemplate, setNewTemplate] = useState([]);
	const [months, setMonths] = useState("");
	const [tempId, setTempId] = useState("");
	const [display, setDisplay] = useState(false);
	const handleCreate = () => {
		var arr = [];
		for (let i = 0; i < months; i++) {
			arr.push({ month: i + 1, installment: 0, payment: 0 });
		}
		setNewTemplate(arr);
		setDisplay(true);
	};
	const handleSave = () => {
		console.log(newTemplate);
	};
	console.log(newTemplate);
	return (
		<div className="template">
			<Navbar />
			<div className="template_top">
				<Accordion>
					<Card>
						<Card.Header>
							<Accordion.Toggle as={Button} variant="link" eventKey="0">
								See All Templates...
							</Accordion.Toggle>
						</Card.Header>
						<Accordion.Collapse eventKey="0">
							<Card.Body></Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
			</div>
			<div className="template_bottom">
				<div className="inputt">
					<input
						type="text"
						placeholder="Template Id"
						className="form-control"
						id="months_in"
						name="templateId"
						onChange={(e) => setTempId(e.target.value)}
						value={tempId}
					/>
					<input
						type="text"
						placeholder="Months"
						className="form-control"
						id="months_in"
						name="months"
						onChange={(e) => setMonths(e.target.value)}
						value={months}
					/>

					<Button
						className="create_template"
						variant="outline-info"
						onClick={handleCreate}
					>
						Create Template
					</Button>
					<Button
						className="create_template"
						variant="outline-info"
						onClick={handleSave}
					>
						Save Template
					</Button>
				</div>
				{display ? (
					<Table className="temp_table" responsive="sm">
						<thead>
							<tr>
								<th>Month Number</th>
								<th>Installment</th>
								<th>Payment</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{newTemplate.map((temp) => (
								<tr>
									<td>{temp.month}</td>
									<td>
										<input
											type="text"
											name="installment"
											className="form-control"
											value={temp.installment}
										/>
									</td>
									<td>
										<input
											type="text"
											className="form-control"
											placeholder={temp.payment}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				) : (
					<h1></h1>
				)}
			</div>
		</div>
	);
};
export default Template;
