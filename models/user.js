class User {
    
    register(username, pin) {
        if ((username.length <= 10 && username.length > 0) && !Number.isNaN(parseInt(pin))) {
            this.username = username
            this.pin = pin

            fetch("http://localhost:1337/api/register", {
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
            }).then((res) => res.json()).catch((_) => {
                return false
            })

            return true
        }
        return false
    }
}

export default User