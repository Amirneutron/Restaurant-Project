var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  mobileNumber: { type: Number, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true }
});


module.exports = mongoose.model('Users', userSchema);