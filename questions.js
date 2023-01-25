// questions to ask the user for generating readme.md file

const inquirer = require("inquirer");
const fs = require("fs");
const licensesList = require("./licenses-list.js");
const LicenseObject = require("./licenses-list.js");
const readmePath = "./readme.md";

function questions() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "username",
        message: "Enter your GitHub username",
      },
      {
        type: "input",
        name: "title",
        message: "Title of the project",
      },
      {
        type: "input",
        name: "description",
        message: "Description of the project",
      },
      {
        type: "input",
        name: "installation",
        message: "Provide details on how to install the app",
      },
      {
        type: "input",
        name: "usage",
        message: "Provide details on how to use the app",
      },
      {
        type: "list",
        name: "license",
        message: "Choose license",
        choices: ["MIT", "Apache 2.0", "GNU GPL V3"],
      },
    ])
    .then((data) => {
      const licenseTitle = data.license;
      let licenseFlag = "";
      switch (data.license) {
        case "MIT":
          data.license = LicenseObject[0].desc;
          licenseFlag = LicenseObject[0].mit;
          break;
        case "Apache 2.0":
          data.license = LicenseObject[1].apache2_0;
          break;
        case "GNU GPL V3":
          data.license = LicenseObject[2].gnuGPLv3;
          break;
      }
      //NOTE indentation has to be like it is otherwise it will be incorrectly formatted in the final readme.md;
      fs.appendFile(
        readmePath,
        `# ${data.title}\n
${licenseFlag}\n
## Description\n
${data.description}\n
## Table of Contents\n
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)\n
## Installation\n
${data.installation}\n
## Usage\n
${data.usage}\n
## License\n
${licenseTitle + " Copyright 2023 "}${data.username}\n
${data.license}`,
        () => {
          console.log("FINISHED QUESTIONS");
        }
      );
      //console.log("Answers: ", data);
      // fs.appendFile(readmePath, data.name, () => {
      //   console.log("Logged");
      // });
    });
  // .then((data) => {
  //   fs.appendFile("test1.txt", data, (error) => {
  //     error ? console.log(error) : console.log("Appended file successfully");
  //   });
  // });
}

module.exports = questions;
