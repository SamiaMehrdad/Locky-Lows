const mongoose = require('mongoose');

// User Model
var userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        avatar: String,
        googleId: String,
        points: Number,     // LLpoints can goes negative too
        joinDate: Date,     // useful for tracking user loyalty
        lastJoin: Date,
        role: String,
        nickname: String,
        isActive: Boolean,
    },
    {timestamps: true}
)

module.exports = mongoose.model("User", userSchema);