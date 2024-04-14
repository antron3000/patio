const fs = require('fs');
const path = require('path');

// Correct the input and output paths
const baseDir = path.join(__dirname, '..', 'videos'); // Go up one level from 'scripts', then into 'videos'
const outputPath = path.join(baseDir, 'outputVideo2.mp4');

// Specify your hex string directly
const hexString = "your_hex_string_here"; // Replace 'your_hex_string_here' with your actual hex string

// Convert the hex string to a binary buffer
const videoBuffer = Buffer.from(hexString, 'hex');

// Write the buffer to a new MP4 file
fs.writeFile(outputPath, videoBuffer, (err) => {
    if (err) {
        return console.error('Error writing the video file:', err);
    }
    console.log('Video file was written successfully to', outputPath);
});
