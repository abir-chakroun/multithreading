import { parentPort, workerData } from "worker_threads";

const { min, start, range } = workerData;

let primes: number[] = [];

let isPrime = true;
let end = min + range;

for (let i = start; i < end; i++) {
  for (let j = min; j < Math.sqrt(end); j++) {
    if (i !== j && i % j === 0) {
      isPrime = false;
      break;
    }
  }

  if (isPrime) {
    primes.push(i);
  }

  isPrime = true;
}

// Send the results back to the main thread
parentPort?.postMessage(primes);
