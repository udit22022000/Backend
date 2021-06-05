//reading and writing to the file asynchronously...

const { readFile, writeFile } = require("fs");
//Here we are reading and writing to the file asynchronouly ...we will be passing the callback function....so that node executes the callback after the operation is done...
//callback receives 2 things ...first argument is error..and second one is result...

//here if we don't pass the encoding type i.e <utf-8>.....we will get buffer data..
console.log("START");
readFile("./content/first.txt", "utf-8", (err, result) => {
  if (err) {
    console.log(err);
    return;
  }

  const first = result;
  readFile("./content/second.txt", "utf-8", (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    const second = result;
    writeFile(
      "./content/result-async.txt",
      `Here is the result of ${first} and ${second}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("TASK COMPLETED");
        console.log(result);
      }
    );
  });
});

console.log(
  "...TASK has been set asychronously..now node can serve other users....START WITH NEXT TASK...."
);
//above code is a standard example of callback hell...we will look into it's alternatives...
