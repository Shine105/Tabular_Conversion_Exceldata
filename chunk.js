const XLSX = require('xlsx');
const fs = require('fs');

// Function to split data into chunks
function splitDataIntoChunks(data, chunkSize) {
    const chunks = [];
    for (let i = 0; i < data.length; i += chunkSize) {
        chunks.push(data.slice(i, i + chunkSize));
    }
    return chunks;
}

// Define variable to store Excel data
let excelData = [];

// Read Excel file
const workbook = XLSX.readFile('AMMASANDRA_110_15_10_2023.xls');
const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
const worksheet = workbook.Sheets[sheetName];
excelData = XLSX.utils.sheet_to_json(worksheet);

console.log('Total rows:', excelData.length);

// Remove rows with null values
excelData = excelData.map(innerArray => Object.values(innerArray).filter(value => value !== null));

// Split data into chunks of 2000 rows
const chunkSize = 2000;
const dataChunks = splitDataIntoChunks(excelData, chunkSize);
console.log('Number of chunks:', dataChunks.length);

// Process each chunk of data
dataChunks.forEach((chunk, index) => {
    const chunkFileName = `chunk_${index + 1}.json`;
    fs.writeFileSync(chunkFileName, JSON.stringify(chunk));
    console.log(`Chunk ${index + 1} saved as ${chunkFileName}`);
});
