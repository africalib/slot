import fs from "fs-extra";

const srcDir = "dist";
const destDir = "../plays/slot";

fs.move(srcDir, destDir, {overwrite: true}).then(() => {
    console.log("publish success!");
}).catch((err) => {
    console.error(err);
});