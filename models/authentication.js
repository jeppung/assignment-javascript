class Authentication {

    static async validation(username, pin) {
        if ((username.length <= 10 && username.length > 0) && !Number.isNaN(parseInt(pin))) {
            return true
        }
        return false
    }
    
    static async register(username, pin) {
        return fetch("http://localhost:1337/api/register", {
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
    }

    static async login(username, pin) {
        return fetch("http://localhost:1337/api/login", {
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
    }
}

export default Authentication