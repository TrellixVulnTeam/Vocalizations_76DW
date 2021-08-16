import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";

const __dirname = path.resolve();
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const databaseConnect = () => {
    mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
    })
    .then(() => console.log('Connected to mongodb')
    )
    .catch((error) => console.log(`${error.message}`));
}

export default databaseConnect;

