function nametransform(e) {
    return e && 1 < e.length ? e.slice(0, 1) : e;
}

function formatDateTime(e) {
    var r, t = (r = e ? new Date(1e3 * Number(e)) : new Date()).getFullYear(), a = r.getMonth() + 1;
    a = a < 10 ? "0" + a : a;
    var n = r.getDate();
    return t + "-" + a + "-" + (n < 10 ? "0" + n : n);
}

function formatDateTimehour(e) {
    var r, t = (r = e ? new Date(1e3 * Number(e)) : new Date()).getFullYear(), a = r.getMonth() + 1;
    a = a < 10 ? "0" + a : a;
    var n = r.getDate();
    n = n < 10 ? "0" + n : n;
    var o = r.getHours();
    o = o < 10 ? "0" + o : o;
    var u = r.getMinutes(), m = r.getSeconds();
    return m = m < 10 ? "0" + m : m, t + "-" + a + "-" + n + " " + o + ":" + (u < 10 ? "0" + u : u);
}

function formatDateDayTimehour(e) {
    var r = parseInt(e / 1e3 / 60 / 60 / 24, 10), t = parseInt(e / 1e3 / 60 / 60 % 24, 10), a = parseInt(e / 1e3 / 60 % 60, 10), n = parseInt(e / 1e3 % 60, 10);
    return t = t < 10 ? "0" + t : t, a = a < 10 ? "0" + a : a, n = n < 10 ? "0" + n : n, 
    0 < Number(r) ? r + "天" + t + ":" + a + ":" + n : t + ":" + a + ":" + n;
}

function strcharacterDiscode(e) {
    return (e = (e = (e = (e = (e = (e = (e = e.replace(/&nbsp;/g, " ")).replace(/&quot;/g, "'")).replace(/&amp;/g, "&")).replace(/&lt;/g, "<")).replace(/&gt;/g, ">")).replace(/&#8226;/g, "•")).replace(/&nbsp;/g, " ")).replace(/&nbsp;/g, " ");
}

function formatImg(e) {
    return e.replace(/<img[^>]*>/gi, function(e, r) {
        return (e = (e = e.replace(/style=[\'\"]?([^\'\"]*)[\'\"]?/i, "")).replace(/src=[\'\"]/i, function(e, r) {
            return e + "https://e.zkezy.com/";
        })).replace(/src=[\'\"]?([^\'\"]*)[\'\"]?/gi, function(e, r) {
            return MyPreviewList.push(r), "onclick=\"mypreviewfun('" + r + "')\"" + e;
        });
    });
}

function formatImgtwo(e) {
    return e.replace(/<img[^>]*>/gi, function(e, r) {
        return e.replace(/src=[\'\"]/i, function(e, r) {
            return e + "https://e.zkezy.com/";
        });
    });
}

function readingvolume(e) {
    return 1e4 <= e ? e = (e / 1e4).toFixed(2) + "万" : e;
}

function transtr(e) {
    return e.split(",");
}

function transType(e) {
    var r = "";
    return 1 == e && (r = "普通考试"), 2 == e && (r = "报名考试"), 3 == e && (r = "固定人群考试"), 
    4 == e && (r = "付费考试"), 5 == e && (r = "密码考试"), 6 == e && (r = "VIP考试"), 7 == e && (r = "班级考试"), 
    r;
}

module.exports = {
    nametransform: nametransform,
    formatDateTime: formatDateTime,
    strcharacterDiscode: strcharacterDiscode,
    formatDateTimehour: formatDateTimehour,
    readingvolume: readingvolume,
    transtr: transtr,
    formatImg: formatImg,
    formatImgtwo: formatImgtwo,
    transType: transType,
    formatDateDayTimehour: formatDateDayTimehour
};