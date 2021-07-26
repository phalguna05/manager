const express = require("express");
const router = express.Router();
const customer = require("../models/customer.js");
router.post("/getCustomers", async (req, res) => {
	console.log(req);
	try {
		const customers = await customer.find({ UserId: req.body.UserId });
		if (customers.length > 0) {
			return res.status(201).send({ status: "success", Customers: customers });
		} else {
			return res.status(201).send({ status: "failure" });
		}
	} catch (error) {
		res.status(404).send({ message: error.message });
	}
});
router.post("/addCustomer", async (req, res) => {
	const data = {
		CustomerName: req.body.CustomerName,
		Email: req.body.Email,
		Mobile: req.body.Mobile,
		UserId: req.body.UserId,
		Chits: [],
		IsPaidInstallment: false,
	};
	const newCustomer = new customer(data);
	try {
		await newCustomer.save();
		res.status(201).send({ status: "success", details: newCustomer });
	} catch (error) {
		res.status(409).send({ message: error.message });
	}
});
router.post("/addChit", async (req, res) => {
	try {
		const customerDetails = await customer.findOne({
			_id: req.body.customer_id,
		});
		var newCustomerDetails = customerDetails;
		newCustomerDetails.Chits.push(req.body.chit_id);
		await newCustomerDetails.save();
		res.status(201).send({ status: "success" });
	} catch (error) {
		res.status(409).send(error.message);
	}
});
router.post("/removeChitFromCustomer", async (req, res) => {
	try {
		const customerDetails = await customer.findOne({
			_id: req.body.customer_id,
		});
		var newCustomerDetails = customerDetails;
		newCustomerDetails.Chits = newCustomerDetails.Chits.filter((chit) => {
			chit !== req.body.chit_id;
		});
		await newCustomerDetails.save();
		res.status(201).send({ status: "success" });
	} catch (error) {
		res.status(409).send(error.message);
	}
});
router.post("/makeTransactionInCustomerAccount", async (req, res) => {
	try {
		const customerDetails = await customer.findOne({
			_id: req.body.customer_id,
		});
		var arr = customerDetails.Transactions;
		arr.push({
			ChitId: req.body.chit_id,
			Amount: req.body.amount,
			DateAndTime: req.body.date,
		});

		var newCustomerDetails = customerDetails;
		newCustomerDetails.Transactions = arr;
		newCustomerDetails.IsPaidInstallment = true;
		await newCustomerDetails.save();
		res.status(201).send({ status: "success" });
	} catch (error) {
		res.status(409).send(error.message);
	}
});
module.exports = router;
