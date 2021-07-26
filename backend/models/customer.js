const mongoose = require("mongoose");
const customerSchema = mongoose.Schema({
	CustomerName: {
		type: String,
		required: true,
	},
	Email: {
		type: String,
		required: true,
	},
	Mobile: {
		type: String,
		required: true,
	},
	UserId: {
		type: String,
		required: true,
	},
	Chits: {
		type: [String],
		required: true,
	},
	Transactions: [
		{
			ChitId: {
				type: String,
			},
			Amount: {
				type: String,
			},
			DateAndTime: {
				type: String,
			},
		},
	],
	IsPaidInstallment: {
		type: Boolean,
		required: true,
	},
});
const customer = mongoose.model("customers", customerSchema);
module.exports = customer;
