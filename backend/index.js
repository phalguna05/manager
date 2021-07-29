const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const login = require("./routes/login");
const chit = require("./routes/chit");
const customers = require("./routes/customer");
const templates = require("./routes/templates");
const cron = require("node-cron");
const { default: axios } = require("axios");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", login);
app.use("/api", chit);
app.use("/api", customers);
app.use("/api", templates);
const url = "mongodb://127.0.0.1:27017/chits";
const port = process.env.PORT || 5001;

// cron.schedule("* * * * *", () => {
// 	resetInstallments();
// 	resetDues();
// });
mongoose
	.connect(url, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		app.listen(port, () => console.log("Server is running on ", port))
	)
	.catch((error) => console.log(error.message));
const resetInstallments = () => {
	axios
		.post("http://localhost:5001/api/setInitialInstallments", { id: "hell" })
		.then((res) => {
			console.log(res);
		})
		.catch((error) => {
			console.log(error);
		});
};
const resetDues = () => {
	axios
		.post("http://localhost:5001/api/setMonthlyDues", { id: "hell" })
		.then((res) => {
			console.log(res);
		})
		.catch((error) => {
			console.log(error);
		});
};
