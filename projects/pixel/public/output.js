!function() {
    var t = new class {
        constructor() {
            this.t = new Date().getTime(), this.i = 99999999999 * Math.random(), this.h = "___cba", 
            this.o = document, this.u = this.o.body, this._ = this.o.documentElement, this.l = window, 
            this.m = this.l.location, this.p = this.l.screen, this.C = this.l.navigator, this.g = this.l.sessionStorage;
        }
        v = function() {
            try {
                var t, i = this.o.createElement("img");
                this.S;
                this.t, this.i, this.D(this.m.href), this.D(this.o.referrer), this.p.height, this.p.width, 
                this.p.pixelDepth, this._.clientHeight, this._.clientWidth, this.D(this.o.title), 
                this.D(this.C.platform), this.D(this.A()), this.D(this.B()), t = this.S + "&d=" + this.q(), 
                i.src = t, i.style.display = "none", this.u.appendChild(i), this.F();
            } catch (t) {}
        };
        q = function() {
            let t = {};
            try {
                t.tn = this.t, t.rn = this.i, t.dl = this.m.href, t.dr = this.o.referrer, t.sr = this.p.height + "x" + this.p.width + "x" + this.p.pixelDepth, 
                t.vr = this._.clientHeight + "x" + this._.clientWidth, t.dt = this.o.title, t.pf = this.C.platform, 
                t.cba = this.A(), t.dd = this.B();
            } catch (t) {}
            return this.D(this.l.btoa(unescape(this.D(JSON.stringify(t)))));
        };
        B = function() {
            return "";
        };
        U = function() {
            return !1;
        };
        F = function() {
            this.U() && this.g && this.g.removeItem(this.h);
        };
        R = function(t, i) {
            try {
                this.g && i && this.g.setItem(t, i);
            } catch (t) {}
        };
        D = function(t) {
            return encodeURIComponent(t);
        };
        T = function(t) {
            if (this.g) return this.g.getItem(t) || "";
        };
        A = function() {
            var t = new URLSearchParams(this.m.search).get(this.h);
            return t ? this.R(this.h, t) : t = this.T(this.h), t;
        };
    }();
    setTimeout(function() {
        t.v();
    }, 0), t.S = "http://pix.app1.test/collect?_=", t.B = function() {
        return console.log("I am overridden"), "x";
    }, t.k = function() {
        return !0;
    };
}();