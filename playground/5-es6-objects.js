const age = 28

const user = {
  age,
  name: 'Moony',
  location: 'Taiwan',
  gender: 'female',
}

// Object destructuring
const { name, location, gender = 'male' } = user
