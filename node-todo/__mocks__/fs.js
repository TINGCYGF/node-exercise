//伪造的fs
const fs = jest.genMockFromModule('fs')
//真正的fs
const _fs = jest.requireActual('fs')

//合并复制
Object.assign(fs, _fs)

//对应哈希表
let readMocks = {}

fs.setReadFileMock = (path, error, data) => {
  readMocks[path] = [error, data]
}

fs.readFile = (path, options, callback) => {
  // fs.readFile(path, fn)
  if(callback === undefined){ callback = options }
  //如果fs有mock就mock的fs
  if(path in readMocks){
    callback(...readMocks[path])
  }else {
    _fs.readFile(path, options, callback)
  }
}

let writeMocks = {}
fs.setWriteFileMock = (path, fn) => {
  writeMocks[path] = fn
}

fs.writeFile = (path, data, options, callback) => {
  if(path in writeMocks){
    writeMocks[path](path, data, options, callback)
  }else {
    _fs.writeFile(path, data, options, callback)
  }

}

//每次都需要清空mock
fs.clearMocks = () => {
  readMocks = {}
  writeMocks = {}
}


module.exports = fs