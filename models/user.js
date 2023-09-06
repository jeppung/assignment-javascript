class User {
    constructor(_id, _username, _pin, _isAuth) {
        this.id = _id
        this.username = _username,
        this.pin = _pin,
        this.isAuth = _isAuth
    }


    async getBalance() {
        return fetch(`http://localhost:1337/api/balance/${this.id}`, {
            method: "GET"
        })
    }
}

export default User