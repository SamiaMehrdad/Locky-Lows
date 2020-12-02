/*
* Project: Lucky Lows
* Module: Data model
* Target: Whole
* Comment: Static system variables (single document)
-----------------------------------------------*/
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