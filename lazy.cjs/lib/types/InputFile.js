const fs = require('fs')
const Helper = require('@darkwolf/helper.cjs')

class InputFile {
  constructor(file, name) {
    this
      .setFile(file)
      .setName(name)
  }

  setFile(file) {
    this.file = Helper.isString(file) ? fs.createReadStream(file) : file
    return this
  }

  setName(name) {
    this.name = name
    return this
  }
}
InputFile.from = (file, name) => new InputFile(file, name)

module.exports = InputFile
