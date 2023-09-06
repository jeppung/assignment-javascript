import { createInterface } from 'readline/promises';
import Authentication from './models/authentication.js';

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
                        
                        let isValid = Authentication.validation(username, pin)
                        if (isValid) {
                            try{
                                let res = await Authentication.register(username, pin)
                                if(!res.ok) throw new Error(res.statusText)

                                console.clear()
                                console.log("Register Success")
                                break
                            }catch(err){
                                console.log(err)
                            }
                        }
                    }
                }
                break
            }
            case 2 : {
                while(true){
                    console.clear()
                    console.log("Login")
                    let username = await readline.question("username: ")
                    console.clear()
                    console.log("Login")
                    let pin = await readline.question("pin: ")

                    try{
                        let res = await Authentication.login(username, pin)
                        if (!res.ok) throw new Error(res.statusText)

                        console.clear()
                        console.log("Login Success")
                        break
                    }catch(err) {
                        console.log(err)
                    }
                }
                break
            }
        }
    }
}

startOnlineBank()