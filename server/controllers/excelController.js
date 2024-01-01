const exceljs = require('exceljs');
const ExcelData = require('../models/excelData');

const uploadExcel = async (req, res) => {
  const workbook = new exceljs.Workbook();
  const excelBuffer = req.file.buffer;

  try {
    await workbook.xlsx.load(excelBuffer);

    const allStudentsData = [];

    workbook.eachSheet((worksheet) => {
      const headers = worksheet.getRow(1).values;
      console.log("herrere",headers)

      worksheet.eachRow( async(row, rowNumber) => {
        // Skip the header row
        if (rowNumber === 1) {
          return;
        }

        const studentData = {};

        headers.forEach((header, colIndex) => {
          if (colIndex === 0) {
            return;
          }
        
          const cellValue = row.getCell(colIndex).value;

          // Map headers to corresponding fields in the Mongoose schema
          switch (header) {
            case 'name':
              studentData.name = cellValue;
              break;
            case 'number':
              // Check if the value is a valid number, otherwise treat it as a string
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
            // Add more cases as needed for additional fields
            default:
              // If the header doesn't match any field, consider it as a custom field
              studentData[header.toLowerCase()] = cellValue;
              break;
          }
        });

        // if (!studentData.name || !studentData.number || !studentData.email) {
        //   console.log(`Skipping row ${rowNumber} as name, number, or email is empty.`);
        //   return;
        // }
        // console.log(`Processing row ${rowNumber}. Data:`, studentData)
          const existingStudent = await ExcelData.findOne({ $or: [{ number: studentData.number }, { email: studentData.email }] });
          // If no existing student found, insert the data into the database
          if (!existingStudent) {
            console.log(`Inserting data into the database. Data:`, studentData);
            allStudentsData.push(studentData);
          } else {
            console.log(`Skipping data with number ${studentData.number} and email ${studentData.email} as it already exists in the database.`);
          }

      });
    });
    
    // Save all students' data to the database
    console.log('Attempting to insert data into MongoDB:', allStudentsData);
    await ExcelData.insertMany(allStudentsData);
    console.log('Data successfully inserted into MongoDB');

    res.json({ message: 'Data successfully uploaded to the database.' });
  } catch (error) {
    console.error('Error saving to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// const uploadExcel = async (req, res) => {
//   const workbook = new exceljs.Workbook();
//   const excelBuffer = req.file.buffer;

//   workbook.xlsx.load(excelBuffer).then(async (workbook) => {
//     try {
//       for (const worksheet of workbook.worksheets) {
//         const sheetData = [];

//         worksheet.eachRow((row) => {
//           // Assuming the first row contains headers, and you want to skip it
//           if (row.number === 1) {
//             return;
//           }

//           const studentData = {
//             // Map your student data fields here based on the column order
//             No: row.getCell(1).value,
//             Name: row.getCell(2).value,
//             Number: row.getCell(3).value,
//             Education: row.getCell(4).value,
//             Email: row.getCell(5).value,
//             Country: row.getCell(6).value,
//             Contacted: row.getCell(7).value,
//             Status: row.getCell(8).value,
//             Comment: row.getCell(9).value,
//             // Add other fields as needed
//           };

//           sheetData.push(studentData);
//         });

//         // Save each student to the database
//         await ExcelData.insertMany(sheetData);
//       }

//       res.json({ message: 'Data successfully uploaded to the database.' });
//     } catch (error) {
//       console.error('Error saving to MongoDB:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
// };

const getDetails = async (req,res)=>{
    try {
        const leads = await ExcelData.find();
        res.status(201).json({ success: true, leads });
    } catch(error) {
        res.status(500).json({ success: false, message: 'Error retrieving leads', error: error.message });
    }
}

module.exports = {
  uploadExcel,
  getDetails
};
