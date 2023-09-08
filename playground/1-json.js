const fs = require('fs')

// Load and parse the JSON data(buffer is what node.js to represent binary data)
const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)

// Change the name and property using your information
data.name = 'BatMan'
data.age = '128'

// Stringify the changed object and overwrite the original data
const newData = JSON.stringify(data)
fs.writeFileSync('1-json.json', newData)

// Test your work by viewing data in the JSON file
const updatedJSON = fs.readFileSync('1-json.json')
console.log(updatedJSON.toString())
