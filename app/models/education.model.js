const mongoose = require('mongoose');
 

const TopicsSchema = new mongoose.Schema({

  name: String,
  video: String,
  namespace: String,
});
 

const SubjectSchema = new mongoose.Schema({

  name: String,
  topics: [TopicsSchema],

});
 
const YearSchema = new mongoose.Schema({

  year: String,

  subjects: [SubjectSchema],

});
 

const Year = mongoose.model('years', YearSchema);
 
module.exports = Year;

 