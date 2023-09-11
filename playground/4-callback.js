const millisecond = 1000

function add(a, b, callback) {
  const answer = a + b

  // Use setTimeout to simulate a 2 second delay
  setTimeout(() => {
    callback(answer)
  }, 2 * millisecond)
}

add(1, 99, (sum) => {
  console.log(sum)
})
