// questions to ask and append to readme.md file

const inquirer = require("inquirer");
const fs = require("fs");
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
        choices: ["MIT", "Apache 2.0", "GNU GPL V3", "Mozilla Public 2.0"],
      },
    ])
    .then((data) => {
      const licenseTitle = data.license;
      // flag will be used to pin license icon to the top
      let licenseFlag = "";
      switch (data.license) {
        case "MIT":
          data.license = LicenseObject[0].desc;
          licenseFlag = LicenseObject[0].mit;
          break;
        case "Apache 2.0":
          data.license = LicenseObject[1].desc;
          licenseFlag = LicenseObject[1].apache2_0;
          break;
        case "GNU GPL V3":
          data.license = LicenseObject[2].desc;
          licenseFlag = LicenseObject[2].gnuGPLv3;
          break;
        case "Mozilla Public 2.0":
          data.license = LicenseObject[3].desc;
          licenseFlag = LicenseObject[3].mozillaPublicLic2_0;
          break;
      }
      //NOTE: indentation has to be like it is otherwise it will be incorrectly formatted/indented in the final readme.md;
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
${data.license}\n
## Contributing\n
If you wish to contribute please email example@email.com\n
## Tests\n
You can test the app by cloning the repository and installing the pre-requisite packages, then try generating readme.md file.\n
## Questions\n 
If you have any questions or want to submit any bugs, please email example@email.com\n
`,
        () => {
          console.log("Finished generating the readme.md file");
        }
      );
    });
}
module.exports = questions;
