const { readFileSync, writeFileSync } = require("fs");
const first = readFileSync("./content/first.txt", "utf-8");
const second = readFileSync("./content/second.txt", "utf-8");

console.log(first, second);

writeFileSync(
  "./content/result-sync.txt",
  `Here is the resukt of ${first} and ${second}`,
  {
    flag: "a",
  }
);

// if the file is not there ....writeFileSync will create a new one and add content to it...
// {flag: 'a'} will append the content to the file..
