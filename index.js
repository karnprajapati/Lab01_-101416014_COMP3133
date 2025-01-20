const fs = require('fs');
const csv = require('csv-parser');

// Delete canada.txt and usa.txt if they exist
const deleteFileIfExists = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`${filePath} deleted.`);
  }
};

// Filter and write data to the specified file
const filterAndWriteData = (country, outputFileName) => {
  const writableStream = fs.createWriteStream(outputFileName, { flags: 'w' });
  writableStream.write('country,year,population\n'); // Add CSV header

  fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data', (row) => {
      if (row.country.toLowerCase() === country.toLowerCase()) {
        writableStream.write(`${row.country},${row.year},${row.population}\n`);
      }
    })
    .on('end', () => {
      console.log(`${outputFileName} has been created.`);
      writableStream.end();
    });
};

// Delete existing files
deleteFileIfExists('canada.txt');
deleteFileIfExists('usa.txt');

// Process CSV file and filter data
filterAndWriteData('canada', 'canada.txt');
filterAndWriteData('united states', 'usa.txt');
