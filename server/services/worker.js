import { parentPort, workerData } from "worker_threads";

// parentPort.on("message", () => {
//   console.log(workerData.num);
parentPort.postMessage(getFib(workerData.num));
// });

function getFib(num) {
  if (num === 0) {
    return 0;
  } else if (num === 1) {
    return 1;
  } else {
    return getFib(num - 1) + getFib(num - 2);
  }
}
