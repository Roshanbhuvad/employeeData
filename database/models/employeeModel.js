var mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    fullname : String,
    salary : Number,
	age : Number,
    emailId : String,
    mobile: String,     
},
{
    timestamps: true,

    toObject: {
      transform: function (doc, ret, option) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
        /*This mongoose method manipulate the response data which we have display on website, It's never affect in mongoDB database
          here we are change the _id to id and removing __v properties in payload to showing the data or retrieving data*/
      },
    },
  }
);
module.exports = mongoose.model('Employee', EmployeeSchema);