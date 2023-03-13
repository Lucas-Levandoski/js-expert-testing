const { readFile } = require('fs/promises');
const { error } = require('./constants');
const { arraysEqual } = require('./utils');

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
}


class File {
  static async csvToJSON(filePath) {
    const content = await readFile(filePath, "utf-8");
    const { error, valid } = this.validate(content)

    if (!valid) throw new Error(error);

    return this.parseCSVToJSON(content);
  }

  static validate(csvString, options = DEFAULT_OPTIONS) {
    let [header, ...rows] = csvString.split(/\r?\n/);

    rows = rows.filter(Boolean);

    let isHeaderValid = arraysEqual(header.split(',').sort(), options.fields.sort());

    if (!rows.length || rows.length > options.maxLines) {
      return ({
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      })
    }

    if (!isHeaderValid) {
      return ({
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      })
    }

    return { valid: true }
  }

  static parseCSVToJSON(csvString) {
    let [, ...rows] = csvString.split(/\r?\n/);

    rows = rows.filter(Boolean);

    const users = rows.map((row) => {
      let [id, name, profession, age] = row.split(",");

      id = id.trim();
      name = name.trim();
      profession = profession.trim();
      age = age.trim();

      return { id, name, profession, age };
    })

    return users;
  }
}

module.exports = File