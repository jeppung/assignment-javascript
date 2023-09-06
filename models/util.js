class Util {

    static URL = "http://localhost:1337/api"
    static DEBIT = "debit"
    static CREDIT = "credit"

    static formatBalance(balance) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(balance);
    }
}

export default Util