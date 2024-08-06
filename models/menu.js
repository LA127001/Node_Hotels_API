const MDB = require('mongoose')
const MenuSchema = new MDB.Schema({
     name: {
          type: String,
          required: true
     },
     price: {
          type: Number,
          required: true
     },
     taste: {
          type: String,
          enum: ["Sweet", "Spice", "Sour"],
          required: true
     },
     isDrink: {
          type: Boolean,
          default: false
     },
     ingredients: {
          type: [String],
          default: []
     },
     numSales: {
          type: Number,
          default: 0
     }
})

const MENUitem = MDB.model('MENUitem', MenuSchema);
module.exports = MENUitem;