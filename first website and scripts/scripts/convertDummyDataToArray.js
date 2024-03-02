// Node.js filesystem module to read and write files
const fs = require('fs');
const path = require('path');

// Path to the Ethereum-like hex data file
const hexDataFilePath = path.join(__dirname, '../videos/manual_made_bocks_for_video_504154494F73746174696F6E566964656F5.txt');

// Function to convert hex data into an array
function convertHexDataToArray(filePath) {
    // Read the file content
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading the file from disk: ${err}`);
            return;
        }

        // Split the data by newlines to get each hex value as an array element
        const hexArray = data.split('\n').filter(line => line.startsWith('0x'));

        // Log the resulting array
        console.log(hexArray);

        // Optionally, you could write this array to a new file or do further processing
        // For example, writing to a JSON file:
        // fs.writeFile('outputArray.json', JSON.stringify(hexArray, null, 2), err => {
        //     if (err) {
        //         console.error(`Error writing the array to disk: ${err}`);
        //         return;
        //     }
        //     console.log('Array has been written to outputArray.json');
        // });
    });
}

// Call the function with the file path
convertHexDataToArray(hexDataFilePath);
