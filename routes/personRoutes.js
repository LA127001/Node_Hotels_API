const expressJS = require('express');
const PD = require('./../models/person');
const PersonRouter = expressJS.Router();

// Person Data Send
PersonRouter.post('/', async (req, res) => {
     try {
          const Data = req.body;
          const NewPD = new PD(Data);  // New personal data save
          const access = await NewPD.save() // access the input and save the NewPD
          console.log("Data is saved...")
          res.status(200).json(access);
     } catch (error) {
          console.log(error),
               res.status(500).json({ error: "Internal Server Problem" })
     }
})

// Person Data get
PersonRouter.get('/', async (req, res) => {
     try {
          const PersonGET = await PD.find()
          console.log("Data is access...")
          res.status(200).json(PersonGET);
     } catch (error) {
          console.log(error)
          res.status(500).json({ error: "Internal Server Problem" });
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