const { createError } = require("../../helpers");

const {Contact} = require("../../models/contact");

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
        throw createError(404);
    }
    res.json({
        status: 'success', code: 200, data: { result } 
    });
}

module.exports = getById;