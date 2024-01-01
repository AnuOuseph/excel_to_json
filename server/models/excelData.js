const mongoose = require('mongoose');

const excelDataSchema = new mongoose.Schema({
  name: String,
  number: String,
  qualification: String,
  country: String,
  email: String,
  comment: String,
  status: String,
  
});

const ExcelData = mongoose.model('ExcelData', excelDataSchema);

module.exports = ExcelData;
