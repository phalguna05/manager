import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./CreateChit.css";
import { useSelector, useDispatch } from "react-redux";
import { addSingleChit } from "../../Actions/actions";
import { useHistory } from "react-router-dom";
const CreateChit = () => {
	const dispatch = useDispatch();
	const User = useSelector((state) => state.User);
	const history = useHistory();
	const [chit, setChit] = useState({
		ChitName: "",
		StartDate: "",
		Months: "",
		Members: "",
		Template: "",
		UserId: User._id,
		EndDate: "",
	});
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setChit({ ...chit, [name]: value });
	};
	const handleCreate = () => {
		var day = chit.StartDate.slice(8);
		var mon = parseInt(chit.StartDate.slice(5, 7));
		var year = parseInt(chit.StartDate.slice(0, 4));
		var resMon = (mon + parseInt(chit.Months)) % 12;
		var resYear = year + Math.ceil((parseInt(chit.Months) - (12 - mon)) / 12);
		const end = resYear.toString() + "-" + "0" + resMon.toString() + "-" + day;
		const data = {
			chit_name: chit.ChitName,
			start_date: chit.StartDate,
			user_id: chit.UserId,
			months: chit.Months,
			members: chit.Members,
			template: chit.Template,
			chit_members: [],
			transactions: [],
			due_lists: [],
			chit_payments: [],
			end_date: end,
			current_month: 1,
		};
		axios
			.post("http://localhost:5001/api/createChit", data)
			.then((res) => {
				if (res.data.status == "success") {
					console.log(res.data.ChitData);
					dispatch(addSingleChit(res.data.ChitData));
					alert("Chit Created succesfully!!");
				} else {
					alert(res.data.message);
				}
			})
			.catch();
	};
	return (
		<div className="create_chit">
			<div className="form-group">
				<input
					type="text"
					placeholder="Chit Name"
					className="form-control"
					name="ChitName"
					onChange={handleChange}
					value={chit.ChitName}
				/>
				<input
					placeholder="Start Date"
					className="form-control"
					type="date"
					name="StartDate"
					onChange={handleChange}
					value={chit.StartDate}
				/>
				<input
					type="text"
					placeholder="Number of Months"
					className="form-control"
					name="Months"
					onChange={handleChange}
					value={chit.Months}
				/>
				<input
					type="text"
					placeholder="Number of Members"
					className="form-control"
					name="Members"
					onChange={handleChange}
					value={chit.Members}
				/>
				<input
					type="text"
					placeholder="Template Id"
					className="form-control"
					name="Template"
					onChange={handleChange}
					value={chit.Template}
				/>
				<Button
					variant="outline-info"
					className="create_button"
					onClick={handleCreate}
				>
					Create Chit
				</Button>
			</div>
		</div>
	);
};
export default CreateChit;
