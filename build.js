const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const util = require('util');
const pkg = require('./package.json');

const { join } = path;
const execAsync = util.promisify(cp.exec);

const ignoreDirs = [ 'node_modules' ];
const build = async function() {

  let start = new Date();
  const books = (await fs.promises.readdir(__dirname, { withFileTypes: true }))
    .filter(dirent => {
      if (!dirent.isDirectory()) return false;
      if (!/^[a-zA-Z0-9]/.test(dirent.name)) return false;
      if (ignoreDirs.indexOf(dirent.name) > -1) return false;
      return true;
    })
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

  const bookUrls = books.map(book => `<li><a href="/${book}">${book}</a></li>`);
  const indexTemplate = await fs.promises.readFile(join(__dirname, 'index.html'), 'utf8');
  await fs.promises.writeFile(join(distDir, 'index.html'), indexTemplate.replace('lilili', bookUrls.join('\n')));

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
