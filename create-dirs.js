const fs = require('fs');
const dirs = ['dir1', 'dir2']; // Replace with your directory names

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log(`Created directory: ${dir}`);
  }
});