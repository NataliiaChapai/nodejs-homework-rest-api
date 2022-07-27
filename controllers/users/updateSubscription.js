const {User} = require('../../models');
const { createError } = require("../../helpers");
const {patchSchema} = require('../../schemas')

const updateSubscription = async(req, res) => {
    const {error} = patchSchema.validate(req.body);
    if (error) {
        throw createError(400, error.message)
    }
    const {_id, email} = req.user;
    const {subscription} = req.body;
    const result = await User.findByIdAndUpdate(_id, {subscription});
    if (!result) {
        throw createError(404);
    }
    res.json({
        user: {
            email,
            subscription
        }
    });
}

module.exports = updateSubscription;