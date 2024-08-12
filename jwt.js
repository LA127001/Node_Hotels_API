const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next) =>{

     const authorization = req.headers.authorization;
     if(!authorization) return res.status(401).json({error:"Token not found..."})
     // extract the jwt token from the request headers

     const token = req.headers.authorization.split(' ')[1];
     if(!token) return res.status(401).json({error: 'Unauthorizated token...'});

     try {
          // Verify the JWT token
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
         
          // Attach user information to the request object
          req.user = decoded;
          next();

     } catch (error) {
         console.log(error)
          res.status(401).json({error: 'Invalid token...'});
     }

}

// function to generate JWT token

const generateToken = (userData) =>{
     // console.log("JWT Secret:", process.env.JWT_SECRET);
     return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:3000});
}

module.exports = {jwtAuthMiddleware , generateToken};
