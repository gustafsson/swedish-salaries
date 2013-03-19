function clearMessages() {
    hideElement("resultsp");
    hideElement("results_table");
    hideElement("msg_salary");
    hideElement("msg_parish")
}
function getGrundavdrag(b, a) {
    var c = 0;
    if (a <= 0.99 * b) {
        c = 0.423 * b
    } else {
        if (a <= 2.72 * b) {
            c = 0.423 * b + 0.2 * (a - 0.99 * b)
        } else {
            if (a <= 3.11 * b) {
                c = 0.77 * b
            } else {
                if (a <= 7.88 * b) {
                    c = 0.77 * b - 0.1 * (a - 3.11 * b)
                } else {
                    c = 0.293 * b
                }
            }
        }
    }
    return 100 * Math.ceil(c / 100)
}
function getPBB(b) {
    var a = 0;
    switch (b) {
    case 2006:
        a = 39700;
        break;
    case 2007:
        a = 40300;
        break;
    case 2008:
        a = 41000;
        break;
    case 2009:
        a = 42800;
        break;
    case 2010:
        a = 42400;
        break;
    case 2011:
        a = 42800;
        break;
    case 2012:
        a = 44000;
        break;
    case 2013:
        a = 44500;
        break
    }
    return a
}
function getBrytpunkter(a) {
    var b = [
            0, 0
        ];
    switch (a) {
    case 2006:
        b = [
            306000, 460600
        ];
        break;
    case 2007:
        b = [
            316700, 476700
        ];
        break;
    case 2008:
        b = [
            328800, 495000
        ];
        break;
    case 2009:
        b = [
            367600, 526200
        ];
        break;
    case 2010:
        b = [
            372100, 532700
        ];
        break;
    case 2011:
        b = [
            383000, 548300
        ];
        break;
    case 2012:
        b = [
            401100, 574300
        ];
        break;
    case 2013:
        b = [
            413200, 591600
        ];
        break
    }
    return b
}
function getArbetsgivaravg(a) {
    return 0.3142
}
function getJobbavdrag(e, b, f) {
    var c = 0;
    var a = getPBB(e);
    var d = getGrundavdrag(a, b);
    switch (e) {
    case 2007:
        if (b > 2.72 * a) {
            c = f * (1.176 * a - d)
        }
        break;
    case 2008:
        if (b > 7 * a) {
            c = f * (1.413 * a - d)
        } else {
            if (b > 2.72 * a) {
                c = f * (1.272 * a - d + 0.033 * (b - 2.72 * a))
            }
        }
        break;
    case 2009:
        if (b > 7 * a) {
            c = f * (1.642 * a - d)
        } else {
            if (b > 2.72 * a) {
                c = f * (1.363 * a - d + 0.065 * (b - 2.72 * a))
            }
        }
        break;
    case 2010:
    case 2011:
    case 2012:
    case 2013:
        if (b > 7 * a) {
            c = f * (1.868 * a - d)
        } else {
            if (b > 2.72 * a) {
                c = f * (1.461 * a - d + 0.095 * (b - 2.72 * a))
            }
        }
        break
    }
    return Math.round(c)
}
function getTax(c, a) {
    var b;
    var d = taxes[a];
    if (d == undefined) {
        return -1
    }
    b = d[c];
    if (b == undefined) {
        return -2
    }
    return b
}
function calculate() {
    var j = 1;
    var p = new Date();
    clearMessages();
    var t = getAndParseString("salary");
    if (t == -999) {
        j = 0
    }
    var k = getString("parish").toUpperCase();
    var a = parseInt(document.getElementById("in_year").value);
    if (!j) {
        return
    }
    var n = 12 * t;
    var g = getPBB(a);
    var d = getGrundavdrag(g, n);
    if (t == 0) {
        showMessage("Fyll i månadslön", "msg_salary");
        return
    }
    if (n < d) {
        showMessage("Månadslönen är för liten", "msg_salary");
        return
    }
    tax = getTax(a, k);
    if (tax == -1) {
        showMessage("Välj en giltig församling", "msg_parish");
        return
    } else {
        if (tax == -2) {
            showMessage("Församlingen fanns inte det valda året", "msg_parish");
            return
        }
    }
    document.body.style.cursor = "wait";
    var r = (tax.kommun + tax.landsting) / 100;
    var i = tax.kyrka / 100;
    if (!document.getElementById("in_church").checked) {
        i = 0
    }
    var c = tax.begravning / 100;
    var o = (n - d) * (r + c + i);
    var q = r + c + i;
    var m = Math.floor(100 * q);
    if (Math.floor((10000 * q) % 100) > 50) {
        m += 1
    }
    var f = getBrytpunkter(a);
    var e = 0;
    if (n - d > f[0]) {
        e = ((n - d) - f[0]) * 0.2
    }
    if (n - d > f[1]) {
        e += ((n - d) - f[1]) * 0.05
    }
    jobbavdrag = getJobbavdrag(a, n, r);
    var h = (n - o - e + jobbavdrag) / 12;
    showResults("Du får " + formatNumber(h) + " kr i månaden efter skatt");
    var b = (n - d) * tax.kommun / 100;
    var l = (n - d) * tax.landsting / 100;
    var s = (n - d) * (i + c);
    setElementText("kommun_amount", formatNumber(b / 12));
    setElementText("landsting_amount", formatNumber(l / 12));
    setElementText("kyrka_amount", formatNumber(s / 12));
    setElementText("stat_amount", formatNumber(e / 12));
    setElementText("avdrag_amount", formatNumber(-1 * jobbavdrag / 12));
    setElementText("skattesats_amount", formatNumber(100 * (t - h) / t, 1));
    showElement("results_table");
    document.body.style.cursor = "default";
    return h;
};