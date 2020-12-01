const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// User Model
var sysSchema = new Schema(
    {
        VIPRounds: [{ type: mongoose.Types.ObjectId, ref:"Round"}],
    },
    {timestamps: true}
)

module.exports = mongoose.model("Sys", sysSchema);