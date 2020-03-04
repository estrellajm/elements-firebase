const fs = require("fs-extra");
const concat = require("concat");
(async () => {
  let js_files = [];
  try {
    // Get the files in files
    const files = await fs.promises.readdir("./dist");
    // Filter out none ".js" files and add "./dist/" to the beginning
    js_files = files
      .filter(file => file.endsWith(".js"))
      .map(file => `./dist/${file}`);
  } catch (e) {
    // catch anything bad that happens
    console.error("ERROR!", e);
  }
  // deletes the old "elements" dir and recreates it
  await fs.removeSync("elements");
  await fs.ensureDir("elements");
  // concatenates all ".js" files
  await concat(js_files, "elements/user-poll.js");
  // copies over all other files over
  await fs.copyFile("./dist/styles.css", "elements/styles.css");
  if (fs.existsSync("./dist/assets"))
    await fs.copy("./dist/assets/", "elements/assets/");
  await fs.writeFile(
    "./elements/README.md",
`Insert the following elements into your page

<user-poll></user-poll>
<script src="../elements/user-poll.js"></script>
        `
  );
  await fs.writeFile(
    "./elements/index.html",
`<!-- This index.html is meant to serve as a test of the custom element -->
<!doctype html>
<html lang="en">
<head>
<title>Angular 9 Elements Demo</title>
</head>
<body>
<user-poll></user-poll>
<script src="../elements/user-poll.js"></script>
</body>
</html>
        `
  );
  // await fs.removeSync("dist"); // removes the dist dir
})().catch(err => console.error(err));
