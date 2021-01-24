const mongoose = require('mongoose');

module.exports = (db) => {
    const daySchema = new db.Schema({
       time: {
           type: [String],
           required: true
       }
    });

    return db.model('days', daySchema);
}