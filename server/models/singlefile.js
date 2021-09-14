// @https://twitter.com/Musawir01342189/status/1345743937605140497?s=20;

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const singleFileSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
        required: true
    },
    label: String,
    confidence: String,
    linkages: [String],
    selectedFile: String,
    comments: String,
    startTime: String,
    endTime: String,
    minFreq: String,
    maxFreq: String, 
}, {timestamps: true});

const singleFile = mongoose.model('SingleFile', singleFileSchema);

export default singleFile;