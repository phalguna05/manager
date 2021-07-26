const express = require("express");
const router = express.Router();
const template = require("../models/template.js");
router.post("/setTemplates", async (req, res) => {
	const data = {
		UserId: req.body.user_id,
		TemplateId: req.body.template_id,
		Schema: req.body.schema,
	};
	const newTemplate = new template(data);
	try {
		await newTemplate.save();
		const templates = await template.find({ UserId: req.body.user_id });
		res.status(201).send({ status: "success", Templates: templates });
	} catch (error) {
		res.status(409).send({ status: "failure", errorMsg: error });
	}
});
router.post("/getTemplates", async (req, res) => {
	try {
		const templates = await template.find({ UserId: req.body.user_id });
		if (templates) {
			return res.status(201).send({ status: "success", Templates: templates });
		} else {
			return res.status(201).send({ status: "notemplates" });
		}
	} catch (error) {
		return res.status(409).send({ status: "failure" });
	}
});
router.post("/getTemplateById", async (req, res) => {
	try {
		const templates = await template.find({ TemplateId: req.body.template_id });
		if (templates) {
			return res.status(201).send({ status: "success", Templates: templates });
		} else {
			return res.status(201).send({ status: "notemplates" });
		}
	} catch (error) {
		return res.status(409).send({ status: "failure" });
	}
});
module.exports = router;
