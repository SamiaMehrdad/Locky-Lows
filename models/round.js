const mongoose = require('mongoose');
const user = require("./user");

var subjectSchema = new mongoose.Schema(
    {
       text: String,
       url: String,
       index: Number, // for casting images with numbers
       backColor: String, // hex value as string from colorpicker
       textColor: String,
      // touchers: [user],
      // stackholders: [betSchema],      
    },
    {timestamps: true}
);
// User Model
var roundSchema = new mongoose.Schema(
    {
        owner: String,
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



module.exports = mongoose.model("Round", roundSchema);