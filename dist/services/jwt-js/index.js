"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var CryptoJS = require("crypto-js"), JWT = function () { return function (e, t) { var r = this; this.buildHeader = function () { try {
    var e = r.props.enc, t = e.Utf8.parse(JSON.stringify({ type: "JWT", alg: "HS256" })), s = e.Base64.stringify(t).replace(/=+$/, "");
    return s = (s = s.replace(/\+/g, "-")).replace(/\//g, "_");
}
catch (e) {
    throw e;
} }, this.buildPayload = function (e) { try {
    var t = r.props.enc, s = JSON.stringify(e), a = t.Utf8.parse(s), i = t.Base64.stringify(a), n = t.Utf8.parse(JSON.stringify(i)), u = t.Base64.stringify(n).replace(/=+$/, "");
    return u = (u = u.replace(/\+/g, "-")).replace(/\//g, "_");
}
catch (e) {
    throw e;
} }, this.buildSignature = function (e) { try {
    var t = r.props.enc, s = CryptoJS.HmacSHA256(e, r.SECRET_KEY), a = t.Base64.stringify(s);
    return a = (a = (a = a.replace(/=+$/, "")).replace(/\+/g, "-")).replace(/\//g, "_");
}
catch (e) {
    throw e;
} }, this.checkJWT = function (e) { try {
    var t = r.props.enc, s = e.headers.Authorization || e.headers.authorization;
    if (!1 === /Bearer( )(.+){1}/g.test(s))
        return { status: !1, message: "Invalid access token" };
    var a = s.replace(/Bearer /g, "").split(".");
    if (a.length < 3)
        return { status: !1, message: "Invalid access token" };
    var i = a[0];
    if (i !== r.buildHeader())
        return { status: !1, message: "Invalid access token header" };
    var n = a[1], u = a[2], c = i + "." + n;
    if (u === r.buildSignature(c)) {
        var h = t.Base64.parse(a[1]), d = JSON.parse(t.Utf8.stringify(h));
        return d.expires && d.expires <= (new Date).getTime() ? { status: !1 } : { status: !0 };
    }
    return { status: !1, message: "Invalid access token" };
}
catch (e) {
    return { status: !1, message: e.message };
} }, this.data = function (e) { try {
    var t = r.props.enc, s = (e.headers.Authorization || e.headers.authorization).replace(/Bearer /g, "").split("."), a = t.Base64.parse(JSON.parse(t.Utf8.stringify(t.Base64.parse(s[1]))));
    return { status: !0, data: JSON.parse(t.Utf8.stringify(a)) };
}
catch (e) {
    return { status: !1, message: e.message };
} }, this.register = function (e) { void 0 === e && (e = {}); try {
    e.iss = r.ISS;
    var t = r.buildHeader(), s = r.buildPayload(e), a = t + "." + s;
    return t + "." + s + "." + r.buildSignature(a);
}
catch (e) {
    throw e;
} }, this.props = CryptoJS, this.buildHeader = this.buildHeader.bind(this), this.buildPayload = this.buildPayload.bind(this), this.buildSignature = this.buildSignature.bind(this), this.register = this.register.bind(this), this.checkJWT = this.checkJWT.bind(this), this.data = this.data.bind(this), this.ISS = t, this.SECRET_KEY = e; }; }();
exports.default = JWT;
//# sourceMappingURL=index.js.map