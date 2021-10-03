const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema({
    name: {
        type:String,
        minlength: 3,
        maxlength: 50,
        required: [true, 'name is required']
    },
    gpa: {
        type:Number,
        min:0,
        max:4,
        default:0
    },
    course:[{
        name:{
            type:String,
            minlength: 3,
            maxlength : 50,
            default: 'WMA'
        },
        professor: {
            type:String,
            minlength : 3,
            maxlength : 50
        }
    }]
});

mongoose.model('Student',schoolSchema,'students');

