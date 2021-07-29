import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./Template.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Accordion, Card, Button, Table } from "react-bootstrap";
const Template = () => {
	const User = useSelector((state) => state.User);
	const [newTemplate, setNewTemplate] = useState([]);
	const [months, setMonths] = useState("");
	const [tempId, setTempId] = useState("");
	const [display, setDisplay] = useState(false);
	const [templates, setTemplates] = useState([]);
	useEffect(() => {
		axios
			.post("http://localhost:5001/api/getTemplates", {
				user_id: User._id,
			})
			.then((res) => {
				if (res.data.status === "success") {
					setTemplates(res.data.Templates);
				}
			})
			.catch();
	}, [User._id]);
	const handleCreate = () => {
		var arr = [];
		for (let i = 0; i < months; i++) {
			arr.push({ Month: i + 1, Installment: 0, Payment: 0 });
		}
		setNewTemplate(arr);
		setDisplay(true);
	};
	const handleSave = () => {
		axios
			.post("http://localhost:5001/api/setTemplates", {
				user_id: User._id,
				template_id: tempId,
				schema: newTemplate,
			})
			.then((res) => {
				if (res.data.status === "success") {
					setTemplates(res.data.Templates);
					setNewTemplate([]);
					setDisplay(false);
					setMonths(0);
					setTempId(0);
					alert("Template is saved.");
				} else {
					alert(res.data.message);
				}
			})
			.catch();
	};

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
							<Card.Body>
								<div className="template_tables">
									{templates.map((template, index) => (
										<div key={index}>
											<label
												style={{
													marginLeft: "5vw",
													fontWeight: "bold",
													marginBottom: "0px",
												}}
												for="table"
											>
												Template Id : {template.TemplateId}
											</label>
											<Table
												id="table"
												className="templateTable"
												striped
												borderd
												hover
												size="sm"
												style={{
													width: "30vw",
													maxHeight: "10vh",
													marginTop: "10px",
												}}
											>
												<thead>
													<tr>
														<th>Month</th>
														<th>Installment</th>
														<th>Payment</th>
													</tr>
												</thead>
												<tbody style={{ height: "20vh", overflow: "auto" }}>
													{template.Schema.map((row, index) => (
														<tr key={index}>
															<th>{row.Month}</th>
															<th>{row.Installment}</th>
															<th>{row.Payment}</th>
														</tr>
													))}
												</tbody>
											</Table>
										</div>
									))}
								</div>
							</Card.Body>
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
						id="months"
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
							{newTemplate.map((temp, index) => (
								<tr key={index}>
									<td>{temp.Month}</td>
									<td>
										<input
											type="text"
											name="installment"
											className="form-control"
											placeholder={temp.Installment}
											onChange={(e) => {
												var newArr = newTemplate;
												newArr[index].Installment = e.target.value;
												setNewTemplate(newArr);
											}}
										/>
									</td>
									<td>
										<input
											type="text"
											className="form-control"
											placeholder={temp.Payment}
											onChange={(e) => {
												var newArr = newTemplate;
												newArr[index].Payment = e.target.value;
												setNewTemplate(newArr);
											}}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				) : null}
			</div>
		</div>
	);
};
export default Template;
