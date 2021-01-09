# Kiera.js Tests

## Usage

To use the Kiera test suite, create a new test case under the `cases` directory using the following template:

```js
module.exports = {
  name: '__CASE_NAME__',
  requiredPackages: ['__REQUIRED_PACKAGES__'],
  launch: () => {
    // Required Test case code
  },
  bench: () => {
    // Optional benchmark code
  }
}
```

Obviously, you must replace the `name` and `requiredPackages` templates.

### Required Packages Extra Info

For the `requiredPackages` field, you must specify an array of npm packages required to run the test/benchmark cases. The test case loader will check the `package.json` fields for dependencies (`dependencies` and `devDependencies`). If no dependencies are found, the `node_modules` directory will be searched. If all else has failed, the loader will announce all missing packages for the user to install.
