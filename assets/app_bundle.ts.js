// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

class HttpError extends Error {
    status;
    expose;
    detail;
    constructor(message, init){
        super(message);
        this.status = init?.status || 500;
        this.expose = init?.expose;
        this.detail = init?.detail || {};
    }
}
function serializer(init) {
    return init;
}
function serializerMap(serializers) {
    const defaults = new Map(Object.entries({
        httpError: serializer({
            check: (v3)=>v3 instanceof HttpError
            ,
            serialize: (v4)=>({
                    status: v4.status,
                    message: v4.message,
                    expose: v4.expose
                })
            ,
            deserialize: (raw, whenDone)=>{
                const u = raw;
                const err = new HttpError(u.message, {
                    status: u.status
                });
                whenDone((parsed)=>{
                    err.expose = parsed.expose;
                });
                return err;
            }
        }),
        error: serializer({
            check: (v5)=>v5 instanceof Error
            ,
            serialize: (v6)=>v6.message
            ,
            deserialize: (raw)=>new Error(raw)
        }),
        date: serializer({
            check: (v7)=>v7 instanceof Date
            ,
            serialize: (v8)=>v8.toJSON()
            ,
            deserialize: (raw)=>new Date(raw)
        }),
        undefined: serializer({
            check: (v9)=>typeof v9 === "undefined"
            ,
            serialize: ()=>null
            ,
            deserialize: ()=>undefined
        }),
        symbol: serializer({
            check: (v10)=>typeof v10 === "symbol"
            ,
            serialize: (v11)=>v11.description
            ,
            deserialize: (raw)=>Symbol(raw)
        }),
        map: serializer({
            check: (v12)=>v12 instanceof Map
            ,
            serialize: (v13)=>Array.from(v13.entries())
            ,
            deserialize: (_, whenDone)=>{
                const map = new Map();
                whenDone((entries)=>{
                    entries.forEach((v14)=>map.set(v14[0], v14[1])
                    );
                });
                return map;
            }
        }),
        set: serializer({
            check: (val)=>val instanceof Set
            ,
            serialize: (v15)=>Array.from(v15.values())
            ,
            deserialize: (_, whenDone)=>{
                const set = new Set();
                whenDone((values)=>{
                    values.forEach((v16)=>set.add(v16)
                    );
                });
                return set;
            }
        }),
        bigint: serializer({
            check: (v17)=>typeof v17 === "bigint"
            ,
            serialize: (v18)=>v18.toString()
            ,
            deserialize: (raw)=>BigInt(raw)
        }),
        regexp: serializer({
            check: (v19)=>v19 instanceof RegExp
            ,
            serialize: (v20)=>v20.toString()
            ,
            deserialize: (raw)=>{
                const r = raw.slice(1).split("/");
                return new RegExp(r[0], r[1]);
            }
        }),
        number: serializer({
            check: (v21)=>typeof v21 === "number" && (isNaN(v21) || v21 === Number.POSITIVE_INFINITY || v21 === Number.NEGATIVE_INFINITY || Object.is(v21, -0))
            ,
            serialize: (v22)=>isNaN(v22) ? "nan" : v22 === Number.POSITIVE_INFINITY ? "+infinity" : v22 === Number.NEGATIVE_INFINITY ? "-infinity" : Object.is(v22, -0) ? "-0" : 0
            ,
            deserialize: (raw)=>raw === "nan" ? NaN : raw === "+infinity" ? Number.POSITIVE_INFINITY : raw === "-infinity" ? Number.NEGATIVE_INFINITY : raw === "-zero" ? -0 : 0
        }),
        conflict: serializer({
            check: (v23)=>{
                if (!isPojo(v23)) {
                    return false;
                }
                const keys = Object.keys(v23);
                return keys.length === 1 && keys[0].startsWith("$");
            },
            serialize: Object.entries,
            deserialize: (_, whenDone)=>{
                const result = {};
                whenDone((entry)=>{
                    result[entry[0][0]] = entry[0][1];
                });
                return result;
            }
        })
    }));
    if (!serializers) {
        return defaults;
    }
    const smap = new Map();
    for (const [k2, v2] of Object.entries(serializers)){
        if (v2 === null) {
            continue;
        }
        if (k2 === "ref" || defaults.has(k2)) {
            throw new Error(`Conflict: The serializer key "${k2}" is reserved`);
        }
        smap.set(k2, v2);
    }
    if (!smap.size) {
        return defaults;
    }
    for (const [k1, v1] of defaults.entries()){
        smap.set(k1, v1);
    }
    return smap;
}
function serialize(value, serializers) {
    const smap = serializerMap(serializers || {});
    const paths = new Map();
    const pathString = (p1)=>p1.map((v24)=>v24.replace(/\./g, "\\.")
        ).join(".")
    ;
    const recur = (val, path)=>{
        if (val && (typeof val === "object" || typeof val === "symbol")) {
            if (paths.has(val)) {
                return {
                    $ref: pathString(paths.get(val))
                };
            }
            paths.set(val, path);
        }
        if (val === null || typeof val === "string" || typeof val === "boolean" || typeof val === "number" && !Object.is(val, -0) && Number.isFinite(val)) {
            return val;
        }
        for (const [name, serializer1] of smap.entries()){
            if (serializer1.check(val)) {
                const key = `$${name}`;
                return {
                    [key]: recur(serializer1.serialize(val), [
                        ...path,
                        key
                    ])
                };
            }
        }
        if (isPojo(val)) {
            const copy = {};
            for (const [k3, v25] of Object.entries(val)){
                copy[k3] = recur(v25, [
                    ...path,
                    k3
                ]);
            }
            return copy;
        }
        if (Array.isArray(val)) {
            const copy = [];
            for(let k4 = 0; k4 < val.length; k4++){
                copy[k4] = recur(val[k4], [
                    ...path,
                    k4.toString()
                ]);
            }
            return copy;
        }
        if (typeof val === "object" && "toJSON" in val && typeof val["toJSON"] === "function") {
            return val.toJSON(path[path.length - 1]);
        }
        throw new TypeError(`No matching serializers for ${val}`);
    };
    return recur(value, [
        ""
    ]);
}
function deserialize(value, serializers) {
    const smap = serializerMap(serializers || {});
    const objects = new Map();
    const whenDones = [];
    const recur = (val, path)=>{
        if (!val || typeof val !== "object") {
            return val;
        }
        if (Array.isArray(val)) {
            const copy = [];
            objects.set(path, copy);
            for(let i1 = 0; i1 < val.length; i1++){
                copy.push(recur(val[i1], path + "." + i1.toString()));
            }
            return copy;
        }
        if (!isPojo(val)) {
            throw new TypeError(`Non-plain objects can't be deserialized - Path: ${path}`);
        }
        const keys = Object.keys(val);
        if (keys.length === 1 && keys[0] === "$ref") {
            const refPath = val.$ref;
            const ref = objects.get(refPath);
            if (!ref) {
                throw new Error(`Invalid reference "${refPath}" - Path: "${path}"`);
            }
            return ref;
        }
        if (keys.length === 1 && keys[0].startsWith("$")) {
            const tag = keys[0];
            const name = keys[0].slice(1);
            const serializer2 = smap.get(name);
            if (!serializer2) {
                throw new Error(`No matching serializer with name "${name}" - Path: "${path}"`);
            }
            const raw = val[tag];
            let serialized = undefined;
            const result = serializer2.deserialize(raw, (fn)=>{
                whenDones.push(()=>fn(serialized)
                );
            });
            if (result && (typeof result === "object" || typeof result === "symbol")) {
                objects.set(path, result);
            }
            serialized = recur(raw, `${path}.${tag}`);
            return result;
        }
        const copy = {};
        objects.set(path, copy);
        for (const [k5, v26] of Object.entries(val)){
            copy[k5] = recur(v26, path + "." + k5.replace(/\./g, "\\."));
        }
        return copy;
    };
    const result1 = recur(value, "");
    let fn1 = whenDones.pop();
    while(fn1){
        fn1();
        fn1 = whenDones.pop();
    }
    return result1;
}
function serializeBody(value, serializers) {
    if (value instanceof ArrayBuffer || value instanceof ReadableStream || ArrayBuffer.isView(value)) {
        return {
            body: value,
            mime: "application/octet-stream"
        };
    }
    if (typeof value === "string") {
        return {
            body: value,
            mime: "text/plain"
        };
    }
    if (value instanceof URLSearchParams) {
        return {
            body: value,
            mime: "application/x-www-form-urlencoded"
        };
    }
    if (value instanceof Blob) {
        return {
            body: value,
            mime: value.type
        };
    }
    const form = new FormData();
    const fileKeys = new Map();
    const shape = JSON.stringify(serialize(value, {
        ...serializers,
        __blob: serializer({
            check: (v27)=>v27 instanceof Blob
            ,
            serialize: (v28)=>{
                let key = fileKeys.get(v28);
                if (key) {
                    return key;
                }
                key = crypto.randomUUID();
                form.set(key, v28);
                fileKeys.set(v28, key);
                return key;
            },
            deserialize: ()=>null
        })
    }));
    if (!fileKeys.size) {
        return {
            body: shape,
            mime: "application/json"
        };
    }
    form.set("__shape", new Blob([
        shape
    ], {
        type: "application/json"
    }));
    return {
        body: form,
        mime: "multipart/form-data"
    };
}
const mimeStream = /^application\/octet-stream;?/;
const mimeString = /^text\/plain;?/;
const mimeParams = /^application\/x-www-form-urlencoded;?/;
const mimeJson = /^application\/json;?/;
const mimeForm = /^multipart\/form-data;?/;
async function deserializeBody(from, serializers) {
    const mime = from.headers.get("content-type");
    if (!mime || mime.match(mimeStream)) {
        return from.body;
    }
    if (mime.match(mimeString)) {
        return await from.text();
    }
    if (mime.match(mimeParams)) {
        const form = await from.formData();
        const params = new URLSearchParams();
        for (const [k6, v29] of form.entries()){
            params.append(k6, v29);
        }
        return params;
    }
    if (mime.match(mimeJson)) {
        return deserialize(await from.json(), serializers);
    }
    if (mime.match(mimeForm)) {
        const form = await from.formData();
        const shape = form.get("__shape");
        if (!shape || !(shape instanceof Blob) || shape.type !== "application/json") {
            return form;
        }
        return JSON.parse(deserialize(await shape.text(), {
            ...serializers,
            __blob: serializer({
                check: ()=>false
                ,
                serialize: ()=>false
                ,
                deserialize: (raw)=>{
                    const blob = form.get(raw);
                    if (!blob || !(blob instanceof Blob)) {
                        throw new Error(`Referenced blob "${raw}" is missing from the form body`);
                    }
                    return blob;
                }
            })
        }));
    }
    return await from.blob();
}
function isPojo(obj) {
    return !!obj && typeof obj === "object" && (Object.getPrototypeOf(obj) === Object.prototype || Object.getPrototypeOf(obj) === null);
}
function wrapWebSocket(raw, init) {
    const listeners = {
        open: new Set(),
        close: new Set(),
        message: new Map(),
        error: new Set()
    };
    return {
        raw,
        send: (data)=>{
            raw.send(JSON.stringify(serialize(data, init?.serializers)));
        },
        close: (code, reason)=>{
            raw.close(code, reason);
        },
        on: (type, cb)=>{
            const decoder = new TextDecoder();
            if (type !== "message") {
                listeners[type].add(cb);
                raw.addEventListener(type, cb);
                return;
            }
            const messageListener = async (ev)=>{
                const data = ev.data;
                if (typeof data !== "string" && !ArrayBuffer.isView(data) && !(data instanceof Blob)) {
                    throw new Error(`Invalid data received: ${data}`);
                }
                let message = deserialize(JSON.parse(typeof data === "string" ? data : ArrayBuffer.isView(data) ? decoder.decode(data) : await data.text()), init?.serializers);
                if (init?.message) {
                    const parse = typeof init.message === "function" ? init.message : init.message.parse;
                    message = await parse(message);
                }
                Object.assign(ev, {
                    message
                });
                cb(ev);
            };
            listeners.message.set(cb, messageListener);
            raw.addEventListener(type, messageListener);
        },
        off: (type, cb)=>{
            if (!cb) {
                const turnOff = (t)=>{
                    for (const listener of listeners[t].values()){
                        raw.removeEventListener(t, listener);
                    }
                    listeners[t].clear();
                };
                if (!type) {
                    for (const k7 of Object.keys(listeners)){
                        turnOff(k7);
                    }
                    return;
                }
                turnOff(type);
                return;
            }
            if (!type) {
                throw new Error("If a callback is specified, the event type must also be specified");
            }
            const listener1 = type === "message" ? listeners[type].get(cb) : listeners[type].has(cb) ? cb : undefined;
            if (listener1) {
                listeners[type].delete(cb);
                raw.removeEventListener(type, listener1);
            }
        }
    };
}
function client(base = "", serializers1) {
    const customFetch = (path, x2 = {})=>{
        const url = new URL(path, self.location?.origin);
        if (x2.query) {
            for (const [k8, v30] of Object.entries(x2.query)){
                if (Array.isArray(v30)) {
                    for (const v2 of v30){
                        url.searchParams.append(k8, v2);
                    }
                } else {
                    url.searchParams.append(k8, v30);
                }
            }
        }
        if (x2.upgrade) {
            if (url.protocol === "http:") {
                url.protocol = "ws:";
            } else {
                url.protocol = "wss:";
            }
            const raw = new WebSocket(url.href, "json");
            return wrapWebSocket(raw, {
                serializers: x2.serializers
            });
        }
        return (async ()=>{
            let body = null;
            let mime = "";
            if (x2.message) {
                const pb = serializeBody(x2.message, x2.serializers);
                body = pb.body;
                mime = pb.mime;
            }
            const method = body === null ? "GET" : "POST";
            const res = await fetch(url.href, {
                method,
                headers: mime ? {
                    "content-type": mime
                } : {},
                body
            });
            let resBody = undefined;
            if (res.body) {
                resBody = await deserializeBody(res, x2.serializers);
            }
            if (!res.ok) {
                const detail = {
                    body: resBody
                };
                let message;
                let status;
                let expose;
                if (resBody instanceof HttpError) {
                    message = resBody.message;
                    status = resBody.status;
                    expose = resBody.expose;
                } else if (typeof resBody === "string") {
                    message = resBody;
                    status = res.status;
                    expose = undefined;
                } else {
                    message = res.statusText;
                    status = res.status;
                    expose = undefined;
                }
                throw new HttpError(message, {
                    status,
                    expose,
                    detail
                });
            }
            return resBody;
        })();
    };
    const proxy = (path, serializers)=>{
        return new Proxy((x3)=>customFetch(path, {
                ...x3,
                serializers: {
                    ...serializers,
                    ...x3.serializers
                }
            })
        , {
            get (_, property) {
                if (typeof property !== "string") {
                    throw new TypeError("Symbol segments can't be used on the client");
                }
                const append = property.split("/").filter((p2)=>!!p2
                ).join("/");
                return proxy(path.endsWith("/") ? path + append : path + "/" + append, serializers);
            }
        });
    };
    return proxy(base, serializers1);
}
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
function z(t, e10, n, r, l, _, s3, f, p3, a1) {
    var o, h1, c1, i2, u, b1, v31, y1 = r && r.__k || $, m1 = y1.length;
    for(n.__k = [], o = 0; o < e10.length; o++)if ((i2 = n.__k[o] = (i2 = e10[o]) == null || typeof i2 == "boolean" ? null : typeof i2 == "string" || typeof i2 == "number" || typeof i2 == "bigint" ? P(null, i2, null, null, i2) : Array.isArray(i2) ? P(N, {
        children: i2
    }, null, null, null) : i2.__b > 0 ? P(i2.type, i2.props, i2.key, null, i2.__v) : i2) != null) {
        if (i2.__ = n, i2.__b = n.__b + 1, (c1 = y1[o]) === null || c1 && i2.key == c1.key && i2.type === c1.type) y1[o] = void 0;
        else for(h1 = 0; h1 < m1; h1++){
            if ((c1 = y1[h1]) && i2.key == c1.key && i2.type === c1.type) {
                y1[h1] = void 0;
                break;
            }
            c1 = null;
        }
        M(t, i2, c1 = c1 || U, l, _, s3, f, p3, a1), u = i2.__e, (h1 = i2.ref) && c1.ref != h1 && (v31 || (v31 = []), c1.ref && v31.push(c1.ref, null, i2), v31.push(h1, i2.__c || u, i2)), u != null ? (b1 == null && (b1 = u), typeof i2.type == "function" && i2.__k === c1.__k ? i2.__d = p3 = G(i2, p3, t) : p3 = q(t, i2, c1, y1, u, p3), typeof n.type == "function" && (n.__d = p3)) : p3 && c1.__e == p3 && p3.parentNode != t && (p3 = C(c1));
    }
    for(n.__e = b1, o = m1; o--;)y1[o] != null && (typeof n.type == "function" && y1[o].__e != null && y1[o].__e == n.__d && (n.__d = C(r, o + 1)), Q(y1[o], y1[o]));
    if (v31) for(o = 0; o < v31.length; o++)K(v31[o], v31[++o], v31[++o]);
}
function G(t, e11, n) {
    for(var r, l = t.__k, _ = 0; l && _ < l.length; _++)(r = l[_]) && (r.__ = t, e11 = typeof r.type == "function" ? G(r, e11, n) : q(n, r, r, l, r.__e, e11));
    return e11;
}
function q(t, e12, n, r, l, _) {
    var s4, f, p4;
    if (e12.__d !== void 0) s4 = e12.__d, e12.__d = void 0;
    else if (n == null || l != _ || l.parentNode == null) e: if (_ == null || _.parentNode !== t) t.appendChild(l), s4 = null;
    else {
        for(f = _, p4 = 0; (f = f.nextSibling) && p4 < r.length; p4 += 2)if (f == l) break e;
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
function M(t, e16, n, r, l, _, s5, f, p5) {
    var a2, o, h2, c2, i3, u, b2, v32, y2, m2, w, g = e16.type;
    if (e16.constructor !== void 0) return null;
    n.__h != null && (p5 = n.__h, f = e16.__e = n.__e, e16.__h = null, _ = [
        f
    ]), (a2 = d.__b) && a2(e16);
    try {
        e: if (typeof g == "function") {
            if (v32 = e16.props, y2 = (a2 = g.contextType) && r[a2.__c], m2 = a2 ? y2 ? y2.props.value : a2.__ : r, n.__c ? b2 = (o = e16.__c = n.__c).__ = o.__E : ("prototype" in g && g.prototype.render ? e16.__c = o = new g(v32, m2) : (e16.__c = o = new E(v32, m2), o.constructor = g, o.render = _e), y2 && y2.sub(o), o.props = v32, o.state || (o.state = {}), o.context = m2, o.__n = r, h2 = o.__d = !0, o.__h = []), o.__s == null && (o.__s = o.state), g.getDerivedStateFromProps != null && (o.__s == o.state && (o.__s = k({}, o.__s)), k(o.__s, g.getDerivedStateFromProps(v32, o.__s))), c2 = o.props, i3 = o.state, h2) g.getDerivedStateFromProps == null && o.componentWillMount != null && o.componentWillMount(), o.componentDidMount != null && o.__h.push(o.componentDidMount);
            else {
                if (g.getDerivedStateFromProps == null && v32 !== c2 && o.componentWillReceiveProps != null && o.componentWillReceiveProps(v32, m2), !o.__e && o.shouldComponentUpdate != null && o.shouldComponentUpdate(v32, o.__s, m2) === !1 || e16.__v === n.__v) {
                    o.props = v32, o.state = o.__s, e16.__v !== n.__v && (o.__d = !1), o.__v = e16, e16.__e = n.__e, e16.__k = n.__k, e16.__k.forEach(function(A1) {
                        A1 && (A1.__ = e16);
                    }), o.__h.length && s5.push(o);
                    break e;
                }
                o.componentWillUpdate != null && o.componentWillUpdate(v32, o.__s, m2), o.componentDidUpdate != null && o.__h.push(function() {
                    o.componentDidUpdate(c2, i3, u);
                });
            }
            o.context = m2, o.props = v32, o.state = o.__s, (a2 = d.__r) && a2(e16), o.__d = !1, o.__v = e16, o.__P = t, a2 = o.render(o.props, o.state, o.context), o.state = o.__s, o.getChildContext != null && (r = k(k({}, r), o.getChildContext())), h2 || o.getSnapshotBeforeUpdate == null || (u = o.getSnapshotBeforeUpdate(c2, i3)), w = a2 != null && a2.type === N && a2.key == null ? a2.props.children : a2, z(t, Array.isArray(w) ? w : [
                w
            ], e16, n, r, l, _, s5, f, p5), o.base = e16.__e, e16.__h = null, o.__h.length && s5.push(o), b2 && (o.__E = o.__ = null), o.__e = !1;
        } else _ == null && e16.__v === n.__v ? (e16.__k = n.__k, e16.__e = n.__e) : e16.__e = ne(n.__e, e16, n, r, l, _, s5, p5);
        (a2 = d.diffed) && a2(e16);
    } catch (A2) {
        e16.__v = null, (p5 || _ != null) && (e16.__e = f, e16.__h = !!p5, _[_.indexOf(f)] = null), d.__e(A2, e16, n);
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
    var p6, a3, o, h3 = n.props, c3 = e18.props, i4 = e18.type, u = 0;
    if (i4 === "svg" && (l = !0), _ != null) {
        for(; u < _.length; u++)if ((p6 = _[u]) && "setAttribute" in p6 == !!i4 && (i4 ? p6.localName === i4 : p6.nodeType === 3)) {
            t = p6, _[u] = null;
            break;
        }
    }
    if (t == null) {
        if (i4 === null) return document.createTextNode(c3);
        t = l ? document.createElementNS("http://www.w3.org/2000/svg", i4) : document.createElement(i4, c3.is && c3), _ = null, f = !1;
    }
    if (i4 === null) h3 === c3 || f && t.data === c3 || (t.data = c3);
    else {
        if (_ = _ && S.call(t.childNodes), a3 = (h3 = n.props || U).dangerouslySetInnerHTML, o = c3.dangerouslySetInnerHTML, !f) {
            if (_ != null) for(h3 = {}, u = 0; u < t.attributes.length; u++)h3[t.attributes[u].name] = t.attributes[u].value;
            (o || a3) && (o && (a3 && o.__html == a3.__html || o.__html === t.innerHTML) || (t.innerHTML = o && o.__html || ""));
        }
        if (te(t, c3, h3, l, f), o) e18.__k = [];
        else if (u = e18.props.children, z(t, Array.isArray(u) ? u : [
            u
        ], e18, n, r, l && i4 !== "foreignObject", _, s6, _ ? _[0] : n.__k && C(n, 0), f), _ != null) for(u = _.length; u--;)_[u] != null && V(_[u]);
        f || ("value" in c3 && (u = c3.value) !== void 0 && (u !== t.value || i4 === "progress" && !u || i4 === "option" && u !== h3.value) && T(t, "value", u, h3.value, !1), "checked" in c3 && (u = c3.checked) !== void 0 && u !== t.checked && T(t, "checked", u, h3.checked, !1));
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
const main = $1("main");
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
let flipped = false;
function flip() {
    flipped = !flipped;
    render();
}
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
    }, "reddit.com")))), Z("nav", {
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
    }, "Cav"), "and", Z("label", {
        class: "footer__frontend"
    }, "Preact", Z("select", {
        value: "preact",
        onInput: (e24)=>{
            const target = e24.target;
            self.dispatchEvent(new CustomEvent(`frontend:${target.value}`, {
                bubbles: true
            }));
        }
    }, Z("option", {
        value: "vanilla"
    }, "Vanilla JS"), Z("option", {
        value: "preact"
    }, "Preact")))));
}
function render1() {
    oe(Z(App, null), document.body);
}
function unrender1() {
    oe(null, document.body);
}
const api = client("/api");
await api.visit({});
function setFrontend(frontend = localStorage.getItem("frontend") || "vanilla") {
    localStorage.setItem("frontend", frontend);
    if (frontend !== "vanilla") unrender();
    if (frontend !== "preact") unrender1();
    switch(frontend){
        case "preact":
            render1();
            break;
        case "vanilla":
        default:
            render();
    }
}
setFrontend();
self.addEventListener("frontend:vanilla", ()=>setFrontend("vanilla")
);
self.addEventListener("frontend:preact", ()=>setFrontend("preact")
);
