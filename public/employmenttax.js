function clearMessages() {
    hideElement("resultsp");
    hideElement("msg_salary");
    hideElement("msg_age")
}
function calculate2() {
    clearMessages();
    var b = 1;
    var c = getAndParseString("salary");
    if (c == -999) {
        b = 0
    }
    var a = getString("age"),
        d;
    if (a == "normal") {
        d = 31.42
    } else {
        if (a == "ungdom") {
            d = 15.49
        } else {
            if (a == "pensionär") {
                d = 10.21
            } else {
                b = 0
            }
        }
    }
    if (!b) {
        return
    }
    var h = c * d / 100;
    showResults(formatNumber(h) + " kr")
    return h;
};
