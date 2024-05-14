## Parallelize Prime Number Generation

### Problem statement

You are given a simple JavaScript code for generating prime numbers within a given range. However, the current implementation is not optimized for performance.
Your task is to refactor the code to Typescript and use Node.js worker threads and parallelize the prime number generation process.

```
const min = 2;

const max = 1e7;

const primes = [];

function generatePrimes(start, range) {

    let isPrime = true;
    let end = start + range;

    for (let i = start; i < end; i++) {

        for (let j = min; j < Math.sqrt(end); j++) {

            if (i !== j && i % j === 0) {

                isPrime = false;

                break;

            }        }

        if (isPrime) {

            primes.push(i);

        }

        isPrime = true;

    }

}

generatePrimes(min, max);

const message = "Prime is : " + primes.join(" ");
console.log(message);
```

### Assignment

- **Refactor the code:** Modify the existing code to use Node.js worker threads to parallelize the prime number generation process.
Your code should be implemented in Typescript.

- **Optimize performance:** Ensure that the prime number generation is split among multiple worker threads to take advantage of
  multi-core processors and make the overall process faster.

- **Communication:** Implement a mechanism for the worker threads to communicate their results back to the main thread.
Consider using the workerData and parentPort features provided by Node.js worker threads.

- **Testing:** Verify that the refactored code produces the correct list of prime numbers for the given range.
