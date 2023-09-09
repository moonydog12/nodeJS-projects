const square = (x) => x * x

const customEvent = {
  name: 'Birthday Party',
  gestList: ['Andrew', 'Jen', 'Micheal'],

  printGuestList() {
    this.gestList.forEach((guest) => {
      console.log(`${guest} is attending ${this.name}`)
    })
  },
}

customEvent.printGuestList()
