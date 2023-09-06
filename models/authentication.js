import Util from "./util.js"

class Authentication {

    static async validation(username, pin) {
        if ((username.length <= 10 && username.length > 0) && !Number.isNaN(parseInt(pin))) {
            return true
        }
        return false
    }
    
    static async register(username, pin) {
        try{
            let res = await fetch(`${Util.URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    data: {
                        username: username,
                        pin: pin,
                        wallet_number: Math.floor(Math.random() * 9000000000).toString()
                    }
                })
            })
            if(!res.ok) return [false, Error(res.statusText)]
            return [true, "Register Success"]
        }catch(err) {
            return [false, err]
        }
    }

    static async login(username, pin) {
        try{
            let res = await fetch(`${Util.URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    data: {
                        username: username,
                        pin: pin,
                    }
                })
            })

            let data = await res.json()
            if(!res.ok) return [false, Error(res.statusText)]

            return [true, data]
        }catch(err) {
            return [false, err]
        }
    }
}

export default Authentication