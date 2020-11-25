const mongoose = require('mongoose');
const user = require("./user");

// User Model
var roundSchema = new mongoose.Schema(
    {
        title: String,
        fee: { type: Number, default: 10}, // LLpoints fee to join this room
        start: Date,     // the moment that this room starts
        end: Date,       // the moment that this room ends
        counter: Number, // countdown timer for room run limitaion, also -1 means infinit
        desc: String,
        isActive: Boolean,
        subjects: [subjectSchema],
    },
    {timestamps: true}
);

var subjectSchema = new mongoose.Schema(
    {
       name: String,
       url: String,
       index: Number, // for casting images with numbers
       touchers: [userSchema],
      // stackholders: [betSchema],      
    }
);

module.exports = mongoose.model("Round", roundSchema);