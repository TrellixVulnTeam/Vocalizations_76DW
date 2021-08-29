// @https://twitter.com/Musawir01342189/status/1345743937605140497?s=20;

import express from 'express';
import upload from '../multer/multer.js';
import { singleFileUpload, getallSingleFiles, processFile } from '../controllers/files.js';

const router = express.Router();

router.post('/singleFile', upload.single('file'), singleFileUpload);
router.get('/getSingleFiles', getallSingleFiles);
router.get('/processFile', processFile);

export default router;