// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

var S, d, O, x, R, W, U = {}, $ = [], Y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function k(t, e1) {
    for(var n in e1)t[n] = e1[n];
    return t;
}
function V(t) {
    var e2 = t.parentNode;
    e2 && e2.removeChild(t);
}
function Z(t, e3, n) {
    var r, l, _, s1 = {};
    for(_ in e3)_ == "key" ? r = e3[_] : _ == "ref" ? l = e3[_] : s1[_] = e3[_];
    if (arguments.length > 2 && (s1.children = arguments.length > 3 ? S.call(arguments, 2) : n), typeof t == "function" && t.defaultProps != null) for(_ in t.defaultProps)s1[_] === void 0 && (s1[_] = t.defaultProps[_]);
    return P(t, s1, r, l, null);
}
function P(t, e4, n, r, l) {
    var _ = {
        type: t,
        props: e4,
        key: n,
        ref: r,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: l ?? ++O
    };
    return l == null && d.vnode != null && d.vnode(_), _;
}
function N(t) {
    return t.children;
}
function E(t, e5) {
    this.props = t, this.context = e5;
}
function C(t, e6) {
    if (e6 == null) return t.__ ? C(t.__, t.__.__k.indexOf(t) + 1) : null;
    for(var n; e6 < t.__k.length; e6++)if ((n = t.__k[e6]) != null && n.__e != null) return n.__e;
    return typeof t.type == "function" ? C(t) : null;
}
function j(t) {
    var e7, n;
    if ((t = t.__) != null && t.__c != null) {
        for(t.__e = t.__c.base = null, e7 = 0; e7 < t.__k.length; e7++)if ((n = t.__k[e7]) != null && n.__e != null) {
            t.__e = t.__c.base = n.__e;
            break;
        }
        return j(t);
    }
}
function L(t) {
    (!t.__d && (t.__d = !0) && x.push(t) && !D.__r++ || W !== d.debounceRendering) && ((W = d.debounceRendering) || R)(D);
}
function D() {
    for(var t; D.__r = x.length;)t = x.sort(function(e8, n) {
        return e8.__v.__b - n.__v.__b;
    }), x = [], t.some(function(e9) {
        var n, r, l, _, s2, f;
        e9.__d && (s2 = (_ = (n = e9).__v).__e, (f = n.__P) && (r = [], (l = k({}, _)).__v = _.__v + 1, M(f, _, l, n.__n, f.ownerSVGElement !== void 0, _.__h != null ? [
            s2
        ] : null, r, s2 ?? C(_), _.__h), J(r, _), _.__e != s2 && j(_)));
    });
}
function z(t, e10, n, r, l, _, s3, f, p1, a1) {
    var o, h1, c1, i1, u, b1, v1, y1 = r && r.__k || $, m1 = y1.length;
    for(n.__k = [], o = 0; o < e10.length; o++)if ((i1 = n.__k[o] = (i1 = e10[o]) == null || typeof i1 == "boolean" ? null : typeof i1 == "string" || typeof i1 == "number" || typeof i1 == "bigint" ? P(null, i1, null, null, i1) : Array.isArray(i1) ? P(N, {
        children: i1
    }, null, null, null) : i1.__b > 0 ? P(i1.type, i1.props, i1.key, null, i1.__v) : i1) != null) {
        if (i1.__ = n, i1.__b = n.__b + 1, (c1 = y1[o]) === null || c1 && i1.key == c1.key && i1.type === c1.type) y1[o] = void 0;
        else for(h1 = 0; h1 < m1; h1++){
            if ((c1 = y1[h1]) && i1.key == c1.key && i1.type === c1.type) {
                y1[h1] = void 0;
                break;
            }
            c1 = null;
        }
        M(t, i1, c1 = c1 || U, l, _, s3, f, p1, a1), u = i1.__e, (h1 = i1.ref) && c1.ref != h1 && (v1 || (v1 = []), c1.ref && v1.push(c1.ref, null, i1), v1.push(h1, i1.__c || u, i1)), u != null ? (b1 == null && (b1 = u), typeof i1.type == "function" && i1.__k === c1.__k ? i1.__d = p1 = G(i1, p1, t) : p1 = q(t, i1, c1, y1, u, p1), typeof n.type == "function" && (n.__d = p1)) : p1 && c1.__e == p1 && p1.parentNode != t && (p1 = C(c1));
    }
    for(n.__e = b1, o = m1; o--;)y1[o] != null && (typeof n.type == "function" && y1[o].__e != null && y1[o].__e == n.__d && (n.__d = C(r, o + 1)), Q(y1[o], y1[o]));
    if (v1) for(o = 0; o < v1.length; o++)K(v1[o], v1[++o], v1[++o]);
}
function G(t, e11, n) {
    for(var r, l = t.__k, _ = 0; l && _ < l.length; _++)(r = l[_]) && (r.__ = t, e11 = typeof r.type == "function" ? G(r, e11, n) : q(n, r, r, l, r.__e, e11));
    return e11;
}
function q(t, e12, n, r, l, _) {
    var s4, f, p2;
    if (e12.__d !== void 0) s4 = e12.__d, e12.__d = void 0;
    else if (n == null || l != _ || l.parentNode == null) e: if (_ == null || _.parentNode !== t) t.appendChild(l), s4 = null;
    else {
        for(f = _, p2 = 0; (f = f.nextSibling) && p2 < r.length; p2 += 2)if (f == l) break e;
        t.insertBefore(l, _), s4 = _;
    }
    return s4 !== void 0 ? s4 : l.nextSibling;
}
function te(t, e13, n, r, l) {
    var _;
    for(_ in n)_ === "children" || _ === "key" || _ in e13 || T(t, _, null, n[_], r);
    for(_ in e13)l && typeof e13[_] != "function" || _ === "children" || _ === "key" || _ === "value" || _ === "checked" || n[_] === e13[_] || T(t, _, e13[_], n[_], r);
}
function F(t, e14, n) {
    e14[0] === "-" ? t.setProperty(e14, n) : t[e14] = n == null ? "" : typeof n != "number" || Y.test(e14) ? n : n + "px";
}
function T(t, e15, n, r, l) {
    var _;
    e: if (e15 === "style") if (typeof n == "string") t.style.cssText = n;
    else {
        if (typeof r == "string" && (t.style.cssText = r = ""), r) for(e15 in r)n && e15 in n || F(t.style, e15, "");
        if (n) for(e15 in n)r && n[e15] === r[e15] || F(t.style, e15, n[e15]);
    }
    else if (e15[0] === "o" && e15[1] === "n") _ = e15 !== (e15 = e15.replace(/Capture$/, "")), e15 = e15.toLowerCase() in t ? e15.toLowerCase().slice(2) : e15.slice(2), t.l || (t.l = {}), t.l[e15 + _] = n, n ? r || t.addEventListener(e15, _ ? I : H, _) : t.removeEventListener(e15, _ ? I : H, _);
    else if (e15 !== "dangerouslySetInnerHTML") {
        if (l) e15 = e15.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if (e15 !== "href" && e15 !== "list" && e15 !== "form" && e15 !== "tabIndex" && e15 !== "download" && e15 in t) try {
            t[e15] = n ?? "";
            break e;
        } catch  {}
        typeof n == "function" || (n != null && (n !== !1 || e15[0] === "a" && e15[1] === "r") ? t.setAttribute(e15, n) : t.removeAttribute(e15));
    }
}
function H(t) {
    this.l[t.type + !1](d.event ? d.event(t) : t);
}
function I(t) {
    this.l[t.type + !0](d.event ? d.event(t) : t);
}
function M(t, e16, n, r, l, _, s5, f, p3) {
    var a2, o, h2, c2, i2, u, b2, v2, y2, m2, w, g = e16.type;
    if (e16.constructor !== void 0) return null;
    n.__h != null && (p3 = n.__h, f = e16.__e = n.__e, e16.__h = null, _ = [
        f
    ]), (a2 = d.__b) && a2(e16);
    try {
        e: if (typeof g == "function") {
            if (v2 = e16.props, y2 = (a2 = g.contextType) && r[a2.__c], m2 = a2 ? y2 ? y2.props.value : a2.__ : r, n.__c ? b2 = (o = e16.__c = n.__c).__ = o.__E : ("prototype" in g && g.prototype.render ? e16.__c = o = new g(v2, m2) : (e16.__c = o = new E(v2, m2), o.constructor = g, o.render = _e), y2 && y2.sub(o), o.props = v2, o.state || (o.state = {}), o.context = m2, o.__n = r, h2 = o.__d = !0, o.__h = []), o.__s == null && (o.__s = o.state), g.getDerivedStateFromProps != null && (o.__s == o.state && (o.__s = k({}, o.__s)), k(o.__s, g.getDerivedStateFromProps(v2, o.__s))), c2 = o.props, i2 = o.state, h2) g.getDerivedStateFromProps == null && o.componentWillMount != null && o.componentWillMount(), o.componentDidMount != null && o.__h.push(o.componentDidMount);
            else {
                if (g.getDerivedStateFromProps == null && v2 !== c2 && o.componentWillReceiveProps != null && o.componentWillReceiveProps(v2, m2), !o.__e && o.shouldComponentUpdate != null && o.shouldComponentUpdate(v2, o.__s, m2) === !1 || e16.__v === n.__v) {
                    o.props = v2, o.state = o.__s, e16.__v !== n.__v && (o.__d = !1), o.__v = e16, e16.__e = n.__e, e16.__k = n.__k, e16.__k.forEach(function(A1) {
                        A1 && (A1.__ = e16);
                    }), o.__h.length && s5.push(o);
                    break e;
                }
                o.componentWillUpdate != null && o.componentWillUpdate(v2, o.__s, m2), o.componentDidUpdate != null && o.__h.push(function() {
                    o.componentDidUpdate(c2, i2, u);
                });
            }
            o.context = m2, o.props = v2, o.state = o.__s, (a2 = d.__r) && a2(e16), o.__d = !1, o.__v = e16, o.__P = t, a2 = o.render(o.props, o.state, o.context), o.state = o.__s, o.getChildContext != null && (r = k(k({}, r), o.getChildContext())), h2 || o.getSnapshotBeforeUpdate == null || (u = o.getSnapshotBeforeUpdate(c2, i2)), w = a2 != null && a2.type === N && a2.key == null ? a2.props.children : a2, z(t, Array.isArray(w) ? w : [
                w
            ], e16, n, r, l, _, s5, f, p3), o.base = e16.__e, e16.__h = null, o.__h.length && s5.push(o), b2 && (o.__E = o.__ = null), o.__e = !1;
        } else _ == null && e16.__v === n.__v ? (e16.__k = n.__k, e16.__e = n.__e) : e16.__e = ne(n.__e, e16, n, r, l, _, s5, p3);
        (a2 = d.diffed) && a2(e16);
    } catch (A2) {
        e16.__v = null, (p3 || _ != null) && (e16.__e = f, e16.__h = !!p3, _[_.indexOf(f)] = null), d.__e(A2, e16, n);
    }
}
function J(t, e17) {
    d.__c && d.__c(e17, t), t.some(function(n) {
        try {
            t = n.__h, n.__h = [], t.some(function(r) {
                r.call(n);
            });
        } catch (r) {
            d.__e(r, n.__v);
        }
    });
}
function ne(t, e18, n, r, l, _, s6, f) {
    var p4, a3, o, h3 = n.props, c3 = e18.props, i3 = e18.type, u = 0;
    if (i3 === "svg" && (l = !0), _ != null) {
        for(; u < _.length; u++)if ((p4 = _[u]) && "setAttribute" in p4 == !!i3 && (i3 ? p4.localName === i3 : p4.nodeType === 3)) {
            t = p4, _[u] = null;
            break;
        }
    }
    if (t == null) {
        if (i3 === null) return document.createTextNode(c3);
        t = l ? document.createElementNS("http://www.w3.org/2000/svg", i3) : document.createElement(i3, c3.is && c3), _ = null, f = !1;
    }
    if (i3 === null) h3 === c3 || f && t.data === c3 || (t.data = c3);
    else {
        if (_ = _ && S.call(t.childNodes), a3 = (h3 = n.props || U).dangerouslySetInnerHTML, o = c3.dangerouslySetInnerHTML, !f) {
            if (_ != null) for(h3 = {}, u = 0; u < t.attributes.length; u++)h3[t.attributes[u].name] = t.attributes[u].value;
            (o || a3) && (o && (a3 && o.__html == a3.__html || o.__html === t.innerHTML) || (t.innerHTML = o && o.__html || ""));
        }
        if (te(t, c3, h3, l, f), o) e18.__k = [];
        else if (u = e18.props.children, z(t, Array.isArray(u) ? u : [
            u
        ], e18, n, r, l && i3 !== "foreignObject", _, s6, _ ? _[0] : n.__k && C(n, 0), f), _ != null) for(u = _.length; u--;)_[u] != null && V(_[u]);
        f || ("value" in c3 && (u = c3.value) !== void 0 && (u !== t.value || i3 === "progress" && !u || i3 === "option" && u !== h3.value) && T(t, "value", u, h3.value, !1), "checked" in c3 && (u = c3.checked) !== void 0 && u !== t.checked && T(t, "checked", u, h3.checked, !1));
    }
    return t;
}
function K(t, e19, n) {
    try {
        typeof t == "function" ? t(e19) : t.current = e19;
    } catch (r) {
        d.__e(r, n);
    }
}
function Q(t, e20, n) {
    var r, l;
    if (d.unmount && d.unmount(t), (r = t.ref) && (r.current && r.current !== t.__e || K(r, null, e20)), (r = t.__c) != null) {
        if (r.componentWillUnmount) try {
            r.componentWillUnmount();
        } catch (_) {
            d.__e(_, e20);
        }
        r.base = r.__P = null;
    }
    if (r = t.__k) for(l = 0; l < r.length; l++)r[l] && Q(r[l], e20, typeof t.type != "function");
    n || t.__e == null || V(t.__e), t.__e = t.__d = void 0;
}
function _e(t, e, n) {
    return this.constructor(t, n);
}
function oe(t, e21, n) {
    var r, l, _;
    d.__ && d.__(t, e21), l = (r = typeof n == "function") ? null : n && n.__k || e21.__k, _ = [], M(e21, t = (!r && n || e21).__k = Z(N, null, [
        t
    ]), l || U, U, e21.ownerSVGElement !== void 0, !r && n ? [
        n
    ] : l ? null : e21.firstChild ? S.call(e21.childNodes) : null, _, !r && n ? n : l ? l.__e : e21.firstChild, r), J(_, t);
}
S = $.slice, d = {
    __e: function(t, e22, n, r) {
        for(var l, _, s7; e22 = e22.__;)if ((l = e22.__c) && !l.__) try {
            if ((_ = l.constructor) && _.getDerivedStateFromError != null && (l.setState(_.getDerivedStateFromError(t)), s7 = l.__d), l.componentDidCatch != null && (l.componentDidCatch(t, r || {}), s7 = l.__d), s7) return l.__E = l;
        } catch (f) {
            t = f;
        }
        throw t;
    }
}, O = 0, E.prototype.setState = function(t, e23) {
    var n;
    n = this.__s != null && this.__s !== this.state ? this.__s : this.__s = k({}, this.state), typeof t == "function" && (t = t(k({}, n), this.props)), t && k(n, t), t != null && this.__v && (e23 && this.__h.push(e23), L(this));
}, E.prototype.forceUpdate = function(t) {
    this.__v && (this.__e = !0, t && this.__h.push(t), L(this));
}, E.prototype.render = N, x = [], R = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, D.__r = 0, 0;
var c, e, v, i = 0, b = [], m = d.__b, H1 = d.__r, p = d.diffed, d1 = d.__c, y = d.unmount;
function a(_, n) {
    d.__h && d.__h(e, _, i || n), i = 0;
    var t = e.__H || (e.__H = {
        __: [],
        __h: []
    });
    return _ >= t.__.length && t.__.push({}), t.__[_];
}
function F1(_) {
    return i = 1, q1(A, _);
}
function q1(_, n, t) {
    var u = a(c++, 2);
    return u.t = _, u.__c || (u.__ = [
        t ? t(n) : A(void 0, n),
        function(o) {
            var f = u.t(u.__[0], o);
            u.__[0] !== f && (u.__ = [
                f,
                u.__[1]
            ], u.__c.setState({}));
        }
    ], u.__c = e), u.__;
}
function x1() {
    for(var _; _ = b.shift();)if (_.__P) try {
        _.__H.__h.forEach(s), _.__H.__h.forEach(h), _.__H.__h = [];
    } catch (n) {
        _.__H.__h = [], d.__e(n, _.__v);
    }
}
d.__b = function(_) {
    e = null, m && m(_);
}, d.__r = function(_) {
    H1 && H1(_), c = 0;
    var n = (e = _.__c).__H;
    n && (n.__h.forEach(s), n.__h.forEach(h), n.__h = []);
}, d.diffed = function(_) {
    p && p(_);
    var n = _.__c;
    n && n.__H && n.__H.__h.length && (b.push(n) !== 1 && v === d.requestAnimationFrame || ((v = d.requestAnimationFrame) || function(t) {
        var u, o = function() {
            clearTimeout(f), E1 && cancelAnimationFrame(u), setTimeout(t);
        }, f = setTimeout(o, 100);
        E1 && (u = requestAnimationFrame(o));
    })(x1)), e = null;
}, d.__c = function(_, n) {
    n.some(function(t) {
        try {
            t.__h.forEach(s), t.__h = t.__h.filter(function(u) {
                return !u.__ || h(u);
            });
        } catch (u) {
            n.some(function(o) {
                o.__h && (o.__h = []);
            }), n = [], d.__e(u, t.__v);
        }
    }), d1 && d1(_, n);
}, d.unmount = function(_) {
    y && y(_);
    var n, t = _.__c;
    t && t.__H && (t.__H.__.forEach(function(u) {
        try {
            s(u);
        } catch (o) {
            n = o;
        }
    }), n && d.__e(n, t.__v));
};
var E1 = typeof requestAnimationFrame == "function";
function s(_) {
    var n = e, t = _.__c;
    typeof t == "function" && (_.__c = void 0, t()), e = n;
}
function h(_) {
    var n = e;
    _.__c = _.__(), e = n;
}
function A(_, n) {
    return typeof n == "function" ? n(_) : n;
}
const $1 = (sel)=>document.querySelector(sel)
;
let flipped = false;
function flip() {
    flipped = !flipped;
    render();
}
const main = document.body.querySelector("main");
const card = $1(".card");
const frontButton = $1(".card-flip button:first-child");
const backButton = $1(".card-flip button:last-child");
const uiSelect = $1(".footer select");
frontButton.onclick = flip;
backButton.onclick = flip;
uiSelect.oninput = ()=>{
    self.dispatchEvent(new CustomEvent(`frontend:${uiSelect.value}`, {
        bubbles: true
    }));
};
function render() {
    if (main.parentElement !== document.body) {
        document.body.replaceChildren(main);
        flipped = false;
    }
    if (flipped) {
        card.classList.add("card--flipped");
    } else {
        card.classList.remove("card--flipped");
    }
    frontButton.disabled = !flipped;
    backButton.disabled = flipped;
    uiSelect.value = "vanilla";
}
function unrender() {
    document.body.replaceChildren();
}
function cx(...classes) {
    return classes.filter((c4)=>c4 && typeof c4 === "string"
    ).join(" ");
}
function App() {
    const [flipped1, setFlipped] = F1(false);
    return Z("main", {
        class: "main"
    }, Z("header", {
        class: cx("card", flipped1 && "card--flipped")
    }, Z("section", null, Z("h1", null, "Connor Logan"), Z("a", {
        class: "card__url",
        href: "https://connor.lol"
    }, "https://connor.lol"), Z("div", {
        class: "card__emoji"
    }, "\u269B\uFE0F"), Z("label", {
        class: "push-down"
    }, "Software engineer specializing in"), Z("div", {
        class: "card__specialties"
    }, Z("a", {
        target: "_blank",
        href: "https://typescriptlang.org"
    }, "TypeScript"), Z("a", {
        target: "_blank",
        href: "https://deno.land"
    }, "Deno"), Z("a", {
        target: "_blank",
        href: "https://developer.mozilla.org/en-US/docs/Web/API"
    }, "Web APIs"))), Z("section", null, Z("label", null, "Email"), Z("a", {
        class: "card__email",
        href: "mailto:hey@connor.lol"
    }, "hey@connor.lol"), Z("label", {
        class: "push-down"
    }, "connorlogin@"), Z("div", {
        class: "card__links"
    }, Z("a", {
        target: "_blank",
        href: "https://github.com/connorlogin"
    }, "github.com"), Z("a", {
        target: "_blank",
        href: "https://reddit.com/u/connorlogin"
    }, "reddit.com"), Z("a", {
        target: "_blank",
        href: "https://dev.to/connorlogin"
    }, "dev.to"), Z("a", {
        target: "_blank",
        href: "https://mastodon.online/@connorlogin"
    }, "mastodon.online"), Z("a", {
        target: "_blank",
        href: "https://twitter.com/connorlogin"
    }, "twitter.com")))), Z("nav", {
        class: "card-flip",
        "aria-hidden": "true"
    }, Z("button", {
        tabIndex: -1,
        disabled: !flipped1,
        onClick: ()=>setFlipped(false)
    }, "About"), Z("button", {
        tabIndex: -1,
        disabled: flipped1,
        onClick: ()=>setFlipped(true)
    }, "Connect")), Z("footer", {
        class: "footer"
    }, Z("a", {
        target: "_blank",
        href: "https://github.com/connorlogin/connor-lol"
    }, "This card"), "is powered by", Z("a", {
        target: "_blank",
        href: "https://github.com/connorlogin/cav"
    }, "Cav"), "and", Z("select", {
        value: "preact",
        onInput: (e24)=>{
            const target = e24.target;
            self.dispatchEvent(new CustomEvent(`frontend:${target.value}`, {
                bubbles: true
            }));
        }
    }, Z("option", {
        value: "vanilla"
    }, "the DOM"), Z("option", {
        value: "preact"
    }, "Preact"))));
}
function render1() {
    oe(Z(App, null), document.body);
}
function unrender1() {
    oe(null, document.body);
}
function setFrontend(frontend = localStorage.getItem("frontend") || "vanilla") {
    localStorage.setItem("frontend", frontend);
    if (frontend === "preact") {
        unrender();
        render1();
    } else {
        unrender1();
        render();
    }
}
setFrontend();
self.addEventListener("frontend:vanilla", ()=>setFrontend("vanilla")
);
self.addEventListener("frontend:preact", ()=>setFrontend("preact")
);
