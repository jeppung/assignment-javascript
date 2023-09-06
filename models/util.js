class Util {

    static formatBalance(balance) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(balance);
    }
}

export default Util