class Util {

    static URL = "http://localhost:1337/api"

    static formatBalance(balance) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(balance);
    }
}

export default Util