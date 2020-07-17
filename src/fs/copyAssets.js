const fs = require('fs')
const path = require('path')
const mkdir = require('./mkdir')
const configs = require('../parse/parseConfig')
const allFiles = require('./allFiles')
const absolutePath = require('../utils/absolutePath')
const generateFileName = require('../utils/generateName')

const copyAssets = (dir = path.join(process.cwd(), 'src'), to) => {
  return mkdir('build/__assets__').then(() => {
    const files = allFiles(dir)
      .map(f => path.parse(f))
      .filter(f => f.ext !== '.ulka' && f.ext !== '.md')
      .forEach(f => {
        const writePath =
          absolutePath(
            configs.buildPath +
              '/__assets__/' +
              generateFileName(f.dir + f.name + f.ext)
          ) + f.ext
        console.log(writePath)
        fs.writeFileSync(writePath, fs.readFileSync(path.format(f)))
      })
    return files
  })
}

module.exports = copyAssets
