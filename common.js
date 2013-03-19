function numberOfMonthsToNiceYears(b) {
    var c = "";
    var d = Math.floor(b / 12);
    b = Math.round(b % 12);
    if (d > 0) {
        c += d + " år";
        if (b > 0) {
            c += " och "
        }
    }
    if (b == 1) {
        c += b + " månad"
    }
    if (b > 1) {
        c += b + " månader"
    }
    if (c == "") {
        c = "Direkt "
    } else {
        c = "På " + c
    }
    return c
}
function getString(b) {
    return document.getElementById("in_" + b).value
}
function getAndParseString(c, e) {
    var b = getString(c);
    if (typeof e === "undefined") {
        e = false
    }
    if (b === "") {
        if (e) {
            showMessage("Fyll i ett värde", "msg_" + c);
            return -999
        } else {
            b = "0"
        }
    }
    var d = parseFloat(b.replace(",", "."));
    if (isNaN(d)) {
        showMessage("Felaktigt talformat", "msg_" + c);
        return -999
    }
    return d
}
function showMessage(b, c) {
    setElementText(c, b);
    showElement(c)
}
function showResults(b) {
    setElementText("results", b);
    showElement("resultsp");
    fadeOut("results")
}
function hideElement(c) {
    var b = document.getElementById(c);
    if (b) {
        b.style.display = "none"
    }
}
function showElement(d, c) {
    if (typeof c === "undefined") {
        c = "block"
    }
    var b = document.getElementById(d);
    if (b) {
        b.style.display = c
    } else {
        alert("Element " + d + " missing")
    }
}
function setElementText(d, c) {
    var b = document.getElementById(d);
    if (b) {
        b.innerHTML = c
    } else {
        alert("Element " + d + " missing")
    }
}
function formatNumber(c, b) {
    if (typeof b === "undefined") {
        b = 0
    }
    return FormatNumberBy3(c.toFixed(b), ".", " ")
}
function FormatNumberBy3(c, d, b) {
    if (arguments.length == 2) {
        b = ","
    }
    if (arguments.length == 1) {
        b = ",";
        d = "."
    }
    c = c.toString();
    a = c.split(d);
    x = a[0];
    y = a[1];
    z = "";
    if (typeof(x) != "undefined") {
        for (i = x.length - 1; i >= 0; i--) {
            z += x.charAt(i)
        }
        z = z.replace(/(\d{3})/g, "$1" + b);
        if (z.slice(-b.length) == b) {
            z = z.slice(0, -b.length)
        }
        x = "";
        for (i = z.length - 1; i >= 0; i--) {
            x += z.charAt(i)
        }
        if (typeof(y) != "undefined" && y.length > 0) {
            x += d + y
        }
    }
    return x.replace(".", ",")
}
var FadeInterval = 150;
var FadeSteps = new Array("ee", "dd", "cc", "bb", "aa", "99", "88", "77", "66", "55", "44");
var StartFadeAt = FadeSteps.length - 1;
function fadeOut(b) {
    DoFade(StartFadeAt, b)
}
function DoFade(c, b) {
    if (c >= 0) {
        document.getElementById(b).style.backgroundColor = "#ffff" + FadeSteps[c];
        if (c == 0) {
            document.getElementById(b).style.backgroundColor = "transparent"
        }
        setTimeout(function () {
            DoFade(c - 1, b)
        }, FadeInterval)
    }
};