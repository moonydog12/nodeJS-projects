const http = require('http')

const request = http.request(url, (response) => {
  let data = ''

  // fire when data comes in
  response.on('data', (chunk) => {
    data = data + chunk.toString()
  })

  response.on('end', () => {
    const body = JSON.parse(data)
    console.log(body)
  })
})

// error handling
request.on('error', (err) => {
  console.log('Error', err)
})

request.end()
