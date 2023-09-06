import { createInterface } from 'readline/promises';
import Authentication from './authentication.js';
import User from './user.js';

const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

class Menu {
    static async authMenu() {
        let user = new User()
        mainLoop:
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
                            let data = await res.json()

                            user.id = data.id
                            user.username = username
                            user.pin = pin
                            user.isAuth = true
                            
                            console.clear()
                            console.log("Login Success")
                            break mainLoop
                        }catch(err) {
                            console.log(err)
                        }
                    }
                }
            }
        }

        return user
    }

    static async mainMenu(user) {
        while(true) {
            console.log("Welcome to DIGI ATM")
            console.log("Menu:")
            console.log("1. Check Balance")
            console.log("2. Debit")
            console.log("3. Credit")
            console.log("4. Check mutation")
            console.log("5. Exit")
            let input = await readline.question("Input: ")
    
            switch(parseInt(input)) {
                case 1 : {
                    console.clear()
                    console.log("Check balance")
                    try{
                        let res = await user.getBalance()
                        if(!res.ok) throw new Error(res.statusText)
                        let data = await res.json()
                        console.log(`Your balance is ${data.data.balance}`)
                        await readline.question("Press any Key to back...")
                        console.clear()
                        break
                    }catch(err){
                        console.log(err)
                    }
                    break
                }
                case 2 : {
                    break
                }
            }
        }
    }
}

export default Menu