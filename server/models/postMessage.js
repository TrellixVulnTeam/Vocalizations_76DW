import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  filename: String,
  label: String,
  confidence: String,
  linkages: [String],
  selectedFile: String,
  comments: String,
  startTime: String,
  endTime: String,
  minFreq: String,
  maxFreq: String, 
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
