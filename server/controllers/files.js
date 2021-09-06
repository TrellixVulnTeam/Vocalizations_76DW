// @https://twitter.com/Musawir01342189/status/1345743937605140497?s=20;

import SingleFile from '../models/singlefile.js';
import { dbConnection } from "../mongoConnect.js";

const findFile = async (name) => {
    // checks to see if file name exists in mongdb and returns result
    try {
        const collectionArray = await dbConnection.collections.singlefiles.find().toArray();
        return collectionArray.findIndex( (item) => item.fileName === name );
    }catch(error) {
        console.log(error);
    }
}

const singleFileUpload = async (req, res, next) => {
    try{
        const file = new SingleFile({
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
        });
        // check to see if file already exists; if it does don't save it again
        if (await findFile(req.file.originalname) == -1) {
            const response = await file.save();
            res.status(201).send(response);
            console.log(response._id);
        } else {
            res.send("that file already exists in mongo");
        }
    }catch(error) {
        res.status(400).send(`ERROR ${error.response.data}`);
    }
}

const getallSingleFiles = async (req, res, next) => {
    try{
        const files = await SingleFile.find();
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

const processFile = async (req, res, next) => {
    try{
        console.log('processing');
        res.status(201).send(response);
    }catch(error) {
        res.status(400).send(`ERROR ${error.response.data}`);
    }
}

export { singleFileUpload, getallSingleFiles, processFile };