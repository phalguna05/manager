import React from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { Container, Row, Col } from "react-bootstrap";
import "../ViewChits/ViewChits.css";
import "./ChitPayments.css";
const ChitPayments = () => {
	const Chits = useSelector((state) => state.Chits);
	const Customers = useSelector((state) => state.Customers);
	var arr = [];
	var chitList = [];
	var customerName = [];
	const date = format(new Date(), "dd/MM/yyyy");
	const month = date.substring(3, 5);
	Chits.map((chit) => {
		var res = chit.ChitPayments.filter(
			(payment) => payment.DateAndTime.substring(3, 5) === month
		);
		res.map((obj) => {
			arr.push(obj);
			chitList.push(chit.ChitName);
			return null;
		});
		return null;
	});
	if (Customers.length > 0) {
		arr.map((obj) => {
			var ans = Customers.filter((cust) => cust._id === obj.PaidTo);
			customerName.push(ans[0].CustomerName);
			return null;
		});
	}
	return (
		<div className="chitpayments_card" style={{ padding: "15px" }}>
			<h6 className="head">Recent Chit Payments...</h6>
			{arr.map((pay, index) => (
				<div className="ind_card" key={index}>
					<Container>
						<Row>
							<Col>
								<label className="label_item">Chit Name: </label>
							</Col>
							<Col>
								<p className="text_item">{chitList[index]}</p>
							</Col>
							<Col>
								<label className="label_item">Member Name: </label>
							</Col>
							<Col>
								<p className="text_item">{customerName[index]}</p>
							</Col>
						</Row>
						<Row>
							<Col>
								<label className="label_item">Amount: </label>
							</Col>
							<Col>
								<p className="text_item">&#8377;{pay.Amount}</p>
							</Col>
							<Col>
								<label className="label_item">Date: </label>
							</Col>
							<Col>
								<p className="text_item">{pay.DateAndTime}</p>
							</Col>
						</Row>
					</Container>
				</div>
			))}
		</div>
	);
};
export default ChitPayments;
