import { useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";
import { addAllCustomers, addUser } from "../../Actions/actions";
import ChitPayments from "../ChitPayments/ChitPayments";
import ViewChits from "../ViewChits/ViewChits";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { format } from "date-fns";
const Dashboard = () => {
	const login = useParams().login;
	const Chits = useSelector((state) => state.Chits);
	const date = format(new Date(), "yyyy/MM/dd");
	const month = date.substring(5, 8);
	var transactionsSum = 0;
	var count = 0;
	Chits.map((obj) => {
		obj.Transactions.map((trans) => {
			if (trans.DateAndTime.substring(5, 8) === month) {
				transactionsSum += parseInt(trans.Amount);
				count += 1;
			}
			return null;
		});
		return null;
	});
	var dueSum = 0;
	var dueCount = 0;
	Chits.map((obj) => {
		obj.DueList.map((due) => {
			if (due.DueAmount !== 0) {
				dueSum += parseInt(due.DueAmount);
				dueCount += 1;
			}
			return null;
		});
		return null;
	});
	const customers = useSelector((state) => state.Customers);

	const dispatch = useDispatch();
	useEffect(() => {
		axios
			.post("http://localhost:5001/api/getUserById", { user_id: login })
			.then((res) => {
				if (res.data.status === "success") {
					dispatch(addUser(res.data.User));
				}
			});
		if (customers.length === 0) {
			axios
				.post("http://localhost:5001/api/getCustomers", { UserId: login })
				.then((res) => {
					if (res.data.status === "success") {
						dispatch(addAllCustomers(res.data.Customers));
					} else {
						//alert(res.data.message);
					}
				})
				.catch();
		}
	}, [customers.length, dispatch, login]);
	return (
		<>
			<Navbar />
			<div className="dashboard">
				<div className="left_dashboard">
					<ViewChits />
				</div>
				<div className="right_dashboard">
					<div className="right_first">
						<div className="total_duelists">
							<h4 className="heading">Total Dues </h4>
							<h5 className="value">&#8377;{dueSum}</h5>
							<hr size="12" width="100%"></hr>
							<p
								style={{
									fontFamily: "Times New Roman, Times, serif",
									marginLeft: "1.5vw",
									fontSize: "15px",
								}}
							>
								From <b>{dueCount}</b> different accounts.
							</p>
						</div>
						<div className="total_transactions">
							<h4 className="heading">Total Payments this month. </h4>
							<h5 className="value">&#8377;{transactionsSum}</h5>
							<hr size="12" width="100%"></hr>
							<p
								style={{
									fontFamily: "Times New Roman, Times, serif",
									marginLeft: "1.5vw",
									fontSize: "15px",
								}}
							>
								From <b>{count}</b> different accounts.
							</p>
						</div>
					</div>
					<div className="right_second">
						<ChitPayments />
					</div>
				</div>
			</div>
		</>
	);
};
export default Dashboard;
