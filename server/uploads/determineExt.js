import path from "path";
import fs from "fs";
import processSpecFile from "./processGrams/spectrogram.js";
import audiogram from "./processGrams/audiogram.js";
import waveImage from "./processGrams/waveImage.js";
import annotation from "./processGrams/annotation.js";

const fileType = (filePath) => {
    // determine file extension
    // if mp3 or wav then create wave image from audio
    // if json then create either a pre-computed spectrogram, pre-computed audiogram or annotation

    // filePath comes from watcher.js
    if (path.extname(filePath) === ".json") {
        fs.readFile(filePath, (err, data) => {
            if (err) throw err;
            const JSONdata = JSON.parse(data);
            if (JSONdata.hasOwnProperty("data") === true) {
                processSpecFile(filePath);
            } else if (JSONdata.hasOwnProperty("sample_rate")) {
                audiogram(filePath, JSONdata);
            } else {
                annotation(filePath, JSONdata);
            } 
        });
    } else {
        waveImage(filePath);
    }
}

export default fileType;
