import React, { useState } from "react";
import "./Chit.css";
import ChitDetail from "../ChitDetail/ChitDetail";
import { parseISO, format } from "date-fns";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";
const Chit = (props) => {
	const [modalShow, setModalShow] = useState(false);
	const handleClose = () => {
		setModalShow(false);
	};
	const history = useHistory();
	const dateFormatter = (str) => {
		const date = parseISO(str);
		return format(date, "MMM yy");
	};
	return (
		<div className="individual_card">
			<div className="top_section">
				<p className="column_name">Chit Id : </p>
				<p className="field_value">{props.details._id}</p>
			</div>
			<div className="bottom_section">
				<div className="left_section">
					<table className="table_section">
						<tr>
							<th></th>
							<th></th>
						</tr>
						<tr>
							<td>
								<p className="column_name">Chit Name </p>
							</td>
							<td>
								{" "}
								<p className="field_value">: {props.details.ChitName}</p>
							</td>
						</tr>
					</table>
					<DeleteIcon fontSize="small" />
				</div>
				<div className="right_section">
					<table className="table_section">
						<tr>
							<th></th>
							<th></th>
							<th></th>
						</tr>
						<tr>
							<td>
								{" "}
								<p className="field_value">
									{" "}
									{dateFormatter(props.details.StartDate)}
								</p>
							</td>
							<td>
								<p className="field_value">to</p>
							</td>
							<td>
								{" "}
								<p className="field_value">
									{" "}
									{dateFormatter(props.details.EndDate)}
								</p>
							</td>
						</tr>
					</table>

					<Button
						className="links"
						variant="link"
						onClick={() => setModalShow(true)}
					>
						View Details...
					</Button>
				</div>
				<MyVerticallyCenteredModal
					show={modalShow}
					onHide={() => setModalShow(false)}
					details={props.details}
					keyboard="false"
				/>
			</div>
		</div>
	);
};
function MyVerticallyCenteredModal(props) {
	return (
		<Modal
			{...props}
			size="xl"
			aria-labelledby="example-custom-modal-styling-title"
			keyboard={false}
			backdrop="static"
			style={{ zIndex: "2000" }}
		>
			<Modal.Header closeButton>
				<Modal.Title
					style={{
						fontFamily: '"Times New Roman", Times, serif',
						fontWeight: "bold",
						color: "rgb(0, 169, 175)",
						marginLeft: "45%",
					}}
				>
					Chit Details
				</Modal.Title>
			</Modal.Header>
			<ChitDetail info={props.details} />
		</Modal>
	);
}

export default Chit;
