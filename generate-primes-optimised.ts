import { Worker } from "worker_threads";

const divideRange = (start: number, end: number, parts: number) => {
  const totalNumbers = end - start;
  const chunkSize = Math.ceil(totalNumbers / parts);
  const dividedList: { start: number; end: number }[] = [];

  for (let i = 0; i < parts; i++) {
    const chunkStart = start + i * chunkSize;
    const chunkEnd = Math.min(start + (i + 1) * chunkSize, end);
    dividedList.push({ start: chunkStart, end: chunkEnd });
  }

  return dividedList;
};

const createWorker = (min: number, start:number, range: number): any => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.ts", {
      workerData: { min,start, range },
    });

    worker.on("message", (primes) => {
      console.log(`finished worker for range [${start} .. ${range}]`);
      resolve(primes)
    });

    worker.on("error", (err) => {
      console.error(`Worker error:`, err);
      reject(err);
    });
  });
};

async function main (){
// Split tasks among worker threads
const THREAD_COUNT = 4; // Number of worker threads
const min = 2;
const max = 1e7;

const dividedRanges = divideRange(min, max, THREAD_COUNT);
const workerPromises : any[]= []

for (let i = 0; i < THREAD_COUNT; i++) {
  const { start, end } = dividedRanges[i];
  workerPromises.push(createWorker(min, start, end));
}
const thread_results = await Promise.all(workerPromises)
console.log("Prime is :", `${thread_results[0].join(" ")} ${thread_results[1].join(" ")} ${thread_results[2].join(" ")} ${thread_results[3].join(" ")}`);
}

main();

