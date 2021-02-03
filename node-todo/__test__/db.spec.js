const db = require('../db.js')
const fs = require('fs')
jest.mock('fs')

describe('db', ()=>{
  //调用函数就清除mock
  afterEach(() => {
    fs.clearMocks()
  })

  it('can read', async ()=>{
    const data = [{title: 'hi', done: true}]
    fs.setReadFileMock('./xxx', null, JSON.stringify(data))
    const list = await db.read('./xxx')
    //比较对象的时候用toStrictEqual
    expect(list).toStrictEqual(data)
  })
  it('can write', async ()=>{
    let fackFile = ''
    fs.setWriteFileMock('/yyy', (path, data, callback)=>{
      fackFile = data
      callback(null)
    })
    const list = [{title: 'Tong', done: true}, {title: 'tom', done: true}]
    await db.write(list, '/yyy')
    expect(fackFile).toBe(JSON.stringify(list)+'\n')
  })
})