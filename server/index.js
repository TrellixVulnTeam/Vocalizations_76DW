import process from 'process';
import express from "express";
import cors from "cors";
import path from "path";
import favicon from "serve-favicon";
import dotenv from "dotenv";

import watchFolder from './services/watcher.js';

// import amqp from "amqplib/callback_api.js";

import postRoutes from "./routes/posts.js";
import { databaseConnect } from "./mongoConnect.js";

const app = express();

const __dirname = path.resolve();
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

app.use(express.json());
app.use(cors());

// connect to the mongodb
databaseConnect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

// connect postRoutes to app; every route starts with 'posts'
app.use("/posts", postRoutes);

watchFolder('uploads/files');
