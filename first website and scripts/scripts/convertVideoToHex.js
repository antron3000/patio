const fs = require('fs');
const path = require('path');

// Update the path to go up one directory from 'scripts', then into 'videos'
const videoPath = path.join(__dirname, '..', 'videos', 'out-of-band-attack_resized.mp4');

fs.readFile(videoPath, (err, videoBuffer) => {
    if (err) {
        return console.error('Error reading the video file:', err);
    }

    // Convert the video file to a Base64 string
    const base64String = videoBuffer.toString('base64');

    // Define the output path to save the Base64 string
    // This will also be saved one level up from the 'scripts' directory
    // The output filename will be the same as the video's but with a '.txt' extension
    const outputFileName = path.basename(videoPath, '.mp4') + 'Base64.txt';
    const outputPath = path.join(__dirname, '..', 'videos', outputFileName);

    fs.writeFile(outputPath, base64String, (err) => {
        if (err) {
            return console.error('Error writing the Base64 string to file:', err);
        }
        console.log('Base64 string was written successfully to', outputPath);
    });
});
