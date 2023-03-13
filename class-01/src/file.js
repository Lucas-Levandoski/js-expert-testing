const { readFile } = require('fs/promises');


class File {
  static async csvToJSON(filePath) {
    const content = await readFile(filePath, "utf-8");

    console.log({ content });
  }
}

module.exports = File