//server/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        id: Number,
        ans: String
});

module.exports = mongoose.model('Data', DataSchema);
