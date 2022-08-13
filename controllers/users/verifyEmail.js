const { User } = require('../../models');
const createError = require('../../helpers/createError');

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({verificationToken});
    if (!user) {
        throw createError(404);
    }
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null});
    res.json({
        message: 'Verification successful'
    })
}

module.exports = verifyEmail;