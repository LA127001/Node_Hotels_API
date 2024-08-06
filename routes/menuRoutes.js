const expressJS = require("express")
const MenuRouter = expressJS.Router()
const MI = require('./../models/menu')


// MENU data send
MenuRouter.post('/', async (req, res) => {

     try {
          const MenuData = req.body
          const MenuDB = new MI(MenuData);
          const MenuSave = await MenuDB.save()
          console.log("Menu Data is saved...")
          res.status(200).json(MenuSave)
     } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Internal Server Problem" })
     }
})

// MENU data get
MenuRouter.get('/', async (req, res) => {
     try {
          const MenuGET = await MI.find()
          console.log("Data is access...")
          res.status(200).json(MenuGET)
     } catch (error) {
          console.log(error)
          res.status(500).json({ error: "Internal Server Problem" })
     }
})

//MENU data by taste
MenuRouter.get('/:tastemenu', async (req, res) => {
     try {
          const tastemenu = req.params.tastemenu;
          if (tastemenu == "Spice" || tastemenu == "Sour" || tastemenu == "Sweet") {

               const MenuTaste = await MI.find({ taste: tastemenu })
               console.log("Data Sending...")
               res.status(200).json(MenuTaste)
          } else {
               res.status(404).json({ error: "Invalid data enter" })
          }
     } catch (error) {
          console.log(error)
          res.status(500).json({ error: "Internal Server Problem" })
     }
})


//MENU data update

MenuRouter.put('/:updatemenu', async (req, res) => {
     try {
          const updateMENU = req.params.updatemenu;
          const updateBody = req.body;
          const updateDB = await MI.findByIdAndUpdate(updateMENU, updateBody, {
               new: true,
               runValidators: true,
          })

          if (!updateDB) {
               return res.status(404).json({ error: "MenuItem not found" })
          }

          console.log("Data Update...")
          res.status(200).json(updateDB);

     } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Internal Server Error" })
     }
})

// MENU data Delete 
MenuRouter.delete('/:deleteMenu', async (req, res) => {
     try {
          const MenuDelete = req.params.deleteMenu
          const DeleteDB = await MI.findByIdAndDelete(MenuDelete)
          if (!DeleteDB) {
               return res.status(404).json({ error: "MenuItem Not Found" })
          }
          console.log("Data Deleted...")
          res.status(200).json(DeleteDB)

     } catch (error) {
          console.log(error)
          res.status(500).json({ error: "Internal Server Error" })
     }
})

module.exports = MenuRouter