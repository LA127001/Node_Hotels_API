const expressJS = require('express');
const PD = require('./../models/person');
const PersonRouter = expressJS.Router();
const { jwtAuthMiddleware, generateToken } = require('./../jwt')
// Person Data Send (Sign UP)
PersonRouter.post('/signup', async (req, res) => {
     try {
          const Data = req.body;
          const NewPD = new PD(Data);  // New personal data save
          const access = await NewPD.save() // access the input and save the NewPD
          console.log("Data is saved...")

          const payload = {
               id: access.id,
               username: access.username,
          }
          console.log(JSON.stringify(payload)) 
          const token = generateToken(payload);
          console.log("Token is : ", token);
          res.status(200).json({ access: access, token: token });
     } catch (error) {
          console.log(error),
               res.status(500).json({ error: "Internal Server Problem" })
     }
})

// login
PersonRouter.post('/login',async(req,res) =>{

     try {
          const {username,password} = req.body;
          const userD = await PD.findOne({username:username,});
          if(!userD || !(await userD.comparePassword(password))){
               return res.status(401).json({error: 'Invalid Username or Password...'});
          }
          const payload = {
               id : userD.id,
               username : userD.username
          }
          const token = generateToken(payload);

          res.status(200).json({ token });

     } catch (error) {
          console.log(error);
          res.status(500).json({error:"Internal server problem..."})
          
     }
} )
// Person Data get
PersonRouter.get('/',jwtAuthMiddleware ,async (req, res) => {
     try {
          const PersonGET = await PD.find()
          console.log("Data is access...")
          res.status(200).json(PersonGET);
     } catch (error) {
          console.log(error)
          res.status(500).json({ error: "Internal Server Problem" });
     }
})

// person profile Route
PersonRouter.get('/profile', jwtAuthMiddleware, async(req,res)=>{
     try {
          const userData = req.user;
          console.log("user data: ",userData)
          
          const userid = userData.id
          const Userfind = await PD.findById(userid);

          res.status(400).json({Userfind})

     } catch (error) {
          console.log(error)
          return res.status(500).json({error: "Internal Server Error..."})          
     }
})
//Person Data by work
PersonRouter.get('/:workType', async (req, res) => {
     try {
          const workType = req.params.workType;
          if (workType == "Manager" || workType == "Chef" || workType == "Waiter") {
               const PersonQuery = await PD.find({ work: workType })
               console.log("Data sendiing...")
               res.status(200).json(PersonQuery);
          } else {
               res.status(404).json({ error: "Invalid data enter" })
          }
     } catch (error) {
          console.log(error)
          res.status(500).json({ error: "Internal Server Problem" })
     }
})

// Person data update

PersonRouter.put('/:updateID', async (req, res) => {
     try {
          const PersonId = req.params.updateID;
          const UpdatePersonData = req.body;
          const updateDB = await PD.findByIdAndUpdate(PersonId, UpdatePersonData, {
               new: true,
               runValidators: true,
          })

          if (!updateDB) {
               return res.status(404).json({ error: "Person not found" });
          }

          console.log('Data updated...')
          res.status(200).json(updateDB)
     } catch (error) {
          console.log(error)
          res.status(500).json({ error: "Internal Server Error" })
     }
})


//Person data Delete

PersonRouter.delete('/:deleteID', async (req, res) => {
     try {
          const PersonID = req.params.deleteID;
          const DeleteDB = await PD.findByIdAndDelete(PersonID)
          if (!DeleteDB) {
               return res.status(404).json({ error: "Person not found" });
          }
          console.log('Data Delete...')
          res.status(200).json(DeleteDB)
     } catch (error) {
          console.log(error)
          res.status(500).json({ error: "Internal Server Error" })
     }
})

module.exports = PersonRouter