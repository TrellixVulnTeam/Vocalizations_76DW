import chokidar from "chokidar";
import path from "path";
import fileType from '../uploads/determineExt.js';
import deleteFile from '../uploads/deleteFile.js';

const __dirname = path.resolve();

const watchFolder = (targetFolder) => {
    try {
      console.log(
        `[${new Date().toLocaleString()}] Watching for file changes in folder: ${targetFolder}`
      );

      // Initialize watcher.
      const filePath = path.join(__dirname, targetFolder);
      
      const watcher = chokidar.watch(filePath, {
        persistent: true,
        ignored: /^\./,
        awaitWriteFinish: true,
        ignoreInitial: true
      });
      
      watcher.on('change', async filePath => {
        console.log(
            `${filePath} has been changed.`
        );
      })
      .on('add', async filePath => {
        fileType(filePath);
      })
      .on('unlink', async filePath => {
        deleteFile(filePath);
      });

    } catch (error) {
      console.log(error.message);
    }
}
export default watchFolder;