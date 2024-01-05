const exceljs = require('exceljs');
const ExcelData = require('../models/excelData');

const uploadExcel = async (req, res) => {
  const workbook = new exceljs.Workbook();
  const excelBuffer = req.file.buffer;

  try {

    await workbook.xlsx.load(excelBuffer);
    workbook.eachSheet(async (worksheet) => {

      const headers = worksheet.getRow(1).values;
      worksheet.eachRow(async (row, rowNumber) => {

        if (rowNumber === 1) {
          return;
        }

        const studentData = {};
        headers.forEach((header, colIndex) => {

          if (colIndex === 0) {
            return;
          }

          const cellValue = row.getCell(colIndex).value;
          switch (header) {
            case 'name':
              studentData.name = cellValue;
              break;
            case 'number':
              studentData.number = !isNaN(cellValue) ? parseFloat(cellValue) : cellValue;
              break;
            case 'qualification':
              studentData.qualification = cellValue;
              break;
            case 'country':
              studentData.country = cellValue;
              break;
            case 'email':
              studentData.email = cellValue;
              break;
            case 'comment':
              studentData.comment = cellValue;
              break;
            case 'status':
              studentData.status = cellValue;
              break;
            default:
              studentData[header.toLowerCase()] = cellValue;
              break;
          }
        });

        if (studentData.name && studentData.number) {
          const existingStudent = await ExcelData.findOne({ $or: [{ number: studentData.number }, { name: studentData.name }] });
          if (!existingStudent) {
            console.log(`Inserting data into the database. Data:`, studentData);
            await ExcelData.create(studentData);
          } else {
            console.log(`Skipping data with number ${studentData.number} and email ${studentData.name} as it already exists in the database.`);
          }
        }else{
          console.log(`Skipping row ${rowNumber} as name, number, or email is empty.`);
          return;
        }
      });
    });

    res.json({ message: 'Data successfully uploaded to the database.' });
  } catch (error) {
    console.error('Error saving to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//get details of leads
const getDetails = async (req,res)=>{
    try {
      const searchQuery = req.query.query;
      if (searchQuery !== null && searchQuery !== undefined) {
        // Implement your MongoDB query for searching
        const leads = await ExcelData.find({
          $or: [
            { name: { $regex: new RegExp(searchQuery, 'i') } },
            { email: { $regex: new RegExp(searchQuery, 'i') } },
            { country: { $regex: new RegExp(searchQuery, 'i') } },
          ],
        });
        console.log(leads)
        res.json({success: true, leads: leads });
      } else {
        // Fetch all documents if searchQuery is not provided
        const allLeads = await ExcelData.find();
        console.log(allLeads)
        res.json({ success: true,leads: allLeads });
      }
    } catch(error) {
        res.status(500).json({ success: false, message: 'Error retrieving leads', error: error.message });
    }
}

module.exports = {
  uploadExcel,
  getDetails
};
