import fs from 'fs'
import Helper from '@darkwolf/helper.mjs'

export default class InputFile {
  static from(file, name) {
    return new InputFile(file, name)
  }

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
