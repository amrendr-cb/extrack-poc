!function() {
    var t = new class {
        constructor() {
            this.t = new Date().getTime(), this.i = 99999999999 * Math.random(), this.h = "___cba", 
            this.o = document, this.u = this.o.body, this._ = this.o.documentElement, this.l = window, 
            this.m = this.l.location, this.p = this.l.screen, this.C = this.l.navigator, this.g = this.l.sessionStorage;
        }
        v = function() {
            try {
                var t = this.o.createElement("img"), i = this.S;
                i += "&tn=" + this.t + "&rn=" + this.i, i += "&dl=" + this.D(this.m.href), i += "&dr=" + this.D(this.o.referrer), 
                i += "&sr=" + this.p.height + "x" + this.p.width + "x" + this.p.pixelDepth, i += "&vr=" + this._.clientHeight + "x" + this._.clientWidth, 
                i += "&dt=" + this.D(this.o.title), i += "&pf=" + this.D(this.C.platform), i += "&cba=" + this.D(this.A()), 
                i += "&dd=" + this.D(this.B()), t.src = i, t.style.display = "none", this.u.appendChild(t), 
                this.F();
            } catch (t) {
                console.error(t);
            }
        };
        B = function() {
            var t = this.t;
            return (t += this.i) && (this.i = 9999999 * Math.random()), t;
        };
        I = function() {
            return !1;
        };
        F = function() {
            this.I() && this.g && this.g.removeItem(this.h);
        };
        R = function(t) {
            try {
                this.g && t && this.g.setItem(this.h, t);
            } catch (t) {}
        };
        D = function(t) {
            return encodeURIComponent(t);
        };
        T = function(t) {
            if (this.g) return this.g.getItem(this.h) || "";
        };
        A = function() {
            var t = new URLSearchParams(this.m.search).get(this.h);
            return t ? this.R(t) : t = this.T(this.h), console.error(t), t;
        };
    }();
    window.setTimeout(function() {
        t.v();
    }, 0), t.S = "http://pix.app1.test/collect?_=", t.B = function() {
        return console.log("I am overridden"), "x";
    }, t.I = function() {
        return !0;
    };
}();