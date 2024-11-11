const { createReadStream } = require("fs");

const stream = createReadStream("../content/big.txt", {
    encoding: "utf8",
    highWaterMark: 200,
});

let chunkCounter = 0;

stream.on("data", (chunk) => {
    chunkCounter++;
    console.log(`Chunk ${chunkCounter}:`, chunk);
});

stream.on("end", () => {
    console.log(`Stream ended. Total chunks received: ${chunkCounter}`);
});

stream.on("error", (err) => {
    console.error("An error occurred:", err);
});