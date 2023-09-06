import { createInterface } from 'readline/promises';

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});


const startOnlineBank = async () => {
    while(true) {
        console.log("Welcome to DIGI ATM")
        console.log("Menu:")
        console.log("1. Register")
        console.log("2. Login")
        let userRef = await readline.question("Input: ")
    }
}

startOnlineBank()