const express = require("express");
const router = express.Router();
const chit = require("../models/chits.js");
router.post("/getChits", async (req, res) => {
	try {
		const chits = await chit.find({ UserId: req.body.userId });
		if (chits) {
			return res.status(201).send({ status: "success", Chits: chits });
		} else {
			return res.status(201).send({ status: "failure" });
		}
	} catch (error) {
		res.status(404).send({ message: error.message });
	}
});
router.post("/createChit", async (req, res) => {
	const data = {
		ChitName: req.body.chit_name,
		StartDate: req.body.start_date,
		Months: req.body.months,
		Members: req.body.members,
		EndDate: req.body.end_date,
		Template: req.body.template,
		UserId: req.body.user_id,
		ChitMembers: req.body.chit_members,
		DueList: req.body.due_lists,
		Transactions: req.body.transactions,
		CurrentMonth: req.body.current_month,
	};
	const newChit = new chit(data);
	try {
		await newChit.save();
		const chitData = await chit.findOne({ ChitName: req.body.chit_name });

		res.status(201).send({ status: "success", ChitData: chitData });
	} catch (error) {
		res.status(409).send({ message: error.message });
	}
});
router.post("/addMember", async (req, res) => {
	try {
		const chitDetails = await chit.findOne({ _id: req.body.chit_id });

		var newChitDetails = chitDetails;
		newChitDetails.ChitMembers.push(req.body.customer_id);
		var arr = newChitDetails.ChitMembers;
		await newChitDetails.save();
		res.status(201).send({ status: "success", ChitMembers: arr });
	} catch (error) {
		res.status(409).send(error.message);
	}
});
router.post("/removeMemberFromChit", async (req, res) => {
	try {
		const chitDetails = await chit.findOne({ _id: req.body.chit_id });
		var newChitDetails = chitDetails;
		console.log(newChitDetails.ChitMembers);
		console.log(req.body);
		var arr = newChitDetails.ChitMembers.filter(
			(member) => member !== req.body.customer_id
		);
		newChitDetails.ChitMembers = arr;
		await newChitDetails.save();
		res.status(201).send({ status: "success", ChitMembers: arr });
	} catch (error) {
		res.status(409).send(error.message);
	}
});
router.post("/getMembers", async (req, res) => {
	try {
		const chitDetails = await chit.findOne({ ChitName: req.body.chit_name });
		var arr = chitDetails.ChitMembers;
		res.status(201).send({ status: "success", ChitMembers: arr });
	} catch (error) {
		res.status(409).send(error.message);
	}
});
router.post("/setDue", async (req, res) => {
	try {
		const chitDetails = await chit.findOne({ _id: req.body.chit_id });
		var arr = chitDetails.DueList;
		arr.push({
			MemberName: req.body.customer_name,
			MemberId: req.body.customer_id,
			Amount: req.body.amount,
		});
		var newChitDetails = chitDetails;
		newChitDetails.DueList = arr;
		await newChitDetails.save();
		res.status(201).send({ status: "success" });
	} catch (error) {
		res.status(409).send(error.message);
	}
});
router.post("/getDues", async (req, res) => {
	try {
		const chitDetails = await chit.findOne({ _id: req.body.chit_id });
		var arr = chitDetails.DueList;
		res.status(201).send({ status: "success", DueLists: arr });
	} catch (error) {
		res.status(409).send(error.message);
	}
});
router.post("/makeTransactionInChit", async (req, res) => {
	try {
		const chitDetails = await chit.findOne({ _id: req.body.chit_id });
		var arr = chitDetails.Transactions;
		arr.push({
			From: req.body.from,
			Amount: req.body.amount,
			DateAndTime: req.body.date,
			Name: req.body.name,
		});
		var newChitDetails = chitDetails;
		newChitDetails.Transactions = arr;
		await newChitDetails.save();
		res.status(201).send({ status: "success" });
	} catch (error) {
		res.status(409).send(error.message);
	}
});
router.post("/getTransactions", async (req, res) => {
	try {
		const chitDetails = await chit.findOne({ _id: req.body.chit_id });
		var arr = chitDetails.Transactions;
		res.status(201).send({ status: "success", Transactions: arr });
	} catch (error) {
		res.status(409).send(error.message);
	}
});
module.exports = router;
