
const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://bhairav:@cluster0.bhairavegntrzq.mongodb.net/skill-tank");


module.exports={
    connection
}
