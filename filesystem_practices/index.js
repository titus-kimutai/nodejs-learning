const fsPromise = require("fs").promises;

const path = require("path");

const filesOps = async () => {
  try {
    const data = await fsPromise.readFile(path.join(__dirname, "lorem.txt"), {
      encoding: "utf8",
    });

    const sentence1 = await fsPromise.writeFile(
      path.join(__dirname, "starter.txt"),
      "Welcome to Laikipia University"
    );

    const sentence2 = await fsPromise.appendFile(
      path.join(__dirname, "starter.txt"),
      "\n\nSchool of science and applied technologies"
    );

    const name = await fsPromise.rename(path.join(__dirname, 'starter.txt'), path.join(__dirname, 'Laikipia.txt'))

    console.log(data);
    console.log("written successfully");
    console.log("appended successfuly");
  } catch (error) {
    console.log(error);
  }
};
filesOps();

//to solve this we need using promises
// 1. readFile
//2:write the file
// 2. append data
// 3: rename file
// try - catch
