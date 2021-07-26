const mongoose = require("mongoose");
const templateSchema = mongoose.Schema({
	UserId: {
		type: String,
		required: true,
	},
	TemplateId: {
		type: String,
		required: true,
	},
	Schema: [
		{
			Month: {
				type: Number,
			},
			Installment: {
				type: String,
			},
			Payment: {
				type: String,
			},
		},
	],
});
const template = mongoose.model("template", templateSchema);
module.exports = template;
