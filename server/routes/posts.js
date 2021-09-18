import express from "express";
import upload from '../multer/multer.js';

import { getPosts, createPost, updatePost, deletePost, singleFileUpload } from "../controllers/posts.js";

const router = express.Router();

// localhost: 5000/posts
router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.post('/singleFile', upload.single('file'), singleFileUpload);

export default router;
