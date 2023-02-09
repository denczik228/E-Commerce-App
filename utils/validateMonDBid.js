const mongoose = require('mongoose');

const validateMongDBid = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new Error('This id isnt valid or not found ');
}

module.exports = validateMongDBid;