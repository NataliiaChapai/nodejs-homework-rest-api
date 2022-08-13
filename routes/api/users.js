const express = require("express");

const ctrl = require("../../controllers/users");

const {ctrlWrapper} = require("../../helpers");
const {validation, user, upload} = require("../../middlewares");

const {signupSchema, loginSchema} = require('../../schemas');

const router = express.Router();

router.post('/signup', validation(signupSchema), ctrlWrapper(ctrl.signup))

router.post('/login', validation(loginSchema), ctrlWrapper(ctrl.login))

router.get('/current', user, ctrlWrapper(ctrl.getCurrent));

router.get('/logout', user, ctrlWrapper(ctrl.logout));

router.patch('/avatars', user, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

router.patch('/', user, ctrlWrapper(ctrl.updateSubscription));

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));

router.get('/verify', ctrlWrapper(ctrl.resendVerifyEmail));

module.exports = router;