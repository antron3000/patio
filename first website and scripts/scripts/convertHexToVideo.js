const fs = require('fs');
const path = require('path');

// Correct the input and output paths
const baseDir = path.join(__dirname, '..', 'videos'); // Go up one level from 'scripts', then into 'videos'
const inputPath = path.join(baseDir, 'german0x.txt');
const outputPath = path.join(baseDir, 'outputVideo.mp4');

// Read the hex string from the file
fs.readFile(inputPath, 'utf8', (err, data) => {
    if (err) {
        return console.error('Error reading the text file:', err);
    }

    // Remove any non-hexadecimal characters (including '0x' prefix)
    const hexString = data.replace(/[^a-fA-F0-9]/g, '');

    // Convert the hex string to a binary buffer
    const videoBuffer = Buffer.from(hexString, 'hex');

    // Write the buffer to a new MP4 file
    fs.writeFile(outputPath, videoBuffer, (err) => {
        if (err) {
            return console.error('Error writing the video file:', err);
        }
        console.log('Video file was written successfully to', outputPath);
    });
});
