import path from "path";
import fs from "fs";
import spectrogram from "./processGrams/spectrogram.js";
import audiogram from "./processGrams/audiogram.js";
import waveImage from "./processGrams/waveImage.js";
import annotation from "./processGrams/annotation.js";

const fileType = (file) => {
    // determine file extension
    // if mp3 or wav then creating wave image from audio
    // if json then creating either pre-computed spectrogram, pre-computed audiogram or annotation
    
    console.log(
        `[${new Date().toLocaleString()}] ${file} has been added.`
    );

    if (path.extname(file) === ".json") {
        fs.readFile(file, (err, data) => {
            if (err) throw err;
            const JSONdata = JSON.parse(data);
            if (JSONdata.hasOwnProperty("data") === true) {
                spectrogram();
            } else if (JSONdata.hasOwnProperty("sample_rate")) {
                audiogram();
            } else {
                annotation();
                console.log('here');
            } 
        })
    } else {
        waveImage();
    }
}

export default fileType;
