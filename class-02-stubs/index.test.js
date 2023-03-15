const { error } = require('./src/constants')
const File = require("./src/file");
const assert = require("assert");

// IFEE
; (async () => {

  // should check for empty files
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);

    await assert.rejects(result, expected);
  }

  // should check broken headers, missing props
  {
    const filePath = "./mocks/brokenHeader-invalid.csv";
    const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);

    await assert.rejects(result, expected);
  }

  // should check for bigger files than expected
  {
    const filePath = "./mocks/fiveItems-invalid.csv";
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);

    await assert.rejects(result, expected);
  }

  // should pass with a proper file
  {
    const filePath = "./mocks/threeItems-valid.csv";
    const expected = [
      { id: 1, name: "Hilda Welch", profession: "Tech Lead", age: 26 },
      { id: 2, name: "Tillie Aguilar", profession: "Developer", age: 37 },
      { id: 3, name: "Tom Jensen", profession: "Architect", age: 27 }
    ]

    const result = await File.csvToJSON(filePath);

    await assert.deepEqual(result, expected);
  }

})();