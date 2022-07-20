
const express = require("express");

const ctrl = require("../../controllers/contacts");

const {ctrlWrapper} = require("../../helpers");

const {validation, isValidId} = require("../../middlewares");

const {add, updateStatusContact} = require("../../schemas");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validation(add), ctrlWrapper(ctrl.addContact));

router.put("/:id", isValidId, validation(add), ctrlWrapper(ctrl.updateContact));

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeContact));

router.patch("/:id/favorite", isValidId, validation(updateStatusContact), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;