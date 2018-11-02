const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const util = require('util');
const pkg = require('./package.json');

const { join } = path;
const execAsync = util.promisify(cp.exec);
console.log(pkg);
const build = async function() {

  let start = new Date();
  const books = (await fs.promises.readdir(__dirname, { withFileTypes: true }))
    .filter(dirent => (dirent.isDirectory() && /^[a-zA-Z0-9]/.test(dirent.name) && dirent.name !== 'node_modules'))
    .map(dirent => dirent.name);

  const distDir = join(__dirname, '_dist');
  await execAsync(`rm -rf ${distDir}`);
  await fs.promises.mkdir(distDir);

  const buildBook = async function(book) {
    const bookDir = join(distDir, book);
    await fs.promises.mkdir(bookDir);
    console.log(`gitbook build ${join(__dirname, book)} ${bookDir}`);
    await execAsync(`gitbook build ${join(__dirname, book)} ${bookDir}`);
  }

  console.log(books);
  for (let book of books) {
    try {
      await buildBook(book);
    } catch (e) {
      console.error(e);
    }
  }

  // await Promise.all(books.map(book => buildBook(book)));
  // await Promise.all(books.map(book => {
  //   const bookDir = join(__dirname, book);
  // }));

  console.log(new Date() - start);
}

build();
