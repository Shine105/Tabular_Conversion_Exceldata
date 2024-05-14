// const readexcelfile = require('read-excel-file/node')
// const fs = require('fs')

// // Readable Stream.
// readexcelfile(fs.createReadStream('AMMASANDRA_110_15_10_2023.xlsx')).then((rows) => {
//     // Extract data
//     const stationName = rows[0][0]; // Name of the station is in the first cell of the first row
//     const feederName = rows[4][0]; // Name of feeder is in the first cell of the fifth row
//     const date = '15-10-2023'; // Provided date

//     // Extract relevant data rows excluding header and feeder row
//     const dataRows = rows.slice(6); // Assuming the data starts from the 7th row

//     // Map data to required format
//     const formattedData = dataRows.map((row, index) => ({
//         's.no': index + 1,
//         'date': date,
//         'name of the station': stationName,
//         'name of the feeder': feederName,
//     }));

//     // Output table
//     console.table(formattedData);
// });



const XLSX = require('xlsx');

// Read the file
const workbook = XLSX.readFile('AMMASANDRA_110_15_10_2023.xlsx');

// Get the first sheet
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert the sheet to JSON
const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});

// Get the station name from cell 'A1'
const stationName = worksheet['A1'].v;

// Filter out the data you need
const data = jsonData.flatMap(row => {
    // Identify the feeder names (with 'F' prefix)
    const feederNames = row.filter(value => typeof value === 'string' && value.startsWith('F'));

    return feederNames.map(feederName => ({
        'Date': '15-10-2023', // Date is given
        'Name of Station': stationName,
        'Name of Feeder': feederName
    }));
});

// Log the data
console.table(data);