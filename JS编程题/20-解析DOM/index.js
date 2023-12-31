const path = require("path");
const fs = require("fs/promises");
const { domParse } = require("./domParse");

const dataDir = path.resolve(__dirname, "test-html");

async function entry() {
  const fileArr = await fs.readdir(dataDir);
  const files = await Promise.all(
    fileArr.map((filename) =>
      fs.readFile(path.resolve(dataDir, filename), { encoding: "utf-8" })
    )
  );
  return files.map((res) => Promise.resolve(res).then(domParse));
}

entry()
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });
