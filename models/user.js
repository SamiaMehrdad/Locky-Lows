/*
* Project: Lucky Lows
* Module: Data model
* Target: Whole
* Comment: 
-----------------------------------------------*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// User Model
var userSchema = new Schema(
    {
        name: String,
        email: String,
        avatar: String,
        googleId: String,
        coins: Number,     // LLcoins can goes negative too
        joinDate: Date,     // useful for tracking user loyalty
        lastJoin: Date,
        role: String,
        nickname: String,
        isActive: Boolean,
        isNewbe: Boolean,
    },
    {timestamps: true}
)

module.exports = mongoose.model("User", userSchema);