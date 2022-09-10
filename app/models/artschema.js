const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artSchema = new Schema({
    name: String,
    email: String,
    address: String,
    phone: Number,

});

const myData = mongoose.model("myData", artSchema);
// Export the model
module.exports = myData;
