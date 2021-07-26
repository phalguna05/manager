import React, { useState, useEffect } from "react";
import "./ViewChits.css";
import Fab from "@material-ui/core/Fab";
import AppBar from "@material-ui/core/AppBar";
import { Modal } from "react-bootstrap";
import CreateChit from "../CreateChit/CreateChit";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";
import Chit from "../Chit/Chit";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import { addChits } from "../../Actions/actions";
import { useSelector, useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
	appBar: {
		top: "91.9%",
		bottom: 0,
		height: "8%",
		backgroundColor: "#DCDCDC",
	},
	fabButton: {
		position: "absolute",
		zIndex: 1,
		top: -30,
		left: 0,
		right: 0,
		margin: "0 auto",
		background: "#B8B8B8",
	},
}));
const ViewChits = () => {
	const classes = useStyles();
	const Chits = useSelector((state) => state.Chits);
	console.log(Chits);
	const dispatch = useDispatch();
	const User = useSelector((state) => state.User);
	const [modalShow, setModalShow] = useState(false);
	useEffect(() => {
		axios
			.post("http://localhost:5001/api/getChits", { userId: User._id })
			.then((res) => {
				if (res.data.status == "success") {
					if (Chits.length == 0) dispatch(addChits(res.data.Chits));
				} else {
					alert(res.data.message);
				}
			})
			.catch();
	}, []);
	return (
		<div className="chits_card">
			<CssBaseline />
			<div className="chit_list">
				{Chits.map((chit) => (
					<Chit details={chit} />
				))}
			</div>
			<AppBar position="sticky" color="primary" className={classes.appBar}>
				<Toolbar>
					<Fab
						color="primary"
						aria-label="add"
						className={classes.fabButton}
						onClick={() => setModalShow(true)}
					>
						<AddIcon />
					</Fab>
				</Toolbar>
			</AppBar>

			<MyVerticallyCenteredModal
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
		</div>
	);
};
function MyVerticallyCenteredModal(props) {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			backdrop="static"
			style={{ zIndex: "2000" }}
		>
			<Modal.Header closeButton>
				<Modal.Title
					style={{
						fontFamily: '"Times New Roman", Times, serif',
						fontWeight: "bold",
						color: "rgb(0, 169, 175)",
						marginLeft: "24vw",
					}}
				>
					Create Chit
				</Modal.Title>
			</Modal.Header>
			<CreateChit />
		</Modal>
	);
}
export default ViewChits;
