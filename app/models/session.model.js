const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    keystage:{
        type: String,
      //  enum :['Key Stage 1', 'Key Stage 2', 'Key Stage 3', 'Key Stage 4'],
        required: true
    },
    year: {
        type: String,
     //   enum:['Year 1, Year 2, Year 3, Year 4, Year 5, Year 6, Year 7, Year 8, Year 9, Year 10, Year 11'],
        required: true
    },
    subject: {
        type: String,
      //  enum: ['Geography'],
        required: true
    }
})

module.exports= mongoose.model('Session', sessionSchema);