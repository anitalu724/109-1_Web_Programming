let number

const getNumber = (forceRestart = false) => {
  // TODO:
  // generate a random number if number is undefined or forceRestart is true
  if (number === undefined || forceRestart === true) { 
    number = Math.floor(Math.random() * (100 - 1) + 1);
  }
  console.log("num = ", number)
  return number
}

export default getNumber
