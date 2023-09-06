import { createInterface } from 'readline/promises';
import Authentication from './authentication.js';
import User from './user.js';
import Util from './util.js';

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
                    let [status, data] = await user.getBalance()
                    if(status) {
                        console.log(`Your balance is ${Util.formatBalance(data)}`)
                        await readline.question("Press any Key to back...")
                        console.clear()
                        break
                    }else{ 
                        console.log(data)
                    }
                }
                case 2 : {
                    while(true){
                        console.clear()
                        console.log("Debit")
                        let input = await readline.question("input: ")

                        if(!Number.isNaN(parseInt(input)) && input > 0){
                            let [status, data] = await user.debitMoney(input)
                            if(!status) {
                                console.clear()
                                console.log(data.message)
                                break
                            }
                            console.clear()
                            break
                        }
                    }
                    break
                }
                case 3: {
                    while(true){
                        console.clear()
                        console.log("Credit")
                        let input = await readline.question("input: ")
    
                        if(!Number.isNaN(parseInt(input)) && input > 0){
                            let [status, data] = await user.creditMoney(input)
                            if(status){
                                console.clear()
                            }else{
                                console.clear()
                                console.log(data.message)
                            }
                            break
                        }
                    }
                    break
                }
            }
        }
    }
}

export default Menu