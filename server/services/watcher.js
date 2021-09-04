import chokidar from "chokidar";
import path from "path";
import fileType from '../uploads/determineExt.js';

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
      
      watcher.on('change', async file => {
        console.log(
            `[${new Date().toLocaleString()}] ${file} has been changed.`
        );
      })
      .on('add', async file => {
        fileType(file);
      })
      .on('unlink', async file => {
        console.log(
          `[${new Date().toLocaleString()}] ${file} has been deleted.`
        );
      });

    } catch (error) {
      console.log(error.message);
    }
}
export default watchFolder;