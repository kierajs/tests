const inq = require('inquirer')
const fs = require('fs')
const { createCipher } = require('crypto')
const { fail } = require('assert')
const testCases = new Map()
let testCasesNames = []

const caseFiles = fs.readdirSync('./cases').filter(f => f.endsWith('.case.js'))
for(const testCase of caseFiles) {
  try {
    const tc = require(`./cases/${testCase}`)
    testCases.set(tc.name, tc)
    testCasesNames.push(tc.name)
  } catch(e) {
    console.log(`Failed to load test case: ${testCase}`)
  }
}

if(testCasesNames.length) {
  inq
    .prompt({
      type: 'list',
      name: 'testCase',
      message: 'Please choose a test case to execute',
      choices: testCasesNames
    }).then(({testCase}) => {
      const tc = testCases.get(testCase)

      // Check for requiredPackages
      if(tc.requiredPackages.length) {
        let failedPackages = []
        for(const package of tc.requiredPackages) {
          const testDeps = require('./package.json').dependencies
          const testDevDeps = require('./package.json').devDependencies
          if(testDeps && testDeps[package]) continue
          if(testDevDeps && testDevDeps[package]) continue

          try {
            if(package.split('/').length > 1) {
              const packageDir = fs.readdirSync(package.split('/')[0]).find(x => x == package.split('/')[1])
              if(!packageDir) {
                failedPackages.push(package)       
              } else continue
            } else {
              const packageDir = fs.readdirSync(package).find(x => x == package)
              if(!packageDir) {
                failedPackages.push(package)
              } else continue
            }
          } catch(e) {
            failedPackages.push(package)
          }
        }

        if(failedPackages.length) {
          for(const failed of failedPackages) {
            console.log(`Required package (${package}) not found. Please install.`)
          }
          process.exit()
        }
      }

      if(tc.bench) {
        inq.prompt({
          type: 'confirm',
          name: 'useBench',
          message: 'Should the benchmark be run?'
        }).then(({useBench}) => {
          if(useBench) {
            console.log(`Starting test case "${tc.name}"\n\n`)
            tc.launch()
            console.log(`\n\nStarting benchmark for "${tc.name}"\n\n`)
            tc.bench()
          } else {
            console.log(`Starting test case "${tc.name}"\n\n`)
            tc.launch()
          }
        })
      } else {
        console.log(`Starting test case "${tc.name}"\n\n`)
        tc.launch()
      }
    })
} else {
  console.log(`No test cases found.`)
}
