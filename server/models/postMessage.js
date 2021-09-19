import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
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
    creator: String,
    title: String,
    label: String,
    tags: [String],
    confidence: String,
    linkages: [String],
    selectedFile: String,
    comments: String,
    startTime: String,
    endTime: String,
    minFreq: String,
    maxFreq: String, 
}, {timestamps: true});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
