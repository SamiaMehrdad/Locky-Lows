const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// User Model
var sysSchema = new Schema(
    {
        VIPRounds: [mongoose.Types.ObjectId],
    },
    {timestamps: true}
)

module.exports = mongoose.model("Sys", sysSchema);