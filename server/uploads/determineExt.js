import path from "path";
import fs from "fs";
import processSpecFile from "./processGrams/spectrogram.js";
import audiogram from "./processGrams/audiogram.js";
import waveImage from "./processGrams/waveImage.js";
import annotation from "./processGrams/annotation.js";
import { Worker, workerData } from "worker_threads";

const __dirname = path.resolve();
console.log(__dirname);

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
        // waveImage(filePath);
        // all this is used to prove worker thread concept; keep for now but eventually delete
        // let num1 = 40;
        // const worker1 = new Worker("./services/worker.js", { workerData: {num: num1}});
        
        // worker1.once("message", result => {
        //     console.log(`${num1}th Fibonacci Number: ${result}`);
        // });

        // worker1.on("error", error => {
        //     console.log(error);
        // });

        // let num2 = 12;
        // const worker2 = new Worker("./services/worker.js", { workerData: {num: num2}});
        // worker2.on("message", result => {
        //     console.log(`${num2}th Fibonacci Number: ${result}`);
        // });
        
        // worker2.on("error", error => {
        //     console.log(error);
        // });
        
        // worker.postMessage({num: 45});
        // worker.postMessage({num: 12});
    }
}

export default fileType;
