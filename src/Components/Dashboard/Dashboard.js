import react from "react";
import "./Dashboard.css";
import Transactions from "../Transactions/Transactions";
import DueLists from "../DueLists/DueLists";
import ViewChits from "../ViewChits/ViewChits";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
const Dashboard = () => {
	const User = useSelector((state) => state.User);
	console.log(User);
	return (
		<>
			<Navbar />
			<div className="dashboard">
				<div className="left_dashboard">
					<ViewChits />
				</div>
				<div className="right_dashboard">
					<div className="right_first">
						<Transactions />
					</div>
					<div className="right_second">
						<DueLists />
					</div>
				</div>
			</div>
		</>
	);
};
export default Dashboard;
