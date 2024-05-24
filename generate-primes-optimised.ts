import { Worker } from "worker_threads";

const THREAD_COUNT = 4; // Number of worker threads
const workerThreads = new Set();
const primes = {};

function createWorker(workerData, workerNumber) {
  const worker = new Worker("./worker.ts", { workerData });

  worker.on("message", (workerPrimes) => {
    primes[workerNumber] = workerPrimes;
  });
  worker.on("error", (err) => {
    console.error(`Worker error:`, err);
  });
  worker.on("exit", () => {
    workerThreads.delete(worker);
    if (workerThreads.size === 0) {
      //concat the results from all workers in order
      let message = "Prime is : ";
      for (let i = 0; i < THREAD_COUNT; i++) {
        message += primes[i].join(" ");
      }
      console.log(message);
    }
  });
  return worker;
}

async function main() {
  // Split tasks among worker threads
  const min = 2;
  const max = 1e7;

  const range = Math.ceil((max - min) / THREAD_COUNT);
  let start = min;
  for (let i = 0; i < THREAD_COUNT; i++) {
    workerThreads.add(createWorker({ start, range }, i));
    start = start + range + 1;
  }
}

main();
