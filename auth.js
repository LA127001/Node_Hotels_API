const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const Per = require('./models/person')

//username & password activation

passport.use(new LocalStrategy(async (UserName, Password, done) => {
     // authentication logic here
     try {
          // console.log('Received credentials: ', UserName, Password)
          const userS = await Per.findOne({ username: UserName })
          if (!userS) {
               return done(null, false, { message: "Incorrect username..." })
          }

          const isPasswordMatch = await userS.comparePassword(Password);

          if (isPasswordMatch) {
               return done(null, userS);
          } else {
               return done(null, false, { message: "Incorrect Password..." })
          }
     } catch (error) {
          return done(error);
     }
}))


module.exports = passport