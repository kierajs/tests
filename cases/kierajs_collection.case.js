module.exports = {
  name: '@kierajs/collection Test',
  requiredPackages: ['@kierajs/collection'],
  launch: () => {
    const Collection = require('@kierajs/collection')
    
    let testCollection = new Collection()
    console.log(`New collection: `, testCollection)
    testCollection.set('testKey', 'testValue')
    console.log(`Collection with new key (.set()): `, testCollection)

    console.log(`Collection .array():`, testCollection.array())
    
    // TODO: Add more tests..
  },
  bench: () => {
    const Collection = require('@kierajs/collection')

    let testCollection = new Collection()
    let colSet = Date.now()
    testCollection.set(`test`, `test`)
    colSet = Date.now() - colSet

    let colGet = Date.now()
    testCollection.get(`test`)
    colGet = Date.now() - colGet

    console.log(`ColSet: ${colSet}`)
    console.log(`ColGet: ${colGet}`)

    // TODO: Get a better benchmark
  }
}
