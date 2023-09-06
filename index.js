import { createInterface } from 'readline/promises';
import User from './models/user.js';

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});


const startOnlineBank = async () => {
    let user = new User()

    while(true) {
        console.clear()
        console.log("Welcome to DIGI ATM")
        console.log("Menu:")
        console.log("1. Register")
        console.log("2. Login")
        let input = await readline.question("Input: ")

        switch(parseInt(input)) {
            case 1 : {
                while(true){
                    console.clear()
                    console.log("Register")
                    let username = await readline.question("username: ")
                    if (input != "") {
                        console.clear()
                        console.log("Register")
                        let pin = await readline.question("pin: ")

                        let result = user.register(username, pin)
                        if(result) break
                    }
                }
            }
        }
    }
}

startOnlineBank()