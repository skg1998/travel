var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const requireString = {
    type:String,
    required:true
}

const requireNumber = {
    type:Number,
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
        requireNumber,
        min:-90,
        max:90
    },
    longitude:{
        requireNumber,
        min:-180,
        max:180
    },
    visitDate:{
        required:true,
        type:Date
    }
},{
    timestamps:true
})

const LogEntry = mongoose.model('LogEntry',LogEntrySchema)
module.exports = LogEntry