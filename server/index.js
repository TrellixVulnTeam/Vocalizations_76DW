import process from 'process';
import express from "express";
import cors from "cors";
import path from "path";
import favicon from "serve-favicon";
import dotenv from "dotenv";

import watchFolder from './services/watcher.js';
import { Worker, isMainThread } from "worker_threads";

// import amqp from "amqplib/callback_api.js";

import postRoutes from "./routes/posts.js";
import { databaseConnect } from "./mongoConnect.js";
import fileRoutes from './routes/files.js';

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
// connect file upload to app; every route starts with 'api'
app.use('/api', fileRoutes);

watchFolder('uploads/files');

const num = 40;

//Create new worker
const worker = new Worker("./services/worker.js");

//Listen for a message from worker
worker.on("message", result => {
  console.log(`${result.num}th Fibonacci Number: ${result.fib}`);
});

worker.on("error", error => {
  console.log(error);
});

//worker.postMessage({num: 45});
// worker.postMessage({num: 12});