const express = require("express");

const ctrl = require("../../controllers/users");

const {ctrlWrapper} = require("../../helpers");
const {validation, user} = require("../../middlewares");

const {signupSchema, loginSchema} = require('../../schemas');

const router = express.Router();

router.post('/signup', validation(signupSchema), ctrlWrapper(ctrl.signup))

router.post('/login', validation(loginSchema), ctrlWrapper(ctrl.login))

router.get('/current', user, ctrlWrapper(ctrl.getCurrent));

router.get('/logout', user, ctrlWrapper(ctrl.logout));

router.patch('/', user, ctrlWrapper(ctrl.updateSubscription));

module.exports = router;