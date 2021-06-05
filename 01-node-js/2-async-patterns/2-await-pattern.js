const { readFile, writeFile } = require("fs");
const util = require("util");

const readFilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(writeFile);

// const getText = (path) => {
//   return new Promise((resolve, reject) => {
//     readFile(path, "utf-8", (err, data) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(data);
//     });
//   });
// };

// getText("../content/first.txt")
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

const start = async () => {
  try {
    const first = await readFilePromise("../content/first.txt", "utf-8"); //ony when the promise is resolved...it will run forward
    const second = await readFilePromise("../content/second.txt", "utf-8");
    writeFilePromise(
      "../content/result-mind-grenade.txt",
      `This is awesome: ${first} and ${second}`,
      {
        flag: "a",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

start();
