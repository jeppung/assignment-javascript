import Util from "./util.js"

class User {
    constructor(_id, _username, _pin, _isAuth) {
        this.id = _id
        this.username = _username,
        this.pin = _pin,
        this.isAuth = _isAuth
    }


    async getBalance() {
        try{
            let res = await fetch(`http://localhost:1337/api/balance/${this.id}`, {
                method: "GET"
            })

            let data = await res.json()
            
            return [true, data.data.balance]
        }catch(err){
            return [false, err]
        }
    }

    async debitMoney(input) {
        let [status, data] = await this.getBalance()
        if(status) {
            if (input > data) {
                return [false, Error("Balance not enough for Debit")]
            }
            
            try{
                let res = await fetch("http://localhost:1337/api/transactions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        data: {
                          amount: -input,
                          userId: this.id
                        }
                    })
                })
    
                let data = await res.json()
                return [true, data]
            }catch{
                return [false, Error("error message from server")]
            }
        }
    }

    async creditMoney(input) {
        try{
            let res = await fetch("http://localhost:1337/api/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    data: {
                      amount: input,
                      userId: this.id
                    }
                })
            })

            let data = await res.json()
            return [true, data]
        }catch{
            return [false, Error("error message from server")]
        }
    }

    async getMutation(type, order) {
        try{
            let res = await fetch(`http://localhost:1337/api/mutation/${this.id}?sort=${order}&filter=${type}`, {
                method: "GET",   
            })

            let data = await res.json()
            if (data.data.transactionList.length == 0) return [false, Error("List data not found")]
            
            let processedData = data.data.transactionList.map((v) => {
                let rawDate = new Date(v.createdAt)
                let days = rawDate.getDate().toLocaleString('en-US', {
                    minimumIntegerDigits: 2
                })
                let months = rawDate.getMonth().toLocaleString('en-US', {
                    minimumIntegerDigits: 2
                })
                let years = rawDate.getFullYear()

                return [
                    `${days}-${months}-${years}`,
                    v.type,
                    Util.formatBalance(v.amount)
                ]
            })

            processedData.unshift(["Date", "Type", "Amount"])

            return [true, processedData]
        }catch(err){
            return [false, Error(err)]
        }
    }
}

export default User