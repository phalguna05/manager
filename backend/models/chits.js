const mongoose = require("mongoose");
const chitSchema = mongoose.Schema({
	ChitName: {
		type: String,
		required: true,
	},
	StartDate: {
		type: String,
		required: true,
	},
	Months: {
		type: String,
		required: true,
	},
	Members: {
		type: String,
		required: true,
	},
	EndDate: {
		type: String,
		required: true,
	},
	Template: {
		type: String,
		required: true,
	},
	UserId: {
		type: String,
		required: true,
	},
	ChitMembers: {
		type: [String],
		required: true,
	},
	DueList: [
		{
			MemberName: {
				type: String,
			},
			MemberId: {
				type: String,
			},
			DueAmount: {
				type: Number,
			},
			CurrentAmount: {
				type: Number,
			},
		},
	],
	Transactions: [
		{
			From: {
				type: String,
			},
			Amount: {
				type: Number,
			},
			DateAndTime: {
				type: String,
			},
			Name: {
				type: String,
			},
		},
	],
	CurrentMonth: {
		type: Number,
	},
	ChitPayments: [
		{
			PaidTo: {
				type: String,
			},
			Amount: {
				type: Number,
			},
			Month: {
				type: Number,
			},
			DateAndTime: {
				type: String,
			},
		},
	],
});
const chits = mongoose.model("chits", chitSchema);
module.exports = chits;
