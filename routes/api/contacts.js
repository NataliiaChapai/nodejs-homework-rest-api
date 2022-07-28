
const express = require("express");

const ctrl = require("../../controllers/contacts");

const {ctrlWrapper} = require("../../helpers");

const {validation, isValidId, user} = require("../../middlewares");

const {add, updateStatusContact} = require("../../schemas");

const router = express.Router();

router.get("/", user, ctrlWrapper(ctrl.listContacts));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", user, validation(add), ctrlWrapper(ctrl.addContact));

router.put("/:id", isValidId, validation(add), ctrlWrapper(ctrl.updateContact));

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeContact));

router.patch("/:id/favorite", isValidId, validation(updateStatusContact), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;