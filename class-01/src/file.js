const { readFile } = require('fs/promises');
const { error } = require('./constants');
const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
}


class File {
  static async csvToJSON(filePath) {
    const content = await readFile(filePath, "utf-8");
    const { error, valid } = this.isValid(content)

    if (!valid) throw new Error(error);
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    let [headers, ...rows] = csvString.split(/\r?\n/);

    rows = rows.filter(Boolean);

    if (!rows.length) {
      return ({
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      })
    }
  }
}

module.exports = File