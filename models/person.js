const mongo = require('mongoose');
const bcrypt = require('bcrypt')

const personSchema = new mongo.Schema({
     name: {
          type: String,
          required: true
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
     },
     username:{
          type:String,
          required:true,
          unique:true
     },
     password:{
          type:String,
          required:true
     }

});

personSchema.pre('save',async function (next){

   const person = this;

   // Hash the password  only if it has been modified (or is new)
   if(!person.isModified('password')) return next();
   try {
     // hash password generator

     const salt = await bcrypt.genSalt(10);

     // hash password

     const hashedPassword = await bcrypt.hash(person.password,salt);

     // override the plan password with the hashed one
     person.password = hashedPassword;
     next()
   } catch (error) {
     return next(error)
   }
})

personSchema.methods.comparePassword = async function (candidatePassword){
     try {
          // usr bcrypt to compare the provided password with the hashed password

          const isMatch = await bcrypt.compare(candidatePassword,this.password);
          return isMatch;

     } catch (error) {
          throw error;
     }
}
const PersonData = mongo.model('PersonData', personSchema);
module.exports = PersonData