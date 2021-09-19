import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

import { dbConnection } from "../mongoConnect.js";

const findFile = async (name) => {
    // checks to see if file name exists in mongdb and returns result
    try {
        const collectionArray = await dbConnection.collections.postmessages.find().toArray();
        return collectionArray.findIndex( (item) => item.fileName === name );
    }catch(error) {
        console.log(error);
    }
}

// if req.body then post request comes from client; else comes from server so provide post data
const post = (req) => {
    let post = {
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        creator: "",
        title: req.file.originalname,
        label: req.file.originalname,
        tags: [],
        confidence: "",
        linkages: [],
        selectedFile: "",
        comments: "",
        startTime: "",
        endTime: "",
        minFreq: "",
        maxFreq: "", 
        fileSize: fileSizeFormatter(req.file.size, 2) // 0.00}
    }
    return req.body && req.body.location ? req.body : post;
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

// not that creating a new single file is the same as creating a new post with exception that there's no user input of data
export const singleFileUpload = async (req, res, next) => {
  try{
      const file = new PostMessage(post(req));
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

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
  res.json(updatedPost);
}

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
  await PostMessage.findByIdAndRemove(_id);
  res.json({ message: 'Post deleted successfully' });
}
