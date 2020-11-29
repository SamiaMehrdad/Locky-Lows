const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//const user = require("./user");

// Result Model
var resultSchema = new Schema(
    {
        winnerL1: [{type: Schema.Types.ObjectId, ref:"User"}], //users id
        loserL1: [{type: Schema.Types.ObjectId, ref:"User"}], //users id
        doneDate: Date,
        
    },
    {timestamps: true}
);
// Subject Model
var subjectSchema = new Schema(
    {
       text: String,
       url: String,
       index: Number, // for casting images with numbers
       backColor: String, // hex value as string from colorpicker
       textColor: String,
       touchers: [{ type: mongoose.Types.ObjectId, ref:"User"}],
      // stackholders: [betSchema],      
    },
    {timestamps: true}
);
// Round Model
var roundSchema = new Schema(
    {
        title: String,
        fee: { type: Number, default: 10}, // LLcoins fee to join this room
        start: Date,     // the moment that this room starts
        due: Number,     // duration in days
        CDT: Number,
       // CDT: { type: Number, 
        //        default: () => {due+start - new Date();} } ,   // this value will be updated every minutes, till reaching zero
        counter: Number, // countdown timer for room run limitaion, also -1 means infinit
        desc: String,
        isActive: Boolean,
        subjects: [subjectSchema],
        owner: {type: Schema.Types.ObjectId, ref: "User"}, // user id
        population: Number,
        result: resultSchema,
    },
    {timestamps: true}
);



module.exports = mongoose.model("Round", roundSchema);