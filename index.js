// fs is a Node standard library package
const fs = require("fs");
const questions = require("./questions.js");
const inquirer = require("inquirer");

function init() {
  // creates readme.md file if it does not exist
  const pathToFile = "./test.txt";
  fs.appendFile("readme.md", "", (error) =>
    error ? console.log(error) : console.log("")
  );

  // tests if file path is true, then proceeds further
  if (pathToFile) {
    //console.log("Path to file: " + pathToFile + "\n");
    questions();
  }
}

init();

/*
To-Do: 
The title of the project
Sections entitled:
Description
Table of Contents
Installation
Usage
License
Contributing
Tests
Questions + email 
*/

/*
// reads from the test.txt file
  fs.readFile("test.txt", "utf-8", (error, data) =>
    // ternary operator - if error ? (is) true do console.error : (otherwise) console.log(data).
    error ? console.error(error) : console.log("logged!\n" + data)
  );
*/
