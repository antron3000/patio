const fs = require('fs');
const path = require('path');

// Define the path to the file containing the hex data
const hexFilePath = path.join(__dirname, 'testHex.txt');
const baseDir = path.join(__dirname, '..', 'videos'); // Go up one level from 'scripts', then into 'videos'
const outputPath = path.join(baseDir, 'success.mp4');

// Define the prefix and suffix to be removed
const prefix = '504154494f73746174696f6e566964656f5f';
const suffix = '5f73746174696f6e504154494f';

// Read the hex data from the file
fs.readFile(hexFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the hex file:', err);
        return;
    }
    // Check if the data starts with the specified prefix and remove it if it does
    if (data.startsWith(prefix)) {
        data = data.slice(prefix.length);
    }

    // Check if the data ends with the specified suffix and remove it if it does
    if (data.endsWith(suffix)) {
        data = data.slice(0, -suffix.length);
    }

    // Convert the modified data to a Buffer
    const videoBuffer = Buffer.from(data, 'hex');

    // Write the buffer to a new MP4 file
    fs.writeFile(outputPath, videoBuffer, (err) => {
        if (err) {
            return console.error('Error writing the video file:', err);
        }
        console.log('Video file was written successfully to', outputPath);
    });
});
