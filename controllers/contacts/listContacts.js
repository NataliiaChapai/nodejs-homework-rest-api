const {Contact} = require('../../models/contact');

const listContacts = async (req, res)=> {
    const {_id} = req.user;
    const {page = 1, limit = 20, favorite} = req.query;
    const skip = (page - 1) * limit;
    let query = {owner: _id, favorite};
    
    if (favorite) {
        query = {...query, favorite};
    }
    
    const result = await Contact.find(query, '', {skip, limit: Number(limit)}).populate('owner', '_id, name, email');
    
    res.json({
        status: 'success', code: 200, data: { result } 
    });
}

module.exports = listContacts;