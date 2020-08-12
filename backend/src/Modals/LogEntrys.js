var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const requireString = {
    type:String,
    required:true
}

var LogEntrySchema = new Schema({
    title:requireString,
    description:String,
    image:String,
    rating:{
        type:Number,
        min:0,
        max:10,
        default:0
    },
    latitude:{
        type:Number,
        required:true
    },
    longitude:{
        type:Number,
        required:true
    },
    visitDate:{
        type:Date,
        default: Date.now,
    }
},{
    timestamps:true
})

const LogEntry = mongoose.model('LogEntry',LogEntrySchema)
module.exports = LogEntry