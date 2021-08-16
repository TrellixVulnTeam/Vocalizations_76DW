import chokidar from "chokidar";
import path from "path";

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
        awaitWriteFinish: true
      });
      
      watcher.on('change', async file => {
        console.log(
          `[${new Date().toLocaleString()}] ${file} has been changed.`
        );
      })
      .on('add', async file => {
        console.log(
          `[${new Date().toLocaleString()}] ${file} has been added.`
        );
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