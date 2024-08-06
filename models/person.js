const mongo = require('mongoose');

const personSchema = new mongo.Schema({
     name: {
          type: String,
          reqired: true
     },
     age: {
          type: Number,
          required: true
     },
     work: {
          type: String,
          enum: ["Chef", "Waiter", "Manager"],
          required: true
     },
     mobile: {
          type: Number,
          required: true,
          unique: true
     },
     email: {
          type: String,
          required: true,
          unique: true
     },
     address: {
          type: String,
     },
     salary: {
          type: Number
     }

})

const PersonData = mongo.model('PersonData', personSchema);
module.exports = PersonData