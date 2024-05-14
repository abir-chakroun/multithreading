## Notes

- The main thread splits the iterations of the nested loops into smaller tasks and distributes them among multiple worker threads (4 threads).

- Each worker thread receives a range of iterations to process via workerData. The worker thread logic remains the same as the original nested loops code, but it's encapsulated within each worker thread.

- Once a worker thread completes its tasks, it sends the results back to the main thread via parentPort.postMessage().

- The main thread listens for messages from worker threads and handles them appropriately.

- Once all results are received, the main prints the final list of primes


## Testing

- Results comparison:
    - i did a manual test for both results with converting the message on both sides to a hash using a SHA256 generator https://emn178.github.io/online-tools/sha256.html 
    - both solutions have same hash hence they are both equal `3d7aa38406c44d9f33dbcfa9380e4d6a96c795bb46dd9801d2a46e6a292b7cde`

- Check if performance is improved:

    - First solution: `time npm run start` 
        - 3.66s user 0.18s system 91% cpu 4.203 total
    - Optimized solution: `time npm run start-optimised`
        - 0.16s user 0.06s system 74% cpu 0.296 total

    => We observe an improvement in performance between the two approaches 🚀



