var requirejs,
    require,
    define; !
    function(aa) {
        function I(t) {
            return "[object Function]" === L.call(t)
        }
        function J(t) {
            return "[object Array]" === L.call(t)
        }
        function y(t, e) {
            if (t) {
                var i;
                for (i = 0; i < t.length && (!t[i] || !e(t[i], i, t)); i += 1);
            }
        }
        function M(t, e) {
            if (t) {
                var i;
                for (i = t.length - 1; i > -1 && (!t[i] || !e(t[i], i, t)); i -= 1);
            }
        }
        function s(t, e) {
            return ga.call(t, e)

        }
        function m(t, e) {
            return s(t, e) && t[e]
        }
        function G(t, e) {
            for (var i in t) if (s(t, i) && e(t[i], i)) break
        }
        function R(t, e, i, n) {
            return e && G(e,
                function(e, r) { (i || !s(t, r)) && (n && "string" != typeof e ? (t[r] || (t[r] = {}), R(t[r], e, i, n)) : t[r] = e)
                }),
                t
        }
        function u(t, e) {
            return function() {
                return e.apply(t, arguments)
            }
        }
        function ba(t) {
            if (!t) return t;
            var e = aa;
            return y(t.split("."),
                function(t) {
                    e = e[t]
                }),
                e
        }
        function B(t, e, i, n) {
            return e = Error(e + "\nhttp://requirejs.org/docs/errors.html#" + t),
                e.requireType = t,
                e.requireModules = n,
                i && (e.originalError = i),
                e
        }
        function ha(t) {
            function e(t, e, i) {
                var n,
                    r,
                    a,
                    o,
                    s,
                    c,
                    u,
                    l = e && e.split("/");
                n = l;
                var d = C.map,
                    h = d && d["*"];
                if (t && "." === t.charAt(0)) if (e) {
                    for (n = m(C.pkgs, e) ? l = [e] : l.slice(0, l.length - 1), e = t = n.concat(t.split("/")), n = 0; e[n]; n += 1) if (r = e[n], "." === r) e.splice(n, 1),
                        n -= 1;
                    else if (".." === r) {
                        if (1 === n && (".." === e[2] || ".." === e[0])) break;
                        n > 0 && (e.splice(n - 1, 2), n -= 2)
                    }
                    n = m(C.pkgs, e = t[0]),
                        t = t.join("/"),
                        n && t === e + "/" + n.main && (t = e)
                } else 0 === t.indexOf("./") && (t = t.substring(2));
                if (i && d && (l || h)) {
                    for (e = t.split("/"), n = e.length; n > 0; n -= 1) {
                        if (a = e.slice(0, n).join("/"), l) for (r = l.length; r > 0; r -= 1) if ((i = m(d, l.slice(0, r).join("/"))) && (i = m(i, a))) {
                            o = i,
                                s = n;
                            break
                        }
                        if (o) break; ! c && h && m(h, a) && (c = m(h, a), u = n)
                    } ! o && c && (o = c, s = u),
                        o && (e.splice(0, s, o), t = e.join("/"))
                }
                return t
            }
            function i(t) {
                A && y(document.getElementsByTagName("script"),
                    function(e) {
                        return e.getAttribute("data-requiremodule") === t && e.getAttribute("data-requirecontext") === x.contextName ? (e.parentNode.removeChild(e), !0) : void 0

                    })
            }
            function n(t) {
                var e = m(C.paths, t);
                return e && J(e) && 1 < e.length ? (i(t), e.shift(), x.require.undef(t), x.require([t]), !0) : void 0
            }
            function r(t) {
                var e,
                    i = t ? t.indexOf("!") : -1;
                return i > -1 && (e = t.substring(0, i), t = t.substring(i + 1, t.length)),
                    [e, t]
            }
            function a(t, i, n, a) {
                var o,
                    s,
                    c = null,
                    u = i ? i.name: null,
                    l = t,
                    d = !0,
                    h = "";
                return t || (d = !1, t = "_@r" + ($ += 1)),
                    t = r(t),
                    c = t[0],
                    t = t[1],
                    c && (c = e(c, u, a), s = m(M, c)),
                    t && (c ? h = s && s.normalize ? s.normalize(t,
                    function(t) {
                        return e(t, u, a)

                    }) : e(t, u, a) : (h = e(t, u, a), t = r(h), c = t[0], h = t[1], n = !0, o = x.nameToUrl(h))),
                    n = !c || s || n ? "": "_unnormalized" + (D += 1),
                {
                    prefix: c,
                    name: h,
                    parentMap: i,
                    unnormalized: !!n,
                    url: o,
                    originalName: l,
                    isDefine: d,
                    id: (c ? c + "!" + h: h) + n
                }
            }
            function o(t) {
                var e = t.id,
                    i = m(E, e);
                return i || (i = E[e] = new x.Module(t)),
                    i
            }
            function c(t, e, i) {
                var n = t.id,
                    r = m(E, n);
                ! s(M, n) || r && !r.defineEmitComplete ? o(t).on(e, i) : "defined" === e && i(M[n])
            }
            function d(t, e) {
                var i = t.requireModules,
                    n = !1;
                e ? e(t) : (y(i,
                    function(e) { (e = m(E, e)) && (e.error = t, e.events.error && (n = !0, e.emit("error", t)))
                    }), n || l.onError(t))
            }
            function h() {
                T.length && (ia.apply(U, [U.length - 1, 0].concat(T)), T = [])
            }
            function f(t) {
                delete E[t],
                    delete k[t]

            }
            function p(t, e, i) {
                var n = t.map.id;
                t.error ? t.emit("error", t.error) : (e[n] = !0, y(t.depMaps,
                    function(n, r) {
                        var a = n.id,
                            o = m(E, a);
                        o && !t.depMatched[r] && !i[a] && (m(e, a) ? (t.defineDep(r, M[a]), t.check()) : p(o, e, i))
                    }), i[n] = !0)
            }
            function g() {
                var t,
                    e,
                    r,
                    a,
                    o = (r = 1e3 * C.waitSeconds) && x.startTime + r < (new Date).getTime(),
                    s = [],
                    c = [],
                    u = !1,
                    l = !0;
                if (!_) {
                    if (_ = !0, G(k,
                        function(r) {
                            if (t = r.map, e = t.id, r.enabled && (t.isDefine || c.push(r), !r.error)) if (!r.inited && o) n(e) ? u = a = !0: (s.push(e), i(e));
                            else if (!r.inited && r.fetched && t.isDefine && (u = !0, !t.prefix)) return l = !1
                        }), o && s.length) return r = B("timeout", "Load timeout for modules: " + s, null, s),
                        r.contextName = x.contextName,
                        d(r);
                    l && y(c,
                        function(t) {
                            p(t, {},
                                {})
                        }),
                        o && !a || !u || !A && !da || z || (z = setTimeout(function() {
                            z = 0,
                                g()
                        },
                        50)),
                        _ = !1
                }
            }
            function v(t) {
                s(M, t[0]) || o(a(t[0], null, !0)).init(t[1], t[2])
            }
            function w(t) {
                var t = t.currentTarget || t.srcElement,
                    e = x.onScriptLoad;
                return t.detachEvent && !Y ? t.detachEvent("onreadystatechange", e) : t.removeEventListener("load", e, !1),
                    e = x.onScriptError,
                    (!t.detachEvent || Y) && t.removeEventListener("error", e, !1),
                {
                    node: t,
                    id: t && t.getAttribute("data-requiremodule")
                }

            }
            function b() {
                var t;
                for (h(); U.length;) {
                    if (t = U.shift(), null === t[0]) return d(B("mismatch", "Mismatched anonymous define() module: " + t[t.length - 1]));
                    v(t)
                }
            }
            var _,
                S,
                x,
                L,
                z,
                C = {
                    waitSeconds: 7,
                    baseUrl: "./",
                    paths: {},
                    pkgs: {},
                    shim: {},
                    config: {}
                },
                E = {},
                k = {},
                N = {},
                U = [],
                M = {},
                j = {},
                $ = 1,
                D = 1;
            return L = {
                require: function(t) {
                    return t.require ? t.require: t.require = x.makeRequire(t.map)

                },
                exports: function(t) {
                    return t.usingExports = !0,
                        t.map.isDefine ? t.exports ? t.exports: t.exports = M[t.map.id] = {}: void 0
                },
                module: function(t) {
                    return t.module ? t.module: t.module = {
                        id: t.map.id,
                        uri: t.map.url,
                        config: function() {
                            return C.config && m(C.config, t.map.id) || {}
                        },
                        exports: M[t.map.id]
                    }
                }
            },
                S = function(t) {
                    this.events = m(N, t.id) || {},
                        this.map = t,
                        this.shim = m(C.shim, t.id),
                        this.depExports = [],
                        this.depMaps = [],
                        this.depMatched = [],
                        this.pluginMaps = {},
                        this.depCount = 0

                },
                S.prototype = {
                    init: function(t, e, i, n) {
                        n = n || {},
                            this.inited || (this.factory = e, i ? this.on("error", i) : this.events.error && (i = u(this,
                            function(t) {
                                this.emit("error", t)
                            })), this.depMaps = t && t.slice(0), this.errback = i, this.inited = !0, this.ignore = n.ignore, n.enabled || this.enabled ? this.enable() : this.check())
                    },
                    defineDep: function(t, e) {
                        this.depMatched[t] || (this.depMatched[t] = !0, this.depCount -= 1, this.depExports[t] = e)

                    },
                    fetch: function() {
                        if (!this.fetched) {
                            this.fetched = !0,
                                x.startTime = (new Date).getTime();
                            var t = this.map;
                            if (!this.shim) return t.prefix ? this.callPlugin() : this.load();
                            x.makeRequire(this.map, {
                                enableBuildCallback: !0
                            })(this.shim.deps || [], u(this,
                                function() {
                                    return t.prefix ? this.callPlugin() : this.load()
                                }))
                        }
                    },
                    load: function() {
                        var t = this.map.url;
                        j[t] || (j[t] = !0, x.load(this.map.id, t))
                    },
                    check: function() {
                        if (this.enabled && !this.enabling) {
                            var t,
                                e,
                                i = this.map.id;
                            e = this.depExports;
                            var n = this.exports,
                                r = this.factory;
                            if (this.inited) {
                                if (this.error) this.emit("error", this.error);
                                else if (!this.defining) {
                                    if (this.defining = !0, 1 > this.depCount && !this.defined) {
                                        if (I(r)) {
                                            if (this.events.error) try {
                                                n = x.execCb(i, r, e, n)

                                            } catch(a) {
                                                t = a
                                            } else n = x.execCb(i, r, e, n);
                                            if (this.map.isDefine && ((e = this.module) && void 0 !== e.exports && e.exports !== this.exports ? n = e.exports: void 0 === n && this.usingExports && (n = this.exports)), t) return t.requireMap = this.map,
                                                t.requireModules = [this.map.id],
                                                t.requireType = "define",
                                                d(this.error = t)
                                        } else n = r;
                                        this.exports = n,
                                            this.map.isDefine && !this.ignore && (M[i] = n, l.onResourceLoad) && l.onResourceLoad(x, this.map, this.depMaps),
                                            f(i),
                                            this.defined = !0

                                    }
                                    this.defining = !1,
                                        this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                                }
                            } else this.fetch()
                        }
                    },
                    callPlugin: function() {
                        var t = this.map,
                            i = t.id,
                            n = a(t.prefix);
                        this.depMaps.push(n),
                            c(n, "defined", u(this,
                                function(n) {
                                    var r,
                                        h;
                                    h = this.map.name;
                                    var p = this.map.parentMap ? this.map.parentMap.name: null,
                                        g = x.makeRequire(t.parentMap, {
                                            enableBuildCallback: !0
                                        });
                                    this.map.unnormalized ? (n.normalize && (h = n.normalize(h,
                                        function(t) {
                                            return e(t, p, !0)
                                        }) || ""), n = a(t.prefix + "!" + h, this.map.parentMap), c(n, "defined", u(this,
                                        function(t) {
                                            this.init([],
                                                function() {
                                                    return t
                                                },
                                                null, {
                                                    enabled: !0,
                                                    ignore: !0
                                                })
                                        })), (h = m(E, n.id)) && (this.depMaps.push(n), this.events.error && h.on("error", u(this,
                                        function(t) {
                                            this.emit("error", t)

                                        })), h.enable())) : (r = u(this,
                                        function(t) {
                                            this.init([],
                                                function() {
                                                    return t
                                                },
                                                null, {
                                                    enabled: !0
                                                })
                                        }), r.error = u(this,
                                        function(t) {
                                            this.inited = !0,
                                                this.error = t,
                                                t.requireModules = [i],
                                                G(E,
                                                    function(t) {
                                                        0 === t.map.id.indexOf(i + "_unnormalized") && f(t.map.id)
                                                    }),
                                                d(t)
                                        }), r.fromText = u(this,
                                        function(e, n) {
                                            var c = t.name,
                                                u = a(c),
                                                h = O;
                                            n && (e = n),
                                                h && (O = !1),
                                                o(u),
                                                s(C.config, i) && (C.config[c] = C.config[i]);
                                            try {
                                                l.exec(e)
                                            } catch(f) {
                                                return d(B("fromtexteval", "fromText eval for " + i + " failed: " + f, f, [i]))
                                            }
                                            h && (O = !0),
                                                this.depMaps.push(u),
                                                x.completeLoad(c),
                                                g([c], r)
                                        }), n.load(t.name, g, r, C))
                                })),
                            x.enable(n, this),
                            this.pluginMaps[n.id] = n
                    },
                    enable: function() {
                        k[this.map.id] = this,
                            this.enabling = this.enabled = !0,
                            y(this.depMaps, u(this,
                                function(t, e) {
                                    var i,
                                        n;
                                    if ("string" == typeof t) {
                                        if (t = a(t, this.map.isDefine ? this.map: this.map.parentMap, !1, !this.skipMap), this.depMaps[e] = t, i = m(L, t.id)) return void(this.depExports[e] = i(this));
                                        this.depCount += 1,
                                            c(t, "defined", u(this,
                                                function(t) {
                                                    this.defineDep(e, t),
                                                        this.check()
                                                })),
                                            this.errback && c(t, "error", this.errback)
                                    }
                                    i = t.id,
                                        n = E[i],
                                        !s(L, i) && n && !n.enabled && x.enable(t, this)

                                })),
                            G(this.pluginMaps, u(this,
                                function(t) {
                                    var e = m(E, t.id);
                                    e && !e.enabled && x.enable(t, this)
                                })),
                            this.enabling = !1,
                            this.check()
                    },
                    on: function(t, e) {
                        var i = this.events[t];
                        i || (i = this.events[t] = []),
                            i.push(e)
                    },
                    emit: function(t, e) {
                        y(this.events[t],
                            function(t) {
                                t(e)
                            }),
                            "error" === t && delete this.events[t]
                    }
                },
                x = {
                    config: C,
                    contextName: t,
                    registry: E,
                    defined: M,
                    urlFetched: j,
                    defQueue: U,
                    Module: S,
                    makeModuleMap: a,
                    nextTick: l.nextTick,
                    onError: d,
                    configure: function(t) {
                        t.baseUrl && "/" !== t.baseUrl.charAt(t.baseUrl.length - 1) && (t.baseUrl += "/");
                        var e = C.pkgs,
                            i = C.shim,
                            n = {
                                paths: !0,
                                config: !0,
                                map: !0
                            };
                        G(t,
                            function(t, e) {
                                n[e] ? "map" === e ? (C.map || (C.map = {}), R(C[e], t, !0, !0)) : R(C[e], t, !0) : C[e] = t
                            }),
                            t.shim && (G(t.shim,
                            function(t, e) {
                                J(t) && (t = {
                                    deps: t
                                }),
                                    !t.exports && !t.init || t.exportsFn || (t.exportsFn = x.makeShimExports(t)),
                                    i[e] = t
                            }), C.shim = i),
                            t.packages && (y(t.packages,
                            function(t) {
                                t = "string" == typeof t ? {
                                    name: t
                                }: t,
                                    e[t.name] = {
                                        name: t.name,
                                        location: t.location || t.name,
                                        main: (t.main || "main").replace(ja, "").replace(ea, "")
                                    }

                            }), C.pkgs = e),
                            G(E,
                                function(t, e) { ! t.inited && !t.map.unnormalized && (t.map = a(e))
                                }),
                            (t.deps || t.callback) && x.require(t.deps || [], t.callback)
                    },
                    makeShimExports: function(t) {
                        return function() {
                            var e;
                            return t.init && (e = t.init.apply(aa, arguments)),
                                e || t.exports && ba(t.exports)
                        }
                    },
                    makeRequire: function(i, n) {
                        function r(e, c, u) {
                            var h,
                                f;
                            return n.enableBuildCallback && c && I(c) && (c.__requireJsBuild = !0),
                                    "string" == typeof e ? I(c) ? d(B("requireargs", "Invalid require call"), u) : i && s(L, e) ? L[e](E[i.id]) : l.get ? l.get(x, e, i, r) : (h = a(e, i, !1, !0), h = h.id, s(M, h) ? M[h] : d(B("notloaded", 'Module name "' + h + '" has not been loaded yet for context: ' + t + (i ? "": ". Use require([])")))) : (b(), x.nextTick(function() {
                                b(),
                                    f = o(a(null, i)),
                                    f.skipMap = n.skipMap,
                                    f.init(e, c, u, {
                                        enabled: !0
                                    }),
                                    g()

                            }), r)
                        }
                        return n = n || {},
                            R(r, {
                                isBrowser: A,
                                toUrl: function(t) {
                                    var n,
                                        r = t.lastIndexOf("."),
                                        a = t.split("/")[0];
                                    return - 1 !== r && ("." !== a && ".." !== a || r > 1) && (n = t.substring(r, t.length), t = t.substring(0, r)),
                                        x.nameToUrl(e(t, i && i.id, !0), n, !0)
                                },
                                defined: function(t) {
                                    return s(M, a(t, i, !1, !0).id)
                                },
                                specified: function(t) {
                                    return t = a(t, i, !1, !0).id,
                                        s(M, t) || s(E, t)

                                }
                            }),
                            i || (r.undef = function(t) {
                            h();
                            var e = a(t, i, !0),
                                n = m(E, t);
                            delete M[t],
                                delete j[e.url],
                                delete N[t],
                                n && (n.events.defined && (N[t] = n.events), f(t))
                        }),
                            r
                    },
                    enable: function(t) {
                        m(E, t.id) && o(t).enable()
                    },
                    completeLoad: function(t) {
                        var e,
                            i,
                            r = m(C.shim, t) || {},
                            a = r.exports;
                        for (h(); U.length;) {
                            if (i = U.shift(), null === i[0]) {
                                if (i[0] = t, e) break;
                                e = !0
                            } else i[0] === t && (e = !0);
                            v(i)
                        }
                        if (i = m(E, t), !e && !s(M, t) && i && !i.inited) {
                            if (C.enforceDefine && (!a || !ba(a))) return n(t) ? void 0: d(B("nodefine", "No define call for " + t, null, [t]));
                            v([t, r.deps || [], r.exportsFn])
                        }
                        g()
                    },
                    nameToUrl: function(t, e, i) {
                        var n,
                            r,
                            a,
                            o,
                            s,
                            c;
                        if (l.jsExtRegExp.test(t)) o = t + (e || "");
                        else {
                            for (n = C.paths, r = C.pkgs, o = t.split("/"), s = o.length; s > 0; s -= 1) {
                                if (c = o.slice(0, s).join("/"), a = m(r, c), c = m(n, c)) {
                                    J(c) && (c = c[0]),
                                        o.splice(0, s, c);
                                    break
                                }
                                if (a) {
                                    t = t === a.name ? a.location + "/" + a.main: a.location,
                                        o.splice(0, s, t);
                                    break
                                }
                            }
                            o = o.join("/"),
                                o += e || (/\?/.test(o) || i ? "": ".js"),
                                o = ("/" === o.charAt(0) || o.match(/^[\w\+\.\-]+:/) ? "": C.baseUrl) + o
                        }
                        return C.urlArgs ? o + (( - 1 === o.indexOf("?") ? "?": "&") + C.urlArgs) : o
                    },
                    load: function(t, e) {
                        l.load(x, t, e)
                    },
                    execCb: function(t, e, i, n) {
                        return e.apply(n, i)

                    },
                    onScriptLoad: function(t) { ("load" === t.type || ka.test((t.currentTarget || t.srcElement).readyState)) && (P = null, t = w(t), x.completeLoad(t.id))
                    },
                    onScriptError: function(t) {
                        var e = w(t);
                        return n(e.id) ? void 0: d(B("scripterror", "Script error", t, [e.id]))
                    }
                },
                x.require = x.makeRequire(),
                x
        }
        var l,
            w,
            x,
            D,
            t,
            E,
            P,
            K,
            Q,
            fa,
            la = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
            ma = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
            ea = /\.js$/,
            ja = /^\.\//;
        w = Object.prototype;
        var L = w.toString,
            ga = w.hasOwnProperty,
            ia = Array.prototype.splice,
            A = !("undefined" == typeof window || !navigator || !document),
            da = !A && "undefined" != typeof importScripts,
            ka = A && "PLAYSTATION 3" === navigator.platform ? /^complete$/: /^(complete|loaded)$/,
            Y = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
            F = {},
            r = {},
            T = [],
            O = !1;
        if ("undefined" == typeof define) {
            if ("undefined" != typeof requirejs) {
                if (I(requirejs)) return;
                r = requirejs,
                    requirejs = void 0
            }
            "undefined" != typeof require && !I(require) && (r = require, require = void 0),
                l = requirejs = function(t, e, i, n) {
                    var r,
                        a = "_";
                    return ! J(t) && "string" != typeof t && (r = t, J(e) ? (t = e, e = i, i = n) : t = []),
                        r && r.context && (a = r.context),
                        (n = m(F, a)) || (n = F[a] = l.s.newContext(a)),
                        r && n.configure(r),
                        n.require(t, e, i)

                },
                l.config = function(t) {
                    return l(t)
                },
                l.nextTick = "undefined" != typeof setTimeout ?
                    function(t) {
                        setTimeout(t, 4)
                    }: function(t) {
                    t()
                },
                require || (require = l),
                l.version = "2.1.5",
                l.jsExtRegExp = /^\/|:|\?|\.js$/,
                l.isBrowser = A,
                w = l.s = {
                    contexts: F,
                    newContext: ha
                },
                l({}),
                y(["toUrl", "undef", "defined", "specified"],
                    function(t) {
                        l[t] = function() {
                            var e = F._;
                            return e.require[t].apply(e, arguments)
                        }
                    }),
                A && (x = w.head = document.getElementsByTagName("head")[0], D = document.getElementsByTagName("base")[0]) && (x = w.head = D.parentNode),
                l.onError = function(t) {
                    throw t
                },
                l.load = function(t, e, i) {
                    var n,
                        r = t && t.config || {};
                    if (A) return n = r.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script"),
                        n.type = r.scriptType || "text/javascript",
                        n.charset = "utf-8",
                        n.async = !0,
                        n.setAttribute("data-requirecontext", t.contextName),
                        n.setAttribute("data-requiremodule", e),
                            !n.attachEvent || n.attachEvent.toString && 0 > n.attachEvent.toString().indexOf("[native code") || Y ? (n.addEventListener("load", t.onScriptLoad, !1), n.addEventListener("error", t.onScriptError, !1)) : (O = !0, n.attachEvent("onreadystatechange", t.onScriptLoad)),
                        n.src = i,
                        K = n,
                        D ? x.insertBefore(n, D) : x.appendChild(n),
                        K = null,
                        n;
                    if (da) try {
                        importScripts(i),
                            t.completeLoad(e)
                    } catch(a) {
                        t.onError(B("importscripts", "importScripts failed for " + e + " at " + i, a, [e]))
                    }
                },
                A && M(document.getElementsByTagName("script"),
                function(e) {
                    return x || (x = e.parentNode),
                        (t = e.getAttribute("data-main")) ? (r.baseUrl || (E = t.split("/"), Q = E.pop(), fa = E.length ? E.join("/") + "/": "./", r.baseUrl = fa, t = Q), t = t.replace(ea, ""), r.deps = r.deps ? r.deps.concat(t) : [t], !0) : void 0

                }),
                define = function(t, e, i) {
                    var n,
                        r;
                    "string" != typeof t && (i = e, e = t, t = null),
                        J(e) || (i = e, e = []),
                        !e.length && I(i) && i.length && (i.toString().replace(la, "").replace(ma,
                        function(t, i) {
                            e.push(i)
                        }), e = (1 === i.length ? ["require"] : ["require", "exports", "module"]).concat(e)),
                        O && ((n = K) || (P && "interactive" === P.readyState || M(document.getElementsByTagName("script"),
                        function(t) {
                            return "interactive" === t.readyState ? P = t: void 0

                        }), n = P), n && (t || (t = n.getAttribute("data-requiremodule")), r = F[n.getAttribute("data-requirecontext")])),
                        (r ? r.defQueue: T).push([t, e, i])
                },
                define.amd = {
                    jQuery: !0
                },
                l.exec = function(b) {
                    return eval(b)
                },
                l(r)
        }
    } (this),
    define("R",
        function() {});
var Zepto = function() {
    function t(t) {
        return null == t ? String(t) : W[G.call(t)] || "object"

    }
    function e(e) {
        return "function" == t(e)
    }
    function i(t) {
        return null != t && t == t.window
    }
    function n(t) {
        return null != t && t.nodeType == t.DOCUMENT_NODE
    }
    function r(e) {
        return "object" == t(e)
    }
    function a(t) {
        return r(t) && !i(t) && Object.getPrototypeOf(t) == Object.prototype
    }
    function o(t) {
        return "number" == typeof t.length
    }
    function s(t) {
        return A.call(t,
            function(t) {
                return null != t

            })
    }
    function c(t) {
        return t.length > 0 ? x.fn.concat.apply([], t) : t
    }
    function u(t) {
        return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }
    function l(t) {
        return t in P ? P[t] : P[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
    }
    function d(t, e) {
        return "number" != typeof e || N[u(t)] ? e: e + "px"

    }
    function h(t) {
        var e,
            i;
        return I[t] || (e = k.createElement(t), k.body.appendChild(e), i = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == i && (i = "block"), I[t] = i),
            I[t]
    }
    function f(t) {
        return "children" in t ? T.call(t.children) : x.map(t.childNodes,
            function(t) {
                return 1 == t.nodeType ? t: void 0

            })
    }
    function p(t, e, i) {
        for (S in e) i && (a(e[S]) || X(e[S])) ? (a(e[S]) && !a(t[S]) && (t[S] = {}), X(e[S]) && !X(t[S]) && (t[S] = []), p(t[S], e[S], i)) : e[S] !== _ && (t[S] = e[S])
    }
    function g(t, e) {
        return null == e ? x(t) : x(t).filter(e)
    }
    function m(t, i, n, r) {
        return e(i) ? i.call(t, n, r) : i
    }
    function v(t, e, i) {
        null == i ? t.removeAttribute(e) : t.setAttribute(e, i)

    }
    function w(t, e) {
        var i = t.className || "",
            n = i && i.baseVal !== _;
        return e === _ ? n ? i.baseVal: i: void(n ? i.baseVal = e: t.className = e)
    }
    function y(t) {
        var e;
        try {
            return t ? "true" == t || ("false" == t ? !1: "null" == t ? null: /^0/.test(t) || isNaN(e = Number(t)) ? /^[\[\{]/.test(t) ? x.parseJSON(t) : t: e) : t
        } catch(i) {
            return t
        }
    }
    function b(t, e) {
        e(t);
        for (var i = 0, n = t.childNodes.length; n > i; i++) b(t.childNodes[i], e)
    }
    var _,
        S,
        x,
        L,
        z,
        C,
        E = [],
        T = E.slice,
        A = E.filter,
        k = window.document,
        I = {},
        P = {},
        N = {
            "column-count": 1,
            columns: 1,
            "font-weight": 1,
            "line-height": 1,
            opacity: 1,
            "z-index": 1,
            zoom: 1
        },
        U = /^\s*<(\w+|!)[^>]*>/,
        O = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        M = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        j = /^(?:body|html)$/i,
        $ = /([A-Z])/g,
        D = ["val", "css", "html", "text", "data", "width", "height", "offset"],
        R = ["after", "prepend", "before", "append"],
        V = k.createElement("table"),
        H = k.createElement("tr"),
        B = {
            tr: k.createElement("tbody"),
            tbody: V,
            thead: V,
            tfoot: V,
            td: H,
            th: H,
            "*": k.createElement("div")
        },
        F = /complete|loaded|interactive/,
        q = /^[\w-]*$/,
        W = {},
        G = W.toString,
        J = {},
        Y = k.createElement("div"),
        Z = {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        X = Array.isArray ||
            function(t) {
                return t instanceof Array

            };
    return J.matches = function(t, e) {
        if (!e || !t || 1 !== t.nodeType) return ! 1;
        var i = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
        if (i) return i.call(t, e);
        var n,
            r = t.parentNode,
            a = !r;
        return a && (r = Y).appendChild(t),
            n = ~J.qsa(r, e).indexOf(t),
            a && Y.removeChild(t),
            n
    },
        z = function(t) {
            return t.replace(/-+(.)?/g,
                function(t, e) {
                    return e ? e.toUpperCase() : ""

                })
        },
        C = function(t) {
            return A.call(t,
                function(e, i) {
                    return t.indexOf(e) == i
                })
        },
        J.fragment = function(t, e, i) {
            var n,
                r,
                o;
            return O.test(t) && (n = x(k.createElement(RegExp.$1))),
                n || (t.replace && (t = t.replace(M, "<$1></$2>")), e === _ && (e = U.test(t) && RegExp.$1), e in B || (e = "*"), o = B[e], o.innerHTML = "" + t, n = x.each(T.call(o.childNodes),
                function() {
                    o.removeChild(this)

                })),
                a(i) && (r = x(n), x.each(i,
                function(t, e) {
                    D.indexOf(t) > -1 ? r[t](e) : r.attr(t, e)
                })),
                n
        },
        J.Z = function(t, e) {
            return t = t || [],
                t.__proto__ = x.fn,
                t.selector = e || "",
                t
        },
        J.isZ = function(t) {
            return t instanceof J.Z
        },
        J.init = function(t, i) {
            var n;
            if (!t) return J.Z();
            if ("string" == typeof t) if (t = t.trim(), "<" == t[0] && U.test(t)) n = J.fragment(t, RegExp.$1, i),
                t = null;
            else {
                if (i !== _) return x(i).find(t);
                n = J.qsa(k, t)
            } else {
                if (e(t)) return x(k).ready(t);
                if (J.isZ(t)) return t;
                if (X(t)) n = s(t);
                else if (r(t)) n = [t],
                    t = null;
                else if (U.test(t)) n = J.fragment(t.trim(), RegExp.$1, i),
                    t = null;
                else {
                    if (i !== _) return x(i).find(t);
                    n = J.qsa(k, t)
                }
            }
            return J.Z(n, t)
        },
        x = function(t, e) {
            return J.init(t, e)

        },
        x.extend = function(t) {
            var e,
                i = T.call(arguments, 1);
            return "boolean" == typeof t && (e = t, t = i.shift()),
                i.forEach(function(i) {
                    p(t, i, e)
                }),
                t
        },
        J.qsa = function(t, e) {
            var i,
                r,
                a = "#" == e[0],
                o = !a && "." == e[0],
                s = a || o ? e.slice(1) : e,
                c = q.test(s);
            if (r = n(t) && c && a ? (i = t.getElementById(s)) ? [i] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : T.call(c && !a ? o ? t.getElementsByClassName(s) : t.getElementsByTagName(e) : t.querySelectorAll(e)), 1 !== t.nodeType) return r;
            for (var u = [], l = 0, d = r.length; d > l; l++) t.contains(r[l]) && u.push(r[l]);
            return u
        },
        x.contains = k.documentElement.contains ?
            function(t, e) {
                return t !== e && t.contains(e)
            }: function(t, e) {
            for (; e && (e = e.parentNode);) if (e === t) return ! 0;
            return ! 1
        },
        x.type = t,
        x.isFunction = e,
        x.isWindow = i,
        x.isArray = X,
        x.isPlainObject = a,
        x.isEmptyObject = function(t) {
            var e;
            for (e in t) return ! 1;
            return ! 0
        },
        x.inArray = function(t, e, i) {
            return E.indexOf.call(e, t, i)
        },
        x.camelCase = z,
        x.trim = function(t) {
            return null == t ? "": String.prototype.trim.call(t)
        },
        x.uuid = 0,
        x.support = {},
        x.expr = {},
        x.map = function(t, e) {
            var i,
                n,
                r,
                a = [];
            if (o(t)) for (n = 0; n < t.length; n++) i = e(t[n], n),
                null != i && a.push(i);
            else for (r in t) i = e(t[r], r),
                null != i && a.push(i);
            return c(a)
        },
        x.each = function(t, e) {
            var i,
                n;
            if (o(t)) {
                for (i = 0; i < t.length; i++) if (e.call(t[i], i, t[i]) === !1) return t
            } else for (n in t) if (e.call(t[n], n, t[n]) === !1) return t;
            return t
        },
        x.grep = function(t, e) {
            return A.call(t, e)
        },
        window.JSON && (x.parseJSON = JSON.parse),
        x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
            function(t, e) {
                W["[object " + e + "]"] = e.toLowerCase()

            }),
        x.fn = {
            forEach: E.forEach,
            reduce: E.reduce,
            push: E.push,
            sort: E.sort,
            indexOf: E.indexOf,
            concat: E.concat,
            map: function(t) {
                return x(x.map(this,
                    function(e, i) {
                        return t.call(e, i, e)
                    }))
            },
            slice: function() {
                return x(T.apply(this, arguments))
            },
            ready: function(t) {
                return F.test(k.readyState) && k.body ? t(x) : k.addEventListener("DOMContentLoaded",
                    function() {
                        t(x)

                    },
                    !1),
                    this
            },
            get: function(t) {
                return t === _ ? T.call(this) : this[t >= 0 ? t: t + this.length]
            },
            toArray: function() {
                return this.get()
            },
            size: function() {
                return this.length
            },
            remove: function() {
                return this.each(function() {
                    null != this.parentNode && this.parentNode.removeChild(this)
                })
            },
            each: function(t) {
                return E.every.call(this,
                    function(e, i) {
                        return t.call(e, i, e) !== !1

                    }),
                    this
            },
            filter: function(t) {
                return e(t) ? this.not(this.not(t)) : x(A.call(this,
                    function(e) {
                        return J.matches(e, t)
                    }))
            },
            add: function(t, e) {
                return x(C(this.concat(x(t, e))))
            },
            is: function(t) {
                return this.length > 0 && J.matches(this[0], t)
            },
            not: function(t) {
                var i = [];
                if (e(t) && t.call !== _) this.each(function(e) {
                    t.call(this, e) || i.push(this)

                });
                else {
                    var n = "string" == typeof t ? this.filter(t) : o(t) && e(t.item) ? T.call(t) : x(t);
                    this.forEach(function(t) {
                        n.indexOf(t) < 0 && i.push(t)
                    })
                }
                return x(i)
            },
            has: function(t) {
                return this.filter(function() {
                    return r(t) ? x.contains(this, t) : x(this).find(t).size()
                })
            },
            eq: function(t) {
                return - 1 === t ? this.slice(t) : this.slice(t, +t + 1)

            },
            first: function() {
                var t = this[0];
                return t && !r(t) ? t: x(t)
            },
            last: function() {
                var t = this[this.length - 1];
                return t && !r(t) ? t: x(t)
            },
            find: function(t) {
                var e,
                    i = this;
                return e = t ? "object" == typeof t ? x(t).filter(function() {
                    var t = this;
                    return E.some.call(i,
                        function(e) {
                            return x.contains(e, t)
                        })
                }) : 1 == this.length ? x(J.qsa(this[0], t)) : this.map(function() {
                    return J.qsa(this, t)

                }) : []
            },
            closest: function(t, e) {
                var i = this[0],
                    r = !1;
                for ("object" == typeof t && (r = x(t)); i && !(r ? r.indexOf(i) >= 0: J.matches(i, t));) i = i !== e && !n(i) && i.parentNode;
                return x(i)
            },
            parents: function(t) {
                for (var e = [], i = this; i.length > 0;) i = x.map(i,
                    function(t) {
                        return (t = t.parentNode) && !n(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0

                    });
                return g(e, t)
            },
            parent: function(t) {
                return g(C(this.pluck("parentNode")), t)
            },
            children: function(t) {
                return g(this.map(function() {
                    return f(this)
                }), t)
            },
            contents: function() {
                return this.map(function() {
                    return T.call(this.childNodes)
                })
            },
            siblings: function(t) {
                return g(this.map(function(t, e) {
                    return A.call(f(e.parentNode),
                        function(t) {
                            return t !== e

                        })
                }), t)
            },
            empty: function() {
                return this.each(function() {
                    this.innerHTML = ""
                })
            },
            pluck: function(t) {
                return x.map(this,
                    function(e) {
                        return e[t]
                    })
            },
            show: function() {
                return this.each(function() {
                    "none" == this.style.display && (this.style.display = ""),
                        "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = h(this.nodeName))

                })
            },
            replaceWith: function(t) {
                return this.before(t).remove()
            },
            wrap: function(t) {
                var i = e(t);
                if (this[0] && !i) var n = x(t).get(0),
                    r = n.parentNode || this.length > 1;
                return this.each(function(e) {
                    x(this).wrapAll(i ? t.call(this, e) : r ? n.cloneNode(!0) : n)
                })
            },
            wrapAll: function(t) {
                if (this[0]) {
                    x(this[0]).before(t = x(t));
                    for (var e; (e = t.children()).length;) t = e.first();
                    x(t).append(this)
                }
                return this
            },
            wrapInner: function(t) {
                var i = e(t);
                return this.each(function(e) {
                    var n = x(this),
                        r = n.contents(),
                        a = i ? t.call(this, e) : t;
                    r.length ? r.wrapAll(a) : n.append(a)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    x(this).replaceWith(x(this).children())
                }),
                    this
            },
            clone: function() {
                return this.map(function() {
                    return this.cloneNode(!0)

                })
            },
            hide: function() {
                return this.css("display", "none")
            },
            toggle: function(t) {
                return this.each(function() {
                    var e = x(this); (t === _ ? "none" == e.css("display") : t) ? e.show() : e.hide()
                })
            },
            prev: function(t) {
                return x(this.pluck("previousElementSibling")).filter(t || "*")
            },
            next: function(t) {
                return x(this.pluck("nextElementSibling")).filter(t || "*")

            },
            html: function(t) {
                return 0 in arguments ? this.each(function(e) {
                    var i = this.innerHTML;
                    x(this).empty().append(m(this, t, e, i))
                }) : 0 in this ? this[0].innerHTML: null
            },
            text: function(t) {
                return 0 in arguments ? this.each(function(e) {
                    var i = m(this, t, e, this.textContent);
                    this.textContent = null == i ? "": "" + i
                }) : 0 in this ? this[0].textContent: null

            },
            attr: function(t, e) {
                var i;
                return "string" != typeof t || 1 in arguments ? this.each(function(i) {
                    if (1 === this.nodeType) if (r(t)) for (S in t) v(this, S, t[S]);
                    else v(this, t, m(this, e, i, this.getAttribute(t)))
                }) : this.length && 1 === this[0].nodeType ? !(i = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : i: _
            },
            removeAttr: function(t) {
                return this.each(function() {
                    1 === this.nodeType && v(this, t)

                })
            },
            prop: function(t, e) {
                return t = Z[t] || t,
                        1 in arguments ? this.each(function(i) {
                    this[t] = m(this, e, i, this[t])
                }) : this[0] && this[0][t]
            },
            data: function(t, e) {
                var i = "data-" + t.replace($, "-$1").toLowerCase(),
                    n = 1 in arguments ? this.attr(i, e) : this.attr(i);
                return null !== n ? y(n) : _
            },
            val: function(t) {
                return 0 in arguments ? this.each(function(e) {
                    this.value = m(this, t, e, this.value)

                }) : this[0] && (this[0].multiple ? x(this[0]).find("option").filter(function() {
                    return this.selected
                }).pluck("value") : this[0].value)
            },
            offset: function(t) {
                if (t) return this.each(function(e) {
                    var i = x(this),
                        n = m(this, t, e, i.offset()),
                        r = i.offsetParent().offset(),
                        a = {
                            top: n.top - r.top,
                            left: n.left - r.left
                        };
                    "static" == i.css("position") && (a.position = "relative"),
                        i.css(a)

                });
                if (!this.length) return null;
                var e = this[0].getBoundingClientRect();
                return {
                    left: e.left + window.pageXOffset,
                    top: e.top + window.pageYOffset,
                    width: Math.round(e.width),
                    height: Math.round(e.height)
                }
            },
            css: function(e, i) {
                if (arguments.length < 2) {
                    var n = this[0],
                        r = getComputedStyle(n, "");
                    if (!n) return;
                    if ("string" == typeof e) return n.style[z(e)] || r.getPropertyValue(e);
                    if (X(e)) {
                        var a = {};
                        return x.each(e,
                            function(t, e) {
                                a[e] = n.style[z(e)] || r.getPropertyValue(e)
                            }),
                            a
                    }
                }
                var o = "";
                if ("string" == t(e)) i || 0 === i ? o = u(e) + ":" + d(e, i) : this.each(function() {
                    this.style.removeProperty(u(e))
                });
                else for (S in e) e[S] || 0 === e[S] ? o += u(S) + ":" + d(S, e[S]) + ";": this.each(function() {
                    this.style.removeProperty(u(S))

                });
                return this.each(function() {
                    this.style.cssText += ";" + o
                })
            },
            index: function(t) {
                return t ? this.indexOf(x(t)[0]) : this.parent().children().indexOf(this[0])
            },
            hasClass: function(t) {
                return t ? E.some.call(this,
                    function(t) {
                        return this.test(w(t))
                    },
                    l(t)) : !1
            },
            addClass: function(t) {
                return t ? this.each(function(e) {
                    if ("className" in this) {
                        L = [];
                        var i = w(this),
                            n = m(this, t, e, i);
                        n.split(/\s+/g).forEach(function(t) {
                                x(this).hasClass(t) || L.push(t)
                            },
                            this),
                            L.length && w(this, i + (i ? " ": "") + L.join(" "))
                    }
                }) : this
            },
            removeClass: function(t) {
                return this.each(function(e) {
                    if ("className" in this) {
                        if (t === _) return w(this, "");
                        L = w(this),
                            m(this, t, e, L).split(/\s+/g).forEach(function(t) {
                                L = L.replace(l(t), " ")

                            }),
                            w(this, L.trim())
                    }
                })
            },
            toggleClass: function(t, e) {
                return t ? this.each(function(i) {
                    var n = x(this),
                        r = m(this, t, i, w(this));
                    r.split(/\s+/g).forEach(function(t) { (e === _ ? !n.hasClass(t) : e) ? n.addClass(t) : n.removeClass(t)
                    })
                }) : this
            },
            scrollTop: function(t) {
                if (this.length) {
                    var e = "scrollTop" in this[0];
                    return t === _ ? e ? this[0].scrollTop: this[0].pageYOffset: this.each(e ?
                        function() {
                            this.scrollTop = t

                        }: function() {
                        this.scrollTo(this.scrollX, t)
                    })
                }
            },
            scrollLeft: function(t) {
                if (this.length) {
                    var e = "scrollLeft" in this[0];
                    return t === _ ? e ? this[0].scrollLeft: this[0].pageXOffset: this.each(e ?
                        function() {
                            this.scrollLeft = t
                        }: function() {
                        this.scrollTo(t, this.scrollY)
                    })
                }
            },
            position: function() {
                if (this.length) {
                    var t = this[0],
                        e = this.offsetParent(),
                        i = this.offset(),
                        n = j.test(e[0].nodeName) ? {
                            top: 0,
                            left: 0
                        }: e.offset();
                    return i.top -= parseFloat(x(t).css("margin-top")) || 0,
                        i.left -= parseFloat(x(t).css("margin-left")) || 0,
                        n.top += parseFloat(x(e[0]).css("border-top-width")) || 0,
                        n.left += parseFloat(x(e[0]).css("border-left-width")) || 0,
                    {
                        top: i.top - n.top,
                        left: i.left - n.left
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var t = this.offsetParent || k.body; t && !j.test(t.nodeName) && "static" == x(t).css("position");) t = t.offsetParent;
                    return t
                })
            }
        },
        x.fn.detach = x.fn.remove,
        ["width", "height"].forEach(function(t) {
            var e = t.replace(/./,
                function(t) {
                    return t[0].toUpperCase()
                });
            x.fn[t] = function(r) {
                var a,
                    o = this[0];
                return r === _ ? i(o) ? o["inner" + e] : n(o) ? o.documentElement["scroll" + e] : (a = this.offset()) && a[t] : this.each(function(e) {
                    o = x(this),
                        o.css(t, m(this, r, e, o[t]()))

                })
            }
        }),
        R.forEach(function(e, i) {
            var n = i % 2;
            x.fn[e] = function() {
                var e,
                    r,
                    a = x.map(arguments,
                        function(i) {
                            return e = t(i),
                                    "object" == e || "array" == e || null == i ? i: J.fragment(i)
                        }),
                    o = this.length > 1;
                return a.length < 1 ? this: this.each(function(t, e) {
                    r = n ? e: e.parentNode,
                        e = 0 == i ? e.nextSibling: 1 == i ? e.firstChild: 2 == i ? e: null;
                    var s = x.contains(k.documentElement, r);
                    a.forEach(function(t) {
                        if (o) t = t.cloneNode(!0);
                        else if (!r) return x(t).remove();
                        r.insertBefore(t, e),
                            s && b(t,
                            function(t) {
                                null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
                            })
                    })
                })
            },
                x.fn[n ? e + "To": "insert" + (i ? "Before": "After")] = function(t) {
                    return x(t)[e](this),
                        this

                }
        }),
        J.Z.prototype = x.fn,
        J.uniq = C,
        J.deserializeValue = y,
        x.zepto = J,
        x
} ();
window.Zepto = Zepto,
    void 0 === window.$ && (window.$ = Zepto),
    function(t) {
        function e(e, i, n) {
            var r = t.Event(i);
            return t(e).trigger(r, n),
                !r.isDefaultPrevented()
        }
        function i(t, i, n, r) {
            return t.global ? e(i || w, n, r) : void 0
        }
        function n(e) {
            e.global && 0 === t.active++&&i(e, null, "ajaxStart")

        }
        function r(e) {
            e.global && !--t.active && i(e, null, "ajaxStop")
        }
        function a(t, e) {
            var n = e.context;
            return e.beforeSend.call(n, t, e) === !1 || i(e, n, "ajaxBeforeSend", [t, e]) === !1 ? !1: void i(e, n, "ajaxSend", [t, e])
        }
        function o(t, e, n, r) {
            var a = n.context,
                o = "success";
            n.success.call(a, t, o, e),
                r && r.resolveWith(a, [t, o, e]),
                i(n, a, "ajaxSuccess", [e, n, t]),
                c(o, e, n)

        }
        function s(t, e, n, r, a) {
            var o = r.context;
            r.error.call(o, n, e, t),
                a && a.rejectWith(o, [n, e, t]),
                i(r, o, "ajaxError", [n, r, t || e]),
                c(e, n, r)
        }
        function c(t, e, n) {
            var a = n.context;
            n.complete.call(a, e, t),
                i(n, a, "ajaxComplete", [e, n]),
                r(n)
        }
        function u() {}
        function l(t) {
            return t && (t = t.split(";", 2)[0]),
                t && (t == x ? "html": t == S ? "json": b.test(t) ? "script": _.test(t) && "xml") || "text"

        }
        function d(t, e) {
            return "" == e ? t: (t + "&" + e).replace(/[&?]{1,2}/, "?")
        }
        function h(e) {
            e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)),
                !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = d(e.url, e.data), e.data = void 0)
        }
        function f(e, i, n, r) {
            return t.isFunction(i) && (r = n, n = i, i = void 0),
                t.isFunction(n) || (r = n, n = void 0),
            {
                url: e,
                data: i,
                success: n,
                dataType: r
            }

        }
        function p(e, i, n, r) {
            var a,
                o = t.isArray(i),
                s = t.isPlainObject(i);
            t.each(i,
                function(i, c) {
                    a = t.type(c),
                        r && (i = n ? r: r + "[" + (s || "object" == a || "array" == a ? i: "") + "]"),
                            !r && o ? e.add(c.name, c.value) : "array" == a || !n && "object" == a ? p(e, c, n, i) : e.add(i, c)
                })
        }
        var g,
            m,
            v = 0,
            w = window.document,
            y = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            b = /^(?:text|application)\/javascript/i,
            _ = /^(?:text|application)\/xml/i,
            S = "application/json",
            x = "text/html",
            L = /^\s*$/;
        t.active = 0,
            t.ajaxJSONP = function(e, i) {
                if (! ("type" in e)) return t.ajax(e);
                var n,
                    r,
                    c = e.jsonpCallback,
                    u = (t.isFunction(c) ? c() : c) || "jsonp" + ++v,
                    l = w.createElement("script"),
                    d = window[u],
                    h = function(e) {
                        t(l).triggerHandler("error", e || "abort")
                    },
                    f = {
                        abort: h
                    };
                return i && i.promise(f),
                    t(l).on("load error",
                        function(a, c) {
                            clearTimeout(r),
                                t(l).off().remove(),
                                    "error" != a.type && n ? o(n[0], f, e, i) : s(null, c || "error", f, e, i),
                                window[u] = d,
                                n && t.isFunction(d) && d(n[0]),
                                d = n = void 0

                        }),
                        a(f, e) === !1 ? (h("abort"), f) : (window[u] = function() {
                    n = arguments
                },
                    l.src = e.url.replace(/\?(.+)=\?/, "?$1=" + u), w.head.appendChild(l), e.timeout > 0 && (r = setTimeout(function() {
                        h("timeout")
                    },
                    e.timeout)), f)
            },
            t.ajaxSettings = {
                type: "GET",
                beforeSend: u,
                success: u,
                error: u,
                complete: u,
                context: null,
                global: !0,
                xhr: function() {
                    return new window.XMLHttpRequest

                },
                accepts: {
                    script: "text/javascript, application/javascript, application/x-javascript",
                    json: S,
                    xml: "application/xml, text/xml",
                    html: x,
                    text: "text/plain"
                },
                crossDomain: !1,
                timeout: 0,
                processData: !0,
                cache: !0
            },
            t.ajax = function(e) {
                var i = t.extend({},
                            e || {}),
                    r = t.Deferred && t.Deferred();
                for (g in t.ajaxSettings) void 0 === i[g] && (i[g] = t.ajaxSettings[g]);
                n(i),
                    i.crossDomain || (i.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(i.url) && RegExp.$2 != window.location.host),
                    i.url || (i.url = window.location.toString()),
                    h(i);
                var c = i.dataType,
                    f = /\?.+=\?/.test(i.url);
                if (f && (c = "jsonp"), i.cache !== !1 && (e && e.cache === !0 || "script" != c && "jsonp" != c) || (i.url = d(i.url, "_=" + Date.now())), "jsonp" == c) return f || (i.url = d(i.url, i.jsonp ? i.jsonp + "=?": i.jsonp === !1 ? "": "callback=?")),
                    t.ajaxJSONP(i, r);
                var p,
                    v = i.accepts[c],
                    w = {},
                    y = function(t, e) {
                        w[t.toLowerCase()] = [t, e]
                    },
                    b = /^([\w-]+:)\/\//.test(i.url) ? RegExp.$1: window.location.protocol,
                    _ = i.xhr(),
                    S = _.setRequestHeader;
                if (r && r.promise(_), i.crossDomain || y("X-Requested-With", "XMLHttpRequest"), y("Accept", v || "*/*"), (v = i.mimeType || v) && (v.indexOf(",") > -1 && (v = v.split(",", 2)[0]), _.overrideMimeType && _.overrideMimeType(v)), (i.contentType || i.contentType !== !1 && i.data && "GET" != i.type.toUpperCase()) && y("Content-Type", i.contentType || "application/x-www-form-urlencoded"), i.headers) for (m in i.headers) y(m, i.headers[m]);
                if (_.setRequestHeader = y, _.onreadystatechange = function() {
                    if (4 == _.readyState) {
                        _.onreadystatechange = u,
                            clearTimeout(p);
                        var e,
                            n = !1;
                        if (_.status >= 200 && _.status < 300 || 304 == _.status || 0 == _.status && "file:" == b) {
                            c = c || l(i.mimeType || _.getResponseHeader("content-type")),
                                e = _.responseText;
                            try {
                                "script" == c ? (1, eval)(e) : "xml" == c ? e = _.responseXML: "json" == c && (e = L.test(e) ? null: t.parseJSON(e))

                            } catch(a) {
                                n = a
                            }
                            n ? s(n, "parsererror", _, i, r) : o(e, _, i, r)
                        } else s(_.statusText || null, _.status ? "error": "abort", _, i, r)
                    }
                },
                    a(_, i) === !1) return _.abort(),
                    s(null, "abort", _, i, r),
                    _;
                if (i.xhrFields) for (m in i.xhrFields) _[m] = i.xhrFields[m];
                var x = "async" in i ? i.async: !0;
                _.open(i.type, i.url, x, i.username, i.password);
                for (m in w) S.apply(_, w[m]);
                return i.timeout > 0 && (p = setTimeout(function() {
                        _.onreadystatechange = u,
                            _.abort(),
                            s(null, "timeout", _, i, r)
                    },
                    i.timeout)),
                    _.send(i.data ? i.data: null),
                    _
            },
            t.get = function() {
                return t.ajax(f.apply(null, arguments))
            },
            t.post = function() {
                var e = f.apply(null, arguments);
                return e.type = "POST",
                    t.ajax(e)
            },
            t.getJSON = function() {
                var e = f.apply(null, arguments);
                return e.dataType = "json",
                    t.ajax(e)
            },
            t.fn.load = function(e, i, n) {
                if (!this.length) return this;
                var r,
                    a = this,
                    o = e.split(/\s/),
                    s = f(e, i, n),
                    c = s.success;
                return o.length > 1 && (s.url = o[0], r = o[1]),
                    s.success = function(e) {
                        a.html(r ? t("<div>").html(e.replace(y, "")).find(r) : e),
                            c && c.apply(a, arguments)
                    },
                    t.ajax(s),
                    this
            };
        var z = encodeURIComponent;
        t.param = function(t, e) {
            var i = [];
            return i.add = function(t, e) {
                this.push(z(t) + "=" + z(e))
            },
                p(i, t, e),
                i.join("&").replace(/%20/g, "+")
        }
    } (Zepto),
    function(t) {
        function e(t) {
            var e = this.os = {},
                i = this.browser = {},
                n = t.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
                r = t.match(/(Android);?[\s\/]+([\d.]+)?/),
                a = !!t.match(/\(Macintosh\; Intel /),
                o = t.match(/(iPad).*OS\s([\d_]+)/),
                s = t.match(/(iPod)(.*OS\s([\d_]+))?/),
                c = !o && t.match(/(iPhone\sOS)\s([\d_]+)/),
                u = t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
                l = t.match(/Windows Phone ([\d.]+)/),
                d = u && t.match(/TouchPad/),
                h = t.match(/Kindle\/([\d.]+)/),
                f = t.match(/Silk\/([\d._]+)/),
                p = t.match(/(BlackBerry).*Version\/([\d.]+)/),
                g = t.match(/(BB10).*Version\/([\d.]+)/),
                m = t.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
                v = t.match(/PlayBook/),
                w = t.match(/Chrome\/([\d.]+)/) || t.match(/CriOS\/([\d.]+)/),
                y = t.match(/Firefox\/([\d.]+)/),
                b = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
                _ = !w && t.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
                S = _ || t.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
            (i.webkit = !!n) && (i.version = n[1]),
                r && (e.android = !0, e.version = r[2]),
                c && !s && (e.ios = e.iphone = !0, e.version = c[2].replace(/_/g, ".")),
                o && (e.ios = e.ipad = !0, e.version = o[2].replace(/_/g, ".")),
                s && (e.ios = e.ipod = !0, e.version = s[3] ? s[3].replace(/_/g, ".") : null),
                l && (e.wp = !0, e.version = l[1]),
                u && (e.webos = !0, e.version = u[2]),
                d && (e.touchpad = !0),
                p && (e.blackberry = !0, e.version = p[2]),
                g && (e.bb10 = !0, e.version = g[2]),
                m && (e.rimtabletos = !0, e.version = m[2]),
                v && (i.playbook = !0),
                h && (e.kindle = !0, e.version = h[1]),
                f && (i.silk = !0, i.version = f[1]),
                !f && e.android && t.match(/Kindle Fire/) && (i.silk = !0),
                w && (i.chrome = !0, i.version = w[1]),
                y && (i.firefox = !0, i.version = y[1]),
                b && (i.ie = !0, i.version = b[1]),
                S && (a || e.ios) && (i.safari = !0, a && (i.version = S[1])),
                _ && (i.webview = !0),
                e.tablet = !!(o || v || r && !t.match(/Mobile/) || y && t.match(/Tablet/) || b && !t.match(/Phone/) && t.match(/Touch/)),
                e.phone = !(e.tablet || e.ipod || !(r || c || u || p || g || w && t.match(/Android/) || w && t.match(/CriOS\/([\d.]+)/) || y && t.match(/Mobile/) || b && t.match(/Touch/)))

        }
        e.call(t, navigator.userAgent),
            t.__detect = e
    } (Zepto),
    function(t) {
        function e(t) {
            return t._zid || (t._zid = h++)
        }
        function i(t, i, a, o) {
            if (i = n(i), i.ns) var s = r(i.ns);
            return (m[e(t)] || []).filter(function(t) {
                return ! (!t || i.e && t.e != i.e || i.ns && !s.test(t.ns) || a && e(t.fn) !== e(a) || o && t.sel != o)
            })
        }
        function n(t) {
            var e = ("" + t).split(".");
            return {
                e: e[0],
                ns: e.slice(1).sort().join(" ")
            }
        }
        function r(t) {
            return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
        }
        function a(t, e) {
            return t.del && !w && t.e in y || !!e
        }
        function o(t) {
            return b[t] || w && y[t] || t
        }
        function s(i, r, s, c, l, h, f) {
            var p = e(i),
                g = m[p] || (m[p] = []);
            r.split(/\s/).forEach(function(e) {
                if ("ready" == e) return t(document).ready(s);
                var r = n(e);
                r.fn = s,
                    r.sel = l,
                    r.e in b && (s = function(e) {
                    var i = e.relatedTarget;
                    return ! i || i !== this && !t.contains(this, i) ? r.fn.apply(this, arguments) : void 0
                }),
                    r.del = h;
                var p = h || s;
                r.proxy = function(t) {
                    if (t = u(t), !t.isImmediatePropagationStopped()) {
                        t.data = c;
                        var e = p.apply(i, t._args == d ? [t] : [t].concat(t._args));
                        return e === !1 && (t.preventDefault(), t.stopPropagation()),
                            e

                    }
                },
                    r.i = g.length,
                    g.push(r),
                    "addEventListener" in i && i.addEventListener(o(r.e), r.proxy, a(r, f))
            })
        }
        function c(t, n, r, s, c) {
            var u = e(t); (n || "").split(/\s/).forEach(function(e) {
                i(t, e, r, s).forEach(function(e) {
                    delete m[u][e.i],
                        "removeEventListener" in t && t.removeEventListener(o(e.e), e.proxy, a(e, c))
                })
            })
        }
        function u(e, i) {
            return (i || !e.isDefaultPrevented) && (i || (i = e), t.each(L,
                function(t, n) {
                    var r = i[t];
                    e[t] = function() {
                        return this[n] = _,
                            r && r.apply(i, arguments)
                    },
                        e[n] = S
                }), (i.defaultPrevented !== d ? i.defaultPrevented: "returnValue" in i ? i.returnValue === !1: i.getPreventDefault && i.getPreventDefault()) && (e.isDefaultPrevented = _)),
                e
        }
        function l(t) {
            var e,
                i = {
                    originalEvent: t
                };
            for (e in t) x.test(e) || t[e] === d || (i[e] = t[e]);
            return u(i, t)
        }
        var d,
            h = 1,
            f = Array.prototype.slice,
            p = t.isFunction,
            g = function(t) {
                return "string" == typeof t
            },
            m = {},
            v = {},
            w = "onfocusin" in window,
            y = {
                focus: "focusin",
                blur: "focusout"
            },
            b = {
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            };
        v.click = v.mousedown = v.mouseup = v.mousemove = "MouseEvents",
            t.event = {
                add: s,
                remove: c
            },
            t.proxy = function(i, n) {
                var r = 2 in arguments && f.call(arguments, 2);
                if (p(i)) {
                    var a = function() {
                        return i.apply(n, r ? r.concat(f.call(arguments)) : arguments)
                    };
                    return a._zid = e(i),
                        a
                }
                if (g(n)) return r ? (r.unshift(i[n], i), t.proxy.apply(null, r)) : t.proxy(i[n], i);
                throw new TypeError("expected function")
            },
            t.fn.bind = function(t, e, i) {
                return this.on(t, e, i)
            },
            t.fn.unbind = function(t, e) {
                return this.off(t, e)

            },
            t.fn.one = function(t, e, i, n) {
                return this.on(t, e, i, n, 1)
            };
        var _ = function() {
                return ! 0
            },
            S = function() {
                return ! 1
            },
            x = /^([A-Z]|returnValue$|layer[XY]$)/,
            L = {
                preventDefault: "isDefaultPrevented",
                stopImmediatePropagation: "isImmediatePropagationStopped",
                stopPropagation: "isPropagationStopped"
            };
        t.fn.delegate = function(t, e, i) {
            return this.on(e, t, i)

        },
            t.fn.undelegate = function(t, e, i) {
                return this.off(e, t, i)
            },
            t.fn.live = function(e, i) {
                return t(document.body).delegate(this.selector, e, i),
                    this
            },
            t.fn.die = function(e, i) {
                return t(document.body).undelegate(this.selector, e, i),
                    this
            },
            t.fn.on = function(e, i, n, r, a) {
                var o,
                    u,
                    h = this;
                return e && !g(e) ? (t.each(e,
                    function(t, e) {
                        h.on(t, i, n, e, a)

                    }), h) : (g(i) || p(r) || r === !1 || (r = n, n = i, i = d), (p(n) || n === !1) && (r = n, n = d), r === !1 && (r = S), h.each(function(d, h) {
                    a && (o = function(t) {
                        return c(h, t.type, r),
                            r.apply(this, arguments)
                    }),
                        i && (u = function(e) {
                        var n,
                            a = t(e.target).closest(i, h).get(0);
                        return a && a !== h ? (n = t.extend(l(e), {
                            currentTarget: a,
                            liveFired: h
                        }), (o || r).apply(a, [n].concat(f.call(arguments, 1)))) : void 0

                    }),
                        s(h, e, r, n, i, u || o)
                }))
            },
            t.fn.off = function(e, i, n) {
                var r = this;
                return e && !g(e) ? (t.each(e,
                    function(t, e) {
                        r.off(t, i, e)
                    }), r) : (g(i) || p(n) || n === !1 || (n = i, i = d), n === !1 && (n = S), r.each(function() {
                    c(this, e, n, i)
                }))
            },
            t.fn.trigger = function(e, i) {
                return e = g(e) || t.isPlainObject(e) ? t.Event(e) : u(e),
                    e._args = i,
                    this.each(function() {
                        "dispatchEvent" in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, i)

                    })
            },
            t.fn.triggerHandler = function(e, n) {
                var r,
                    a;
                return this.each(function(o, s) {
                    r = l(g(e) ? t.Event(e) : e),
                        r._args = n,
                        r.target = s,
                        t.each(i(s, e.type || e),
                            function(t, e) {
                                return a = e.proxy(r),
                                    r.isImmediatePropagationStopped() ? !1: void 0
                            })
                }),
                    a
            },
            "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e) {
                t.fn[e] = function(t) {
                    return t ? this.bind(e, t) : this.trigger(e)

                }
            }),
            ["focus", "blur"].forEach(function(e) {
                t.fn[e] = function(t) {
                    return t ? this.bind(e, t) : this.each(function() {
                        try {
                            this[e]()
                        } catch(t) {}
                    }),
                        this
                }
            }),
            t.Event = function(t, e) {
                g(t) || (e = t, t = e.type);
                var i = document.createEvent(v[t] || "Events"),
                    n = !0;
                if (e) for (var r in e)"bubbles" == r ? n = !!e[r] : i[r] = e[r];
                return i.initEvent(t, n, !0),
                    u(i)

            }
    } (Zepto),
    function(t) {
        t.fn.serializeArray = function() {
            var e,
                i,
                n = [];
            return t([].slice.call(this.get(0).elements)).each(function() {
                e = t(this),
                    i = e.attr("type"),
                    "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != i && "reset" != i && "button" != i && ("radio" != i && "checkbox" != i || this.checked) && n.push({
                    name: e.attr("name"),
                    value: e.val()
                })

            }),
                n
        },
            t.fn.serialize = function() {
                var t = [];
                return this.serializeArray().forEach(function(e) {
                    t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
                }),
                    t.join("&")
            },
            t.fn.submit = function(e) {
                if (e) this.bind("submit", e);
                else if (this.length) {
                    var i = t.Event("submit");
                    this.eq(0).trigger(i),
                        i.isDefaultPrevented() || this.get(0).submit()

                }
                return this
            }
    } (Zepto),
    function(t, e) {
        function i(t) {
            return t.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()
        }
        function n(t) {
            return r ? r + t: t.toLowerCase()
        }
        var r,
            a,
            o,
            s,
            c,
            u,
            l,
            d,
            h,
            f,
            p = "",
            g = {
                Webkit: "webkit",
                Moz: "",
                O: "o"
            },
            m = window.document,
            v = m.createElement("div"),
            w = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
            y = {};
        t.each(g,
            function(t, i) {
                return v.style[t + "TransitionProperty"] !== e ? (p = "-" + t.toLowerCase() + "-", r = i, !1) : void 0
            }),
            a = p + "transform",
            y[o = p + "transition-property"] = y[s = p + "transition-duration"] = y[u = p + "transition-delay"] = y[c = p + "transition-timing-function"] = y[l = p + "animation-name"] = y[d = p + "animation-duration"] = y[f = p + "animation-delay"] = y[h = p + "animation-timing-function"] = "",
            t.fx = {
                off: r === e && v.style.transitionProperty === e,
                speeds: {
                    _default: 400,
                    fast: 200,
                    slow: 600
                },
                cssPrefix: p,
                transitionEnd: n("TransitionEnd"),
                animationEnd: n("AnimationEnd")
            },
            t.fn.animate = function(i, n, r, a, o) {
                return t.isFunction(n) && (a = n, r = e, n = e),
                    t.isFunction(r) && (a = r, r = e),
                    t.isPlainObject(n) && (r = n.easing, a = n.complete, o = n.delay, n = n.duration),
                    n && (n = ("number" == typeof n ? n: t.fx.speeds[n] || t.fx.speeds._default) / 1e3),
                    o && (o = parseFloat(o) / 1e3),
                    this.anim(i, n, r, a, o)

            },
            t.fn.anim = function(n, r, p, g, m) {
                var v,
                    b,
                    _,
                    S = {},
                    x = "",
                    L = this,
                    z = t.fx.transitionEnd,
                    C = !1;
                if (r === e && (r = t.fx.speeds._default / 1e3), m === e && (m = 0), t.fx.off && (r = 0), "string" == typeof n) S[l] = n,
                    S[d] = r + "s",
                    S[f] = m + "s",
                    S[h] = p || "linear",
                    z = t.fx.animationEnd;
                else {
                    b = [];
                    for (v in n) w.test(v) ? x += v + "(" + n[v] + ") ": (S[v] = n[v], b.push(i(v)));
                    x && (S[a] = x, b.push(a)),
                        r > 0 && "object" == typeof n && (S[o] = b.join(", "), S[s] = r + "s", S[u] = m + "s", S[c] = p || "linear")
                }
                return _ = function(e) {
                    if ("undefined" != typeof e) {
                        if (e.target !== e.currentTarget) return;
                        t(e.target).unbind(z, _)
                    } else t(this).unbind(z, _);
                    C = !0,
                        t(this).css(y),
                        g && g.call(this)
                },
                    r > 0 && (this.bind(z, _), setTimeout(function() {
                        C || _.call(L)

                    },
                        1e3 * r + 25)),
                    this.size() && this.get(0).clientLeft,
                    this.css(S),
                    0 >= r && setTimeout(function() {
                        L.each(function() {
                            _.call(this)
                        })
                    },
                    0),
                    this
            },
            v = null
    } (Zepto),
    function(t) {
        "__proto__" in {} || t.extend(t.zepto, {
            Z: function(e, i) {
                return e = e || [],
                    t.extend(e, t.fn),
                    e.selector = i || "",
                    e.__Z = !0,
                    e
            },
            isZ: function(e) {
                return "array" === t.type(e) && "__Z" in e

            }
        });
        try {
            getComputedStyle(void 0)
        } catch(e) {
            var i = getComputedStyle;
            window.getComputedStyle = function(t) {
                try {
                    return i(t)
                } catch(e) {
                    return null
                }
            }
        }
    } (Zepto),
    define("$",
        function() {}),
    function() {
        var t = this,
            e = t._,
            i = {},
            n = Array.prototype,
            r = Object.prototype,
            a = Function.prototype,
            o = n.push,
            s = n.slice,
            c = n.concat,
            u = r.toString,
            l = r.hasOwnProperty,
            d = n.forEach,
            h = n.map,
            f = n.reduce,
            p = n.reduceRight,
            g = n.filter,
            m = n.every,
            v = n.some,
            w = n.indexOf,
            y = n.lastIndexOf,
            b = Array.isArray,
            _ = Object.keys,
            S = a.bind,
            x = function(t) {
                return t instanceof x ? t: this instanceof x ? void(this._wrapped = t) : new x(t)

            };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = x), exports._ = x) : t._ = x,
            x.VERSION = "1.4.4";
        var L = x.each = x.forEach = function(t, e, n) {
            if (null != t) if (d && t.forEach === d) t.forEach(e, n);
            else if (t.length === +t.length) {
                for (var r = 0, a = t.length; a > r; r++) if (e.call(n, t[r], r, t) === i) return

            } else for (var o in t) if (x.has(t, o) && e.call(n, t[o], o, t) === i) return
        };
        x.map = x.collect = function(t, e, i) {
            var n = [];
            return null == t ? n: h && t.map === h ? t.map(e, i) : (L(t,
                function(t, r, a) {
                    n[n.length] = e.call(i, t, r, a)
                }), n)
        };
        var z = "Reduce of empty array with no initial value";
        x.reduce = x.foldl = x.inject = function(t, e, i, n) {
            var r = arguments.length > 2;
            if (null == t && (t = []), f && t.reduce === f) return n && (e = x.bind(e, n)),
                r ? t.reduce(e, i) : t.reduce(e);
            if (L(t,
                function(t, a, o) {
                    r ? i = e.call(n, i, t, a, o) : (i = t, r = !0)
                }), !r) throw new TypeError(z);
            return i
        },
            x.reduceRight = x.foldr = function(t, e, i, n) {
                var r = arguments.length > 2;
                if (null == t && (t = []), p && t.reduceRight === p) return n && (e = x.bind(e, n)),
                    r ? t.reduceRight(e, i) : t.reduceRight(e);
                var a = t.length;
                if (a !== +a) {
                    var o = x.keys(t);
                    a = o.length
                }
                if (L(t,
                    function(s, c, u) {
                        c = o ? o[--a] : --a,
                            r ? i = e.call(n, i, t[c], c, u) : (i = t[c], r = !0)
                    }), !r) throw new TypeError(z);
                return i
            },
            x.find = x.detect = function(t, e, i) {
                var n;
                return C(t,
                    function(t, r, a) {
                        return e.call(i, t, r, a) ? (n = t, !0) : void 0
                    }),
                    n
            },
            x.filter = x.select = function(t, e, i) {
                var n = [];
                return null == t ? n: g && t.filter === g ? t.filter(e, i) : (L(t,
                    function(t, r, a) {
                        e.call(i, t, r, a) && (n[n.length] = t)
                    }), n)
            },
            x.reject = function(t, e, i) {
                return x.filter(t,
                    function(t, n, r) {
                        return ! e.call(i, t, n, r)
                    },
                    i)
            },
            x.every = x.all = function(t, e, n) {
                e || (e = x.identity);
                var r = !0;
                return null == t ? r: m && t.every === m ? t.every(e, n) : (L(t,
                    function(t, a, o) {
                        return (r = r && e.call(n, t, a, o)) ? void 0: i

                    }), !!r)
            };
        var C = x.some = x.any = function(t, e, n) {
            e || (e = x.identity);
            var r = !1;
            return null == t ? r: v && t.some === v ? t.some(e, n) : (L(t,
                function(t, a, o) {
                    return r || (r = e.call(n, t, a, o)) ? i: void 0
                }), !!r)
        };
        x.contains = x.include = function(t, e) {
            return null == t ? !1: w && t.indexOf === w ? -1 != t.indexOf(e) : C(t,
                function(t) {
                    return t === e
                })
        },
            x.invoke = function(t, e) {
                var i = s.call(arguments, 2),
                    n = x.isFunction(e);
                return x.map(t,
                    function(t) {
                        return (n ? e: t[e]).apply(t, i)
                    })
            },
            x.pluck = function(t, e) {
                return x.map(t,
                    function(t) {
                        return t[e]
                    })
            },
            x.where = function(t, e, i) {
                return x.isEmpty(e) ? i ? null: [] : x[i ? "find": "filter"](t,
                    function(t) {
                        for (var i in e) if (e[i] !== t[i]) return ! 1;
                        return ! 0
                    })
            },
            x.findWhere = function(t, e) {
                return x.where(t, e, !0)

            },
            x.max = function(t, e, i) {
                if (!e && x.isArray(t) && t[0] === +t[0] && t.length < 65535) return Math.max.apply(Math, t);
                if (!e && x.isEmpty(t)) return - 1 / 0;
                var n = {
                    computed: -1 / 0,
                    value: -1 / 0
                };
                return L(t,
                    function(t, r, a) {
                        var o = e ? e.call(i, t, r, a) : t;
                        o >= n.computed && (n = {
                            value: t,
                            computed: o
                        })
                    }),
                    n.value
            },
            x.min = function(t, e, i) {
                if (!e && x.isArray(t) && t[0] === +t[0] && t.length < 65535) return Math.min.apply(Math, t);
                if (!e && x.isEmpty(t)) return 1 / 0;
                var n = {
                    computed: 1 / 0,
                    value: 1 / 0
                };
                return L(t,
                    function(t, r, a) {
                        var o = e ? e.call(i, t, r, a) : t;
                        o < n.computed && (n = {
                            value: t,
                            computed: o
                        })
                    }),
                    n.value
            },
            x.shuffle = function(t) {
                var e,
                    i = 0,
                    n = [];
                return L(t,
                    function(t) {
                        e = x.random(i++),
                            n[i - 1] = n[e],
                            n[e] = t
                    }),
                    n
            };
        var E = function(t) {
            return x.isFunction(t) ? t: function(e) {
                return e[t]

            }
        };
        x.sortBy = function(t, e, i) {
            var n = E(e);
            return x.pluck(x.map(t,
                function(t, e, r) {
                    return {
                        value: t,
                        index: e,
                        criteria: n.call(i, t, e, r)
                    }
                }).sort(function(t, e) {
                    var i = t.criteria,
                        n = e.criteria;
                    if (i !== n) {
                        if (i > n || void 0 === i) return 1;
                        if (n > i || void 0 === n) return - 1
                    }
                    return t.index < e.index ? -1: 1
                }), "value")
        };
        var T = function(t, e, i, n) {
            var r = {},
                a = E(e || x.identity);
            return L(t,
                function(e, o) {
                    var s = a.call(i, e, o, t);
                    n(r, s, e)
                }),
                r
        };
        x.groupBy = function(t, e, i) {
            return T(t, e, i,
                function(t, e, i) { (x.has(t, e) ? t[e] : t[e] = []).push(i)
                })
        },
            x.countBy = function(t, e, i) {
                return T(t, e, i,
                    function(t, e) {
                        x.has(t, e) || (t[e] = 0),
                            t[e]++
                    })
            },
            x.sortedIndex = function(t, e, i, n) {
                i = null == i ? x.identity: E(i);
                for (var r = i.call(n, e), a = 0, o = t.length; o > a;) {
                    var s = a + o >>> 1;
                    i.call(n, t[s]) < r ? a = s + 1: o = s
                }
                return a
            },
            x.toArray = function(t) {
                return t ? x.isArray(t) ? s.call(t) : t.length === +t.length ? x.map(t, x.identity) : x.values(t) : []
            },
            x.size = function(t) {
                return null == t ? 0: t.length === +t.length ? t.length: x.keys(t).length
            },
            x.first = x.head = x.take = function(t, e, i) {
                return null == t ? void 0: null == e || i ? t[0] : s.call(t, 0, e)

            },
            x.initial = function(t, e, i) {
                return s.call(t, 0, t.length - (null == e || i ? 1: e))
            },
            x.last = function(t, e, i) {
                return null == t ? void 0: null == e || i ? t[t.length - 1] : s.call(t, Math.max(t.length - e, 0))
            },
            x.rest = x.tail = x.drop = function(t, e, i) {
                return s.call(t, null == e || i ? 1: e)
            },
            x.compact = function(t) {
                return x.filter(t, x.identity)
            };
        var A = function(t, e, i) {
            return L(t,
                function(t) {
                    x.isArray(t) ? e ? o.apply(i, t) : A(t, e, i) : i.push(t)
                }),
                i
        };
        x.flatten = function(t, e) {
            return A(t, e, [])
        },
            x.without = function(t) {
                return x.difference(t, s.call(arguments, 1))
            },
            x.uniq = x.unique = function(t, e, i, n) {
                x.isFunction(e) && (n = i, i = e, e = !1);
                var r = i ? x.map(t, i, n) : t,
                    a = [],
                    o = [];
                return L(r,
                    function(i, n) { (e ? n && o[o.length - 1] === i: x.contains(o, i)) || (o.push(i), a.push(t[n]))
                    }),
                    a
            },
            x.union = function() {
                return x.uniq(c.apply(n, arguments))
            },
            x.intersection = function(t) {
                var e = s.call(arguments, 1);
                return x.filter(x.uniq(t),
                    function(t) {
                        return x.every(e,
                            function(e) {
                                return x.indexOf(e, t) >= 0
                            })
                    })

            },
            x.difference = function(t) {
                var e = c.apply(n, s.call(arguments, 1));
                return x.filter(t,
                    function(t) {
                        return ! x.contains(e, t)
                    })
            },
            x.zip = function() {
                for (var t = s.call(arguments), e = x.max(x.pluck(t, "length")), i = new Array(e), n = 0; e > n; n++) i[n] = x.pluck(t, "" + n);
                return i
            },
            x.object = function(t, e) {
                if (null == t) return {};
                for (var i = {},
                         n = 0, r = t.length; r > n; n++) e ? i[t[n]] = e[n] : i[t[n][0]] = t[n][1];
                return i
            },
            x.indexOf = function(t, e, i) {
                if (null == t) return - 1;
                var n = 0,
                    r = t.length;
                if (i) {
                    if ("number" != typeof i) return n = x.sortedIndex(t, e),
                            t[n] === e ? n: -1;
                    n = 0 > i ? Math.max(0, r + i) : i
                }
                if (w && t.indexOf === w) return t.indexOf(e, i);
                for (; r > n; n++) if (t[n] === e) return n;
                return - 1
            },
            x.lastIndexOf = function(t, e, i) {
                if (null == t) return - 1;
                var n = null != i;
                if (y && t.lastIndexOf === y) return n ? t.lastIndexOf(e, i) : t.lastIndexOf(e);
                for (var r = n ? i: t.length; r--;) if (t[r] === e) return r;
                return - 1
            },
            x.range = function(t, e, i) {
                arguments.length <= 1 && (e = t || 0, t = 0),
                    i = arguments[2] || 1;
                for (var n = Math.max(Math.ceil((e - t) / i), 0), r = 0, a = new Array(n); n > r;) a[r++] = t,
                    t += i;
                return a

            },
            x.bind = function(t, e) {
                if (t.bind === S && S) return S.apply(t, s.call(arguments, 1));
                var i = s.call(arguments, 2);
                return function() {
                    return t.apply(e, i.concat(s.call(arguments)))
                }
            },
            x.partial = function(t) {
                var e = s.call(arguments, 1);
                return function() {
                    return t.apply(this, e.concat(s.call(arguments)))
                }
            },
            x.bindAll = function(t) {
                var e = s.call(arguments, 1);
                return 0 === e.length && (e = x.functions(t)),
                    L(e,
                        function(e) {
                            t[e] = x.bind(t[e], t)
                        }),
                    t
            },
            x.memoize = function(t, e) {
                var i = {};
                return e || (e = x.identity),
                    function() {
                        var n = e.apply(this, arguments);
                        return x.has(i, n) ? i[n] : i[n] = t.apply(this, arguments)
                    }
            },
            x.delay = function(t, e) {
                var i = s.call(arguments, 2);
                return setTimeout(function() {
                        return t.apply(null, i)

                    },
                    e)
            },
            x.defer = function(t) {
                return x.delay.apply(x, [t, 1].concat(s.call(arguments, 1)))
            },
            x.throttle = function(t, e) {
                var i,
                    n,
                    r,
                    a,
                    o = 0,
                    s = function() {
                        o = new Date,
                            r = null,
                            a = t.apply(i, n)
                    };
                return function() {
                    var c = new Date,
                        u = e - (c - o);
                    return i = this,
                        n = arguments,
                            0 >= u ? (clearTimeout(r), r = null, o = c, a = t.apply(i, n)) : r || (r = setTimeout(s, u)),
                        a

                }
            },
            x.debounce = function(t, e, i) {
                var n,
                    r;
                return function() {
                    var a = this,
                        o = arguments,
                        s = function() {
                            n = null,
                                i || (r = t.apply(a, o))
                        },
                        c = i && !n;
                    return clearTimeout(n),
                        n = setTimeout(s, e),
                        c && (r = t.apply(a, o)),
                        r
                }
            },
            x.once = function(t) {
                var e,
                    i = !1;
                return function() {
                    return i ? e: (i = !0, e = t.apply(this, arguments), t = null, e)
                }
            },
            x.wrap = function(t, e) {
                return function() {
                    var i = [t];
                    return o.apply(i, arguments),
                        e.apply(this, i)
                }
            },
            x.compose = function() {
                var t = arguments;
                return function() {
                    for (var e = arguments, i = t.length - 1; i >= 0; i--) e = [t[i].apply(this, e)];
                    return e[0]
                }
            },
            x.after = function(t, e) {
                return 0 >= t ? e() : function() {
                    return--t < 1 ? e.apply(this, arguments) : void 0
                }
            },
            x.keys = _ ||
                function(t) {
                    if (t !== Object(t)) throw new TypeError("Invalid object");
                    var e = [];
                    for (var i in t) x.has(t, i) && (e[e.length] = i);
                    return e
                },
            x.values = function(t) {
                var e = [];
                for (var i in t) x.has(t, i) && e.push(t[i]);
                return e
            },
            x.pairs = function(t) {
                var e = [];
                for (var i in t) x.has(t, i) && e.push([i, t[i]]);
                return e
            },
            x.invert = function(t) {
                var e = {};
                for (var i in t) x.has(t, i) && (e[t[i]] = i);
                return e

            },
            x.functions = x.methods = function(t) {
                var e = [];
                for (var i in t) x.isFunction(t[i]) && e.push(i);
                return e.sort()
            },
            x.extend = function(t) {
                return L(s.call(arguments, 1),
                    function(e) {
                        if (e) for (var i in e) t[i] = e[i]
                    }),
                    t
            },
            x.pick = function(t) {
                var e = {},
                    i = c.apply(n, s.call(arguments, 1));
                return L(i,
                    function(i) {
                        i in t && (e[i] = t[i])

                    }),
                    e
            },
            x.omit = function(t) {
                var e = {},
                    i = c.apply(n, s.call(arguments, 1));
                for (var r in t) x.contains(i, r) || (e[r] = t[r]);
                return e
            },
            x.defaults = function(t) {
                return L(s.call(arguments, 1),
                    function(e) {
                        if (e) for (var i in e) null == t[i] && (t[i] = e[i])
                    }),
                    t
            },
            x.clone = function(t) {
                return x.isObject(t) ? x.isArray(t) ? t.slice() : x.extend({},
                    t) : t

            },
            x.tap = function(t, e) {
                return e(t),
                    t
            };
        var k = function(t, e, i, n) {
            if (t === e) return 0 !== t || 1 / t == 1 / e;
            if (null == t || null == e) return t === e;
            t instanceof x && (t = t._wrapped),
                e instanceof x && (e = e._wrapped);
            var r = u.call(t);
            if (r != u.call(e)) return ! 1;
            switch (r) {
                case "[object String]":
                    return t == String(e);
                case "[object Number]":
                    return t != +t ? e != +e: 0 == t ? 1 / t == 1 / e: t == +e;
                case "[object Date]":
                case "[object Boolean]":
                    return + t == +e;
                case "[object RegExp]":
                    return t.source == e.source && t.global == e.global && t.multiline == e.multiline && t.ignoreCase == e.ignoreCase
            }
            if ("object" != typeof t || "object" != typeof e) return ! 1;
            for (var a = i.length; a--;) if (i[a] == t) return n[a] == e;
            i.push(t),
                n.push(e);
            var o = 0,
                s = !0;
            if ("[object Array]" == r) {
                if (o = t.length, s = o == e.length) for (; o--&&(s = k(t[o], e[o], i, n)););
            } else {
                var c = t.constructor,
                    l = e.constructor;
                if (c !== l && !(x.isFunction(c) && c instanceof c && x.isFunction(l) && l instanceof l)) return ! 1;
                for (var d in t) if (x.has(t, d) && (o++, !(s = x.has(e, d) && k(t[d], e[d], i, n)))) break;
                if (s) {
                    for (d in e) if (x.has(e, d) && !o--) break;
                    s = !o
                }
            }
            return i.pop(),
                n.pop(),
                s
        };
        x.isEqual = function(t, e) {
            return k(t, e, [], [])
        },
            x.isEmpty = function(t) {
                if (null == t) return ! 0;
                if (x.isArray(t) || x.isString(t)) return 0 === t.length;
                for (var e in t) if (x.has(t, e)) return ! 1;
                return ! 0
            },
            x.isElement = function(t) {
                return ! (!t || 1 !== t.nodeType)
            },
            x.isArray = b ||
                function(t) {
                    return "[object Array]" == u.call(t)

                },
            x.isObject = function(t) {
                return t === Object(t)
            },
            L(["Arguments", "Function", "String", "Number", "Date", "RegExp"],
                function(t) {
                    x["is" + t] = function(e) {
                        return u.call(e) == "[object " + t + "]"
                    }
                }),
            x.isArguments(arguments) || (x.isArguments = function(t) {
            return ! (!t || !x.has(t, "callee"))
        }),
            "function" != typeof / . / &&(x.isFunction = function(t) {
            return "function" == typeof t

        }),
            x.isFinite = function(t) {
                return isFinite(t) && !isNaN(parseFloat(t))
            },
            x.isNaN = function(t) {
                return x.isNumber(t) && t != +t
            },
            x.isBoolean = function(t) {
                return t === !0 || t === !1 || "[object Boolean]" == u.call(t)
            },
            x.isNull = function(t) {
                return null === t
            },
            x.isUndefined = function(t) {
                return void 0 === t
            },
            x.has = function(t, e) {
                return l.call(t, e)

            },
            x.noConflict = function() {
                return t._ = e,
                    this
            },
            x.identity = function(t) {
                return t
            },
            x.times = function(t, e, i) {
                for (var n = Array(t), r = 0; t > r; r++) n[r] = e.call(i, r);
                return n
            },
            x.random = function(t, e) {
                return null == e && (e = t, t = 0),
                    t + Math.floor(Math.random() * (e - t + 1))
            };
        var I = {
            escape: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "/": "&#x2F;"
            }
        };
        I.unescape = x.invert(I.escape);
        var P = {
            escape: new RegExp("[" + x.keys(I.escape).join("") + "]", "g"),
            unescape: new RegExp("(" + x.keys(I.unescape).join("|") + ")", "g")
        };
        x.each(["escape", "unescape"],
            function(t) {
                x[t] = function(e) {
                    return null == e ? "": ("" + e).replace(P[t],
                        function(e) {
                            return I[t][e]
                        })
                }
            }),
            x.result = function(t, e) {
                if (null == t) return null;
                var i = t[e];
                return x.isFunction(i) ? i.call(t) : i
            },
            x.mixin = function(t) {
                L(x.functions(t),
                    function(e) {
                        var i = x[e] = t[e];
                        x.prototype[e] = function() {
                            var t = [this._wrapped];
                            return o.apply(t, arguments),
                                j.call(this, i.apply(x, t))
                        }
                    })
            };
        var N = 0;
        x.uniqueId = function(t) {
            var e = ++N + "";
            return t ? t + e: e
        },
            x.templateSettings = {
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: /<%=([\s\S]+?)%>/g,
                escape: /<%-([\s\S]+?)%>/g
            };
        var U = /(.)^/,
            O = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "	": "t",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            M = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        x.template = function(t, e, i) {
            var n;
            i = x.defaults({},
                i, x.templateSettings);
            var r = new RegExp([(i.escape || U).source, (i.interpolate || U).source, (i.evaluate || U).source].join("|") + "|$", "g"),
                a = 0,
                o = "__p+='";
            t.replace(r,
                function(e, i, n, r, s) {
                    return o += t.slice(a, s).replace(M,
                        function(t) {
                            return "\\" + O[t]
                        }),
                        i && (o += "'+\n((__t=(" + i + "))==null?'':_.escape(__t))+\n'"),
                        n && (o += "'+\n((__t=(" + n + "))==null?'':__t)+\n'"),
                        r && (o += "';\n" + r + "\n__p+='"),
                        a = s + e.length,
                        e
                }),
                o += "';\n",
                i.variable || (o = "with(obj||{}){\n" + o + "}\n"),
                o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
            try {
                n = new Function(i.variable || "obj", "_", o)
            } catch(s) {
                throw s.source = o,
                    s
            }
            if (e) return n(e, x);
            var c = function(t) {
                return n.call(this, t, x)
            };
            return c.source = "function(" + (i.variable || "obj") + "){\n" + o + "}",
                c
        },
            x.chain = function(t) {
                return x(t).chain()
            };
        var j = function(t) {
            return this._chain ? x(t).chain() : t
        };
        x.mixin(x),
            L(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
                function(t) {
                    var e = n[t];
                    x.prototype[t] = function() {
                        var i = this._wrapped;
                        return e.apply(i, arguments),
                            "shift" != t && "splice" != t || 0 !== i.length || delete i[0],
                            j.call(this, i)
                    }
                }),
            L(["concat", "join", "slice"],
                function(t) {
                    var e = n[t];
                    x.prototype[t] = function() {
                        return j.call(this, e.apply(this._wrapped, arguments))
                    }
                }),
            x.extend(x.prototype, {
                chain: function() {
                    return this._chain = !0,
                        this

                },
                value: function() {
                    return this._wrapped
                }
            })
    }.call(this),
    define("_",
        function() {}),
    function() {
        var t,
            e = this,
            i = e.Backbone,
            n = [],
            r = (n.push, n.slice);
        n.splice,
            t = "undefined" != typeof exports ? exports: e.Backbone = {},
            t.VERSION = "1.0.0";
        var a = e._;
        a || "undefined" == typeof require || (a = require("underscore")),
            t.$ = e.jQuery || e.Zepto || e.ender || e.$,
            t.noConflict = function() {
                return e.Backbone = i,
                    this

            },
            t.emulateHTTP = !1,
            t.emulateJSON = !1;
        var o = t.Events = {
                on: function(t, e, i) {
                    if (!c(this, "on", t, [e, i]) || !e) return this;
                    this._events || (this._events = {});
                    var n = this._events[t] || (this._events[t] = []);
                    return n.push({
                        callback: e,
                        context: i,
                        ctx: i || this
                    }),
                        this
                },
                once: function(t, e, i) {
                    if (!c(this, "once", t, [e, i]) || !e) return this;
                    var n = this,
                        r = a.once(function() {
                            n.off(t, r),
                                e.apply(this, arguments)
                        });
                    return r._callback = e,
                        this.on(t, r, i)
                },
                off: function(t, e, i) {
                    var n,
                        r,
                        o,
                        s,
                        u,
                        l,
                        d,
                        h;
                    if (!this._events || !c(this, "off", t, [e, i])) return this;
                    if (!t && !e && !i) return this._events = {},
                        this;
                    for (s = t ? [t] : a.keys(this._events), u = 0, l = s.length; l > u; u++) if (t = s[u], o = this._events[t]) {
                        if (this._events[t] = n = [], e || i) for (d = 0, h = o.length; h > d; d++) r = o[d],
                            (e && e !== r.callback && e !== r.callback._callback || i && i !== r.context) && n.push(r);
                        n.length || delete this._events[t]
                    }
                    return this
                },
                trigger: function(t) {
                    if (!this._events) return this;
                    var e = r.call(arguments, 1);
                    if (!c(this, "trigger", t, e)) return this;
                    var i = this._events[t],
                        n = this._events.all;
                    return i && u(i, e),
                        n && u(n, arguments),
                        this
                },
                stopListening: function(t, e, i) {
                    var n = this._listeners;
                    if (!n) return this;
                    var r = !e && !i;
                    "object" == typeof e && (i = this),
                        t && ((n = {})[t._listenerId] = t);
                    for (var a in n) n[a].off(e, i, this),
                        r && delete this._listeners[a];
                    return this
                }
            },
            s = /\s+/,
            c = function(t, e, i, n) {
                if (!i) return ! 0;
                if ("object" == typeof i) {
                    for (var r in i) t[e].apply(t, [r, i[r]].concat(n));
                    return ! 1
                }
                if (s.test(i)) {
                    for (var a = i.split(s), o = 0, c = a.length; c > o; o++) t[e].apply(t, [a[o]].concat(n));
                    return ! 1
                }
                return ! 0
            },
            u = function(t, e) {
                var i,
                    n = -1,
                    r = t.length,
                    a = e[0],
                    o = e[1],
                    s = e[2];
                switch (e.length) {
                    case 0:
                        for (; ++n < r;)(i = t[n]).callback.call(i.ctx);
                        return;
                    case 1:
                        for (; ++n < r;)(i = t[n]).callback.call(i.ctx, a);
                        return;
                    case 2:
                        for (; ++n < r;)(i = t[n]).callback.call(i.ctx, a, o);
                        return;
                    case 3:
                        for (; ++n < r;)(i = t[n]).callback.call(i.ctx, a, o, s);
                        return;
                    default:
                        for (; ++n < r;)(i = t[n]).callback.apply(i.ctx, e)
                }
            },
            l = {
                listenTo: "on",
                listenToOnce: "once"
            };
        a.each(l,
            function(t, e) {
                o[e] = function(e, i, n) {
                    var r = this._listeners || (this._listeners = {}),
                        o = e._listenerId || (e._listenerId = a.uniqueId("l"));
                    return r[o] = e,
                        "object" == typeof i && (n = this),
                        e[t](i, n, this),
                        this
                }
            }),
            o.bind = o.on,
            o.unbind = o.off,
            a.extend(t, o);
        var d = t.View = function(t) {
                this.cid = a.uniqueId("view"),
                    this._configure(t || {}),
                    this._ensureElement(),
                    this.initialize.apply(this, arguments),
                    this.delegateEvents()
            },
            h = /^(\S+)\s*(.*)$/,
            f = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
        a.extend(d.prototype, o, {
            tagName: "div",
            $: function(t) {
                return this.$el.find(t)

            },
            initialize: function() {},
            render: function() {
                return this
            },
            remove: function() {
                return this.$el.remove(),
                    this.stopListening(),
                    this
            },
            setElement: function(e, i) {
                return this.$el && this.undelegateEvents(),
                    this.$el = e instanceof t.$ ? e: t.$(e),
                    this.el = this.$el[0],
                    i !== !1 && this.delegateEvents(),
                    this
            },
            delegateEvents: function(t) {
                if (!t && !(t = a.result(this, "events"))) return this;
                this.undelegateEvents();
                for (var e in t) {
                    var i = t[e];
                    if (a.isFunction(i) || (i = this[t[e]]), i) {
                        var n = e.match(h),
                            r = n[1],
                            o = n[2];
                        i = a.bind(i, this),
                            r += ".delegateEvents" + this.cid,
                                "" === o ? this.$el.on(r, i) : this.$el.on(r, o, i)
                    }
                }
                return this
            },
            undelegateEvents: function() {
                return this.$el.off(".delegateEvents" + this.cid),
                    this

            },
            _configure: function(t) {
                this.options && (t = a.extend({},
                    a.result(this, "options"), t)),
                    a.extend(this, a.pick(t, f)),
                    this.options = t
            },
            _ensureElement: function() {
                if (this.el) this.setElement(a.result(this, "el"), !1);
                else {
                    var e = a.extend({},
                        a.result(this, "attributes"));
                    this.id && (e.id = a.result(this, "id")),
                        this.className && (e["class"] = a.result(this, "className"));
                    var i = t.$("<" + a.result(this, "tagName") + ">").attr(e);
                    this.setElement(i, !1)
                }
            }
        });
        var p = function(t, e) {
            var i,
                n = this;
            i = t && a.has(t, "constructor") ? t.constructor: function() {
                return n.apply(this, arguments)
            },
                a.extend(i, n, e);
            var r = function() {
                this.constructor = i
            };
            return r.prototype = n.prototype,
                i.prototype = new r,
                t && a.extend(i.prototype, t),
                i.__super__ = n.prototype,
                i

        };
        d.extend = p
    }.call(this),
    define("B",
        function() {}),
    function(t) {
        function e(e) {
            if (e.targetTouches.length > 1) return ! 0;
            m = e.target;
            var i = t(m).closest(".nofastclick");
            if (i.length > 0) return ! 0;
            if (x) {
                var n = window.getSelection();
                if (n.rangeCount && !n.isCollapsed) return ! 0;
                if (e.targetTouches[0].identifier === L) return event.preventDefault(),
                    !1;
                L = e.targetTouches[0].identifier
            }
            return h = !0,
                f = e.timeStamp,
                v = e.targetTouches[0].pageX,
                w = e.targetTouches[0].pageY,
                e.timeStamp - p < 0 && (p = e.timeStamp),
                e.timeStamp - p < 200 && e.preventDefault(),
                !0
        }
        function i(t) {
            return h ? (y = t.changedTouches[0].pageX, b = t.changedTouches[0].pageY, (Math.abs(y - v) > _ || Math.abs(b - w) > _) && (m = null, h = !1), !0) : !0

        }
        function n(e) {
            if (!h) return ! 0;
            if (e.timeStamp - p < 100) return g = !0,
                !0;
            p = e.timeStamp,
                h = !1;
            var i = m.tagName.toLowerCase();
            if ("label" == i) {
                var n = u(m);
                if (n) {
                    var r = t(n);
                    if ("checkbox" == r.attr("type") || "radio" == r.attr("type") ? r.attr("checked") ? r.removeAttr("checked") : r.attr("checked", "checked") : t(n).focus(), S) return ! 1;
                    m = n
                }
            } else if (c(m)) {
                if (e.timeStamp - f > 100) return m = null,
                    !1;
                var a;
                return x && m.setSelectionRange && 0 !== m.type.indexOf("date") && "time" !== m.type ? (a = m.value.length, m.setSelectionRange(a, a)) : m.focus(),
                    "select" !== i && (m = null, e.preventDefault()),
                    !1
            }
            return f = 0,
                s(m) || (e.preventDefault(), l(m, e)),
                !1
        }
        function r() {
            h = !1,
                m = null

        }
        function a(e) {
            var i = e.target,
                n = t(i).closest(".nofastclick");
            return n.length > 0 ? !0: m ? e.touchEvent ? !0: !e.cancelable || s(m) && !g ? !0: (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), !1) : !0
        }
        function o(t) {
            if (h) return h = !1,
                m = null,
                !0;
            if ("submit" === t.target.type && 0 === t.detail) return ! 0;
            var e = a(t);
            return e || (m = null),
                e
        }
        function s(t) {
            switch (t.nodeName.toLowerCase()) {
                case "button":
                case "select":
                case "textarea":
                    if (t.disabled) return ! 0;
                    break;
                case "input":
                    if (x && "file" === t.type || t.disabled) return ! 0;
                    break;
                case "video":
                    return ! 0
            }
            return /\bneedclick\b/.test(t.className)
        }
        function c(t) {
            switch (t.nodeName.toLowerCase()) {
                case "textarea":
                case "select":
                    return ! 0;
                case "input":
                    switch (t.type) {
                        case "button":
                        case "checkbox":
                        case "file":
                        case "image":
                        case "radio":
                        case "submit":
                            return ! 1
                    }
                    return ! t.disabled && !t.readOnly;
                default:
                    return /\bneedfocus\b/.test(t.className)
            }
        }
        function u(t) {
            return void 0 !== t.control ? t.control: t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")

        }
        function l(t, e) {
            var i,
                n;
            document.activeElement && document.activeElement !== t && document.activeElement.blur(),
                n = e.changedTouches[0],
                i = document.createEvent("MouseEvents"),
                i.initMouseEvent("click", !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null),
                i.touchEvent = !0,
                t.dispatchEvent(i)

        }
        function d() {
            return "undefined" == typeof window.ontouchstart ? !1: !0
        }
        var h = !1,
            f = 0,
            p = 0,
            g = !1,
            m = null,
            v = 0,
            w = 0,
            y = 0,
            b = 0,
            _ = 4,
            S = navigator.userAgent.indexOf("Android") > 0,
            x = /iP(ad|hone|od)/.test(navigator.userAgent),
            L = 0;
        x && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),
            t.needFocus = c,
            t.bindFastClick = function() {
                return d() ? void t(document).ready(function() {
                    S && (document.addEventListener("mouseover", a, !0), document.addEventListener("mousedown", a, !0), document.addEventListener("mouseup", a, !0)),
                        document.addEventListener("click", o, !0),
                        t(document).on("touchstart", e).on("touchmove", i).on("touchend", n).on("touchcancel", r)

                }) : !0
            },
            t.unbindFastClick = function() {
                return d() ? (S && (document.removeEventListener("mouseover", a, !0), document.removeEventListener("mousedown", a, !0), document.removeEventListener("mouseup", a, !0)), document.removeEventListener("click", o, !0), void t(document).off("touchstart", e).off("touchmove", i).off("touchend", n).off("touchcancel", r)) : !0

            }
    } (Zepto),
    define("F",
        function() {}),
    define("libs", ["$", "_", "B", "F"],
        function() {}),
    define("text", ["module"],
        function(t) {
            var e,
                i,
                n,
                r,
                a = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
                o = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
                s = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
                c = "undefined" != typeof location && location.href,
                u = c && location.protocol && location.protocol.replace(/\:/, ""),
                l = c && location.hostname,
                d = c && (location.port || void 0),
                h = [],
                f = t.config && t.config() || {};
            return e = {
                version: "2.0.5+",
                strip: function(t) {
                    if (t) {
                        t = t.replace(o, "");
                        var e = t.match(s);
                        e && (t = e[1])
                    } else t = "";
                    return t
                },
                jsEscape: function(t) {
                    return t.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")

                },
                createXhr: f.createXhr ||
                    function() {
                        var t,
                            e,
                            i;
                        if ("undefined" != typeof XMLHttpRequest) return new XMLHttpRequest;
                        if ("undefined" != typeof ActiveXObject) for (e = 0; 3 > e; e += 1) {
                            i = a[e];
                            try {
                                t = new ActiveXObject(i)
                            } catch(n) {}
                            if (t) {
                                a = [i];
                                break
                            }
                        }
                        return t
                    },
                parseName: function(t) {
                    var e,
                        i,
                        n,
                        r = !1,
                        a = t.indexOf("."),
                        o = 0 === t.indexOf("./") || 0 === t.indexOf("../");
                    return - 1 !== a && (!o || a > 1) ? (e = t.substring(0, a), i = t.substring(a + 1, t.length)) : e = t,
                        n = i || e,
                        a = n.indexOf("!"),
                        -1 !== a && (r = "strip" === n.substring(a + 1), n = n.substring(0, a), i ? i = n: e = n),
                    {
                        moduleName: e,
                        ext: i,
                        strip: r
                    }
                },
                xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
                useXhr: function(t, i, n, r) {
                    var a,
                        o,
                        s,
                        c = e.xdRegExp.exec(t);
                    return c ? (a = c[2], o = c[3], o = o.split(":"), s = o[1], o = o[0], !(a && a !== i || o && o.toLowerCase() !== n.toLowerCase() || (s || o) && s !== r)) : !0

                },
                finishLoad: function(t, i, n, r) {
                    n = i ? e.strip(n) : n,
                        f.isBuild && (h[t] = n),
                        r(n)
                },
                load: function(t, i, n, r) {
                    if (r.isBuild && !r.inlineText) return void n();
                    f.isBuild = r.isBuild;
                    var a = e.parseName(t),
                        o = a.moduleName + (a.ext ? "." + a.ext: ""),
                        s = i.toUrl(o),
                        h = f.useXhr || e.useXhr; ! c || h(s, u, l, d) ? e.get(s,
                        function(i) {
                            e.finishLoad(t, a.strip, i, n)

                        },
                        function(t) {
                            n.error && n.error(t)
                        }) : i([o],
                        function(t) {
                            e.finishLoad(a.moduleName + "." + a.ext, a.strip, t, n)
                        })
                },
                write: function(t, i, n) {
                    if (h.hasOwnProperty(i)) {
                        var r = e.jsEscape(h[i]);
                        n.asModule(t + "!" + i, "define(function () { return '" + r + "';});\n")
                    }
                },
                writeFile: function(t, i, n, r, a) {
                    var o = e.parseName(i),
                        s = o.ext ? "." + o.ext: "",
                        c = o.moduleName + s,
                        u = n.toUrl(o.moduleName + s) + ".js";
                    e.load(c, n,
                        function() {
                            var i = function(t) {
                                return r(u, t)
                            };
                            i.asModule = function(t, e) {
                                return r.asModule(t, u, e)
                            },
                                e.write(t, c, i, a)
                        },
                        a)
                }
            },
                    "node" === f.env || !f.env && "undefined" != typeof process && process.versions && process.versions.node ? (i = require.nodeRequire("fs"), e.get = function(t, e) {
                var n = i.readFileSync(t, "utf8");
                0 === n.indexOf("") && (n = n.substring(1)),
                    e(n)
            }) : "xhr" === f.env || !f.env && e.createXhr() ? e.get = function(t, i, n, r) {
                var a,
                    o = e.createXhr();
                if (o.open("GET", t, !0), r) for (a in r) r.hasOwnProperty(a) && o.setRequestHeader(a.toLowerCase(), r[a]);
                f.onXhr && f.onXhr(o, t),
                    o.onreadystatechange = function() {
                        var e,
                            r;
                        4 === o.readyState && (e = o.status, e > 399 && 600 > e ? (r = new Error(t + " HTTP status: " + e), r.xhr = o, n(r)) : i(o.responseText))

                    },
                    o.send(null)
            }: "rhino" === f.env || !f.env && "undefined" != typeof Packages && "undefined" != typeof java ? e.get = function(t, e) {
                var i,
                    n,
                    r = "utf-8",
                    a = new java.io.File(t),
                    o = java.lang.System.getProperty("line.separator"),
                    s = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(a), r)),
                    c = "";
                try {
                    for (i = new java.lang.StringBuffer, n = s.readLine(), n && n.length() && 65279 === n.charAt(0) && (n = n.substring(1)), i.append(n); null !== (n = s.readLine());) i.append(o),
                        i.append(n);
                    c = String(i.toString())
                } finally {
                    s.close()
                }
                e(c)
            }: ("xpconnect" === f.env || !f.env && "undefined" != typeof Components && Components.classes && Components.interfaces) && (n = Components.classes, r = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), e.get = function(t, e) {
                var i,
                    a,
                    o = {},
                    s = new FileUtils.File(t);
                try {
                    i = n["@mozilla.org/network/file-input-stream;1"].createInstance(r.nsIFileInputStream),
                        i.init(s, 1, 0, !1),
                        a = n["@mozilla.org/intl/converter-input-stream;1"].createInstance(r.nsIConverterInputStream),
                        a.init(i, "utf-8", i.available(), r.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),
                        a.readString(i.available(), o),
                        a.close(),
                        i.close(),
                        e(o.value)

                } catch(c) {
                    throw new Error((s && s.path || "") + ": " + c)
                }
            }),
                e
        }),
    function() {
        function appInfo() {
            var t,
                e,
                i,
                n,
                r = {
                    MASTER: ["Ctrip_CtripWireless", "Unicom_CtripWireless", "Pro_CtripWireless"],
                    YOUTH: ["Youth_CtripWireless"],
                    GS: ["gs_wireless"],
                    WE: ["we_wireless"]
                },
                a = function(t) {
                    t += "",
                        t.indexOf(".") < 0 && (t += ".0"),
                        t = (t + "").split(".");
                    for (var e = 0; e < t.length; e++) t[e] = "000".substr(t[e].length) + t[e];
                    return t.join(".")
                },
                o = RegExp,
                s = window.navigator.userAgent;
            for (var c in r) for (var u = 0; u < r[c].length; u++) if (new o(r[c][u] + "_([\\d.]+)$").test(s)) {
                t = "CTRIP",
                    e = c,
                    i = o.$1;
                break
            }
            return t || /MicroMessenger\/([\d.]+)/.test(s) && (t = "TECENT", e = "WEIXIN", i = o.$1),
                i && (n = a(i)),
            {
                vendor: {
                    toString: function() {
                        return t

                    },
                    is: function(e) {
                        return e.toUpperCase() == t
                    }
                },
                code: {
                    toString: function() {
                        return e
                    },
                    is: function(t) {
                        return t.toUpperCase() == e
                    }
                },
                version: {
                    toString: function() {
                        return i
                    },
                    lt: function(t) {
                        return n < a(t)
                    },
                    lte: function(t) {
                        return n <= a(t)
                    },
                    eq: function(t) {
                        return n == a(t)
                    },
                    gte: function(t) {
                        return n >= a(t)
                    },
                    gt: function(t) {
                        return n > a(t)

                    }
                }
            }
        }
        function loadScript(t, e) {
            var i = document.createElement("script");
            i.type = "text/javascript",
                i.async = !0,
                i.onload = e,
                i.src = t,
                document.head.appendChild(i)
        }
        function mutileLoad(t, e) {
            function i() {
                r++,
                    r >= n && e()
            }
            var n = t.length,
                r = 0;
            if (!n) return void i();
            for (var a = 0; n > a; a++) {
                var o = t[a];
                loadScript(o, i)
            }
        }
        function initLizardConfig() {
            for (var scripts = document.getElementsByTagName("script") || [], reg = /lizard\.seed\.(beta\.|beta.src\.|src\.|\b)*js.*$/gi, i = 0; i < scripts.length; i++) {
                var src = scripts[i].getAttribute("src");
                if (src && reg.test(src)) {
                    Lizard.dir = src.replace(reg, ""),
                        Lizard.notpackaged || initLizardExpansions(),
                        src.indexOf("beta") > -1 && (Lizard.uibeta_sandbox = !0);
                    var configStr = scripts[i].getAttribute("pdConfig") || "";
                    if (Lizard.pdConfig = JSON.parse('["' + configStr.split(",").join('","') + '"]'), scripts[i].getAttribute("lizardConfig")) try {
                        eval("Lizard.config = {" + scripts[i].getAttribute("lizardConfig") + "}")

                    } catch(e) {
                        Lizard.config = {}
                    } else Lizard.config = {};
                    break
                }
            }
        }
        function amdLoaderLoaded() {
            var t = Lizard.notpackaged ? [Lizard.dir + "config.js"] : ["config"];
            require(t,
                function() {
                    var t = [];
                    Lizard.isHybrid ? t.push("cHybridAppInit") : Lizard.app.vendor.is("CTRIP") ? (t.push("cHybridAppInit"), t.push("cStatic")) : t.push("cWebAppInit"),
                        Lizard.notpackaged || ((Lizard.app.vendor.is("CTRIP") || Lizard.isHybrid) && t.push("cBaseInit"), define("_",
                        function() {}), define("$",
                        function() {}), define("B",
                        function() {}), define("F",
                        function() {})),
                        require(["B"],
                            function() {
                                Lizard.notpackaged && initLizardExpansions(),
                                    require(t,
                                        function() {
                                            _.isFunction(arguments[arguments.length - 1]) && arguments[arguments.length - 1]()

                                        })
                            })
                })
        }
        function initLizardExpansions() {
            var t = ["appBaseUrl", "webresourceBaseUrl", "restfullApi", "restfullApiHttps", "WebresourcePDBaseUrl"];
            _.each($("meta"),
                function(e) {
                    var i = $(e); (i.attr("lizardExpansion") || _.contains(t, i.attr("name"))) && (Lizard[i.attr("name")] = i.attr("content"))
                })
        }
        function loadRes() {
            var t = [];
            if (Lizard.notpackaged) t = [Lizard.dir + "3rdlibs/require.min.js"];
            else {
                if (!Lizard.app.code.is("MASTER") && !Lizard.app.code.is("YOUTH") && !Lizard.isHybrid) {
                    var e = -1 !== window.location.href.indexOf("debug=1");
                    e && t.push(Lizard.uibeta_sandbox ? Lizard.dir + "lizard.web.beta.js": Lizard.dir + "lizard.web.src.js")
                }
                if (Lizard.isHybrid && !Lizard.notpackaged) {
                    var i = ["ubt/_mubt.min.js", "advertisement/aframe/1.0/aSlider.min.js"],
                        n = Lizard.dir;
                    if (n) {
                        var r = n.substr(0, n.indexOf("lizard/webresource"));
                        i = _.map(i,
                            function(t) {
                                return r + t
                            })
                    }
                    require(i,
                        function() {})
                }
            }
            Lizard.app.vendor.is("CTRIP") || Lizard.isHybrid ? Lizard.mutileLoad = function() {
                mutileLoad(t, amdLoaderLoaded)
            }: mutileLoad(t, amdLoaderLoaded)
        }
        Lizard = "undefined" != typeof Lizard ? Lizard: {
            version: "2.1",
            app: appInfo(),
            isHybrid: !!window.LizardLocalroute,
            isInCtripApp: !(!navigator.userAgent.match(/ctripwireless/i) || "file:" == window.location.protocol),
            viewReady: function(t) {
                Lizard.readyQueue ? Lizard.readyQueue.push(t) : Lizard.readyQueue = [t]

            },
            notpackaged: "undefined" == typeof _
        },
            initLizardConfig(),
            loadRes(),
            window.Lizard = Lizard,
            window.getAppUITemplatePath = function(t) {
                return Lizard.notpackaged ? -1 != ["loadFailed", "h5Loading"].indexOf(t) ? "text!ui/" + t + ".html": "text!" + Lizard.dir + "ui/" + t + ".html": "text!ui/" + t + ".html"
            },
            window.getAppUICssPath = function(t) {
                return Lizard.notpackaged ? "text!" + Lizard.dir + "ui/" + t + ".css": "text!ui/" + t + ".css"

            }
    } (),
    define("seed",
        function() {}),
    define("config", [],
        function() {
            var t,
                e = Lizard.dir + "3rdlibs/zepto",
                i = window.navigator.userAgent.indexOf("IEMobile") > -1;
            i && (t = window.navigator.userAgent.match(/IEMobile\/\d+/), t.length > 0 && (t = t[0].split("/"), t = t[1])),
                (!("__proto__" in {}) || i && 10 > t) && (e = Lizard.dir + "3rdlibs/jquery"),
                require.config({
                    waitSeconds: 20,
                    shim: {
                        $: {
                            exports: "zepto"
                        },
                        _: {
                            exports: "_"
                        },
                        B: {
                            deps: ["_", "$"],
                            exports: "Backbone"
                        },
                        F: {
                            deps: ["$"],
                            exports: "Fastclick"
                        },
                        libs: {
                            deps: ["_", "$", "B"],
                            exports: "libs"
                        },
                        common: {
                            deps: ["libs"]
                        },
                        cAjax: {
                            exports: "cAjax"
                        },
                        UIView: {
                            deps: ["B"],
                            exports: "UIView"
                        },
                        cServiceGuider: {
                            deps: ["_"],
                            exports: "cServiceGuider"
                        }
                    },
                    paths: {
                        json2: Lizard.dir + "3rdlibs/json2",
                        bridge: Lizard.dir + "3rdlibs/bridge",
                        R: Lizard.dir + "3rdlibs/require",
                        $: e,
                        _: Lizard.dir + "3rdlibs/underscore",
                        B: Lizard.dir + "3rdlibs/backbone",
                        F: Lizard.dir + "3rdlibs/fastclick",
                        libs: Lizard.dir + "3rdlibs/libs",
                        text: Lizard.dir + "3rdlibs/require.text",
                        cCoreInherit: Lizard.dir + "common/c.class.inherit",
                        cBusinessCommon: Lizard.dir + "app/c.app.interface",
                        cMessageCenter: Lizard.dir + "common/c.message.center",
                        cAjax: Lizard.dir + "common/c.ajax",
                        cImgLazyload: Lizard.dir + "common/c.img.lazyload",
                        cGeo: Lizard.dir + "common/c.geo",
                        cUtil: Lizard.dir + "util/c.util",
                        cUtilCacheView: Lizard.dir + "util/c.util.cacheview",
                        cUtilCommon: Lizard.dir + "util/c.util.common",
                        cUtilDate: Lizard.dir + "util/c.util.date",
                        cUtilHybrid: Lizard.dir + "util/c.util.hybrid",
                        cUtilObject: Lizard.dir + "util/c.util.object",
                        cUtilPath: Lizard.dir + "util/c.util.path",
                        cUtilPerformance: Lizard.dir + "util/c.util.performance",
                        cUtilValidate: Lizard.dir + "util/c.util.validate",
                        cUtilCryptBase64: Lizard.dir + "util/crypt/c.crypt.base64",
                        cUtilCryptRSA: Lizard.dir + "util/crypt/c.crypt.rsa",
                        cPageParser: Lizard.dir + "app/c.page.parser",
                        cParserUtil: Lizard.dir + "app/c.parser.util",
                        cPageModelProcessor: Lizard.dir + "app/c.page.model.processor",
                        cPageView: Lizard.dir + "page/c.page.view",
                        cPageList: Lizard.dir + "page/c.page.list",
                        cAbstractModel: Lizard.dir + "data/model/c.abstract.model",
                        cModel: Lizard.dir + "data/model/c.model",
                        cUserModel: Lizard.dir + "data/model/c.user.model",
                        cAbstractStore: Lizard.dir + "data/store/c.abstract.store",
                        cLocalStore: Lizard.dir + "data/store/c.local.store",
                        cSessionStore: Lizard.dir + "data/store/c.session.store",
                        cMemoryStore: Lizard.dir + "data/store/c.memory.store",
                        cCommonStore: Lizard.dir + "data/store/c.common.store",
                        cHeadStore: Lizard.dir + "data/store/common/c.head.store",
                        cAuthStore: Lizard.dir + "data/store/common/c.auth.store",
                        cUserStore: Lizard.dir + "data/store/common/c.user.store",
                        cMarketStore: Lizard.dir + "data/store/common/c.market.store",
                        cMobileTokenStore: Lizard.dir + "data/store/common/c.mobiletoken.store",
                        cAbstractStorage: Lizard.dir + "data/storage/c.abstract.storage",
                        cLocalStorage: Lizard.dir + "data/storage/c.local.storage",
                        cCookieStorage: Lizard.dir + "data/storage/c.cookie.storage",
                        cSessionStorage: Lizard.dir + "data/storage/c.session.storage",
                        cMemoryStorage: Lizard.dir + "data/storage/c.memory.storage",
                        cUIInputClear: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/c.ui.input.clear",
                        cUIBase: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/c.ui.base",
                        UIView: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.abstract.view",
                        UILayer: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.layer",
                        UIAlert: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.alert",
                        UIMask: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.mask",
                        UILoadingLayer: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.loading.layer",
                        UIToast: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.toast",
                        UIInlineView: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.inline.view",
                        UINum: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.num",
                        UISwitch: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.switch",
                        UIBubbleLayer: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.bubble.layer",
                        UITab: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.tab",
                        UIScroll: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.scroll",
                        UIScrollLayer: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.scroll.layer",
                        UIRadioList: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.radio.list",
                        UISelect: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.select",
                        UIGroupSelect: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.group.select",
                        UIGroupList: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.group.list",
                        UICalendar: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.calendar",
                        UICalendarCommon: Lizard.dir + "/ui/ui.calendar.common",
                        UISlider: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.slider",
                        UIImageSlider: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.image.slider",
                        UIAdImageSlider: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.ad.image.slider",
                        UIWarning404: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.warning404",
                        UIHeader: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.header",
                        UIIdentitycard: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.identitycard",
                        UILayerList: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.layer.list",
                        UIAnimation: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/c.ui.animation",
                        UIUpload: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.upload",
                        UIPhotoBrowser: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.photo.browser",
                        UIUploadImg: Lizard.dir + (Lizard.uibeta_sandbox ? "ui_beta": "ui") + "/ui.upload.img",
                        loading: Lizard.isHybrid ? Lizard.dir.substr(0, Lizard.dir.indexOf("lizard/webresource")) + "basewidget/res/js/ui.loading": "//webresource.c-ctrip.com/ResCRMOnline/R5/basewidget/ui.loading",
                        loadFailed: Lizard.isHybrid ? Lizard.dir.substr(0, Lizard.dir.indexOf("lizard/webresource")) + "basewidget/res/js/ui.loadFailed": "//webresource.c-ctrip.com/ResCRMOnline/R5/basewidget/ui.loadFailed",
                        cGeoService: Lizard.dir + "service/c.service.geo",
                        cGeoLocation: Lizard.dir + "common/c.geo.location",
                        cMemberService: Lizard.dir + "service/c.service.member",
                        cGuiderService: Lizard.dir + "service/c.service.guider",
                        cQrcodeService: Lizard.dir + "service/c.service.qrcode",
                        cHybridMember: Lizard.dir + "service/hybrid/c.hybrid.memberService",
                        cHybridGuider: Lizard.dir + "service/hybrid/c.hybrid.guider",
                        cHybridGeolocation: Lizard.dir + "service/hybrid/c.hybrid.geolocation",
                        cGeoHelper: Lizard.dir + "service/web/c.geo.helper",
                        cWebMember: Lizard.dir + "service/web/c.web.memberService",
                        cWebGuider: Lizard.dir + "service/web/c.web.guider",
                        cWebGeolocation: Lizard.dir + "service/web/c.web.geolocation",
                        cStatic: Lizard.dir + "app/web/c.web.static",
                        cBaseInit: Lizard.dir + "app/c.base.init",
                        cAbstractApp: Lizard.dir + "app/c.abstract.app",
                        cWebApp: Lizard.dir + "app/web/c.web.app",
                        cPadExtend: Lizard.dir + "app/c.pad.extend",
                        cPadApp: Lizard.dir + "app/web/c.pad.app",
                        cHybridApp: Lizard.dir + "app/hybrid/c.hybrid.app",
                        cWebViewApp: Lizard.dir + "app/hybrid/c.webview.app",
                        cHybridFacade: Lizard.dir + "app/hybrid/c.hybrid.facade",
                        cHybridShell: Lizard.dir + "app/hybrid/c.hybrid.shell",
                        cHybridHeader: Lizard.dir + "app/hybrid/c.hybrid.header",
                        cHybridAppInit: Lizard.dir + "app/hybrid/c.hybrid.init",
                        cWebAppInit: Lizard.dir + "app/web/c.web.init",
                        cJsonPlugin: Lizard.dir + "plugins/c.json.plugin",
                        cMarketPlugin: Lizard.dir + "plugins/c.market.plugin",
                        cSafariPlugin: Lizard.dir + "plugins/c.safari.plugin",
                        cStatisticsPlugin: Lizard.dir + "plugins/c.statistics.plugin",
                        cUnderscorePlugin: Lizard.dir + "plugins/c.underscore.plugin",
                        cZeptoPlugin: Lizard.dir + "plugins/c.zepto.plugin",
                        cSvgPlugin: Lizard.dir + "plugins/c.svg.plugin",
                        cPlugins: Lizard.dir + "plugins/c.plugins",
                        cShell: Lizard.dir + "shell/c.shell",
                        cShell_CTRIP_MASTER: Lizard.dir + "shell/c.shell.ctrip.master",
                        cShell_TECENT_WEIXIN: Lizard.dir + "shell/c.shell.tecent.weixin",
                        AdSlider: Lizard.isHybrid ? Lizard.dir.substr(0, Lizard.dir.indexOf("lizard/webresource")) + "advertisement/aframe/1.0/aSlider.min": "//webresource.c-ctrip.com/ResMarketOnline/R2/js/aFrame/aSlider.min"
                    },
                    map: {
                        "*": {
                            cUtility: "cUtilCommon",
                            cStore: "cLocalStore",
                            cGuider: "cGuiderService",
                            CommonStore: "cCommonStore"
                        }
                    }
                })

        }),
    define("cCoreInherit", ["libs"],
        function() {
            var t = [].slice,
                e = function() {};
            return e.Class = function() {
                function e() {
                    this.__propertys__(),
                        this.initialize.apply(this, arguments)
                }
                if (0 === arguments.length || arguments.length > 2) throw "参数错误";
                var i = null,
                    n = t.call(arguments);
                "function" == typeof n[0] && (i = n.shift()),
                    n = n[0],
                    e.superclass = i,
                    e.subclasses = [];
                var r = function() {},
                    a = n.__propertys__ ||
                        function() {};
                if (i) {
                    i.prototype.__propertys__ && (r = i.prototype.__propertys__);
                    var o = function() {};
                    o.prototype = i.prototype,
                        e.prototype = new o,
                        i.subclasses.push(e)
                }
                var s = e.superclass && e.superclass.prototype,
                    c = function(e, i) {
                        return function() {
                            var n = this,
                                r = [function() {
                                    return s[e].apply(n, arguments)

                                }];
                            return i.apply(this, r.concat(t.call(arguments)))
                        }
                    };
                for (var u in n) {
                    var l = n[u];
                    if (s && "function" == typeof l) {
                        var d = /^\s*function\s*\(([^\(\)]*?)\)\s*?\{/i.exec(l.toString())[1].replace(/\s/i, "").split(",");
                        "$super" === d[0] && s[u] && (l = c(u, l))
                    }
                    e.prototype[u] = l
                }
                e.prototype.initialize || (e.prototype.initialize = function() {}),
                    e.prototype.__propertys__ = function() {
                        r.call(this),
                            a.call(this)

                    };
                for (var h in i) i.hasOwnProperty(h) && "prototype" !== h && "superclass" !== h && (e[h] = i[h]);
                return e.prototype.constructor = e,
                    e
            },
                e.extend = function() {
                    var e = t.call(arguments),
                        i = e.shift() || {};
                    if (!i) return ! 1;
                    for (var n = 0, r = e.length; r > n; n++) if ("object" == typeof e[n]) for (var a in e[n]) i[a] = e[n][a];
                    return i
                },
                e.implement = function(t, e) {
                    if ("function" != typeof t) return ! 1;
                    for (var i in e) t.prototype[i] = e[i];
                    return t
                },
                e
        }),
    define("cMessageCenter", [],
        function() {
            var t = {},
                e = {
                    publish: function(e, i) {
                        t[e] && _.each(t[e],
                            function(t) {
                                t.handler.apply(t.scope ? t.scope: window, i)
                            })
                    },
                    subscribe: function(e, i, n) {
                        t[e] || (t[e] = []),
                            t[e].push({
                                scope: n,
                                handler: i
                            })
                    },
                    unsubscribe: function(e, i) {
                        t[e] && (i ? t[e] = _.reject(t[e],
                            function(t) {
                                return t.handler == i

                            }) : delete t[e])
                    }
                };
            return e
        }),
    define("cUtilPerformance", [],
        function() {
            function t() {
                this.performance = {},
                    this.isapp = Lizard.isHybrid ? "1": "0",
                    this.defaults = {
                        Domready: {
                            name: "JS.Lizard.Domready",
                            tags: {}
                        },
                        Onload: {
                            name: "JS.Lizard.Onload",
                            tags: {}
                        },
                        AjaxReady: {
                            name: "JS.Lizard.AjaxReady",
                            tags: {
                                url: "",
                                status: ""
                            }
                        },
                        AjaxMessageSize: {
                            name: "JS.Lizard.AjaxMessageSize",
                            tags: {
                                url: ""
                            }
                        },
                        TemplateRender: {
                            name: "JS.Lizard.TemplateRender",
                            tags: {
                                url: ""
                            }
                        },
                        GeoRequest: {
                            name: "JS.Lizard.GeoRequest",
                            tags: {
                                url: "",
                                errno: "0"
                            }
                        }
                    },
                    this.uuid = 0

            }
            return window.__bfi || (window.__bfi = []),
                t.prototype = {
                    send: function(t, e, i, n) {
                        var r = ["_trackMatrix", t, e, i, n]; ("JS.Lizard.GeoRequest" != t || "string" == typeof e.url && e.url.match(/^(Native|Web) function (number|detail|error)$/)) && window.__bfi.push(r)
                    },
                    getTime: function() {
                        return (new Date).getTime()
                    },
                    initOptions: function(t) {
                        t.version = Lizard.version,
                            t.isapp = this.isapp,
                            t.network = Lizard.networkType || "unknown"

                    },
                    log: function(t, e) {
                        t.url && _.isString(t.url) && (t.url.indexOf("_fxpcqlniredt") > -1 && (t.url = t.url.substring(0, t.url.indexOf("_fxpcqlniredt") - 1)), t.url = t.url.replace(new RegExp(( + new Date + "").slice(0, 8) + "\\d{5}"), "__TIME__"));
                        var i = this.defaults[t.name],
                            n = {};
                        this.initOptions(n);
                        for (var r in i.tags) n[r] = (t[r] || i.tags[r]) + "";
                        "AjaxMessageSize" != t.name && (n.distribution = this.distribution(e)),
                            this.send(i.name, n, e, this.getTime())
                    },
                    group: function(t, e) {
                        e.startTime = this.getTime(),
                            this.performance[t] = e
                    },
                    groupTag: function(t, e, i) {
                        var n = this.performance[t];
                        return n || (this.performance[t] = n = {}),
                            3 == arguments.length && (n[e] = i),
                            n[e]
                    },
                    groupEnd: function(t) {
                        var e = this.performance[t] || {};
                        this.log(e, this.getTime() - e.startTime)
                    },
                    getUuid: function() {
                        return "Performance_" + ++this.uuid
                    },
                    distribution: function(t) {
                        var e = "";
                        return t >= 0 & 500 >= t ? e = "[0,500]": t >= 501 & 1e3 >= t ? e = "[501,1000]": t >= 1001 & 2e3 >= t ? e = "[1001,2000]": t >= 2001 & 3e3 >= t ? e = "[2001,3000]": t >= 3001 & 4e3 >= t ? e = "[3001,4000]": t >= 4001 && (e = "[4001,--]"),
                            e + "(ms)"

                    }
                },
                new t
        }),
    define("cAjax", ["libs", "cUtilPerformance"],
        function(t, e) {
            function i(t, e, i, n, r) {
                var a = c(t, e, i, n);
                return a.type = "GET",
                    a.timeout = r,
                    s(a)
            }
            function n(t, e, i, n, r) {
                var a = e.contentType;
                e = JSON.stringify(e);
                var o = c(t, e, i, n);
                return o.type = "POST",
                    o.dataType = "json",
                    o.timeout = r,
                    o.contentType = l(a) || "application/json",
                    s(o)

            }
            function r(t, e, i, n, r) {
                var a = c(t, e, i, n);
                return a.type = "GET",
                    a.dataType = "jsonp",
                    a.crossDomain = !0,
                    a.timeout = r,
                    s(a)
            }
            function a(t, e, i, n, r, a) {
                var o = i.contentType;
                "get" !== e.toLowerCase() && (i = JSON.stringify(i));
                var u = c(t, i, n, r);
                return u.type = e,
                    u.dataType = "json",
                    u.crossDomain = !0,
                    u.data = i,
                    u.contentType = l(o) || "application/json",
                    u.timeout = a,
                    s(u)

            }
            function o(t, e, i, n) {
                var r = null,
                    a = "";
                r = $("string" == typeof e ? "#" + e: e),
                    r && r.length > 0 && (a = r.serialize());
                var o = c(t, a, i, n);
                return s(o)
            }
            function s(t) {
                var i = e.getUuid();
                e.group(i, {
                    name: "AjaxReady",
                    url: t.url,
                    data: t.data
                });
                var n = 0,
                    r = {
                        url: t.url,
                        type: t.type,
                        dataType: t.dataType,
                        data: t.data,
                        contentType: t.contentType,
                        timeout: t.timeout || Lizard.timeout || 5e4,
                        beforeSend: function(t) {
                            t.onprogress = function(t) {
                                n = t.loaded ? t.loaded: t.position

                            }
                        },
                        success: function(r) {
                            e.log({
                                    name: "AjaxMessageSize",
                                    url: t.url
                                },
                                n),
                                e.performance[i].status = "success",
                                e.groupEnd(i),
                                t.callback(r)
                        },
                        error: function(n) {
                            e.performance[i].status = "fail",
                                e.groupEnd(i),
                                t.error && t.error(n)
                        }
                    };
                return - 1 === t.url.indexOf(window.location.host) && (r.crossDomain = !!t.crossDomain),
                    $.ajax(r)

            }
            function c(t, e, i, n) {
                return {
                    url: t,
                    data: e,
                    callback: i,
                    error: n
                }
            }
            var u = {
                    json: "application/json",
                    jsonp: "application/json"
                },
                l = function(t) {
                    return t && (t = u[t] ? u[t] : t),
                        t
                };
            return {
                get: i,
                post: n,
                jsonp: r,
                cros: a,
                form: o
            }
        }),
    define("cImgLazyload", ["libs", "cMessageCenter"],
        function(t, e) {
            var i = _.inherit({
                __propertys__: function() {
                    this.isError = !1,
                        this.uuid = _.uniqueId() + (new Date).getTime()

                },
                initialize: function(t) {
                    this.__propertys__(),
                        this.handleOpts(t),
                        this.isNoTop ? this.checkWrapperDisplay() : this.init()
                },
                checkWrapperDisplay: function() {
                    if (!this.isError && (this.TIMERRES && clearInterval(this.TIMERRES), 0 === $(this.imgs[0]).offset().width)) {
                        this.isError = !0;
                        var t = 0;
                        this.TIMERRES = setInterval($.proxy(function() {
                                t++,
                                    ($(this.imgs[0]).offset().width > 0 || t >= 10) && (this.TIMERRES && clearInterval(this.TIMERRES), this.isError = !1, this.refresh())

                            },
                            this), 100)
                    }
                },
                handleOpts: function(t) {
                    return this.isError = !1,
                            t && t.imgs && t.imgs.length ? (this.imgs = t.imgs, this.container = t.container || $(window), this.width = t.width, this.height = t.height, this.loadingImg = t.loadingImg || "http://pic.c-ctrip.com/vacation_v2/h5/group_travel/no_product_pic.png", this.loadingBg = t.loadingBg || "#ebebeb", this.needWrapper = !1, (this.width || this.height) && (this.needWrapper = !0), this.wrapper = t.wrapper || '<div class="cui_lazyload_wrapper" style="text-align: center; vertical-align: middle; "></div>', this.imgContainer = {},
                        void(this.isNoTop = 0 === $(this.imgs[0]).offset().width)) : void(this.isError = !0)

                },
                init: function() {
                    this.isError || (this.initImgContainer(), this.lazyLoad(), this.bindEvents())
                },
                refresh: function(t) {
                    t && this.handleOpts(t),
                        this.init()
                },
                bindEvents: function() {
                    if (!this.isError) {
                        this.destroy();
                        var t;
                        this.container.on("scroll.imglazyload" + this.uuid, $.proxy(function() {
                                t && clearTimeout(t),
                                    t = setTimeout($.proxy(function() {
                                            t && clearTimeout(t),
                                                this.lazyLoad()

                                        },
                                        this), 300)
                            },
                            this)),
                            $(window).on("resize.imglazyload" + this.uuid, $.proxy(function() {
                                    this.initImgContainer()
                                },
                                this)),
                            e.subscribe("image.lazyloaded", this.fixOffset, this)
                    }
                },
                initImgContainer: function() {
                    if (!this.isError) {
                        var t,
                            e,
                            i,
                            n;
                        for (e = 0, i = this.imgs.length; i > e; e++) t = $(this.imgs[e]),
                            t.attr("data-src") && "1" != t.attr("data-load") && (n = t.offset(), this.imgContainer[n.top] || (this.imgContainer[n.top] = []), this.imgContainer[n.top].push(t))

                    }
                },
                _handleImg: function(t) {
                    var i,
                        n,
                        r = this;
                    t.attr("data-src") && (this.needWrapper && (n = $(this.wrapper), n.css({
                        width: this.width + "px",
                        height: this.height + "px",
                        "background-color": this.loadingBg
                    }), n.insertBefore(t), n.append(t)), i = $(new Image), t.attr("src") || t.attr("src", this.loadingImg), i.on("error",
                        function() {
                            t.attr("src", r.loadingImg),
                                e.publish("image.lazyloaded", [r.uuid])

                        }).on("load",
                        function() {
                            t.attr("src", t.attr("data-src")),
                                t.attr("data-load", "1"),
                                setTimeout(function() {
                                        n && n[0] && (t.insertBefore(n), n.remove()),
                                            e.publish("image.lazyloaded", [r.uuid])
                                    },
                                    1)
                        }).attr("src", t.attr("data-src")))
                },
                lazyLoad: function() {
                    if (!this.isError) {
                        var t;
                        if (this.container[0] === window) t = this.container.height();
                        else {
                            var e = this.container.offset();
                            t = e.top + e.height
                        }
                        var i,
                            n,
                            r,
                            a,
                            o,
                            s = this.container.scrollTop();
                        for (i in this.imgContainer) if (parseInt(i, 10) >= s && parseInt(i, 10) < s + t) {
                            for (n = this.imgContainer[i], a = 0, o = n.length; o > a; a++) r = $(n[a]),
                                this._handleImg(r);
                            delete this.imgContainer[i]
                        }
                    }
                },
                destroy: function() {
                    this.isError || (this.TIMERRES && clearInterval(this.TIMERRES), this.container.off(".imglazyload" + this.uuid), $(window).off(".imglazyload" + this.uuid))

                },
                fixOffset: function(t) {
                    if (this.uuid != t && _.size(this.imgContainer) > 0) {
                        var e = _.keys(this.imgContainer).join("|");
                        this.imgContainer = {},
                            this.initImgContainer(),
                            e != _.keys(this.imgContainer).join("|") && this.lazyLoad()
                    }
                }
            });
            return i
        }),
    define("cUtilDate", ["cCoreInherit"],
        function(t) {
            var e = new t.Class({
                initialize: function(t) {
                    t = t || new Date,
                        this.date = new Date(t)

                },
                addDay: function(t) {
                    return t = t || 0,
                        this.date.setDate(this.date.getDate() + t),
                        this
                },
                addMonth: function(t) {
                    return t = t || 0,
                        this.date.setMonth(this.date.getMonth() + t),
                        this
                },
                addHours: function(t) {
                    return t = t || 0,
                        this.date.setHours(this.date.getHours() + t),
                        this
                },
                addMinutes: function(t) {
                    return t = t || 0,
                        this.date.setMinutes(this.date.getMinutes() + t),
                        this

                },
                addSeconds: function(t) {
                    return t = t || 0,
                        this.date.setSeconds(this.date.getSeconds() + t),
                        this
                },
                addYear: function(t) {
                    return t = t || 0,
                        this.date.setYear(this.date.getFullYear() + t),
                        this
                },
                setHours: function() {
                    return this.date.setHours.apply(this.date, arguments),
                        this
                },
                valueOf: function() {
                    return this.date
                },
                getTime: function() {
                    return this.date.valueOf()

                },
                toString: function() {
                    return this.date.toString()
                },
                format: function(t) {
                    "string" != typeof t && (t = "");
                    for (var e in this._MAPS) t = this._MAPS[e].call(this, t, this.date, e);
                    return t
                },
                diffMonth: function(t) {
                    var i = parseInt(this.format("Y"), 10),
                        n = parseInt(this.format("m"), 10),
                        r = new e(t),
                        a = parseInt(r.format("Y"), 10),
                        o = parseInt(r.format("m"), 10);
                    return 12 * (a - i) + (o - n)
                },
                _DAY1: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                _DAY2: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                _MAPS: {
                    d: function(t, e, i) {
                        var n = e.getDate().toString();
                        return n.length < 2 && (n = "0" + n),
                            t.replace(new RegExp(i, "mg"), n)
                    },
                    j: function(t, e, i) {
                        return t.replace(new RegExp(i, "mg"), e.getDate())
                    },
                    N: function(t, e, i) {
                        var n = e.getDay();
                        return 0 === n && (n = 7),
                            t.replace(new RegExp(i, "mg"), n)
                    },
                    w: function(t, e, i) {
                        var n = e.getDay(),
                            r = this._DAY1[n];
                        return t.replace(new RegExp(i, "mg"), r)
                    },
                    W: function(t, e, i) {
                        var n = e.getDay(),
                            r = this._DAY2[n];
                        return t.replace(new RegExp(i, "mg"), r)
                    },
                    m: function(t, e, i) {
                        var n = (e.getMonth() + 1).toString();
                        return n.length < 2 && (n = "0" + n),
                            t.replace(new RegExp(i, "mg"), n)

                    },
                    n: function(t, e, i) {
                        return t.replace(i, e.getMonth() + 1)
                    },
                    Y: function(t, e, i) {
                        return t.replace(new RegExp(i, "mg"), e.getFullYear())
                    },
                    y: function(t, e, i) {
                        return t.replace(new RegExp(i, "mg"), e.getYear())
                    },
                    g: function(t, e, i) {
                        var n = e.getHours();
                        return n >= 12 && (n -= 12),
                            t.replace(new RegExp(i, "mg"), n)
                    },
                    G: function(t, e, i) {
                        return t.replace(new RegExp(i, "mg"), e.getHours())

                    },
                    h: function(t, e, i) {
                        var n = e.getHours();
                        return n >= 12 && (n -= 12),
                            n += "",
                            n.length < 2 && (n = "0" + n),
                            t.replace(new RegExp(i, "mg"), n)
                    },
                    H: function(t, e, i) {
                        var n = e.getHours().toString();
                        return n.length < 2 && (n = "0" + n),
                            t.replace(new RegExp(i, "mg"), n)
                    },
                    i: function(t, e, i) {
                        var n = e.getMinutes().toString();
                        return n.length < 2 && (n = "0" + n),
                            t.replace(new RegExp(i, "mg"), n)

                    },
                    s: function(t, e, i) {
                        var n = e.getSeconds().toString();
                        return n.length < 2 && (n = "0" + n),
                            t.replace(new RegExp(i, "mg"), n)
                    },
                    I: function(t, e, i) {
                        var n = e.getMinutes().toString();
                        return t.replace(new RegExp(i, "mg"), n)
                    },
                    S: function(t, e, i) {
                        var n = e.getSeconds().toString();
                        return t.replace(new RegExp(i, "mg"), n)
                    },
                    D: function(t, i, n) {
                        var r = e.getServerDate();
                        r.setHours(0, 0, 0, 0),
                            i = new Date(i.valueOf()),
                            i.setHours(0, 0, 0, 0);
                        var a = 864e5,
                            o = "",
                            s = i - r;
                        return s >= 0 && (a > s ? o = "今天": 2 * a > s ? o = "明天": 3 * a > s && (o = "后天")),
                            t.replace(new RegExp(n, "mg"), o)
                    }
                }
            });
            return t.extend(e, {
                parse: function(t, i) {
                    if ("undefined" == typeof t) return new Date;
                    if ("string" == typeof t) {
                        t = t || "";
                        var n = /^(\d{4})\-?(\d{1,2})\-?(\d{1,2})/i;
                        t.match(n) && (t = t.replace(n, "$2/$3/$1"));
                        var r = Date.parse(t),
                            a = new Date(r || new Date);
                        return i ? a: new e(a)
                    }
                    return "number" == typeof t ? new Date(t) : new Date
                },
                getHM: function(t) {
                    var e = this._getDate(t),
                        i = e.getHours(),
                        n = e.getMinutes();
                    return (10 > i ? "0" + i: "" + i) + ":" + (10 > n ? "0" + n: "" + n)
                },
                getIntervalDay: function(t, e) {
                    var i = this._getDate(t),
                        n = this._getDate(e);
                    return i.setHours(0, 0, 0, 0),
                        n.setHours(0, 0, 0, 0),
                        parseInt((n - i) / 864e5)
                },
                m2H: function(t) {
                    var e = Math.floor(t / 60),
                        i = t % 60;
                    return (e > 0 ? e + "小时": "") + (i > 0 ? i + "分钟": "")
                },
                _getDate: function(t) {
                    var i = e.parse(t, !0),
                        n = new Date;
                    return n.setTime(i),
                        n
                },
                format: function(t, i) {
                    return new e(t).format(i)
                },
                weekday: function(t) {
                    var e = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                        i = new Date(t);
                    return e[i.getDay()]
                },
                diffMonth: function(t, i) {
                    return t = new e(t),
                        t.diffMonth(i)
                },
                getServerDate: function(t) {
                    var e = new Date,
                        i = function(e) {
                            return "function" == typeof t ? t(e) : e
                        },
                        n = function() {
                            var t = window.localStorage.getItem("SERVERDATE");
                            if (!t) return i(e);
                            try {
                                if (t = JSON.parse(t), t && t.server && t.local) {
                                    var n = window.parseInt(t.server),
                                        r = window.parseInt(t.local),
                                        a = (new Date).getTime(),
                                        o = new Date(n + a - r);
                                    return i(o)
                                }
                                return i(e)
                            } catch(s) {
                                return i(e)
                            }
                        },
                        r = function() {
                            if ("undefined" == typeof __SERVERDATE__ || !__SERVERDATE__.server) return i(e);
                            var t = new Date(__SERVERDATE__.server.valueOf() + ((new Date).valueOf() - __SERVERDATE__.local.valueOf()));
                            return i(t)
                        };
                    return Lizard.isHybrid ? n() : r()
                }
            }),
                e
        }),
    define("cUtilObject", [],
        function() {
            var t = {};
            return t.set = function(t, e, i) {
                if (!e) return null;
                var n = e.split(".");
                t = t || {};
                for (var r = 0, a = n.length, o = Math.max(a - 1, 0); a > r; r++) o > r ? t = t[n[r]] = t[n[r]] || {}: t[n[r]] = i;
                return t
            },
                t.get = function(t, e) {
                    if (!t || !e) return null;
                    var i = e.split(".");
                    t = t || {};
                    var n = 0,
                        r = i.length;
                    for (Math.max(r - 1, 0); r > n; n++) if (t = t[i[n]], null === t || "undefined" == typeof t) return null;
                    return t
                },
                t
        }),
    define("cAbstractStore", ["cCoreInherit", "cUtilDate", "cUtilObject"],
        function(t, e, i) {
            var n = i,
                r = new t.Class({
                    __propertys__: function() {
                        this.NULL = {},
                            this.key = this.NULL,
                            this.lifeTime = "30M",
                            this.useServerTime = !1,
                            this.defaultData = null,
                            this.sProxy = this.NULL,
                            this.userData = !1,
                            this.rollbackEnabled = !1

                    },
                    initialize: function(t) {
                        for (var e in t) this[e] = t[e];
                        this.assert()
                    },
                    assert: function() {
                        if (this.key === this.NULL) throw "not override key property"
                    },
                    set: function(t, i, n) {
                        var r = this._getNowTime(),
                            a = new e(this.getExpireTime());
                        r.addSeconds(this._getLifeTime());
                        var o = a.getTime();
                        r.getTime() < o && (r = a),
                            this.rollbackEnabled && !n && (n = t),
                            this.sProxy.set(this.key, t, r, i, null, n)

                    },
                    setAttr: function(t, e, i) {
                        if (!_.isObject(t)) {
                            i = i || this.getTag();
                            var r = this.get(i) || {},
                                a = {};
                            if (r) {
                                if (this.rollbackEnabled) {
                                    a = this.get(i, !0);
                                    var o = n.get(r, t);
                                    n.set(a, t, o)
                                }
                                return n.set(r, t, e),
                                    this.set(r, i, a)
                            }
                            return ! 1
                        }
                        for (var s in t) t.hasOwnProperty(s) && this.setAttr(s, t[s], e)
                    },
                    setLifeTime: function(t, i) {
                        this.lifeTime = t;
                        var n,
                            r = this.getTag(),
                            a = this.get();
                        n = i ? this._getNowTime() : this.sProxy.getSaveDate(this.key, !0) || this._getNowTime();
                        var o = new e(n.valueOf()).format("Y/m/d H:i:s");
                        n.addSeconds(this._getLifeTime()),
                            this.sProxy.set(this.key, a, n, r, o)
                    },
                    get: function(e, i) {
                        var n = null,
                            r = !0;
                        "[object Array]" === Object.prototype.toString.call(this.defaultData) ? n = this.defaultData.slice(0) : this.defaultData && (n = $.extend(!0, {},
                            this.defaultData));
                        var a = this.sProxy.get(this.key, e, i),
                            o = typeof a;
                        if ({
                            string: !0,
                            number: !0,
                            "boolean": !0
                        } [o]) return a;
                        if (a) if ("[object Array]" == Object.prototype.toString.call(a)) {
                            n = [];
                            for (var s = 0, c = a.length; c > s; s++) n[s] = a[s]
                        } else a && !n && (n = {}),
                            t.extend(n, a);
                        for (var u in n) {
                            r = !1;
                            break
                        }
                        return r ? null: n
                    },
                    getAttr: function(t, e) {
                        var i = this.get(e),
                            r = null;
                        return i && (r = n.get(i, t)),
                            r
                    },
                    getTag: function() {
                        return this.sProxy.getTag(this.key)
                    },
                    remove: function() {
                        this.sProxy.remove(this.key)
                    },
                    removeAttr: function(t) {
                        var e = this.get() || {};
                        e[t] && delete e[t],
                            this.set(e)
                    },
                    getExpireTime: function() {
                        var t = null;
                        try {
                            t = this.sProxy.getExpireTime(this.key)
                        } catch(e) {
                            console
                        }
                        return t

                    },
                    setExpireTime: function(t) {
                        var i = this.get(),
                            n = e.parse(t);
                        this.sProxy.set(this.key, i, n)
                    },
                    _getNowTime: function() {
                        return this.useServerTime ? new e(e.getServerDate()) : new e
                    },
                    _getLifeTime: function() {
                        var t = 0,
                            e = this.lifeTime + "",
                            i = e.charAt(e.length - 1),
                            n = +e.substring(0, e.length - 1);
                        return i = "number" == typeof i ? "M": i.toUpperCase(),
                            t = "D" == i ? 24 * n * 60 * 60: "H" == i ? 60 * n * 60: "M" == i ? 60 * n: "S" == i ? n: 60 * n

                    },
                    rollback: function(t) {
                        if (this.rollbackEnabled) {
                            var e = this.getTag(),
                                i = this.sProxy.get(this.key, e),
                                n = this.sProxy.get(this.key, e, !0);
                            if (t && t instanceof Array) for (var r in t) {
                                var a = t[r],
                                    o = n[a];
                                "undefined" != typeof o && (i[a] = o)
                            } else i = n,
                                n = {};
                            this.set(i, e, n)
                        }
                    }
                });
            return r.getInstance = function() {
                return this.instance ? this.instance: this.instance = new this

            },
                r
        }),
    define("cAbstractStorage", ["cUtilDate", "cCoreInherit"],
        function(t, e) {
            var i = window.JSON,
                n = new e.Class({
                    __propertys__: function() {
                        this.proxy = null,
                            this.overdueClearKey = "C_CLEAR_OVERDUE_CATCH"
                    },
                    initialize: function() {},
                    removeOverdueCathch: function() {
                        var e = (new t).getTime(),
                            i = this.proxy.getItem(this.overdueClearKey),
                            n = [],
                            r = [];
                        if (i) {
                            n = JSON.parse(i);
                            for (var a, o = 0; o < n.length; o++) a = n[o],
                                    new Date(a.timeout).getTime() <= e ? this.proxy.removeItem(a.key) : r.push(a);
                            this.proxy.setItem(this.overdueClearKey, JSON.stringify(r))
                        }
                    },
                    _removeOdCLately: function(t) {
                        t = t || 5;
                        var e = this.proxy.getItem(this.overdueClearKey),
                            i = [];
                        if (e) {
                            i = JSON.parse(e),
                                i.sort(function(t, e) {
                                    var i = new Date(t.timeout).getTime(),
                                        n = new Date(e.timeout).getTime();
                                    return i - n
                                });
                            for (var n = i.splice(0, t) || [], r = 0; r < n.length; r++) this.proxy.removeItem(n[r].key);
                            this.proxy.removeItem(this.overdueClearKey),
                                i.length > 0 && this.proxy.setItem(this.overdueClearKey, JSON.stringify(i))
                        }
                    },
                    _setOverdueCathch: function(e, i) {
                        if (e && i && !(t.parse(i, !0) < new Date)) {
                            var n = {},
                                r = [],
                                a = this.proxy.getItem(this.overdueClearKey);
                            n.key = e,
                                n.timeout = i,
                                a && (r = JSON.parse(a));
                            for (var o, s = !1, c = 0; c < r.length; c++) o = r[c],
                                o.key == e && (r[c] = n, s = !0);
                            s || r.push(n),
                                this.proxy.setItem(this.overdueClearKey, JSON.stringify(r))
                        }
                    },
                    _buildStorageObj: function(t, e, i, n, r) {
                        var a = {
                            value: t,
                            timeout: e,
                            tag: i,
                            savedate: n
                        };
                        return r && (a.oldvalue = r),
                            a
                    },
                    set: function(e, n, r, a, o, s) {
                        o = o || (new t).format("Y/m/d H:i:s"),
                            r = r ? new t(r) : (new t).addDay(30);
                        var c = r.format("Y/m/d H:i:s");
                        this._setOverdueCathch(e, c);
                        var u = this._buildStorageObj(n, c, a, o, s);
                        try {
                            return this.proxy.setItem(e, i.stringify(u)),
                                !0
                        } catch(l) {
                            "QuotaExceededError" == l.name && (this._removeOdCLately(), this.set(e, n, r, a, o, s)),
                                console
                        }
                        return ! 1
                    },
                    get: function(e, n, r) {
                        var a,
                            o = null;
                        try {
                            a = this.proxy.getItem(e),
                                a && (a = i.parse(a), t.parse(a.timeout, !0) >= new Date && (n ? n === a.tag && (o = r ? a.oldvalue: a.value) : o = r ? a.oldvalue: a.value))

                        } catch(s) {
                            console
                        }
                        return o
                    },
                    getTag: function(t) {
                        var e,
                            n = null;
                        try {
                            e = this.proxy.getItem(t),
                                e && (e = i.parse(e), n = e && e.tag)
                        } catch(r) {
                            console
                        }
                        return n
                    },
                    getSaveDate: function(e, n) {
                        var r,
                            a = null;
                        try {
                            r = this.proxy.getItem(e),
                                r && (r = i.parse(r), r.savedate && (a = t.parse(r.savedate), n || (a = a.valueOf())))
                        } catch(o) {
                            console
                        }
                        return a

                    },
                    getExpireTime: function(t) {
                        var e = null,
                            n = null;
                        try {
                            e = this.proxy.getItem(t),
                                e && (e = i.parse(e), n = Date.parse(e.timeout))
                        } catch(r) {
                            console
                        }
                        return n
                    },
                    remove: function(t) {
                        return this.proxy.removeItem(t)
                    },
                    getAll: function() {
                        for (var t = this.proxy.length, e = [], i = 0; t > i; i++) {
                            var n = this.proxy.key(i),
                                r = {
                                    key: n,
                                    value: this.get(n)
                                };
                            e.push(r)
                        }
                        return e
                    },
                    clear: function() {
                        this.proxy.clear()
                    },
                    gc: function() {
                        for (var t = this.proxy, e = this.proxy.length, i = 0; e > i; i++) {
                            var n = t.key(i);
                            if ("GUID" == n) break;
                            try {
                                this.get(n) || this.remove(n)
                            } catch(r) {}
                        }
                    }
                });
            return n
        }),
    define("cLocalStorage", ["cCoreInherit", "cUtilDate", "cAbstractStorage"],
        function(t, e, i) {
            var n = new t.Class(i, {
                __propertys__: function() {},
                initialize: function($super, t) {
                    this.proxy = window.localStorage,
                        $super(t)

                },
                oldGet: function(t) {
                    var i = localStorage.getItem(t),
                        n = i ? JSON.parse(i) : null;
                    if (n && n.timeout) {
                        var r = new Date,
                            a = e.parse(n.timeout).valueOf();
                        if (n.timeby) {
                            if (a - r >= 0) return n
                        } else if (a - e.parse(e.format(r, "Y-m-d")).valueOf() >= 0) return n;
                        return localStorage.removeItem(t),
                            null
                    }
                    return n
                },
                oldSet: function(t, e) {
                    localStorage.setItem(t, e)

                },
                getExpireTime: function(t) {
                    var i = localStorage.getItem(t),
                        n = i ? JSON.parse(i) : null;
                    return n && n.timeout ? n.timeout: new e(e.getServerDate()).format("Y-m-d")
                },
                oldRemove: function(t) {
                    localStorage.removeItem(t)
                }
            });
            return n.getInstance = function() {
                return this.instance ? this.instance: this.instance = new this
            },
                n.localStorage = n.getInstance(),
                n

        }),
    define("cUtilCommon", ["cUtilDate"],
        function(t) {
            var e = {};
            return e.Date = t,
                e.getServerDate = t.getServerDate,
                e.isInApp = Lizard.isHybrid,
                e.isSupportPushState = function() {
                    return Lizard.isHybrid ? !1: !!(window.history && window.history.pushState && window.history.replaceState)
                } (),
                e.isPrivateModel = function() {
                    var t = "TEST_PRIVATE_MODEL",
                        e = window.localStorage;
                    try {
                        e.setItem(t, 1),
                            e.removeItem(t)
                    } catch(i) {
                        return ! 0
                    }
                    return ! 1
                } (),
                e.isExternalLink = function(t) {
                    var e = new RegExp(/^mailto:|^tel:|^javascript:/);
                    return e.test(t)
                },
                e.weakUpApp = function(t) {
                    var i = document.createElement("iframe");
                    i.height = 1,
                        i.width = 1,
                        i.frameBorder = 0,
                        i.style.position = "absolute",
                        i.style.left = "-9999px",
                        i.style.top = "-9999px",
                        document.body.appendChild(i),
                        e.weakUpApp = function(t) {
                            i.src = t

                        },
                        e.weakUpApp(t)
                },
                e.createGuid = function() {
                    function t() {
                        return (65536 * (1 + Math.random()) | 0).toString(16).substring(4)
                    }
                    function e() {
                        for (var e = "", i = 1; 20 >= i; i++) e += t(),
                            (8 === i || 12 === i || 16 === i || 20 === i) && (e += "-");
                        var n = parseInt(8 * Math.random()),
                            r = (new Date).getTime() + "";
                        e += r.slice(0, n);
                        for (var a = 0; 4 > a; a++) e += t();
                        return e += r.slice(n + 5, 13)
                    }
                    return e()
                },
                e.getGuid = function() {
                    var t = e.getCookie("GUID"),
                        i = window.localStorage;
                    if (t) try {
                        i.setItem("GUID", t)
                    } catch(n) {} else t = i.getItem("GUID") || "";
                    return t
                },
                e.getCookie = function(t) {
                    var e = document.cookie,
                        i = "";
                    if (e) for (var n, r, a = e.split("; "), o = 0; o < a.length; o++) n = a[o],
                        r = n.indexOf("="),
                        n.substr(0, r) == t && (i = n.substr(r + 1));
                    return i
                },
                e.isAndroid = function() {
                    return $.os.android
                } (),
                e.isIphone = function() {
                    return $.os.iphone
                } (),
                e.isIpad = function() {
                    return $.os.ipad
                } (),
                e.isWPhone = function() {
                    return window.navigator.userAgent.indexOf("Windows Phone") > 1
                } (),
                e.isUrl = function(t) {
                    return /^http(s)?:\/\/[A-Za-z0-9\-]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\:+!]*([^<>])*$/.test(t)

                },
                e
        }),
    define("cMemoryStorage", ["cCoreInherit", "cUtilDate", "cAbstractStorage", "cUtilCommon"],
        function(t, e, i, n) {
            var r = window.location.host,
                a = {},
                o = {
                    dataMap: {},
                    setItem: function(t, e) {
                        o.dataMap[t] = e,
                            o.reSetName()
                    },
                    getItem: function(t) {
                        if (_.isEmpty(o.dataMap)) try {
                            var e = JSON.parse(window.name)[r];
                            _.isObject(e) && (o.dataMap = e)

                        } catch(i) {}
                        return o.dataMap[t]
                    },
                    removeItem: function(t) {
                        delete o.dataMap[t],
                            o.reSetName()
                    },
                    clear: function() {
                        o.dataMap = {},
                            o.reSetName()
                    },
                    reSetName: function() {
                        n.isPrivateModel && (a[r] = o.dataMap, window.name = JSON.stringify(a))
                    }
                },
                s = new t.Class(i, {
                    __propertys__: function() {},
                    initialize: function($super, t) {
                        this.proxy = o,
                            $super(t)

                    }
                });
            return s.getInstance = function() {
                return this.instance ? this.instance: this.instance = new this
            },
                s
        }),
    define("cLocalStore", ["cCoreInherit", "cAbstractStore", "cLocalStorage", "cMemoryStorage", "cUtilCommon"],
        function(t, e, i, n, r) {
            var a = new t.Class(e, {
                __propertys__: function() {
                    this.sProxy = r.isPrivateModel ? n.getInstance() : i.getInstance()

                },
                initialize: function($super, t) {
                    $super(t)
                }
            });
            return a
        }),
    define("cHeadStore", ["cCoreInherit", "cLocalStore", "cUtilCommon"],
        function(t, e, i) {
            var n = new t.Class(e, {
                __propertys__: function() {
                    this.key = "HEADSTORE",
                        this.lifeTime = "15D",
                        this.defaultData = {
                            cid: i.getGuid(),
                            ctok: "",
                            cver: "1.0",
                            lang: "01",
                            sid: "8888",
                            syscode: "09",
                            auth: ""
                        },
                        this.defaultKeys = ["cid", "ctok", "cver", "lang", "sid", "syscode", "auth", "pauth", "sauth"]

                },
                initialize: function($super, t) {
                    $super(t)
                },
                setAuth: function(t) {
                    this.setAttr("auth", t)
                }
            });
            return n
        }),
    define("cAuthStore", ["cCoreInherit", "cLocalStore"],
        function(t, e) {
            var i = new t.Class(e, {
                __propertys__: function() {
                    this.key = "AUTHSTORE",
                        this.lifeTime = "7D"
                },
                initialize: function($super, t) {
                    $super(t)
                }
            });
            return i

        }),
    define("cUserStore", ["cCoreInherit", "cLocalStore", "cLocalStorage", "cUtilCommon", "cHeadStore", "cAuthStore"],
        function(t, e, i, n, r, a) {
            var o = i.localStorage,
                s = new t.Class(e, {
                    __propertys__: function() {
                        this.key = "USER",
                            this.lifeTime = "30D"
                    },
                    initialize: function($super, t) {
                        $super(t)
                    },
                    getUser: function(t) {
                        if (!_.isFunction(t)) {
                            var e = o.oldGet("USERINFO");
                            return e = e && e.data || null,
                                e && this.set(e),
                                e || this.get()
                        }
                        var i = this;
                        require(["cUserModel"],
                            function(e) {
                                var r = function(e) {
                                        e.UserID && (e.LoginName = e.LoginName || "", e.ResponseStatus && (delete e.ResponseStatus, delete e.Result), e.Auth = e.Auth ? e.Auth: o, i.setUser(e), "Invalid Date" != new Date(e.ExpiredTime) && i.setExpireTime(e.ExpiredTime)),
                                            t(i.getUser())

                                    },
                                    a = function() {
                                        t(i.getUser())
                                    },
                                    o = n.getCookie("authkey");
                                if (o) {
                                    i.setAuth(o);
                                    var s = e.GetUserModel.getInstance();
                                    s.param = {
                                        Auth: o
                                    },
                                        s.checkAuth = !1,
                                        s.excute(r, a)
                                }
                            })
                    },
                    setUser: function(t) {
                        this.set(t);
                        var e = o.getExpireTime("USER"),
                            i = {
                                data: t,
                                timeout: e
                            };
                        o.oldSet("USERINFO", JSON.stringify(i))
                    },
                    removeUser: function() {
                        o.oldRemove("USERINFO"),
                            this.remove()

                    },
                    isNonUser: function() {
                        var t = this.getUser();
                        return t && !!t.IsNonUser
                    },
                    isLogin: function() {
                        var t = this.getUser();
                        return t && !!t.Auth && !t.IsNonUser
                    },
                    getUserName: function() {
                        var t = this.getUser();
                        return t && t.UserName
                    },
                    getUserId: function() {
                        var t = this.getUser() || {};
                        return t.UserID || n.getGuid()
                    },
                    getAuth: function() {
                        var t = this.getUser();
                        return t && t.Auth
                    },
                    setAuth: function(t) {
                        var e = this.isLogin(),
                            i = this.getUser() || {};
                        i.Auth = t,
                            i.IsNonUser = e ? !1: !0,
                            this.setUser(i)
                    },
                    setThirdParts: function(t) {
                        var e = this.isLogin(),
                            i = this.getUser() || {};
                        e && t && (i.thirdParts = t, this.setUser(i))
                    },
                    setThirdPartsNon: function() {
                        var t = this.isLogin(),
                            e = this.getUser() || {};
                        t && (e.thirdParts = "", this.setUser(e))
                    },
                    getThirdParts: function() {
                        var t = this.getUser();
                        return t && t.thirdParts
                    },
                    getThirdPart: function(t) {
                        var e = this.getUser();
                        if (t && e && e.thirdParts && e.thirdParts.length > 0) {
                            var i = e.thirdParts;
                            return _.find(i,
                                function(e) {
                                    return e.ThirdPartType == t ? e: void 0
                                })
                        }
                    },
                    setNonUser: function(t) {
                        var e = r.getInstance();
                        e.setAttr("auth", t);
                        var i = {};
                        i.Auth = t,
                            i.IsNonUser = !0,
                            this.setUser(i)
                    },
                    setExpireTime: function($super, t) {
                        $super(t);
                        var e = this.get(),
                            i = {
                                data: e,
                                timeout: t
                            };
                        o.oldSet("USERINFO", JSON.stringify(i))
                    },
                    removeSAuth: function() {
                        var t = a.getInstance();
                        t.remove()
                    }
                });
            return s
        }),
    define("cMarketStore", ["cCoreInherit", "cLocalStore", "cLocalStorage", "cUtilDate"],
        function(t, e, i, n) {
            var r = {},
                a = i.localStorage;
            return r.UnionStore = new t.Class(e, {
                __propertys__: function() {
                    this.key = "UNION",
                        this.lifeTime = "7D",
                        this.store = a
                },
                initialize: function($super, t) {
                    $super(t)
                },
                get: function() {
                    var t = this.store.oldGet(this.key) || this.store.get(this.key);
                    return t && t.data || t && t.value || null
                },
                set: function(t) {
                    var e = (new n).format("Y/m/d H:i:s"),
                        i = this._getNowTime();
                    i = i.addSeconds(this._getLifeTime()).format("Y/m/d H:i:s");
                    var r = {
                        value: t,
                        data: t,
                        timeout: i,
                        tag: null,
                        savedate: e
                    };
                    this.sProxy && this.sProxy.proxy && this.sProxy.proxy.setItem && this.sProxy.proxy.setItem(this.key, JSON.stringify(r))
                }
            }),
                r.SalesStore = new t.Class(e, {
                    __propertys__: function() {
                        this.key = "SALES",
                            this.lifeTime = "30D",
                            this.store = a

                    },
                    initialize: function($super, t) {
                        $super(t)
                    },
                    get: function() {
                        var t = this.store.oldGet(this.key) || this.store.get(this.key);
                        return t && t.data || t && t.value || null
                    }
                }),
                r.SalesObjectStore = new t.Class(e, {
                    __propertys__: function() {
                        this.key = "SALES_OBJECT",
                            this.lifeTime = "30D"
                    },
                    initialize: function($super, t) {
                        $super(t)
                    }
                }),
                r.UnionStore.getInstance = r.SalesStore.getInstance = function() {
                    return this.instance || new this

                },
                r
        }),
    define("cMobileTokenStore", ["cCoreInherit", "cLocalStore"],
        function(t, e) {
            var i = new t.Class(e, {
                __propertys__: function() {
                    this.key = "PAUTH",
                        this.lifeTime = "30M"
                },
                set: function($super, t) {
                    $super(t),
                        require(["cHybridShell"],
                            function(e) {
                                var i = new e.Fn("app_do_business_job");
                                i.run(1, "setMobileToken", {
                                    MobileToken: t
                                })

                            })
                }
            });
            return i
        }),
    define("cCommonStore", ["cCoreInherit", "cUserStore", "cHeadStore", "cAuthStore", "cMarketStore", "cMobileTokenStore"],
        function(t, e, i, n, r, a) {
            var o = {};
            return o.UserStore = e,
                o.HeadStore = i,
                o.AuthStore = n,
                o.UnionStore = r.UnionStore,
                o.SalesStore = r.SalesStore,
                o.SalesObjectStore = r.SalesObjectStore,
                o.MobileTokenStore = a,
                o

        }),
    define("cParserUtil", [],
        function() {
            function reString(t) {
                var e = {
                        "\r": "\\r",
                        "\n": "\\n",
                        "	": "\\t"
                    },
                    i = /([\.\\\/\+\*\?\[\]\{\}\(\)\^\$\|])/g,
                    n = /[\r\t\n]/g;
                return t.replace(i, "\\$1").replace(n,
                    function(t) {
                        return e[t]
                    })
            }
            function fixReString(t) {
                for (var e = t.split(""), i = !1, n = "", r = []; n = e.shift();) r.push(n),
                        "\\" == n ? r.push(e.shift()) : "[" != n || i ? "]" == n && i ? i = !1: "(" != n || i || "?" == e[0] && ("!" == e[1] || (":" == e[1] || "=" == e[1] ? (e.shift(), e.shift(), r.push("?"), r.push(":")) : (r.push("?"), r.push(":")))) : i = !0;
                return r.join("")
            }
            function urlParse(t, e) {
                var i = [],
                    n = [],
                    r = {},
                    a = schemaRegs[t];
                if ((_.isString(e) || _.isUndefined(a)) && (a = schemaRegs[t] = t.replace(/\{\{(.+?)\}\}/g,
                    function(t, e) {
                        return n.push(e),
                            "{@" + (n.length - 1) + "}"
                    }).replace(/\{(@?)(.+?)\}|[^\{\}]+/g,
                    function(t, e, r) {
                        var a = "";
                        if (r) if (e) {
                            var o = n[r].match(/^(?:(?:\((\w+)\))?([^!=]+?)|([^!=]+?)=(.*))$/);
                            if (o) if (o[2]) {
                                switch (o[1]) {
                                    case "number":
                                        a = "(\\d+(?:\\.\\d*)?|\\.\\d+)";
                                        break;
                                    case "int":
                                        a = "(\\d+)";
                                        break;
                                    case "letter":
                                        a = "([a-z _\\-\\$]+)";
                                        break;
                                    default:
                                        a = "([^\\/]*)"
                                }
                                i.push(o[2])
                            } else if (i.push(o[3]), /^\/.*\/$/.test(o[4])) a = "(" + fixReString(o[4].slice(1, -1)) + ")";
                            else {
                                for (var s = o[4].split("||"), c = 0; c < s.length; c++) s[c] = reString(s[c]);
                                a = "(" + s.join("|") + ")"
                            } else a = ""
                        } else i.push(r),
                            a = "([^\\/]*)";
                        else a = reString(t);
                        return a
                    })), _.isUndefined(e)) return a;
                e = e.replace(/[#\?].*$/g, "");
                var o = e.match(new RegExp(a, "i")),
                    s = "/([^/]*)";
                "\\" != a[a.length - 1] && (s = "\\/([^/]*)");
                var c = e.match(new RegExp(a + s, "i"));
                if (o && !c) {
                    for (var u = 0; u < i.length; u++) r[i[u]] = o[u + 1] || null;
                    return {
                        reStr: a,
                        param: r,
                        index: o.index
                    }
                }
                return {}
            }
            var ParseUtil = {},
                uuid = 0,
                schemaRegs = {};
            return ParseUtil.getID = function() {
                var t = "client_id_viewport_" + ++uuid + "_" + (new Date).getTime();
                return t
            },
                ParseUtil._containFunc = function(t, e) {
                    var i = !1;
                    for (var n in t) if (_.isFunction(t[n]) && t[n].toString().indexOf(e.trim()) > -1) t[n] = t[n].toString().trim(),
                        i = !0;
                    else if (_.isObject(t[n]) || _.isArray(t[n])) {
                        var r = ParseUtil._containFunc(t[n], e);
                        i = r || i
                    }
                    return i
                },
                ParseUtil.getPageUrlschema = function(configStr) {
                    var ret = "",
                        arr = configStr.match(/([\'\"])?url_schema\1\s*:\s*([\'\"])(.*?)\2/) || configStr.match(/([\'\"])?url_schema\1\s*:\s*\[\s*([\'\"])((.|\s)*?)\2(\s*|,)]/);
                    return arr ? (eval("ret = {" + arr[0] + "}['url_schema']"), ret) : ""
                },
                ParseUtil.getPageParams = function(t, e) {
                    t = decodeURIComponent(t);
                    var i = {};
                    "string" == typeof e && (e = [e]),
                        _.each(e,
                            function(e) {
                                var n = Lizard.schema2re(e, t);
                                n.reStr && n.param && (i = n.param)
                            });
                    for (var n, r, a, o, s = t.replace(/^[^\?#]*\??/g, "").replace(/#DIALOG_.*$/g, "").replace(/#\|cui-.*$/g, ""), c = /([^&=?]+)=([^&]+)/g, u = /\/+.*\?/, l = /(.+)\[\]$/; n = c.exec(s);) {
                        if (r = n[1].toLowerCase(), a = n[2], o = r.match(l), u.test(a)) {
                            i[r] = s.substr(s.indexOf(a));
                            break
                        }
                        o ? (r = o[1], i[r] = i[r] || [], i[r].push(a)) : i[r] = a
                    }
                    return i
                },
                ParseUtil.parseDepend = function(t) {
                    var e = t.match(/Lizard.D\(([\'\"])(.*?)([\'\"])\)(.*?)(,|\s)/g),
                        i = [];
                    return e && _.each(e,
                        function(t) {
                            var e = t.split(",").join("").split("}").join("");
                            i.push(e)
                        }),
                        i
                },
                ParseUtil._runUnderscore = function(t, e) {
                    e || (e = {});
                    var i = "";
                    if (t) {
                        var n = _.template(t);
                        Lizard.T,
                            i = n(e, {
                                Lizard: Lizard
                            }).trim()
                    }
                    return i
                },
                Lizard.getModels = function(pageConfig) {
                    pageConfig.model || (pageConfig.model = {});
                    var apis = pageConfig.model.apis || [],
                        ret = [],
                        dataexpr = pageConfig.dataexpr;
                    return _.each(apis,
                        function(api) {
                            api.runat = api.runat || "all",
                                (api.runat == Lizard.renderAt || "all" == api.runat) && ret.push(api),
                                api.suspend = "suspend" in api ? api.suspend.toString() : !1,
                                _.each(dataexpr,
                                    function(p) {
                                        var postdataStr = JSON.stringify(api.postdata);
                                        (JSON.stringify(postdataStr).indexOf(p) > -1 || ParseUtil._containFunc(api.postdata, p) || api.suspend && api.suspend.indexOf(p) > -1) && (api.depends || (api.depends = [], api.expressionMap = {}), api.depends.push(eval(p.match(/Lizard.D\(([\'\"])(.*?)([\'\"])\)/g)[0].split("Lizard.D").join(""))), api.expressionMap[p] = dataexpr[p])

                                    })
                        }),
                        Lizard.errorBack = _.isFunction(pageConfig.errorBack) ? pageConfig.errorBack: null,
                        apis
                },
                Lizard.T = Lizard._T = function(t, e) {
                    if (1 == arguments.length) {
                        var i = "",
                            n = Lizard.T.lizTmpl[t];
                        return n && "server" != n.runat && (i = n.text),
                            i
                    }
                    return ParseUtil._runUnderscore(Lizard._T(t), e)
                },
                Lizard.P = function(t, e) {
                    var i = null;
                    return i = _.isUndefined(e) ? Lizard.P.lizParam[t] || Lizard.P.lizParam[t.toLowerCase()] : Lizard.P.lizParam[t] = e
                },
                Lizard.schema2re = urlParse,
                ParseUtil
        }),
    define("cPageParser", ["cCoreInherit", "cLocalStore", "cCommonStore", "cParserUtil"],
        function(cCoreInherit, cStore, CommonStore, ParseUtil) {
            function getPageConfigStr() {
                var t = pageDocNode.find('script[type="text/lizard-config"]').text();
                return t || (t = '{"url_schema": "","model": {"apis": []},"view":{}}'),
                    t
            }
            function getPageConfig() {
                var configStr = getPageConfigStr(),
                    dataexpr = ParseUtil.parseDepend(configStr),
                    ret = {};
                if (eval("ret = " + configStr), !ret.viewName) if (ret.controller) {
                    var viewName = ret.controller.substring(ret.controller.lastIndexOf("/") + 1);
                    ret.viewName = viewName.substring(0, viewName.indexOf("."))
                } else ret.viewName = "emptyName";
                return ret.dataexpr = dataexpr,
                    ret
            }
            function getPageTemplates() {
                var t = {},
                    e = pageDocNode.find('script[type="text/lizard-template"]');
                return _.each(e,
                    function(e) {
                        var i = $(e);
                        i.attr("id") && (t[i.attr("id")] = {
                            runat: i.attr("runat") || "all",
                            text: removeTags(i.text(), "client")
                        })

                    }),
                    t
            }
            function removeTags(t, e) {
                var i = $("<SCRIPT>" + t + "</SCRIPT>");
                return i.find("[runat=" + e + "]").remove(),
                    i.text()
            }
            function _setTDKInfo(t, e) {
                var i = [],
                    n = e.model.setTDK ? e.model.setTDK(t) : {},
                    r = pageDocNode.find("title");
                return n.title && (r && r.remove(), i.push("<title>" + n.title + "</title>"), document.title = n.title),
                    _.each(n,
                        function(t, e) {
                            if (t) {
                                var n = pageDocNode.find('meta[name="' + e + '"]');
                                n && n.remove(),
                                    i.push('<meta name="' + e + '" content="' + t + '" />')
                            }
                        }),
                {
                    TDK: n,
                    TDKStr: i.join("")
                }
            }
            function _setUBTInfo() {
                var t = ["page_id", "bf_ubt_orderid", "ab_testing_tracker"],
                    e = {};
                if (_.each(t,
                    function(t) {
                        var i = "",
                            n = pageDocNode.find("#" + t);
                        n.get(0) && (i = n.val()),
                            e[t] = i
                    }), _.isArray(e.ab_testing_tracker)) {
                    var i = [];
                    _.each(e.ab_testing_tracker,
                        function(t) {
                            _.each(t.attr("value").split(";"),
                                function(t) {
                                    t && i.push(t)
                                })
                        }),
                        e.ab_testing_tracker = i.join(";")
                }
                return e
            }
            var pageDocNode = null;
            Lizard._initParser = function(t, e) {
                pageDocNode = $("<DIV>" + e + "</DIV>"),
                    Lizard.T.lizTmpl = getPageTemplates(),
                    Lizard.P.lizParam = ParseUtil.getPageParams(t, ParseUtil.getPageUrlschema(getPageConfigStr()));
                var i = getPageConfig();
                return i.pageUrl = t,
                    i
            },
                Lizard.S = function(t, e, i) {
                    return this.loacaStores || (this.loacaStores = {}),
                        this.loacaStores[t] || (this.loacaStores[t] = "SALES" == t ? CommonStore.SalesStore: "SALES_OBJECT" == t ? CommonStore.SalesObjectStore: "UNION" == t ? CommonStore.UnionStore: new cCoreInherit.Class(cStore, {
                        __propertys__: function() {
                            this.key = t

                        }
                    })),
                        e ? this.loacaStores[t].getInstance().get() && this.loacaStores[t].getInstance().get().hasOwnProperty(e) ? this.loacaStores[t].getInstance().get()[e] : i: this.loacaStores[t].getInstance().get()
                },
                Lizard.H = function() {
                    return window.location.hash
                },
                Lizard.D = function(t) {
                    return this.ajaxDatas && this.ajaxDatas[t] ? this.ajaxDatas[t] : null

                },
                Lizard.render = function(t, e, i) {
                    var n = {
                            header: "",
                            viewport: ""
                        },
                        r = !0;
                    if (_.isFunction(t.validate)) r = t.validate(e),
                        !r && _.isFunction(t.modelOnError) && (n = t.modelOnError(e));
                    else {
                        var a = _setTDKInfo(e, t);
                        _.extend(n, _setUBTInfo()),
                            t.model.filter && (e = t.model.filter.call(this, e, a.TDK)),
                            n.TDK = a.TDKStr
                    }
                    if ("server" != i) for (var o in t.view) t.view.hasOwnProperty(o) && (n[o] = ParseUtil._runUnderscore(t.view[o], e));
                    var s = ParseUtil.getID(t.pageUrl);
                    return n.viewport = ['<div id="', s, '" page-url="', t.pageUrl, '">', n.viewport, "</div>"].join("").trim(),
                        n.id = s,
                        n.controller = t.controller,
                        n.config = t,
                        n.datas = e,
                        n.lizTmpl = Lizard.T.lizTmpl,
                        n.lizParam = Lizard.P.lizParam,
                        n.validateRet = r,
                        n
                },
                Lizard.getController = function(t) {
                    return t.controller

                }
        }),
    define("cUtilCacheView", [],
        function() {
            function t() {
                this.catchs = {},
                    this.backups = {},
                    this.orderCaches = []
            }
            return t.prototype = {
                add: function(t, e) {
                    this.catchs[t] = e,
                        this.orderCaches.push({
                            key: t,
                            url: e.url,
                            viewName: e.viewName
                        }),
                        this.backups[t] = {
                            url: e.url,
                            opts: e.opts,
                            text: e.text,
                            datas: e.datas,
                            viewName: e.viewName
                        }

                },
                _delElemFromCollection: function(t, e, i) {
                    t = _.reject(t,
                        function(t) {
                            return t[e] == i
                        })
                },
                delOrderCaches: function(t, e) {
                    this._delElemFromCollection(this.orderCaches, t, e)
                },
                delById: function(t) {
                    this.catchs[t] && delete this.catchs[t],
                        this.delOrderCaches("key", t)
                },
                delByName: function(t) {
                    this._delElemFromCollection(this.catchs, "viewName", t),
                        this.delOrderCaches("viewName", t)

                },
                delByURL: function(t) {
                    this._delElemFromCollection(this.catchs, "url", t),
                        this.delOrderCaches("url", t)
                },
                delByIdFromBackups: function(t) {
                    this.backups[t] && delete this.backups[t],
                        this.delOrderCaches("key", t)
                },
                delByNameFromBackups: function(t) {
                    this._delElemFromCollection(this.backups, "viewName", t),
                        this.delOrderCaches("viewName", t)

                },
                delByURLFromBackups: function(t) {
                    this._delElemFromCollection(this.backups, "url", t),
                        this.delOrderCaches("url", t)
                },
                findById: function(t) {
                    return this.catchs[t]
                },
                findByName: function(t) {
                    return _.findWhere(this.catchs, {
                        viewName: t
                    })
                },
                findByIdFromBackups: function(t) {
                    return this.backups[t]
                },
                findByNameFromBackups: function(t) {
                    return _.findWhere(this.backups, {
                        viewName: t
                    })

                },
                findByURLFromBackups: function(t) {
                    return _.findWhere(this.backups, {
                        url: t
                    })
                },
                length: function() {
                    return _.size(this.catchs)
                },
                each: function(t) {
                    _.isFunction(t) && _.each(this.catchs,
                        function(e, i) {
                            t(i, e)
                        })
                }
            },
                t
        }),
    define("cUtilPath", ["$"],
        function() {
            var t = {};
            return t.parseUrl = function(t) {
                var e = /^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,
                    i = e.exec(t || "") || [];
                return {
                    href: i[0] || "",
                    hrefNoHash: i[1] || "",
                    hrefNoSearch: i[2] || "",
                    domain: i[3] || "",
                    protocol: i[4] || "",
                    doubleSlash: i[5] || "",
                    authority: i[6] || "",
                    username: i[8] || "",
                    password: i[9] || "",
                    host: i[10] || "",
                    hostname: i[11] || "",
                    port: i[12] || "",
                    pathname: i[13] || "",
                    directory: i[14] || "",
                    filename: i[15] || "",
                    search: i[16] || "",
                    hash: i[17] || ""
                }

            },
                t.getUrlParam = function(t, e) {
                    var i = new RegExp("(\\?|&)" + e + "=([^&]+)(&|$)", "i"),
                        n = t.match(i);
                    return n ? n[2] : ""
                },
                t.getUrlParams = function(t) {
                    for (var e, i, n, r, a = t.split("://"), o = /([^&=?]+)=([^&]+)/g, s = {}; e = o.exec(a[0]);) r = e[1],
                        i = e[2],
                        s[r] = i;
                    if (a[1]) {
                        var c = 0;
                        n = _.size(s),
                            _.each(s,
                                function(t, e) {++c == n && (s[e] += "://" + a[1])

                                })
                    }
                    return s
                },
                t.formatHybridUrl = function(t, e) {
                    var i = "";
                    if (!t) return i;
                    if (i = t, !t.match(/^(http|ctrip)/gim)) {
                        t = t.replace(/file:[\/]*/, "");
                        var n = /(webapp|webapp_work)\/([^\/]*)\/([\S\s]*)/,
                            r = t.match(n);
                        if (r && r.length > 3) {
                            var a = r[2],
                                o = r[3];
                            i = o.indexOf(".html#") < 0 ? a + "/index.html#/webapp/" + a + "/" + o: a + "/" + o
                        }
                        e && (i = e + i)

                    }
                    return i
                },
                t
        }),
    define("cUtilValidate", ["$"],
        function() {
            var t = {
                isEmail: function(t) {
                    var e = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return e.test(t)
                },
                isPassword: function(t) {
                    var e = /^[a-zA-Z0-9]{6,20}$/;
                    return e.test(t)
                },
                isMobile: function(t) {
                    var e = /^(1[3-8][0-9])\d{8}$/;
                    return e.test(t)
                },
                isChinese: function(t) {
                    var e = /^[\u4e00-\u9fff]{0,}$/;
                    return e.test(t)
                },
                isEnglish: function(t) {
                    var e = /^[A-Za-z]+$/;
                    return e.test(t)
                },
                isZip: function(t) {
                    var e = /^\d{6}$/;
                    return e.test(t)
                },
                isDateStr: function(t) {
                    var e = /^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229)$/;
                    return e.test(t) ? !0: !1
                },
                isTraditional: function(t) {
                    for (var e = "萬與醜專業叢東絲兩嚴喪個爿豐臨為麗舉麼義烏樂喬習鄉書買亂爭於虧雲亙亞產畝親褻嚲億僅從侖倉儀們價眾優夥會傴傘偉傳傷倀倫傖偽佇體餘傭僉俠侶僥偵側僑儈儕儂俁儔儼倆儷儉債傾傯僂僨償儻儐儲儺兒兌兗黨蘭關興茲養獸囅內岡冊寫軍農塚馮衝決況凍淨淒涼淩減湊凜幾鳳鳧憑凱擊氹鑿芻劃劉則剛創刪別剗剄劊劌剴劑剮劍剝劇勸辦務勱動勵勁勞勢勳勩勻匭匱區醫華協單賣盧鹵臥衛卻巹廠廳曆厲壓厭厙廁廂厴廈廚廄廝縣參靉靆雙發變敘疊葉號歎嘰籲後嚇呂嗎唚噸聽啟吳嘸囈嘔嚦唄員咼嗆嗚詠哢嚨嚀噝吒噅鹹呱響啞噠嘵嗶噦嘩噲嚌噥喲嘜嗊嘮啢嗩唕喚嘖嗇囀齧囉嘽嘯噴嘍嚳囁嗬噯噓嚶囑嚕劈囂謔團園囪圍圇國圖圓聖壙場壞塊堅壇壢壩塢墳墜壟壟壚壘墾堊墊埡墶壋塏堖塒塤堝墊垵塹墮壪牆壯聲殼壺壼處備複夠頭誇夾奪奩奐奮獎奧妝婦媽嫵嫗媯姍薑婁婭嬈嬌孌娛媧嫻嫿嬰嬋嬸媼嬡嬪嬙嬤孫學孿寧寶實寵審憲宮寬賓寢對尋導壽將爾塵堯尷屍盡層屭屜屆屬屢屨嶼歲豈嶇崗峴嶴嵐島嶺嶽崠巋嶨嶧峽嶢嶠崢巒嶗崍嶮嶄嶸嶔崳嶁脊巔鞏巰幣帥師幃帳簾幟帶幀幫幬幘幗冪襆幹並廣莊慶廬廡庫應廟龐廢廎廩開異棄張彌弳彎彈強歸當錄彠彥徹徑徠禦憶懺憂愾懷態慫憮慪悵愴憐總懟懌戀懇惡慟懨愷惻惱惲悅愨懸慳憫驚懼慘懲憊愜慚憚慣湣慍憤憒願懾憖懣懶懍戇戔戲戧戰戩戶紮撲扡執擴捫掃揚擾撫摶摳掄搶護報擔擬攏揀擁攔擰撥擇掛摯攣掗撾撻挾撓擋撟掙擠揮撏撈損撿換搗據撚擄摑擲撣摻摜摣攬撳攙擱摟攪攜攝攄擺搖擯攤攖撐攆擷擼攛擻攢敵斂數齋斕鬥斬斷無舊時曠暘曇晝曨顯晉曬曉曄暈暉暫曖劄術樸機殺雜權條來楊榪傑極構樅樞棗櫪梘棖槍楓梟櫃檸檉梔柵標棧櫛櫳棟櫨櫟欄樹棲樣欒棬椏橈楨檔榿橋樺檜槳樁夢檮棶檢欞槨櫝槧欏橢樓欖櫬櫚櫸檟檻檳櫧橫檣櫻櫫櫥櫓櫞簷檁歡歟歐殲歿殤殘殞殮殫殯毆毀轂畢斃氈毿氌氣氫氬氳彙漢汙湯洶遝溝沒灃漚瀝淪滄渢溈滬濔濘淚澩瀧瀘濼瀉潑澤涇潔灑窪浹淺漿澆湞溮濁測澮濟瀏滻渾滸濃潯濜塗湧濤澇淶漣潿渦溳渙滌潤澗漲澀澱淵淥漬瀆漸澠漁瀋滲溫遊灣濕潰濺漵漊潷滾滯灩灄滿瀅濾濫灤濱灘澦濫瀠瀟瀲濰潛瀦瀾瀨瀕灝滅燈靈災燦煬爐燉煒熗點煉熾爍爛烴燭煙煩燒燁燴燙燼熱煥燜燾煆溜愛爺牘犛牽犧犢強狀獷獁猶狽麅獮獰獨狹獅獪猙獄猻獫獵獼玀豬貓蝟獻獺璣璵瑒瑪瑋環現瑲璽瑉玨琺瓏璫琿璡璉瑣瓊瑤璦璿瓔瓚甕甌電畫暢疇癤療瘧癘瘍鬁瘡瘋皰屙癰痙癢瘂癆瘓癇癡癉瘮瘞瘺癟癱癮癭癩癬癲臒皚皺皸盞鹽監蓋盜盤瞘眥矓睜睞瞼瞞矚矯磯礬礦碭碼磚硨硯碸礪礱礫礎硜碩硤磽磑礄確鹼礙磧磣堿镟滾禮禕禰禎禱禍稟祿禪離禿稈種積稱穢穠穭稅穌穩穡窮竊竅窯竄窩窺竇窶豎競篤筍筆筧箋籠籩築篳篩簹箏籌簽簡籙簀篋籜籮簞簫簣簍籃籬籪籟糴類秈糶糲粵糞糧糝餱緊縶糸糾紆紅紂纖紇約級紈纊紀紉緯紜紘純紕紗綱納紝縱綸紛紙紋紡紵紖紐紓線紺絏紱練組紳細織終縐絆紼絀紹繹經紿綁絨結絝繞絰絎繪給絢絳絡絕絞統綆綃絹繡綌綏絛繼綈績緒綾緓續綺緋綽緔緄繩維綿綬繃綢綯綹綣綜綻綰綠綴緇緙緗緘緬纜緹緲緝縕繢緦綞緞緶線緱縋緩締縷編緡緣縉縛縟縝縫縗縞纏縭縊縑繽縹縵縲纓縮繆繅纈繚繕繒韁繾繰繯繳纘罌網羅罰罷羆羈羥羨翹翽翬耮耬聳恥聶聾職聹聯聵聰肅腸膚膁腎腫脹脅膽勝朧腖臚脛膠脈膾髒臍腦膿臠腳脫腡臉臘醃膕齶膩靦膃騰臏臢輿艤艦艙艫艱豔艸藝節羋薌蕪蘆蓯葦藶莧萇蒼苧蘇檾蘋莖蘢蔦塋煢繭荊薦薘莢蕘蓽蕎薈薺蕩榮葷滎犖熒蕁藎蓀蔭蕒葒葤藥蒞蓧萊蓮蒔萵薟獲蕕瑩鶯蓴蘀蘿螢營縈蕭薩蔥蕆蕢蔣蔞藍薊蘺蕷鎣驀薔蘞藺藹蘄蘊藪槁蘚虜慮虛蟲虯蟣雖蝦蠆蝕蟻螞蠶蠔蜆蠱蠣蟶蠻蟄蛺蟯螄蠐蛻蝸蠟蠅蟈蟬蠍螻蠑螿蟎蠨釁銜補襯袞襖嫋褘襪襲襏裝襠褌褳襝褲襇褸襤繈襴見觀覎規覓視覘覽覺覬覡覿覥覦覯覲覷觴觸觶讋譽謄訁計訂訃認譏訐訌討讓訕訖訓議訊記訒講諱謳詎訝訥許訛論訩訟諷設訪訣證詁訶評詛識詗詐訴診詆謅詞詘詔詖譯詒誆誄試詿詩詰詼誠誅詵話誕詬詮詭詢詣諍該詳詫諢詡譸誡誣語誚誤誥誘誨誑說誦誒請諸諏諾讀諑誹課諉諛誰諗調諂諒諄誶談誼謀諶諜謊諫諧謔謁謂諤諭諼讒諮諳諺諦謎諞諝謨讜謖謝謠謗諡謙謐謹謾謫譾謬譚譖譙讕譜譎讞譴譫讖穀豶貝貞負貟貢財責賢敗賬貨質販貪貧貶購貯貫貳賤賁貰貼貴貺貸貿費賀貽賊贄賈賄貲賃賂贓資賅贐賕賑賚賒賦賭齎贖賞賜贔賙賡賠賧賴賵贅賻賺賽賾贗讚贇贈贍贏贛赬趙趕趨趲躉躍蹌蹠躒踐躂蹺蹕躚躋踴躊蹤躓躑躡蹣躕躥躪躦軀車軋軌軒軑軔轉軛輪軟轟軲軻轤軸軹軼軤軫轢軺輕軾載輊轎輈輇輅較輒輔輛輦輩輝輥輞輬輟輜輳輻輯轀輸轡轅轄輾轆轍轔辭辯辮邊遼達遷過邁運還這進遠違連遲邇逕跡適選遜遞邐邏遺遙鄧鄺鄔郵鄒鄴鄰鬱郟鄶鄭鄆酈鄖鄲醞醱醬釅釃釀釋裏钜鑒鑾鏨釓釔針釘釗釙釕釷釺釧釤鈒釩釣鍆釹鍚釵鈃鈣鈈鈦鈍鈔鍾鈉鋇鋼鈑鈐鑰欽鈞鎢鉤鈧鈁鈥鈄鈕鈀鈺錢鉦鉗鈷缽鈳鉕鈽鈸鉞鑽鉬鉭鉀鈿鈾鐵鉑鈴鑠鉛鉚鈰鉉鉈鉍鈹鐸鉶銬銠鉺銪鋏鋣鐃銍鐺銅鋁銱銦鎧鍘銖銑鋌銩銛鏵銓鉿銚鉻銘錚銫鉸銥鏟銃鐋銨銀銣鑄鐒鋪鋙錸鋱鏈鏗銷鎖鋰鋥鋤鍋鋯鋨鏽銼鋝鋒鋅鋶鐦鐧銳銻鋃鋟鋦錒錆鍺錯錨錡錁錕錩錫錮鑼錘錐錦鍁錈錇錟錠鍵鋸錳錙鍥鍈鍇鏘鍶鍔鍤鍬鍾鍛鎪鍠鍰鎄鍍鎂鏤鎡鏌鎮鎛鎘鑷鐫鎳鎿鎦鎬鎊鎰鎔鏢鏜鏍鏰鏞鏡鏑鏃鏇鏐鐔钁鐐鏷鑥鐓鑭鐠鑹鏹鐙鑊鐳鐶鐲鐮鐿鑔鑣鑞鑲長門閂閃閆閈閉問闖閏闈閑閎間閔閌悶閘鬧閨聞闥閩閭闓閥閣閡閫鬮閱閬闍閾閹閶鬩閿閽閻閼闡闌闃闠闊闋闔闐闒闕闞闤隊陽陰陣階際陸隴陳陘陝隉隕險隨隱隸雋難雛讎靂霧霽黴靄靚靜靨韃鞽韉韝韋韌韍韓韙韞韜韻頁頂頃頇項順須頊頑顧頓頎頒頌頏預顱領頗頸頡頰頲頜潁熲頦頤頻頮頹頷頴穎顆題顒顎顓顏額顳顢顛顙顥纇顫顬顰顴風颺颭颮颯颶颸颼颻飀飄飆飆飛饗饜飣饑飥餳飩餼飪飫飭飯飲餞飾飽飼飿飴餌饒餉餄餎餃餏餅餑餖餓餘餒餕餜餛餡館餷饋餶餿饞饁饃餺餾饈饉饅饊饌饢馬馭馱馴馳驅馹駁驢駔駛駟駙駒騶駐駝駑駕驛駘驍罵駰驕驊駱駭駢驫驪騁驗騂駸駿騏騎騍騅騌驌驂騙騭騤騷騖驁騮騫騸驃騾驄驏驟驥驦驤髏髖髕鬢魘魎魚魛魢魷魨魯魴魺鮁鮃鯰鱸鮋鮓鮒鮊鮑鱟鮍鮐鮭鮚鮳鮪鮞鮦鰂鮜鱠鱭鮫鮮鮺鯗鱘鯁鱺鰱鰹鯉鰣鰷鯀鯊鯇鮶鯽鯒鯖鯪鯕鯫鯡鯤鯧鯝鯢鯰鯛鯨鯵鯴鯔鱝鰈鰏鱨鯷鰮鰃鰓鱷鰍鰒鰉鰁鱂鯿鰠鼇鰭鰨鰥鰩鰟鰜鰳鰾鱈鱉鰻鰵鱅鰼鱖鱔鱗鱒鱯鱤鱧鱣鳥鳩雞鳶鳴鳲鷗鴉鶬鴇鴆鴣鶇鸕鴨鴞鴦鴒鴟鴝鴛鴬鴕鷥鷙鴯鴰鵂鴴鵃鴿鸞鴻鵐鵓鸝鵑鵠鵝鵒鷳鵜鵡鵲鶓鵪鶤鵯鵬鵮鶉鶊鵷鷫鶘鶡鶚鶻鶿鶥鶩鷊鷂鶲鶹鶺鷁鶼鶴鷖鸚鷓鷚鷯鷦鷲鷸鷺鸇鷹鸌鸏鸛鸘鹺麥麩黃黌黶黷黲黽黿鼂鼉鞀鼴齇齊齏齒齔齕齗齟齡齙齠齜齦齬齪齲齷龍龔龕龜誌製谘隻裡係範鬆冇嚐嘗鬨麵準鐘彆閒儘臟拚", i = 0; i < t.length; i++) {
                        var n = t.charAt(i);
                        if (e.indexOf(n) > -1) return ! 0
                    }
                    return ! 1
                },
                isIdCard: function(t) {
                    var e = t.toLowerCase().match(/\w/g);
                    if (t.match(/^\d{17}[\dx]$/i)) {
                        for (var i = 0, n = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], r = 0; 17 > r; r++) i += parseInt(e[r], 10) * n[r];
                        return "10x98765432".charAt(i % 11) != e[17] ? !1: !!t.replace(/^\d{6}(\d{4})(\d{2})(\d{2}).+$/, "$1-$2-$3")

                    }
                    return t.match(/^\d{15}$/) ? !!t.replace(/^\d{6}(\d{2})(\d{2})(\d{2}).+$/, "19$1-$2-$3") : !1
                },
                isQq: function(t) {
                    return /^[1-9]\d{4,}$/.test(t)
                },
                isUrl: function(t) {
                    return /^http(s)?:\/\/[A-Za-z0-9\-]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\:+!]*([^<>])*$/.test(t)
                },
                isIP: function(t) {
                    if (!t || _.isNull(t)) return ! 1;
                    var e = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g;
                    return e.test(t) && RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256 ? !0: !1
                },
                isCharsLenWithinRange: function(t, e) {
                    if (!_.isString(t)) return ! 1;
                    var i = t.match(/\W/g),
                        n = null === i ? t.length: t.length + i.length,
                        r = n >= 0 && e >= n;
                    return r ? (this.cutLen = t.length, !0) : !1
                }
            };
            return t
        }),
    define("cUtilCryptBase64", [],
        function() {
            var t,
                e = {},
                i = e.Base64,
                n = "2.1.4";
            "undefined" != typeof module && module.exports && (t = require("buffer").Buffer);
            var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                a = function(t) {
                    for (var e = {},
                             i = 0, n = t.length; n > i; i++) e[t.charAt(i)] = i;
                    return e
                } (r),
                o = String.fromCharCode,
                s = function(t) {
                    var e = "";
                    return t.length < 2 ? (e = t.charCodeAt(0), 128 > e ? t: 2048 > e ? o(192 | e >>> 6) + o(128 | 63 & e) : o(224 | e >>> 12 & 15) + o(128 | e >>> 6 & 63) + o(128 | 63 & e)) : (e = 65536 + 1024 * (t.charCodeAt(0) - 55296) + (t.charCodeAt(1) - 56320), o(240 | e >>> 18 & 7) + o(128 | e >>> 12 & 63) + o(128 | e >>> 6 & 63) + o(128 | 63 & e))

                },
                c = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
                u = function(t) {
                    return t.replace(c, s)
                },
                l = function(t) {
                    var e = [0, 2, 1][t.length % 3],
                        i = t.charCodeAt(0) << 16 | (t.length > 1 ? t.charCodeAt(1) : 0) << 8 | (t.length > 2 ? t.charCodeAt(2) : 0),
                        n = [r.charAt(i >>> 18), r.charAt(i >>> 12 & 63), e >= 2 ? "=": r.charAt(i >>> 6 & 63), e >= 1 ? "=": r.charAt(63 & i)];
                    return n.join("")
                },
                d = e.btoa ?
                    function(t) {
                        return e.btoa(t)
                    }: function(t) {
                    return t.replace(/[\s\S]{1,3}/g, l)
                },
                h = t ?
                    function(e) {
                        return new t(e).toString("base64")
                    }: function(t) {
                    return d(u(t))
                },
                f = function(t, e) {
                    return e ? h(t).replace(/[+\/]/g,
                        function(t) {
                            return "+" == t ? "-": "_"
                        }).replace(/=/g, "") : h(t)
                },
                p = function(t) {
                    return f(t, !0)

                },
                g = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"), "g"),
                m = function(t) {
                    switch (t.length) {
                        case 4:
                            var e = (7 & t.charCodeAt(0)) << 18 | (63 & t.charCodeAt(1)) << 12 | (63 & t.charCodeAt(2)) << 6 | 63 & t.charCodeAt(3),
                                i = e - 65536;
                            return o((i >>> 10) + 55296) + o((1023 & i) + 56320);
                        case 3:
                            return o((15 & t.charCodeAt(0)) << 12 | (63 & t.charCodeAt(1)) << 6 | 63 & t.charCodeAt(2));
                        default:
                            return o((31 & t.charCodeAt(0)) << 6 | 63 & t.charCodeAt(1))
                    }
                },
                v = function(t) {
                    return t.replace(g, m)
                },
                w = function(t) {
                    var e = t.length,
                        i = e % 4,
                        n = (e > 0 ? a[t.charAt(0)] << 18: 0) | (e > 1 ? a[t.charAt(1)] << 12: 0) | (e > 2 ? a[t.charAt(2)] << 6: 0) | (e > 3 ? a[t.charAt(3)] : 0),
                        r = [o(n >>> 16), o(n >>> 8 & 255), o(255 & n)];
                    return r.length -= [0, 0, 2, 1][i],
                        r.join("")

                },
                y = e.atob ?
                    function(t) {
                        return e.atob(t)
                    }: function(t) {
                    return t.replace(/[\s\S]{1,4}/g, w)
                },
                b = t ?
                    function(e) {
                        return new t(e, "base64").toString()
                    }: function(t) {
                    return v(y(t))
                },
                _ = function(t) {
                    return b(t.replace(/[-_]/g,
                        function(t) {
                            return "-" == t ? "+": "/"
                        }).replace(/[^A-Za-z0-9\+\/]/g, ""))
                },
                S = function() {
                    var t = e.Base64;
                    return e.Base64 = i,
                        t
                };
            if (e.Base64 = {
                VERSION: n,
                atob: y,
                btoa: d,
                fromBase64: _,
                toBase64: f,
                utob: u,
                encode: f,
                encodeURI: p,
                btou: v,
                decode: _,
                noConflict: S
            },
                "function" == typeof Object.defineProperty) {
                var x = function(t) {
                    return {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                };
                e.Base64.extendString = function() {
                    Object.defineProperty(String.prototype, "fromBase64", x(function() {
                        return _(this)

                    })),
                        Object.defineProperty(String.prototype, "toBase64", x(function(t) {
                            return f(this, t)
                        })),
                        Object.defineProperty(String.prototype, "toBase64URI", x(function() {
                            return f(this, !0)
                        }))
                }
            }
            return e
        }),
    define("cUtilCryptRSA", [],
        function() {
            function t(t) {
                O = t,
                    M = new Array(O);
                for (var i = 0; i < M.length; i++) M[i] = 0;
                $ = new e,
                    D = new e,
                    D.digits[0] = 1

            }
            function e(t) {
                this.digits = "boolean" == typeof t && t === !0 ? null: M.slice(0),
                    this.isNeg = !1
            }
            function n(t) {
                var i = new e(!0);
                return i.digits = t.digits.slice(0),
                    i.isNeg = t.isNeg,
                    i
            }
            function r(t) {
                var i = new e;
                i.isNeg = 0 > t,
                    t = Math.abs(t);
                for (var n = 0; t > 0;) i.digits[n++] = t & q,
                    t = Math.floor(t / H);
                return i
            }
            function a(t) {
                for (var e = "", i = t.length - 1; i > -1; --i) e += t.charAt(i);
                return e
            }
            function o(t, i) {
                var n = new e;
                n.digits[0] = i;
                for (var r = z(t, n), o = W[r[1].digits[0]]; 1 == L(r[0], $);) r = z(r[0], n),
                    digit = r[1].digits[0],
                    o += W[r[1].digits[0]];
                return (t.isNeg ? "-": "") + a(o)
            }
            function s(t) {
                var e = 15,
                    n = "";
                for (i = 0; i < 4; ++i) n += G[t & e],
                    t >>>= 4;
                return a(n)
            }
            function c(t) {
                for (var e = "", i = (p(t), p(t)); i > -1; --i) e += s(t.digits[i]);
                return e
            }
            function u(t) {
                var e,
                    i = 48,
                    n = i + 9,
                    r = 97,
                    a = r + 25,
                    o = 65,
                    s = 90;
                return e = t >= i && n >= t ? t - i: t >= o && s >= t ? 10 + t - o: t >= r && a >= t ? 10 + t - r: 0
            }
            function l(t) {
                for (var e = 0, i = Math.min(t.length, 4), n = 0; i > n; ++n) e <<= 4,
                    e |= u(t.charCodeAt(n));
                return e
            }
            function d(t) {
                for (var i = new e, n = t.length, r = n, a = 0; r > 0; r -= 4, ++a) i.digits[a] = l(t.substr(Math.max(r - 4, 0), Math.min(r, 4)));
                return i
            }
            function h(t, i) {
                var n;
                if (t.isNeg != i.isNeg) i.isNeg = !i.isNeg,
                    n = f(t, i),
                    i.isNeg = !i.isNeg;
                else {
                    n = new e;
                    for (var r, a = 0, o = 0; o < t.digits.length; ++o) r = t.digits[o] + i.digits[o] + a,
                        n.digits[o] = r % H,
                        a = Number(r >= H);
                    n.isNeg = t.isNeg
                }
                return n
            }
            function f(t, i) {
                var n;
                if (t.isNeg != i.isNeg) i.isNeg = !i.isNeg,
                    n = h(t, i),
                    i.isNeg = !i.isNeg;
                else {
                    n = new e;
                    var r,
                        a;
                    a = 0;
                    for (var o = 0; o < t.digits.length; ++o) r = t.digits[o] - i.digits[o] + a,
                        n.digits[o] = r % H,
                        n.digits[o] < 0 && (n.digits[o] += H),
                        a = 0 - Number(0 > r);
                    if ( - 1 == a) {
                        for (a = 0, o = 0; o < t.digits.length; ++o) r = 0 - n.digits[o] + a,
                            n.digits[o] = r % H,
                            n.digits[o] < 0 && (n.digits[o] += H),
                            a = 0 - Number(0 > r);
                        n.isNeg = !t.isNeg
                    } else n.isNeg = t.isNeg

                }
                return n
            }
            function p(t) {
                for (var e = t.digits.length - 1; e > 0 && 0 === t.digits[e];)--e;
                return e
            }
            function g(t) {
                var e,
                    i = p(t),
                    n = t.digits[i],
                    r = (i + 1) * V;
                for (e = r; e > r - V && 0 === (32768 & n); --e) n <<= 1;
                return e
            }
            function m(t, i) {
                for (var n, r, a, o = new e, s = p(t), c = p(i), u = 0; c >= u; ++u) {
                    for (n = 0, a = u, j = 0; j <= s; ++j, ++a) r = o.digits[a] + t.digits[j] * i.digits[u] + n,
                        o.digits[a] = r & q,
                        n = r >>> R;
                    o.digits[u + s + 1] = n
                }
                return o.isNeg = t.isNeg != i.isNeg,
                    o
            }
            function v(t, i) {
                var n,
                    r,
                    a;
                result = new e,
                    n = p(t),
                    r = 0;
                for (var o = 0; n >= o; ++o) a = result.digits[o] + t.digits[o] * i + r,
                    result.digits[o] = a & q,
                    r = a >>> R;
                return result.digits[1 + n] = r,
                    result
            }
            function w(t, e, i, n, r) {
                for (var a = Math.min(e + r, t.length), o = e, s = n; a > o; ++o, ++s) i[s] = t[o]

            }
            function y(t, i) {
                var n = Math.floor(i / V),
                    r = new e;
                w(t.digits, 0, r.digits, n, r.digits.length - n);
                for (var a = i % V, o = V - a, s = r.digits.length - 1, c = s - 1; s > 0; --s, --c) r.digits[s] = r.digits[s] << a & q | (r.digits[c] & J[a]) >>> o;
                return r.digits[0] = r.digits[s] << a & q,
                    r.isNeg = t.isNeg,
                    r
            }
            function b(t, i) {
                var n = Math.floor(i / V),
                    r = new e;
                w(t.digits, n, r.digits, 0, t.digits.length - n);
                for (var a = i % V, o = V - a, s = 0, c = s + 1; s < r.digits.length - 1; ++s, ++c) r.digits[s] = r.digits[s] >>> a | (r.digits[c] & Y[a]) << o;
                return r.digits[r.digits.length - 1] >>>= a,
                    r.isNeg = t.isNeg,
                    r
            }
            function _(t, i) {
                var n = new e;
                return w(t.digits, 0, n.digits, i, n.digits.length - i),
                    n
            }
            function S(t, i) {
                var n = new e;
                return w(t.digits, i, n.digits, 0, n.digits.length - i),
                    n

            }
            function x(t, i) {
                var n = new e;
                return w(t.digits, 0, n.digits, 0, i),
                    n
            }
            function L(t, e) {
                if (t.isNeg != e.isNeg) return 1 - 2 * Number(t.isNeg);
                for (var i = t.digits.length - 1; i >= 0; --i) if (t.digits[i] != e.digits[i]) return t.isNeg ? 1 - 2 * Number(t.digits[i] > e.digits[i]) : 1 - 2 * Number(t.digits[i] < e.digits[i]);
                return 0
            }
            function z(t, i) {
                var r,
                    a,
                    o = g(t),
                    s = g(i),
                    c = i.isNeg;
                if (s > o) return t.isNeg ? (r = n(D), r.isNeg = !i.isNeg, t.isNeg = !1, i.isNeg = !1, a = f(i, t), t.isNeg = !0, i.isNeg = c) : (r = new e, a = n(t)),
                    new Array(r, a);
                r = new e,
                    a = t;
                for (var u = Math.ceil(s / V) - 1, l = 0; i.digits[u] < B;) i = y(i, 1),
                    ++l,
                    ++s,
                    u = Math.ceil(s / V) - 1;
                a = y(a, l),
                    o += l;
                for (var d = Math.ceil(o / V) - 1, m = _(i, d - u); - 1 != L(a, m);)++r.digits[d - u],
                    a = f(a, m);
                for (var w = d; w > u; --w) {
                    var S = w >= a.digits.length ? 0: a.digits[w],
                        x = w - 1 >= a.digits.length ? 0: a.digits[w - 1],
                        z = w - 2 >= a.digits.length ? 0: a.digits[w - 2],
                        C = u >= i.digits.length ? 0: i.digits[u],
                        E = u - 1 >= i.digits.length ? 0: i.digits[u - 1];
                    r.digits[w - u - 1] = S == C ? q: Math.floor((S * H + x) / C);
                    for (var T = r.digits[w - u - 1] * (C * H + E), A = S * F + (x * H + z); T > A;)--r.digits[w - u - 1],
                        T = r.digits[w - u - 1] * (C * H | E),
                        A = S * H * H + (x * H + z);
                    m = _(i, w - u - 1),
                        a = f(a, v(m, r.digits[w - u - 1])),
                        a.isNeg && (a = h(a, m), --r.digits[w - u - 1])
                }
                return a = b(a, l),
                    r.isNeg = t.isNeg != c,
                    t.isNeg && (r = c ? h(r, D) : f(r, D), i = b(i, l), a = f(i, a)),
                    0 === a.digits[0] && 0 === p(a) && (a.isNeg = !1),
                    new Array(r, a)
            }
            function C(t, e) {
                return z(t, e)[0]
            }
            function E(t) {
                this.modulus = n(t),
                    this.k = p(this.modulus) + 1;
                var i = new e;
                i.digits[2 * this.k] = 1,
                    this.mu = C(i, this.modulus),
                    this.bkplus1 = new e,
                    this.bkplus1.digits[this.k + 1] = 1,
                    this.modulo = T,
                    this.multiplyMod = A,
                    this.powMod = k
            }
            function T(t) {
                var e = S(t, this.k - 1),
                    i = m(e, this.mu),
                    n = S(i, this.k + 1),
                    r = x(t, this.k + 1),
                    a = m(n, this.modulus),
                    o = x(a, this.k + 1),
                    s = f(r, o);
                s.isNeg && (s = h(s, this.bkplus1));
                for (var c = L(s, this.modulus) >= 0; c;) s = f(s, this.modulus),
                    c = L(s, this.modulus) >= 0;
                return s
            }
            function A(t, e) {
                var i = m(t, e);
                return this.modulo(i)
            }
            function k(t, i) {
                var n = new e;
                n.digits[0] = 1;
                for (var r = t, a = i; 0 !== (1 & a.digits[0]) && (n = this.multiplyMod(n, r)), a = b(a, 1), 0 !== a.digits[0] || 0 !== p(a);) r = this.multiplyMod(r, r);
                return n
            }
            function I(t, e, i) {
                this.e = d(t),
                    this.d = d(e),
                    this.m = d(i),
                    this.digitSize = 2 * p(this.m) + 2,
                    this.chunkSize = this.digitSize - 11,
                    this.radix = 16,
                    this.barrett = new E(this.m)
            }
            function P(t, i) {
                if (t.chunkSize > t.digitSize - 11) return "Error";
                for (var n = [], r = i.length, a = 0; r > a;) n[a] = i.charCodeAt(a),
                    a++;
                var s,
                    u,
                    l,
                    d = n.length,
                    h = "";
                for (a = 0; d > a; a += t.chunkSize) {
                    l = new e,
                        s = 0;
                    var f,
                        p = a + t.chunkSize > d ? d % t.chunkSize: t.chunkSize,
                        g = [];
                    for (f = 0; p > f; f++) g[f] = n[a + p - 1 - f];
                    g[p] = 0;
                    var m = Math.max(8, t.digitSize - 3 - p);
                    for (f = 0; m > f; f++) g[p + 1 + f] = Math.floor(254 * Math.random()) + 1;
                    for (g[t.digitSize - 2] = 2, g[t.digitSize - 1] = 0, u = 0; u < t.digitSize; ++s) l.digits[s] = g[u++],
                        l.digits[s] += g[u++] << 8;
                    var v = t.barrett.powMod(l, t.e),
                        w = 16 == t.radix ? c(v) : o(v, t.radix);
                    h += w + " "
                }
                return h.substring(0, h.length - 1)
            }
            function N(t) {
                var e,
                    i,
                    n,
                    r,
                    a,
                    o,
                    s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                for (new Array( - 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1), n = t.length, i = 0, e = ""; n > i;) {
                    if (r = 255 & t.charCodeAt(i++), i == n) {
                        e += s.charAt(r >> 2),
                            e += s.charAt((3 & r) << 4),
                            e += "==";
                        break
                    }
                    if (a = t.charCodeAt(i++), i == n) {
                        e += s.charAt(r >> 2),
                            e += s.charAt((3 & r) << 4 | (240 & a) >> 4),
                            e += s.charAt((15 & a) << 2),
                            e += "=";
                        break
                    }
                    o = t.charCodeAt(i++),
                        e += s.charAt(r >> 2),
                        e += s.charAt((3 & r) << 4 | (240 & a) >> 4),
                        e += s.charAt((15 & a) << 2 | (192 & o) >> 6),
                        e += s.charAt(63 & o)
                }
                return e
            }
            function U(t) {
                var e = P(Z, N(t));
                return e
            }
            var O,
                M,
                $,
                D,
                R = 16,
                V = R,
                H = 65536,
                B = H >>> 1,
                F = H * H,
                q = H - 1;
            t(20);
            var W = (r(1e15), new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z")),
                G = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"),
                J = new Array(0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535),
                Y = new Array(0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535);
            t(131);
            var Z = new I("10001", "", "B7273B08845EB1D93C9A6EB9C45BE087AF9E692C8B7DD6D38DECFA732E9A6CDCB52106BDDB9E13100AEF3638358D5B5EB9011C33B7AC3F697078C0572585B94119196F627025C6E7FA9AA5C82B149E2BB30FEA7D777AA453324A301FD46413E11A7DB4A9D5B2D4BD6330AE2C477D48250F057ABEF2BD76DC7574897254736A71"),
                X = U;
            return {
                rsaEncrypted: X,
                encode: U
            }

        }),
    define("cUtilHybrid", [],
        function() {
            var t = window.navigator.userAgent,
                e = window.localStorage,
                i = {};
            return i.isPreProduction = function() {
                return e.getItem("isPreProduction")
            },
                i.getAppSys = function() {
                    if (t.indexOf("CtripLite") > -1) return "ctriplite";
                    var e = /.+_(\w+)_CtripWireless_(\w+)/,
                        i = e.exec(t);
                    return i && i[1] ? i[1].toLowerCase() : null

                },
                i.getAppVer = function() {
                    var e = t.match(/_([^_]+)$/);
                    return e && e[1] ? e[1] : "1.0"
                },
                i.isInApp = Lizard.isHybrid,
                i.isInWeichat = function() {
                    return t.indexOf("MicroMessenger") > -1 ? !0: !1
                } (),
                i.isLite = function() {
                    return "ctriplite" == i.getAppSys()
                } (),
                i.isStandard = function() {
                    return "ctrip" == i.getAppSys()
                } (),
                i.isPro = function() {
                    return "pro" == i.getAppSys()

                } (),
                i.isUnicom = function() {
                    return "unicom" == i.getAppSys()
                } (),
                i.isYounth = function() {
                    return "youth" == i.getAppSys()
                } (),
                i.getNetStatus = function() {
                    var t = e.getItem("CINFO"),
                        i = "None";
                    try {
                        var n = JSON.parse(t);
                        i = n.networkStatus || ""
                    } catch(r) {}
                    return i
                },
                Object.defineProperty(i, "isSaveFlow", {
                    get: function() {
                        try {
                            var t = window.localStorage.getItem("CINFO"),
                                e = JSON.parse(t);
                            return e.isSaveFlow
                        } catch(i) {
                            return void 0
                        }
                    }
                }),
                i
        }),
    define("cSessionStorage", ["cCoreInherit", "cAbstractStorage"],
        function(t, e) {
            var i = new t.Class(e, {
                __propertys__: function() {},
                initialize: function($super, t) {
                    this.proxy = window.sessionStorage,
                        $super(t)
                }
            });
            return i.getInstance = function() {
                return this.instance ? this.instance: this.instance = new this

            },
                i.sessionStorage = i.getInstance(),
                i
        }),
    define("cSessionStore", ["cCoreInherit", "cAbstractStore", "cSessionStorage"],
        function(t, e, i) {
            var n = new t.Class(e, {
                __propertys__: function() {
                    this.sProxy = i.getInstance()
                },
                initialize: function($super, t) {
                    $super(t)
                }
            });
            return n
        }),
    define("cCookieStorage", ["cCoreInherit", "cUtilDate", "cAbstractStorage"],
        function(t, e, i) {
            var n = new t.Class(i, {
                __propertys__: function() {
                    this.proxy = document.cookie

                },
                initialize: function($super, t) {
                    $super(t)
                },
                set: function(t, e, i, n, r, a) {
                    e = _.isObject(e) ? JSON.stringify(e) : e,
                        document.cookie = t + "=" + escape(e) + (i ? "; expires=" + i: "") + (n ? "; path=" + n: "") + (r ? "; domain=" + r: "") + (a ? "; secure": "")
                },
                get: function(t) {
                    for (var e = document.cookie, i = t + "=", n = i.length, r = e.length, a = 0; r > a;) {
                        var o = a + n;
                        if (e.substring(a, o) == i) return this.getCookieVal(o);
                        if (a = e.indexOf(" ", a) + 1, 0 === a) break
                    }
                    return null
                },
                getCookieVal: function(t) {
                    var e,
                        i = document.cookie.indexOf(";", t); - 1 == i && (i = document.cookie.length);
                    var n = unescape(document.cookie.substring(t, i));
                    try {
                        e = JSON.parse(n)
                    } catch(r) {
                        e = n
                    }
                    return e
                },
                remove: function(t, e, i) {
                    this.get(t) && (document.cookie = t + "=" + (e ? "; path=" + e: "") + (i ? "; domain=" + i: "") + "; expires=Thu, 01-Jan-1970 00:00:01 GMT")

                }
            });
            return n.getInstance = function() {
                return this.instance ? this.instance: this.instance = new this
            },
                n
        }),
    define("cMemoryStore", ["cCoreInherit", "cAbstractStore", "cMemoryStorage"],
        function(t, e, i) {
            var n = new t.Class(e, {
                __propertys__: function() {
                    this.data = null,
                        this.key = "memory_store",
                        this.sProxy = i.getInstance()
                },
                initialize: function($super, t) {
                    $super(t)

                }
            });
            return n
        }),
    define("cJsonPlugin", [],
        function() {
            navigator.userAgent.indexOf("Android") > 0 && (JSON.stringify = {}),
                function() {
                    function t(t) {
                        return 10 > t ? "0" + t: t
                    }
                    function e(t) {
                        return n.lastIndex = 0,
                            n.test(t) ? '"' + t.replace(n,
                                function(t) {
                                    var e = o[t];
                                    return "string" == typeof e ? e: "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice( - 4)

                                }) + '"': '"' + t + '"'
                    }
                    function i(t, n) {
                        var o,
                            c,
                            u,
                            l,
                            d,
                            h = r,
                            f = n[t];
                        switch (f && "object" == typeof f && "function" == typeof f.toJSON && (f = f.toJSON(t)), "function" == typeof s && (f = s.call(n, t, f)), typeof f) {
                            case "string":
                                return e(f);
                            case "number":
                                return isFinite(f) ? String(f) : "null";
                            case "boolean":
                            case "null":
                                return String(f);
                            case "object":
                                if (!f) return "null";
                                if (r += a, d = [], "[object Array]" === Object.prototype.toString.apply(f)) {
                                    for (l = f.length, o = 0; l > o; o += 1) d[o] = i(o, f) || "null";
                                    return u = 0 === d.length ? "[]": r ? "[\n" + r + d.join(",\n" + r) + "\n" + h + "]": "[" + d.join(",") + "]",
                                        r = h,
                                        u
                                }
                                if (s && "object" == typeof s) for (l = s.length, o = 0; l > o; o += 1)"string" == typeof s[o] && (c = s[o], u = i(c, f), u && d.push(e(c) + (r ? ": ": ":") + u));
                                else for (c in f) Object.prototype.hasOwnProperty.call(f, c) && (u = i(c, f), u && d.push(e(c) + (r ? ": ": ":") + u));
                                return u = 0 === d.length ? "{}": r ? "{\n" + r + d.join(",\n" + r) + "\n" + h + "}": "{" + d.join(",") + "}",
                                    r = h,
                                    u
                        }
                    }
                    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
                        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + t(this.getUTCMonth() + 1) + "-" + t(this.getUTCDate()) + "T" + t(this.getUTCHours()) + ":" + t(this.getUTCMinutes()) + ":" + t(this.getUTCSeconds()) + "Z": null

                    },
                        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
                            return this.valueOf()
                        });
                    var n,
                        r,
                        a,
                        o,
                        s;
                    "function" != typeof JSON.stringify && (n = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, o = {
                        "\b": "\\b",
                        "	": "\\t",
                        "\n": "\\n",
                        "\f": "\\f",
                        "\r": "\\r",
                        '"': '\\"',
                        "\\": "\\\\"
                    },
                        JSON.stringify = function(t, e, n) {
                            var o;
                            if (r = "", a = "", "number" == typeof n) for (o = 0; n > o; o += 1) a += " ";
                            else "string" == typeof n && (a = n);
                            if (s = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw new Error("JSON.stringify");
                            return i("", {
                                "": t
                            })
                        })
                } ()
        }),
    define("cMarketPlugin", ["cMessageCenter"],
        function(t) {
            return function() {
                t.subscribe("viewReady",
                    function(t) {
                        var e = $("#app_url");
                        if (t && "function" == typeof t.getAppUrl) {
                            var i = t.getAppUrl();
                            i && _.isString(i) && (e.length ? e.val(i) : $('<INPUT type="hidden" id="app_url" value="' + i + '"/>').appendTo($("body")))
                        } else e.length > 0 && e.val("")
                    })
            }
        }),
    define("cSafariPlugin", [],
        function() {
            window.shown = !1,
                window.onpageshow = function() {
                    window.shown && window.location.reload(),
                        window.shown = !0

                },
                window.onunload = function() {}
        }),
    define("cStatisticsPlugin", ["cMessageCenter"],
        function(t) {
            return function() {
                t.subscribe("viewReady",
                    function(t) {
                        Lizard.sendUbt(t)
                    }),
                    Lizard.sendUbt = function(t) {
                        if (t) {
                            window.__bfi || (window.__bfi = []);
                            var n = (t.$el.attr("page-url"), i(t)),
                                r = Lizard.P("orderid") || Lizard.P("oid") || "";
                            if (0 !== n) {
                                $("#bf_ubt_orderid").length > 0 && $("#bf_ubt_orderid").val(r);
                                var a = Lizard.instance.views[t.referrer];
                                window.__bfi.push(["_asynRefresh", {
                                    page_id: n,
                                    orderid: r,
                                    url: e(t),
                                    refer: a ? e(a) : document.referrer
                                }])
                            }
                        }
                    },
                    Lizard.unloadUbt = function(t) {
                        t && (window.__bfi || (window.__bfi = []), window.__bfi.push(["_unload", {
                            page_id: i(t),
                            url: e(t),
                            refer: t ? e(t) : document.referrer
                        }]))

                    };
                var e = function(t) {
                        var e = "";
                        return t ? (Lizard.isHybrid || Lizard.app.vendor.is("CTRIP") ? (e = t.$el.attr("page-url"), e = "http://hybridm.ctrip.com" + (0 === e.indexOf("/") ? t.$el.attr("page-url") : "/" + t.$el.attr("page-url"))) : e = window.location.protocol + "//" + window.location.host + t.$el.attr("page-url"), e) : void 0
                    },
                    i = function(t) {
                        return Lizard.isHybrid || Lizard.app.vendor.is("CTRIP") ? t.hpageid: t.pageid

                    }
            }
        }),
    define("cUnderscorePlugin", [],
        function() {
            var t = [],
                e = t.slice;
            _.inherit = function() {
                function t() {
                    _.isFunction(this.initialize) && this.initialize.apply(this, arguments)
                }
                function i(t, i) {
                    return function() {
                        var n = this,
                            r = [function() {
                                return o[t].apply(n, arguments)
                            }];
                        return i.apply(this, r.concat(e.call(arguments)))

                    }
                }
                if (0 === arguments.length || arguments.length > 2) throw "参数错误";
                var n = null,
                    r = e.call(arguments);
                if ("function" == typeof r[0] && (n = r.shift()), r = r[0], t.superclass = n, n) {
                    var a = function() {};
                    a.prototype = n.prototype,
                        t.prototype = new a
                }
                var o = t.superclass && t.superclass.prototype;
                for (var s in r) {
                    var c = r[s];
                    if (o && "function" == typeof c) {
                        var u = /^\s*function\s*\(([^\(\)]*?)\)\s*?\{/i.exec(c.toString())[1].replace(/\s/g, "").split(",");
                        "$super" === u[0] && o[s] && (c = i(s, c))
                    }
                    if (_.isObject(t.prototype[s]) && _.isObject(c) && "function" != typeof t.prototype[s] && "function" != typeof c) {
                        var l = {};
                        _.extend(l, t.prototype[s]),
                            _.extend(l, c),
                            t.prototype[s] = l
                    } else t.prototype[s] = c
                }
                return t.prototype.initialize || (t.prototype.initialize = function() {}),
                    t.prototype.constructor = t,
                    t

            },
                function() {
                    function t(t, e, i, n, r) {
                        var a = Math.abs(t - e),
                            o = Math.abs(i - n),
                            s = a >= o ? t - e > 0 ? "left": "right": i - n > 0 ? "up": "down";
                        return r && ("left" == s || "right" == s ? o / a > r && (s = "") : ("up" == s || "down" == s) && a / o > r && (s = "")),
                            s
                    }
                    function e(e, i, c, u, l, d) {
                        if (e && e[0]) {
                            var h = "",
                                f = d || n;
                            e[0]["__flip_" + i] = c,
                                e[0].__hasFlipEvent || (e[0].__hasFlipEvent = !0, e.on(a,
                                function(t) {
                                    var e = t.touches && t.touches[0] || t;
                                    r.x1 = e.pageX,
                                        r.y1 = e.pageY
                                }).on(o,
                                function(e) {
                                    var i = e.touches && e.touches[0] || e;
                                    r.x2 = i.pageX,
                                        r.y2 = i.pageY,
                                        (r.x2 && Math.abs(r.x1 - r.x2) > f || r.y2 && Math.abs(r.y1 - r.y2) > f) && (h = t(r.x1, r.x2, r.y1, r.y2, l));
                                    var n = "function" == typeof u ? u(h) : u;
                                    n || e.preventDefault()
                                }).on(s,
                                function(i) {
                                    var n = i.changedTouches && i.changedTouches[0] || i;
                                    if (r.x2 = n.pageX, r.y2 = n.pageY, r.x2 && Math.abs(r.x1 - r.x2) > f || r.y2 && Math.abs(r.y1 - r.y2) > f) {
                                        var a = t(r.x1, r.x2, r.y1, r.y2, l);
                                        _.isFunction(e[0]["__flip_" + a]) && e[0]["__flip_" + a]()
                                    } else _.isFunction(e[0].__flip_tap) && e[0].__flip_tap();
                                    r = {}
                                }))
                        }
                    }
                    function i(t) {
                        t && t[0] && (t.off(a).off(o).off(s), t[0].__hasFlipEvent && delete t[0].__hasFlipEvent, t[0].__flip_left && delete t[0].__flip_left, t[0].__flip_right && delete t[0].__flip_right)

                    }
                    var n = 20,
                        r = {},
                        a = "touchstart",
                        o = "touchmove",
                        s = "touchend";
                    "ontouchstart" in window || (a = "mousedown", o = "mousemove", s = "mouseup"),
                        _.flip = e,
                        _.flipDestroy = i,
                        $.flip = e,
                        $.flipDestroy = i
                } (),
                function() {
                    _.dateUtil = {
                        formatNum: function(t) {
                            return 10 > t ? "0" + t: t.toString()
                        },
                        parse: function(t, e) {
                            if ("undefined" == typeof t) return null;
                            if ("string" == typeof e) {
                                var i = (new Date(e), e.replace(/[^ymd]/g, "").split(""));
                                if (!i && 3 != i.length) return null;
                                e = e.replace(/y|m|d/g,
                                    function(t) {
                                        switch (t) {
                                            case "y":
                                                return "(\\d{4})";
                                            case "m":
                                            case "d":
                                                return "(\\d{1,2})"
                                        }
                                    });
                                for (var n = new RegExp(e, "g"), r = n.exec(t), a = {},
                                         o = 0, s = i.length; s > o; o++) a[i[o]] = r[o + 1];
                                return new Date(a.y, a.m - 1, a.d)

                            }
                            return null
                        },
                        format: function(t, e) {
                            return arguments.length < 2 && !t.getTime && (e = t, t = new Date),
                                "string" != typeof e && (e = "Y年M月D日 H时F分S秒"),
                                e.replace(/Y|y|M|m|D|d|H|h|F|f|S|s/g,
                                    function(e) {
                                        switch (e) {
                                            case "y":
                                                return (t.getFullYear() + "").slice(2);
                                            case "Y":
                                                return t.getFullYear();
                                            case "m":
                                                return t.getMonth() + 1;
                                            case "M":
                                                return _.dateUtil.formatNum(t.getMonth() + 1);
                                            case "d":
                                                return t.getDate();
                                            case "D":
                                                return _.dateUtil.formatNum(t.getDate());
                                            case "h":
                                                return t.getHours();
                                            case "H":
                                                return _.dateUtil.formatNum(t.getHours());
                                            case "f":
                                                return t.getMinutes();
                                            case "F":
                                                return _.dateUtil.formatNum(t.getMinutes());
                                            case "s":
                                                return t.getSeconds();
                                            case "S":
                                                return _.dateUtil.formatNum(t.getSeconds())

                                        }
                                    })
                        },
                        isDate: _.isDate,
                        isLeapYear: function(t) {
                            return _.isDate(t) && (t = t.getFullYear()),
                                    t % 4 === 0 && t % 100 !== 0 || t % 400 === 0 ? !0: !1
                        },
                        getDaysOfMonth: function(t, e) {
                            return _.isDate(t) ? (e = t.getMonth(), t = t.getFullYear()) : e--,
                                [31, _.dateUtil.isLeapYear(t) ? 29: 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
                        },
                        getBeginDayOfMouth: function(t, e) {
                            _.isDate(t) ? (e = t.getMonth(), t = t.getFullYear()) : e--;
                            var i = new Date(t, e, 1);
                            return i.getDay()
                        }
                    }
                } ()
        }),
    define("cZeptoPlugin", [],
        function() {
            var t = $.fn.html;
            $.fn.html = function(e) {
                return void 0 === e ? this.length > 0 ? this[0].innerHTML: null: t.call(this, e)
            };
            var e = $.fn.text;
            $.fn.text = function(t) {
                return void 0 === t ? this.length > 0 ? this[0].textContent: null: e.call(this, t)

            };
            var i = $.fn.data;
            $.fn.data = function(t, e) {
                return "0" === this.attr("data-" + t) && _.isUndefined(e) ? "0": i.apply(this, arguments)
            }
        }),
    define("cSvgPlugin", [],
        function() { !
            function(t, e, i, n) {
                function r(e, i) {
                    if (i) {
                        var n = i.getAttribute("viewBox"),
                            r = t.createDocumentFragment(),
                            a = i.cloneNode(!0);
                        for (n && e.setAttribute("viewBox", n); a.childNodes.length;) r.appendChild(a.childNodes[0]);
                        e.appendChild(r)
                    }
                }
                function a() {
                    var e = this,
                        i = t.createElement("x"),
                        n = e.s;
                    i.innerHTML = e.responseText,
                        e.onload = function() {
                            n.splice(0).map(function(t) {
                                r(t[0], i.querySelector("#" + t[1].replace(/(\W)/g, "\\$1")))
                            })
                        },
                        e.onload()
                }
                function o() {
                    for (var s; s = e[0];) {
                        var c = s.parentNode,
                            u = s.getAttribute("xlink:href").split("#"),
                            l = u[0],
                            d = u[1];
                        if (c.removeChild(s), l.length) {
                            var h = n[l] = n[l] || new XMLHttpRequest;
                            h.s || (h.s = [], h.open("GET", l), h.onload = a, h.send()),
                                h.s.push([c, d]),
                                4 === h.readyState && h.onload()
                        } else r(c, t.getElementById(d))
                    }
                    i(o)
                }
                o()
            } (document, document.getElementsByTagName("use"), window.requestAnimationFrame || window.setTimeout, {})
        }),
    define("cPlugins", ["cUnderscorePlugin", "cJsonPlugin", "cMarketPlugin", "cSafariPlugin", "cStatisticsPlugin", "cZeptoPlugin", Lizard.config.usesvg ? "cSvgPlugin": ""],
        function(t, e, i, n, r) {
            return {
                regStatisticsEvent: r,
                regMarketEvent: i
            }

        }),
    define("cAbstractModel", ["libs", "cCoreInherit", "cAjax", "cUtilCommon", "cUtilPath"],
        function(t, e, i, n, r) {
            var a = new e.Class({
                __propertys__: function() {
                    this.url = null,
                        this.param = null,
                        this.dataformat = null,
                        this.validates = [],
                        this.protocol = window.location.protocol.indexOf("https") > -1 ? "https": "http",
                        this.contentType = a.CONTENT_TYPE_JSON,
                        this.method = "POST",
                        this.ajaxOnly = !1,
                        this.timeout = 3e4,
                        this.ajax = null,
                        this.isAbort = !1,
                        this.onBeforeCompleteCallback = null

                },
                initialize: function(t) {
                    this.assert();
                    for (var e in t) this[e] = t[e]
                },
                assert: function() {},
                setAttr: function(t, e) {
                    this[t] = e
                },
                pushValidates: function(t) {
                    "function" == typeof t && this.validates.push($.proxy(t, this))
                },
                setParam: function(t, e) {
                    "object" != typeof t || e ? this.param[t] = e: this.param = t
                },
                getParam: function() {
                    var t;
                    return _.isObject(this.param) && (t = $.extend(!0, {},
                        this.param)),
                        t || {}
                },
                getResult: function() {
                    return this.result
                },
                getResultStore: function() {
                    return this.getResult()
                },
                buildurl: function() {
                    var t = this.url;
                    if (!n.isUrl(this.url)) {
                        var e = "m.ctrip.com",
                            i = "";
                        "http" == this.protocol && Lizard.restfullApi ? i = Lizard.restfullApi: "https" == this.protocol && Lizard.restfullApiHttps && (i = Lizard.restfullApiHttps),
                            i && n.isUrl(i) && (e = r.parseUrl(i).hostname),
                            t = this.protocol + "://" + e + "/restapi" + this.url

                    }
                    return t
                },
                appendSuffix: function(t) {
                    var e = n.getGuid();
                    if (!Lizard.isHybrid && !Lizard.isInCtripApp && e && e.indexOf("-") < 0) {
                        var i = t.indexOf("?") > -1 ? "&": "?";
                        t = t + i + "_fxpcqlniredt=" + e
                    }
                    return t
                },
                _execute: function(t, e, n, r, o) {
                    this.isAbort = !1;
                    var s = this.appendSuffix(this.buildurl()),
                        c = this,
                        u = $.proxy(function(i) {
                                function r() {
                                    require([Lizard.app.vendor.is("CTRIP") || Lizard.isHybrid ? "cHybridMember": "cWebMember"],
                                        function(t) {
                                            t.memberLogin({
                                                param: "from=" + encodeURIComponent(window.location.href)
                                            })

                                        })
                                }
                                if (this.validates && this.validates.length > 0) for (var a = 0, o = this.validates.length; o > a; a++) {
                                    var s = this.validates[a](i);
                                    if ("boolean" == typeof s) {
                                        if (!s) return "function" == typeof e ? e.call(n || this, i) : !1
                                    } else if (s && s.overdue) return void r()
                                }
                                var c = "function" == typeof this.dataformat ? this.dataformat(i) : i;
                                "function" == typeof this.onBeforeCompleteCallback && this.onBeforeCompleteCallback(c),
                                    "function" == typeof t && t.call(n || this, c, i)

                            },
                            this),
                        l = $.proxy(function(t) {
                                return c.isAbort ? (c.isAbort = !1, "function" == typeof r ? r.call(n || this, t) : !1) : void("function" == typeof e && e.call(n || this, t))
                            },
                            this),
                        d = o || this.getParam();
                    return d.contentType = this.contentType,
                        this.ajax = this.contentType === a.CONTENT_TYPE_JSON ? i.cros(s, this.method, d, u, l, this.timeout) : this.contentType === a.CONTENT_TYPE_JSONP ? i.jsonp(s, d, u, l, this.timeout) : i.post(s, d, u, l, this.timeout)

                },
                execute: function(t, e, i, n, r) {
                    this._execute(t, e, i, n, r)
                },
                abort: function() {
                    this.isAbort = !0,
                        this.ajax && this.ajax.abort && this.ajax.abort()
                }
            });
            return a.getInstance = function() {
                return this.instance instanceof this ? this.instance: this.instance = new this
            },
                a.CONTENT_TYPE_JSON = "json",
                a.CONTENT_TYPE_FORM = "form",
                a.CONTENT_TYPE_JSONP = "jsonp",
                a

        }),
    define("cModel", ["cCoreInherit", "cAbstractStore", "cHeadStore", "cAuthStore", "cUserStore", "cMarketStore", "cMobileTokenStore", "cAbstractModel", "cUtilObject", "cUtilCommon", "cMessageCenter"],
        function(t, e, i, n, r, a, o, s, c, u, l) {
            var d = new t.Class(s, {
                __propertys__: function() {
                    this.usehead = !0,
                        this.headStore = i.getInstance(),
                        this.authStore = n.getInstance(),
                        this.userStore = r.getInstance(),
                        this.mTokenStore = o.getInstance(),
                        this.salesStore = a.SalesStore.getInstance(),
                        this.headinfo = null,
                        this.result = null,
                        this.checkAuth = !0,
                        this.extension = null,
                        this.isUseH5Sys = !1

                },
                initialize: function($super, t) {
                    $super(t)
                },
                getTag: function() {
                    var t = this.getParamData();
                    return JSON.stringify(t)
                },
                getParamData: function() {
                    var t = this.param instanceof e ? this.param.get() : this.param;
                    return _.isObject(t) || (t = {}),
                        $.extend(!0, {},
                            t)
                },
                execute: function(t, i, n, r, a) {
                    var o = this.mTokenStore.get();
                    o ? this.headStore.setAttr("pauth", o) : this.headStore.removeAttr("pauth");
                    var c = u.getGuid(),
                        d = this.headStore.getAttr("cid");
                    c && c != d && this.headStore.setAttr("cid", c || ""),
                        this.headStore.setAuth(this.userStore.getAuth()),
                        Lizard.app.code.is("MASTER") || Lizard.app.code.is("YOUTH") || this.headStore.setAttr("sid", this.salesStore.getAttr("sourceid") || "8888");
                    var h = this.getParamData();
                    this.pushValidates(function(t) {
                        var e = this._getResponseHead(t);
                        return e.overdue ? {
                            overdue: e.overdue
                        }: e.success
                    });
                    var f = this.getTag(),
                        p = this.result && this.result.get(f);
                    if (!p || this.ajaxOnly || n) {
                        if ("get" !== this.method.toLowerCase() && this.usehead && this.contentType !== s.CONTENT_TYPE_JSONP) {
                            h.head = this.headStore.get() || {},
                                this.isUseH5Sys && h.head && (h.head.syscode = "09");
                            var g = this.authStore.get();
                            g && (h.head.sauth = g),
                                _.isEmpty(this.extension) || (_.isArray(this.extension) ? h.head.extension = this.extension: _.isObject(this.extension) && (h.head.extension = [], h.head.extension.push(this.extension)))
                        } else "get" === this.method.toLowerCase() || this.usehead || this.contentType === s.CONTENT_TYPE_JSONP || this.headinfo && (h.head = this.headinfo);
                        this.onBeforeCompleteCallback = function(t) {
                            if (this.result instanceof e) {
                                try {} catch(i) {}
                                this.result.set(t, f)
                            }
                        },
                                h.head && !h.head.cid ? l.subscribe("clientidGot", _.bind(function(e) {
                                h.head.cid = e,
                                    this._execute(t, i, r, a, h)
                            },
                            this)) : this._execute(t, i, r, a, h)
                    } else "function" == typeof t && t.call(r || this, p)
                },
                excute: function(t, e, i, n, r) {
                    this.execute(t, e, i, n, r)

                },
                _getResponseHead: function(t) {
                    var e = !!t.ResponseStatus,
                        i = e ? t.ResponseStatus: t.head,
                        n = !1,
                        r = !1;
                    if (e && i) {
                        var a = i.Extension;
                        if (a && a.length) {
                            var o = this;
                            _.each(a,
                                function(t) {
                                    t && "sauth" == t.Id && o.authStore.set(t.Value)
                                })
                        }
                        var s = i.Ack;
                        if ("Failure" === s || 1 == s) {
                            var c = i.Errors;
                            if (c instanceof Array && c.length > 0) for (var u, l = 0; l < c.length; l++) if (u = c[l], u && u.ErrorCode && "MobileRequestFilterException" == u.ErrorCode) {
                                this.checkAuth && (r = !0, this.headStore.setAuth(""), this.userStore.removeUser(), this.authStore.remove());
                                break
                            }
                        }
                        n = "Success" === i.Ack || "0" == i.Ack
                    } else n = i && 0 === i.errcode;
                    return {
                        success: n,
                        overdue: r
                    }
                },
                setParam: function(t, i, n) {
                    var r = {},
                        a = this.param instanceof e;
                    if (_.isObject(t) ? (r = t, _.isUndefined(n) && _.isBoolean(i) && (n = i)) : r[t] = i, n) a ? this.param.set(r) : this.param = r;
                    else for (var o in r) a ? this.param.setAttr(o, r[o]) : (null === this.param && (this.param = {}), c.set(this.param, o, r[o]))

                },
                clearResult: function() {
                    this.result && "function" == typeof this.result.remove ? this.result.remove() : this.result = null
                }
            });
            return d
        }),
    define("cUserModel", ["cCoreInherit", "cModel", "cCommonStore", "cUtilCommon"],
        function(t, e, i, n) {
            var r = i.UserStore.getInstance(),
                a = (i.HeadStore.getInstance(), {});
            return a.NotUserLoginModel = new t.Class(e, {
                __propertys__: function() {
                    this.url = "/html5/Account/NonUserLogin",
                        this.param = {},
                        this._abortres = {},
                        this.isAbort = !1

                },
                initialize: function($super, t) {
                    $super(t)
                },
                excute: function(t, e, i, n, a) {
                    var o = r.getUser();
                    if (o && o.Auth) return void("function" == typeof t && t.call(n, r.getUser()));
                    this.isAbort = !1;
                    var s = window.location.host; ("localhost" == s || s.match(/\.fat/i)) && (s = "m.fat19.qa.nt.ctripcorp.com");
                    var c = "http://" + s + this.url,
                        u = function(i) {
                            1 == i.ServerCode && i.Data ? (r.setUser(i.Data), "function" == typeof t && t.call(n, i)) : "function" == typeof e && e.call(n)

                        },
                        l = function() {
                            return this.isAbort ? ("function" == typeof a && a.call(n), void(this.isAbort = !1)) : void("function" == typeof e && e.apply(n, arguments))
                        };
                    this._abortres = $.ajax({
                        type: "get",
                        url: c,
                        dataType: "json",
                        crossDomain: !0,
                        success: $.proxy(u, this),
                        error: $.proxy(l, this),
                        timeout: 25e3
                    })
                },
                abort: function() {
                    this.isAbort = !0,
                        this._abortres && "function" == typeof this._abortres.abort && this._abortres.abort()

                }
            }),
                a.UserLoginModel = new t.Class(e, {
                    __propertys__: function() {
                        this.param = {},
                            this.contentType = "jsonp",
                            this.url = "CrossDomainGetTicket/ajax/ajaxgetticket.ashx",
                            this._abortres = {},
                            this.isAbort = !1
                    },
                    initialize: function($super, t) {
                        $super(t)
                    },
                    buildurl: function() {
                        var t = window.location.host,
                            e = "accounts.ctrip.com";
                        return t.match(/^m\.ctrip\.com/i) ? e = "accounts.ctrip.com": t.match(/\.uat\.qa/i) ? e = "accounts.uat.qa.nt.ctripcorp.com": (t.match(/\.fat/i) || t.match(/\.lpt/i) || t.match(/\.fws/i) || t.match(/^(localhost|172\.16|127\.0)/i)) && (e = "accounts.fat49.qa.nt.ctripcorp.com"),
                            ["https://", e, "/", this.url].join("")
                    },
                    excute: function(t, e, i, n, r) {
                        this.isAbort = !1;
                        var a = this.buildurl(),
                            o = function(i) {
                                "0" == i.RetCode && i.UserData ? "function" == typeof t && t.call(n, i.UserData) : "function" == typeof e && e.call(n)
                            },
                            s = function() {
                                return this.isAbort ? ("function" == typeof r && r.call(n), void(this.isAbort = !1)) : void("function" == typeof e && e.apply(n, arguments))
                            };
                        this._abortres = $.ajax({
                            type: "get",
                            url: a,
                            dataType: "jsonp",
                            data: this.param,
                            crossDomain: !0,
                            jsonpCallback: "callbackfn",
                            success: $.proxy(o, this),
                            error: $.proxy(s, this),
                            timeout: 5e4
                        })

                    },
                    abort: function() {
                        this.isAbort = !0,
                            this._abortres && "function" == typeof this._abortres.abort && this._abortres.abort()
                    }
                }),
                a.ThirdPartInfoModel = new t.Class(e, {
                    __propertys__: function() {
                        this.param = {},
                            this.url = "10448/GetThirdPartMembers.json"
                    },
                    initialize: function($super, t) {
                        $super(t),
                            this.baseurl = this.seturl()

                    },
                    seturl: function() {
                        var t = window.location.host,
                            e = "/restapi/soa2/",
                            i = "m.ctrip.com";
                        return t.match(/^m\.ctrip\.com/i) ? i = "m.ctrip.com": t.match(/\.uat\.qa/i) ? i = "gateway.m.uat.qa.nt.ctripcorp.com": t.match(/(\.fws|\.fat|\.lpt|localhost|172\.16|127\.0)/i) && (i = "gateway.m.fws.qa.nt.ctripcorp.com"),
                        {
                            domain: i,
                            path: e
                        }

                    },
                    buildurl: function() {
                        return n.isUrl(this.url) ? this.url: [this.protocol, "://", this.baseurl.domain, this.baseurl.path, this.url].join("")
                    }
                }),
                a.ClientIdModel = new t.Class(e, {
                    __propertys__: function() {
                        this.param = {
                            systemcode: "09",
                            createtype: 3
                        },
                            this.method = "get",
                            this.url = "10290/createclientid"
                    },
                    initialize: function($super, t) {
                        $super(t),
                            this.baseurl = this.seturl()

                    },
                    seturl: function() {
                        var t = window.location.host,
                            e = "/restapi/soa2/",
                            i = "m.ctrip.com",
                            n = "http" == this.protocol ? !0: !1;
                        return t.match(/^(m|accounts|secure)\.ctrip\.com/i) ? i = n ? "m.ctrip.com": "sec-m.ctrip.com": t.match(/\.uat\.qa/i) ? i = "gateway.m.uat.qa.nt.ctripcorp.com": t.match(/(\.fws|\.fat|\.lpt|localhost|172\.16|127\.0)/i) && (i = "gateway.m.fws.qa.nt.ctripcorp.com"),
                        {
                            domain: i,
                            path: e
                        }

                    },
                    buildurl: function() {
                        return n.isUrl(this.url) ? this.url: [this.protocol, "://", this.baseurl.domain, this.baseurl.path, this.url].join("")
                    }
                }),
                a.GetUserModel = new t.Class(e, {
                    __propertys__: function() {
                        this.param = {},
                            this.url = "10090/GetUserInfoToH5.json"
                    },
                    initialize: function($super, t) {
                        $super(t),
                            this.baseurl = this.seturl()

                    },
                    seturl: function() {
                        var t = window.location.host,
                            e = "/restapi/soa2/",
                            i = "m.ctrip.com";
                        return t.match(/^m\.ctrip\.com/i) ? i = "m.ctrip.com": t.match(/\.uat\.qa/i) ? i = "gateway.m.uat.qa.nt.ctripcorp.com": t.match(/(\.fws|\.fat|\.lpt|localhost|172\.16|127\.0)/i) && (i = "gateway.m.fws.qa.nt.ctripcorp.com"),
                        {
                            domain: i,
                            path: e
                        }

                    },
                    buildurl: function() {
                        return n.isUrl(this.url) ? this.url: [this.protocol, "://", this.baseurl.domain, this.baseurl.path, this.url].join("")
                    }
                }),
                a
        }),
    define("cGuiderService", [Lizard.app.code.is("MASTER") || Lizard.app.code.is("YOUTH") || Lizard.isHybrid ? "cHybridGuider": "cWebGuider", Lizard.app.code.is("GS") || Lizard.app.code.is("WE") ? "cHybridFacade": ""],
        function(t, e) {
            var i = ["jump", "apply", "call", "init", "log", "print", "callService", "backToLastPage", "checkUpdate", "recommend", "addWeixinFriend", "showNewestIntroduction", "register", "create", "home", "jumpHotel", "checkAppInstall", "callPhone", "cross", "refreshNative", "copyToClipboard", "readFromClipboard", "shareToVendor", "downloadData", "encode", "chooseContactFromAddressbook", "hideLoadingPage", "showLoadingPage", "choose_invoice_title", "get_device_info", "show_voice_search", "choose_photo", "finished_register", "app_call_system_share", "app_check_network_status", "app_check_android_package_info", "app_log_google_remarkting", "app_read_verification_code_from_sms", "app_h5_page_finish_loading", "registerAppearEvent", "unregisterAppearEvent", "save_photo", {
                    file: ["isFileExist", "deleteFile", "getCurrentSandboxName", "getFileSize", "makeDir", "readTextFromFile", "writeTextToFile"]
                },
                    {
                        pipe: ["socketRequest", "httpRequest", "abortRequest", "abortSocketRequest"]
                    },
                    {
                        pay: ["checkStatus", "payOut", "callPay"]
                    },
                    {
                        encrypt: ["ctrip_encrypt", "ctrip_decrypt"]
                    }],
                n = {},
                r = function() {
                    return ! 1

                };
            return _.each(i,
                function(t) {
                    if (_.isString(t)) n[t] = "create" == t && (Lizard.app.code.is("GS") || Lizard.app.code.is("WE")) ?
                        function() {
                            e.init()
                        }: r;
                    else if (_.isObject(t)) {
                        var i = _.keys(t);
                        _.each(i,
                            function(e) {
                                n[e] = {},
                                    _.each(t[e],
                                        function(t) {
                                            n[e][t] = r
                                        })
                            })
                    }
                }),
                _.extend(n, t),
                n
        }),
    define("cPageView", ["libs", !Lizard.app.vendor.is("CTRIP") && !Lizard.isHybrid || Lizard.app.code.is("WE") ? "UIHeader": "cHybridHeader", "cGuiderService"],
        function(t, e, i) {
            var n = Backbone.View.extend({
                scrollPos: {
                    x: 0,
                    y: 0
                },
                header: null,
                pageid: 0,
                hpageid: 0,
                scrollZero: !0,
                triggerShow: !0,
                triggerHide: !0,
                initialize: function() {
                    this.id = this.$el.attr("id"),
                        this.create()

                },
                _createHeader: function() {
                    var t = $("#headerview");
                    this.header = this.headerview = new e({
                        root: t,
                        wrapper: t
                    })
                },
                create: function() {
                    if (this.onCreate && this.onCreate(), _.isArray(this.defferModules)) {
                        var t,
                            e = !0,
                            i = this;
                        _.each(this.events,
                            function(n, r) {
                                _.isFunction(n) || (n = i[n]),
                                    i.events[r] = function(r) {
                                        return e ? (i.showLoading(), void(t = {
                                            method: n,
                                            event: r
                                        })) : (i.hideLoading(), void n.apply(i, arguments))

                                    }
                            }),
                            setTimeout(_.bind(function() {
                                    require(this.defferModules, _.bind(function() {
                                            e = !1,
                                                _.isFunction(this.defferModuleCallback) && this.defferModuleCallback.apply(this, arguments),
                                                _.isObject(t) && (t.method.apply(this, [t.event]), i.hideLoading())
                                        },
                                        this))
                                },
                                this), 1)
                    }
                },
                destroy: function() {
                    this.$el.remove()
                },
                show: function() {
                    document.activeElement && document.activeElement.blur(),
                        this._createHeader(),
                        this.switchByOut || this.$el.show(),
                        this.triggerShow && this.onShow && this.onShow(),
                        this.onAfterShow && this.onAfterShow(),
                        i.registerAppearEvent(_.bind(this.onAppearHandler, this)),
                        Lizard.app.vendor.is("CTRIP") && 1 == history.length && (this.__appeartimeout = setTimeout(_.bind(this.onAppearHandler, this), Lizard.config.appearTimeout || 1e3)),
                        this.onBottomPull && (this._onWidnowScroll = $.proxy(this.onWidnowScroll, this), this.addScrollListener()),
                        this.scrollZero && window.scrollTo(0, 0),
                        this.triggerShow = !0,
                        this.triggerHide = !0,
                        this.addScrollListener && this.addScrollListener()

                },
                hide: function() {
                    i.unregisterAppearEvent(),
                        this.triggerHide && this.onHide && this.onHide(),
                        this.removeScrollListener && this.removeScrollListener(),
                        this.$el.hide()
                },
                onAppear: function() {},
                onAppearHandler: function(t) {
                    clearTimeout(this.__appeartimeout),
                        t && t.callbackString && this.sendUbt(),
                        this.onAppear(t)
                },
                jump: function(t) {
                    _.isString(t) ? window.location.href = t: i.jump(t)

                },
                cross: function(t, e) {
                    Lizard.jump(t, e)
                },
                forward: function() {
                    Lizard.forward.apply(null, arguments)
                },
                back: function() {
                    Lizard.back.apply(null, arguments)
                },
                refresh: function() {},
                getAppUrl: function() {
                    return ""
                },
                getQuery: function(t) {
                    return Lizard.P(t)
                },
                saveScrollPos: function() {
                    this.scrollPos = {
                        x: window.scrollX,
                        y: window.scrollY
                    }

                },
                restoreScrollPos: function() {
                    window.scrollTo(this.scrollPos.x, this.scrollPos.y)
                },
                turning: function() {},
                showMessage: function(t) {
                    Lizard.showMessage(t)
                },
                hideMessage: function() {
                    Lizard.hideMessage()
                },
                showConfirm: function(t) {
                    Lizard.showConfirm(t)
                },
                hideConfirm: function() {
                    Lizard.hideConfirm()
                },
                showWarning404: function(t) {
                    Lizard.showWarning404(t)

                },
                hideWarning404: function() {
                    Lizard.hideWarning404()
                },
                showToast: function(t) {
                    Lizard.showToast(t)
                },
                hideToast: function() {
                    Lizard.hideToast()
                },
                showLoading: function(t) {
                    Lizard.showLoading(t)
                },
                hideLoading: function(t) {
                    Lizard.hideLoading(t)
                },
                setTitle: function(t) {
                    document.title = t
                },
                sendUbt: function() {
                    Lizard.sendUbt(this)

                }
            });
            return n
        }),
    define("cUIBase", [],
        function() {
            var t = {};
            return t.config = {
                prefix: "cui-"
            },
                t.setConfig = function(e, i) {
                    t.config[e] = i
                },
                t.getElementPos = function(t) {
                    var e = 0,
                        i = 0;
                    do e += t.offsetTop,
                        i += t.offsetLeft;
                    while (t = t.offsetParent);
                    return {
                        top: e,
                        left: i
                    }
                },
                t.getCreateId = function() {
                    var e = (new Date).getTime();
                    return function() {
                        return t.config.prefix + ++e

                    }
                } (),
                t.getBiggerzIndex = function() {
                    var t = 3e3;
                    return function() {
                        return++t
                    }
                } (),
                t.getCurStyleOfEl = function(t, e) {
                    if (document.defaultView && document.defaultView.getComputedStyle) return document.defaultView.getComputedStyle(t).getPropertyValue(e);
                    if (t.currentStyle) {
                        for (var i, n = e.split("-"), r = [], a = 0; a < n.length; a++) 0 === a ? r.push(n[a]) : (i = n[a].split(""), i[0] = i[0].toUpperCase(), r.push(i.join("")));
                        return r = r.join(""),
                            t.currentStyle[r]
                    }
                },
                t.bindthis = function(t, e) {
                    return function() {
                        t.apply(e, arguments)
                    }
                },
                t.strToNum = function(t) {
                    var e = parseInt(t.replace(/[a-z]/i, ""));
                    return isNaN(e) ? 0: e
                },
                t.getElementRealSize = function(t) {
                    var e = $(t);
                    return {
                        width: e.width(),
                        height: e.height()
                    }
                },
                t.getPageSize = function() {
                    var t = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
                        e = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                    return {
                        width: t,
                        height: e
                    }
                },
                t.getPageScrollPos = function() {
                    var t = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
                        e = Math.max(document.documentElement.scrollTop, document.body.scrollTop),
                        i = Math.min(document.documentElement.clientHeight, document.body.clientHeight),
                        n = Math.min(document.documentElement.clientWidth, document.body.clientWidth),
                        r = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
                        a = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                    return {
                        top: e,
                        left: t,
                        height: i,
                        width: n,
                        pageWidth: r,
                        pageHeight: a
                    }
                },
                t.getMousePos = function(t) {
                    var e = Math.max(document.body.scrollTop, document.documentElement.scrollTop),
                        i = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
                    return {
                        top: e + t.clientY,
                        left: i + t.clientX
                    }
                },
                t.getMousePosOfElement = function(e, i) {
                    var n = t.getMousePos(e),
                        r = t.getElementPos(i),
                        a = i.clientWidth,
                        o = i.clientHeight,
                        s = n.left - r.left,
                        c = n.top - r.top;
                    return s = 0 > s ? 0: s > a ? a: s,
                        c = 0 > c ? 0: c > o ? o: c,
                    {
                        x: s,
                        y: c
                    }
                },
                t.createElement = function(t, e) {
                    var i,
                        n,
                        r = document.createElement(t);
                    if (e) for (i in e) switch (i) {
                        case "attr":
                            if ("object" == typeof e[i]) for (n in e[i]) null !== e[i][n] && r.setAttribute(n, e[i][n]);
                            break;
                        case "styles":
                            if ("object" == typeof e[i]) for (n in e[i]) null !== e[i][n] && (r.style[n] = e[i][n]);
                            break;
                        case "id":
                            r.id = e[i];
                            break;
                        case "class":
                            r.className = e[i];
                            break;
                        case "html":
                            r.innerHTML = e[i]
                    }
                    return r
                },
                t
        }),
    define("cPageList", ["cPageView", "cUIBase"],
        function(t, e) {
            var i = t.extend({
                _onWidnowScroll: null,
                __isComplete__: !1,
                __isLoading__: !1,
                refreshLoading: null,
                addScrollListener: function() {
                    this.__isComplete__ = !1,
                        this.__isLoading__ = !1,
                        this._onWidnowScroll && $(window).bind("scroll", this._onWidnowScroll);
                    var t = this;
                    this.onTopPull && _.flip(this.$el, "down",
                        function() {
                            var i = e.getPageScrollPos();
                            i.top <= 10 && !t.__isLoading__ && (t.__isLoading__ = !0, t.onTopPull())
                        },
                        function(t) {
                            var i = e.getPageScrollPos();
                            return "down" != t || i.top >= 10
                        },
                        0, 5)
                },
                removeScrollListener: function() {
                    $(window).unbind("scroll", this._onWidnowScroll),
                        this.refreshLoading && (this.refreshLoading.remove(), this.refreshLoading = null),
                        _.flipDestroy(this.$el)

                },
                onWidnowScroll: function() {
                    var t = e.getPageScrollPos();
                    if ("0" != t.top) {
                        var i = t.pageHeight - (t.top + t.height);
                        81 >= i && !this.__isComplete__ && !this.__isLoading__ && (this.__isLoading__ = !0, this.onBottomPull && this.onBottomPull())
                    }
                },
                endPull: function() {
                    this.__isLoading__ = !1
                },
                closePull: function() {
                    this.__isComplete__ = !1

                },
                openPull: function() {
                    this.__isComplete__ = !0
                },
                showTopLoading: function() {
                    var t = t || this.$el.find("section");
                    t.length > 0 && (t.before(this.getLoading()), this.refreshLoading.show())
                },
                showBottomLoading: function() {
                    this.$el.append(this.getLoading()),
                        this.refreshLoading.show()
                },
                hideBottomLoading: function() {
                    this.hideRefreshLoading()

                },
                hideRefreshLoading: function() {
                    this.refreshLoading && this.refreshLoading.hide(),
                        this.__isLoading__ = !1
                },
                getLoading: function() {
                    return this.refreshLoading || (this.refreshLoading = $('<div class="cui-zl-load" id="zlLoading"> <div class="cui-i cui-b-loading"></div><div class="cui-i  cui-mb-logo"></div> <p>加载中</p></div>')),
                        this.refreshLoading

                }
            });
            return i
        }),
    define("cGeoLocation", ["cWebGeolocation", Lizard.app.code.is("MASTER") || Lizard.app.code.is("YOUTH") || Lizard.isHybrid ? "cHybridGeolocation": ""],
        function(t, e) {
            return _.isUndefined(e) ? t: _.extend(t, e)
        }),
    define("cGeoService", ["cUtilPerformance", "cLocalStore", "cCoreInherit", "cGuiderService", Lizard.app.code.is("MASTER") || Lizard.app.code.is("YOUTH") || Lizard.isHybrid ? "cHybridGeolocation": "cWebGeolocation"],
        function(t, e, i, n, r) {
            var a = {},
                o = {},
                s = "0b895f63ca21c9e82eb158f46fe7f502",
                c = i.Class(e, {
                    __propertys__: function() {
                        this.key = "POSITION_CITY",
                            this.lifeTime = "10M"

                    },
                    initialize: function($super, t) {
                        $super(t)
                    }
                }),
                u = c.getInstance();
            return o.requestAMapAround = function(e, i, n, r, a) {
                var o = t.getUuid();
                t.group(o, {
                    name: "GeoRequest",
                    url: "http://restapi.amap.com/v3/place/around",
                    type: "AMap service"
                });
                var c = "121.473704,31.230393";
                e && i && (c = e + "," + i);
                var u = $.param({
                    location: c,
                    key: s,
                    radius: 500,
                    offset: 4,
                    page: 1
                });
                a = a || 8e3,
                    $.ajax({
                        url: "http://restapi.amap.com/v3/place/around?" + u,
                        dataType: "jsonp",
                        success: function(e) {
                            t.groupEnd(o);
                            var i = e && e.pois || [];
                            n && n(i)
                        },
                        error: function(e) {
                            t.groupEnd(o),
                                r && r(e)
                        },
                        timeout: a
                    })
            },
                o.requestAMapKeyword = function(e, i, n, r, a) {
                    var o = t.getUuid();
                    t.group(o, {
                        name: "GeoRequest",
                        url: "http://restapi.amap.com/v3/place/text",
                        type: "AMap service"
                    });
                    var c = $.param({
                        keywords: e,
                        city: i,
                        key: s,
                        offset: 10,
                        page: 1,
                        extensions: "all"
                    });
                    a = a || 8e3,
                        $.ajax({
                            url: "http://restapi.amap.com/v3/place/text?" + c,
                            dataType: "jsonp",
                            success: function(e) {
                                t.groupEnd(o);
                                var i = e && e.pois || [];
                                n && n(i)
                            },
                            error: function(e) {
                                t.groupEnd(o),
                                    r && r(e)
                            },
                            timeout: a
                        })
                },
                _.extend(o, r),
                a.GeoLocation = function() {
                    function t(t, e, i) {
                        for (var n in s) s[n] && "function" == typeof s[n][t] && s[n][t].apply(s[n].scope, e);
                        i && (s = {})
                    }
                    var e = 0,
                        i = 1,
                        r = 2,
                        a = 3,
                        s = {},
                        c = e,
                        l = null;
                    return {
                        Subscribe: function(e, d, h, f, p) {
                            d = d || {},
                                s[e] || (s[e] = {
                                name: e,
                                onStart: d.onStart,
                                onComplete: d.onComplete,
                                onError: d.onError,
                                onPosComplete: d.onPosComplete,
                                onPosError: d.onPosError,
                                onCityComplete: d.onCityComplete,
                                onCityError: d.onCityError,
                                scope: h
                            });
                            var g = u.get();
                            if (f && (g = null), g && g.posinfo && g.cityInfo) c = i,
                                t("onStart", null),
                                c = r,
                                t("onPosComplete", [g.posinfo.lng, g.posinfo.lat]),
                                t("onComplete", [g.posinfo]),
                                t("onCityComplete", [g.cityInfo], !0);
                            else {
                                if (clearTimeout(l), l = setTimeout(function() {
                                        c === i && (c = a, n.print({
                                            log: "#cGeoService -- 22 second timeout call onError"
                                        }), t("onError", [null], !0))

                                    },
                                        p || 35e3), c === i) return void(s[e] && "function" == typeof s[e].onStart && s[e].onStart.call(h));
                                c = i,
                                    t("onStart", null),
                                    n.print({
                                        log: "#cGeoService -- start request city info"
                                    }),
                                    o.requestCityInfo(function(e) {
                                            g || (g = {}),
                                                g.posinfo = e,
                                                (!Lizard.app.code.is("MASTER") || Lizard.app.code.is("YOUTH")) && u.set(g),
                                                t("onComplete", [e])

                                        },
                                        function(e, i) {
                                            c = a,
                                                "number" == typeof i && 2 === i && (i = {
                                                code: 1
                                            }),
                                                n.print({
                                                    log: "#cGeoService -- locate onError"
                                                }),
                                                t("onError", [e, i], !0)
                                        },
                                        function(e, i) {
                                            t("onPosComplete", [e, i])
                                        },
                                        function(e, i) {
                                            c = a,
                                                "number" == typeof i && 2 === i && (i = {
                                                code: 1
                                            }),
                                                t("onPosError", [e, i], !0)
                                        },
                                        !0,
                                        function(e) {
                                            c = r,
                                                g || (g = {}),
                                                g.cityInfo = e,
                                                (!Lizard.app.code.is("MASTER") || Lizard.app.code.is("YOUTH")) && u.set(g),
                                                t("onCityComplete", [e], !0)

                                        },
                                        function(e, i) {
                                            c = a,
                                                "number" == typeof i && 2 === i && (i = {
                                                code: 1
                                            }),
                                                n.print({
                                                    log: "#cGeoService -- locate onError"
                                                }),
                                                t("onCityError", [e, i], !0)
                                        },
                                        d.isForceLocate)
                            }
                        },
                        UnSubscribe: function(t) {
                            t = _.isArray(t) ? t: [t];
                            for (var e = 0; e < t.length; e++) delete s[t[e]]
                        },
                        ClearPosition: function() {
                            u.remove()
                        }
                    }
                } (),
                a.GeoAround = function() {
                    return {
                        Subscribe: function(t, e, i, n) {
                            var r = t.split(",")[0],
                                a = t.split(",")[1];
                            o.requestAMapAround(r, a,
                                function(t) {
                                    e.call(n, t)
                                },
                                function() {
                                    i.call(n)
                                })
                        }
                    }
                } (),
                a.GeoKeyword = {
                    Subscribe: function(t, e, i, n, r) {
                        o.requestAMapKeyword(t, e,
                            function(t) {
                                i.call(r, t)
                            },
                            function() {
                                n.call(r)
                            })
                    }
                },
                a
        }),
    define("cMemberService", [Lizard.app.vendor.is("CTRIP") || Lizard.isHybrid ? "cHybridMember": "cWebMember", "cUserStore"],
        function(t, e) {
            var i = e.getInstance();
            return t.isLogin = function() {
                return i.isLogin()
            },
                t.getUser = function() {
                    return i.getUser()
                },
                t.getUserName = function() {
                    return i.getUserName()
                },
                t.getUserId = function() {
                    return i.getUserId()
                },
                t
        }),
    define("cGeoHelper", [],
        function() {
            var t = {
                Aboard: 2,
                Domestic: 1,
                Unknown: -1,
                aroundAboardRectList: [[125478833, 40538425, 135928497, 16590043], [128054454, 54437790, 136370032, 49918776], [89567309, 54351906, 115617882, 47881407], [71832315, 54566279, 82281980, 46323836], [72788974, 28001436, 85887850, 16590043], [92510877, 48029708, 111570476, 45034268], [85593493, 26157025, 97294174, 16519064], [97073406, 20935216, 107743838, 16305964], [98324422, 45190596, 109142033, 42854577], [71979493, 45863038, 78896877, 41817208]],
                chinaRectList: [[85374342, 41697126, 124486996, 28705892], [98942349, 28714002, 122527683, 23331042], [108012216, 23415965, 119252965, 17294543], [120025651, 51286036, 126391116, 41330674], [82936701, 46727439, 90553182, 41621242], [126188746, 48211817, 129757821, 42485061], [129518656, 47611932, 131468770, 44959641], [131376782, 47487374, 133805226, 46225387], [79753968, 41876130, 85604309, 30872189], [113457816, 44802677, 120117638, 41517618], [118977005, 23526282, 121975765, 21629857], [109667973, 17321053, 119050594, 14580095], [76258482, 40359687, 80011530, 35915704], [90534784, 44710915, 94030271, 41531444], [80710628, 45077082, 83028687, 41862379], [85935460, 48414308, 88437492, 46645143], [93975079, 42559912, 101462779, 41600531], [93956681, 44157262, 95354876, 42491869], [116695740, 46301949, 120117638, 44619006], [116401384, 49444657, 120191227, 48057877], [121000708, 53244099, 124569783, 51210984], [106724405, 42232628, 113494611, 41683336], [112133211, 44355602, 113568200, 42123151], [110918989, 43155464, 112206800, 42232628], [115150367, 45324216, 116769330, 44724032], [126299129, 49588397, 128102064, 48057877], [128065270, 49131761, 129757821, 48131826], [129721026, 48622090, 130530508, 47611932], [124349016, 52822665, 125710416, 51095279], [122325313, 28884167, 123760302, 25662561], [111029373, 14651757, 118388292, 10605300], [109778357, 10095218, 109778357, 10095218], [109631178, 10459649, 116548562, 7753573], [110514249, 7826971, 113678584, 4734480], [124330619, 41399976, 125480450, 40689610], [126345123, 42512290, 128046872, 41827986], [127973283, 42539507, 129104717, 42143692], [74510739, 40162360, 76350468, 38678393], [119087389, 21629857, 120706351, 20142916], [106853187, 23339537, 108067408, 21990651], [129707229, 44975967, 130985841, 43017244], [130958245, 44582859, 131169814, 43104932], [131418176, 46247729, 133129126, 45359896], [133073934, 48054793, 134269758, 47409374], [99701237, 23386249, 101577762, 22174986], [100179567, 22243514, 101559364, 21745927], [101485775, 23437187, 104245370, 22875776], [98008686, 25240784, 99057332, 24181992], [124463999, 40686109, 124905534, 40461646], [125457453, 41334141, 126055365, 40979564], [126368119, 41824546, 126607284, 41645397], [125475850, 40979564, 125687419, 40853958], [124477797, 40465160, 124728460, 40343852], [124470898, 40347371, 124618076, 40285757], [124891736, 40694862, 125153898, 40607283], [126046166, 41332407, 126262335, 41165784], [127214395, 41836586, 128083666, 41546995], [126386516, 50257998, 126386516, 50257998], [126280732, 50257998, 127513351, 49580921], [126363520, 50934256, 127117809, 50225552], [125669022, 52398490, 126276133, 51247082], [80948643, 30905163, 81403976, 30280446], [83574857, 30911112, 85488176, 29214825], [98136317, 28872274, 99079179, 27642374]],
                largeChinaRect: [73083331, 54006559, 135266195, 17015367],
                isInRect: function(t, e, i) {
                    return t >= i[0] && t <= i[2] && e >= i[3] && e <= i[1] ? !0: !1

                },
                isInRectList: function(t, e, i) {
                    for (var n, r = 0; r < i.length - 1; r++) if (n = i[r], this.isInRect(t, e, n)) return ! 0;
                    return ! 1
                },
                getCountry: function(t, e) {
                    var i = this.Unknown,
                        n = 1e6 * e,
                        r = 1e6 * t,
                        a = !this.isInRect(r, n, this.largeChinaRect);
                    if (a || (a = this.isInRectList(r, n, this.aroundAboardRectList)), a) i = this.Aboard;
                    else {
                        var o = this.isInRectList(r, n, this.chinaRectList);
                        o && (i = this.Domestic)
                    }
                    return i
                }
            };
            return t
        }),
    define("cStatic", [],
        function() {
            var t = document.getElementsByTagName("script")[0],
                e = new Date,
                i = "?v=" + e.getFullYear() + e.getMonth() + "_" + e.getDate() + ".js",
                n = document.createElement("script");
            n.type = "text/javascript",
                n.charset = "utf-8",
                n.async = !0;
            var r = n.cloneNode(!0);
            if (r.src = "//webresource.c-ctrip.com/ResMarketOnline/R2/js/aFrame/aSlider.min.js" + i, t.parentNode.insertBefore(r, t), !(window.$_bf && window.$_bf.loaded || window.$LAB || window.CtripJsLoader)) {
                var a = /_bfa\.min\.js/i;
                _.some($("SCRIPT"),
                    function(t) {
                        return a.test(t.src)
                    }) || (r = n.cloneNode(!0), r.src = "//webresource.c-ctrip.com/code/ubt/_mubt.min.js" + i, t.parentNode.insertBefore(r, t))

            }
        }),
    define("cPadExtend", ["cMessageCenter"],
        function(t) {
            var e = {
                initialize: function($super, e) {
                    if ($super(e), this.isPad = $(window).width() >= 850 || $(window).height() >= 850, this.currentAlpha = 0, this.horizontal = $(window).width() >= 850, this.isPad) if ($("html").addClass("padview"), this.headerView.root.addClass("padview-w1"), this.childViewport = $('<DIV class="child-viewport padview-right"></DIV>').insertAfter(this.viewport), this.viewport.addClass("padview-left"), /iP(ad|hone|od)/.test(navigator.userAgent)) window.addEventListener("orientationchange", _.bind(function() {
                            this.horizontal = 90 == Math.abs(window.orientation),
                                this._setViewLayout()

                        },
                        this));
                    else {
                        var i = this.__getCurrentAlpha = _.bind(this._getCurrentAlpha, this);
                        setInterval(function() {
                                window.addEventListener("deviceorientation", i)
                            },
                            400)
                    }
                    t.subscribe("moveView",
                        function() {
                            if (this.horizontal && (this._mainCurview && _.isString(this._mainCurview.config.subViewUrl) || this.targetViewport[0] == this.childViewport[0])) {
                                var t = _.filter(this.views,
                                    function(t) {
                                        return "none" != t.$el.css("display")

                                    });
                                t.length >= 1 && _.each(t, _.bind(function(t) {
                                        t.$el.parent()[0] == this.childViewport[0] ? (t.$el.appendTo(this.viewport), Lizard.isHybrid ? (this.endObserver(), window.location.hash = t.$el.attr("page-url")) : history.pushState({
                                                url: t.$el.attr("page-url"),
                                                text: t.text,
                                                options: {
                                                    pushState: !0
                                                }
                                            },
                                            document.title, t.$el.attr("page-url"))) : t.$el.appendTo(this.childViewport)

                                    },
                                    this))
                            }
                        },
                        this);
                    var n = this.headerView.constructor.prototype.set,
                        r = this.headerView.constructor.prototype.show,
                        a = this;
                    this.headerView.constructor.prototype.set = function() {
                        a.targetViewport == a.viewport && n.apply(this, arguments)
                    },
                        this.headerView.constructor.prototype.show = function() {
                            a.targetViewport == a.viewport && r.apply(this, arguments)

                        }
                },
                _setViewLayout: function() {
                    this.childViewport.css(this.horizontal && (this._mainCurview && _.isString(this._mainCurview.config.subViewUrl) || this.targetViewport == this.childViewport) ? {
                        display: "block"
                    }: {
                        display: "none"
                    });
                    var t = this.horizontal;
                    _.each(this.views,
                        function(e) {
                            e.horizontal = t
                        })
                },
                goTo: function($super, e, i) {
                    if (this.targetViewport = this.viewport, this.isPad && this.horizontal) {
                        if (i && _.isObject(i.notify) && this.views[i.notify.name] && _.isFunction(this.views[i.notify.name][i.notify.method])) return void this.views[i.notify.name][i.notify.method].apply(this.views[i.notify.name], i.notify.params);
                        i && i.renderChild ? (this.targetViewport = this.childViewport, this._setViewLayout()) : i && _.isString(i.subViewUrl) && (this._subViewUrl = i.subViewUrl, t.subscribe("switchview", this._showSubView, this))
                    }
                    $super(e, i)
                },
                subViewBack: function() {
                    var t = _.find(this.instance.childViewport.children(),
                        function(t) {
                            return "none" != $(t).css("display")

                        });
                    if (t) {
                        var e = this.instance.views[$(t).data("view-name")];
                        e.referrer && this.instance.views[e.referrer].$el.parent()[0] == this.instance.childViewport[0] && (this.instance.lastView = e, this.instance.curView = this.instance.views[e.referrer], this.instance.switchView(this.instance.views[e.referrer], e), this.instance.views[e.referrer].referrer = this.instance.views[e.referrer].fromView)

                    }
                },
                _showSubView: function() {
                    t.unsubscribe("switchview", this._showSubView),
                        setTimeout(_.bind(function() {
                                this.goTo(this._subViewUrl, {
                                    renderChild: 1
                                }),
                                    delete this._subViewUrl
                            },
                            this), 600)
                },
                loadView: function($super, t, e, i) {
                    this.currentUrl = t,
                        $super(t, e, i)
                },
                _getCurrentAlpha: function(t) {
                    window.removeEventListener("deviceorientation", this.__getCurrentAlpha),
                        (Math.abs(this.currentAlpha - t.alpha) < 10 || Math.abs(this.currentAlpha - t.alpha - 360) < 10) && (this.horizontal = $(window).width() > $(window).height(), this._setViewLayout()),
                        this.currentAlpha = t.alpha

                },
                showView: function($super, t) {
                    this.targetViewport = this.viewport,
                        $super(t)
                },
                switchView: function($super, t, e) {
                    $super(t, e),
                        e && e.$el.parent()[0] != t.$el.parent()[0] && (t && t.$el && _.each(t.$el.parent().children(),
                        function(e) {
                            e != t.$el[0] && $(e).hide()
                        }), this.targetViewport == this.childViewport && e && e.$el && _.each(e.$el.parent().children(),
                        function(t) {
                            t == e.$el[0] && setTimeout(function() {
                                    e.show()

                                },
                                30)
                        })),
                        this.isPad && this.horizontal && (_.isString(t.config.subViewUrl) && _.isUndefined(this._subViewUrl) && setTimeout(_.bind(function() {
                            this.goTo(t.config.subViewUrl, {
                                renderChild: 1
                            })
                        },
                        this), 600), t.$el.parent()[0] == this.viewport[0] && (_.isString(t.config.subViewUrl) && _.isUndefined(this._subViewUrl) && _.each(this.childViewport.children(),
                        function(e) {
                            $(e).attr("page-url") == t.config.subViewUrl ? $(e).show() : $(e).hide()

                        }), this._mainCurview = t, this._setViewLayout()))
                },
                _loadViewByOptions: function($super, t, e, i) {
                    this.targetViewport == this.viewport ? $super(t, e, i) : this.loadView(t, e, {
                        pushState: !0
                    })
                },
                judgeForward: function($super, t) {
                    return this.currentUrl == t
                },
                showHisCtnrView: function($super, t, e, i) {
                    this._mainCurview != this.curView && (i ? i.addToHistory = !1: i = {
                        addToHistory: !1
                    }),
                        $super(t, e, i)

                },
                hideHisCtnrView: function($super) {
                    this._mainCurview != this.curView ? Lizard.subViewBack() : $super()
                },
                switchActionView: function(t) {
                    var e = _.find(this.instance.views,
                        function(e) {
                            return e.config.viewName == t
                        });
                    e && (Lizard.P.lizParam = e.lizParam, Lizard.T.lizTmpl = e.lizTmpl)
                },
                restoreActionView: function() {
                    this.switchActionView(this.instance.curView.config.viewName)

                }
            };
            return Lizard.switchActionView = e.switchActionView,
                Lizard.restoreActionView = e.restoreActionView,
                Lizard.subViewBack = e.subViewBack,
                e
        }),
    define("cBaseInit", ["cPlugins", "cCoreInherit", Lizard.isHybrid ? "cHybridApp": Lizard.app.code.is("MASTER") || Lizard.app.code.is("YOUTH") ? "cWebViewApp": "cWebApp", "cPadExtend", "cGuiderService"],
        function(t, e, i, n, r) {
            function a() {
                Lizard.config.version && require.config({
                    urlArgs: Lizard.config.version
                }),
                    Lizard.pdConfig ? require(Lizard.pdConfig,
                        function() {
                            o()

                        }) : o()
            }
            function o() {
                Lizard.instance = new i({});
                for (var e in Lizard.instance["interface"]()) Lizard[e] = $.proxy(Lizard.instance["interface"]()[e], Lizard.instance);
                t.regStatisticsEvent(),
                    t.regMarketEvent(),
                    Lizard.readyQueue && _.each(Lizard.readyQueue,
                    function(t) {
                        Lizard.viewReady(t)
                    }),
                    delete Lizard.readyQueue,
                    r.create()

            }
            return Lizard.config.isPad && (i = e.Class(i, n)),
                a
        }),
    define("cPageModelProcessor", ["cModel", "cMemoryStore", "cUtilPath", "cUtilCacheView", "cCoreInherit", "cLocalStore"],
        function(cModel, MStore, path, CacheViews, cCoreInherit, CStore) {
            function callModels(t, e, i) {
                Lizard.ajaxDatas = {},
                    t.models = Lizard.getModels(t),
                    _.each(t.models,
                        function(t, e) {
                            t.modelIndex = e

                        }),
                    _processModels(t, t.models, [], e, i)
            }
            function _processModels(pageConfig, models, datas, callback, errorback) {
                if (0 === models.length) callback(datas, pageConfig);
                else if (!_.some(models,
                    function(t) {
                        return t.error
                    })) {
                    var sortedModels = _resortModels(models);
                    if (_.size(sortedModels.left) == _.size(models)) return _.each(models,
                        function(t) {
                            t.done = !0,
                                datas[t.modelIndex] = {},
                                t.name && (Lizard.ajaxDatas[t.name] = {})

                        }),
                        void onSuccess(pageConfig, datas, sortedModels, callback, errorback);
                    _.each(sortedModels.todo,
                        function(model) {
                            var index = model.modelIndex,
                                url = model.url,
                                emodel = cacheModels.findById([pageConfig.viewName, model.modelIndex, url].join("|"));
                            if (emodel) _transfuncToVal(model.postdata),
                                model.paramChange = _.isEqual(emodel.param, model.postdata) ? !1: !0,
                                emodel.setAttr("param", _.clone(model.postdata));
                            else {
                                emodel = cCoreInherit.Class(cModel, {
                                    __propertys__: function() {
                                        this.urlParseRet = path.parseUrl(url),
                                            this.protocol = this.urlParseRet.protocol.substr(0, this.urlParseRet.protocol.length - 1),
                                            this.checkAuth = !1,
                                            this.requireCid = model.requireCid,
                                            Lizard.config.isUseH5Sys && (this.isUseH5Sys = !0)
                                    }
                                }).getInstance(),
                                    emodel.setAttr("url", (Lizard.restfullApi ? path.parseUrl(Lizard.restfullApi).domain: emodel.urlParseRet.domain) + emodel.urlParseRet.pathname + emodel.urlParseRet.search),
                                    _transfuncToVal(model.postdata),
                                    emodel.setAttr("param", _.clone(model.postdata)),
                                    model.postdata && model.postdata.head && model.postdata.head.extension && (emodel.extension = model.postdata.head.extension);
                                var cacheStore = emodel.getResultStore();
                                if (!cacheStore) {
                                    var cachStore = model.storeKey ? new CStore({
                                        key: model.storeKey
                                    }) : new MStore({
                                        key: [pageConfig.viewName, model.modelIndex, url].join("|")
                                    });
                                    emodel.setAttr("result", cachStore)
                                }
                                cacheModels.add([pageConfig.viewName, model.modelIndex, url].join("|"), emodel)
                            }
                            model.suspend && eval("(" + model.suspend + ")()") ? (model.done = !0, datas[index] = {},
                                model.name && (Lizard.ajaxDatas[model.name] = {}), onSuccess(pageConfig, datas, sortedModels, callback, errorback)) : (pageConfig.serverData && pageConfig.serverData[index] && emodel.result.set(pageConfig.serverData[index], emodel.getTag()), emodel.excute(function(t) {
                                    model.done = !0,
                                        datas[index] = t,
                                        model.name && (Lizard.ajaxDatas[model.name] = t),
                                        onSuccess(pageConfig, datas, sortedModels, callback, errorback)

                                },
                                function(t) { ! _.isFunction(pageConfig.validate) && t instanceof XMLHttpRequest ? (model.error = !0, errorback(datas, pageConfig.errorBack)) : (model.done = !0, datas[index] = t, onSuccess(pageConfig, datas, sortedModels, callback, errorback))
                                },
                                model.ajaxOnly, this))
                        })
                }
            }
            function onSuccess(t, e, i, n, r) {
                t.processed || (_.every(t.models,
                    function(t) {
                        return t.done || t.priority

                    }) ? (_.each(t.models,
                    function(e) {
                        var i = cacheModels.findById([t.viewName, e.modelIndex, e.url].join("|"));
                        i && i.abort()
                    }), t.processed = !0, n(e, t)) : _.every(i.todo,
                    function(t) {
                        return t.done
                    }) && _processModels(t, i.left, e, n, r))
            }
            function _transfuncToVal(obj) {
                for (var p in obj) obj.hasOwnProperty(p) && (_.isString(obj[p]) && 0 === obj[p].indexOf("function") ? obj[p] = eval("(" + obj[p] + ")()") : (_.isObject(obj[p]) || _.isArray(obj[p])) && _transfuncToVal(obj[p]))

            }
            function _resortModels(t) {
                return _.groupBy(t,
                    function(t) {
                        return ! t.depends || _.every(t.depends,
                            function(t) {
                                return t in Lizard.ajaxDatas
                            }) ? "todo": "left"
                    })
            }
            var cacheModels = new CacheViews;
            return callModels
        }),
    define("UIView", [],
        function() {
            var t = function() {
                    var t = 3e3;
                    return function(e) {
                        return e + ++t
                    }
                } (),
                e = function() {
                    var t = {};
                    return {
                        addItem: function(e, i) {
                            t[e] = i
                        },
                        removeItem: function(e) {
                            t[e] && delete t[e]
                        },
                        getItem: function(e) {
                            return e ? t[e] : t
                        }
                    }
                } ();
            return _.inherit({
                propertys: function() {
                    this.wrapper = $("body"),
                        this.id = _.uniqueId("ui-view-"),
                        this.template = "",
                        this.datamodel = {},
                        this.events = {},
                        this.eventArr = {},
                        this.status = "init",
                        this.needAnimat = !1,
                        this.animateShowAction = null,
                        this.animateHideAction = null,
                        this.needRootWrapper = !0

                },
                addEvents: function(t) {
                    _.isObject(t) && _.extend(this.events, t)
                },
                _preventDefault: function(t) {
                    t.preventDefault()
                },
                on: function(t, e, i) {
                    this.eventArr[t] || (this.eventArr[t] = []),
                        i ? this.eventArr[t].splice(0, 0, e) : this.eventArr[t].push(e)
                },
                off: function(t, e) {
                    this.eventArr[t] && (this.eventArr[t] = e ? _.without(this.eventArr[t], e) : [])

                },
                trigger: function(t) {
                    var e,
                        i,
                        n = Array.prototype.slice,
                        r = n.call(arguments, 1),
                        a = this.eventArr,
                        o = [];
                    if (a[t]) for (e = 0, i = a[t].length; i > e; e++) o[o.length] = a[t][e].apply(this, r);
                    return o
                },
                createRoot: function(t) {
                    this.needRootWrapper ? (this.$el = $('<div class="view" style="display: none; " id="' + this.id + '"></div>'), this.$el.html(t)) : this.$el = $(t).hide().attr("id", this.id)

                },
                _isAddEvent: function(t) {
                    return "onCreate" == t || "onPreShow" == t || "onShow" == t || "onRefresh" == t || "onHide" == t ? !0: !1
                },
                setOption: function(t) {
                    for (var e in t)"datamodel" != e && "events" != e ? this._isAddEvent(e) ? this.on(e, t[e]) : this[e] = t[e] : _.extend(this[e], t[e])
                },
                initialize: function(t) {
                    this.propertys(),
                        this.setOption(t),
                        this.resetPropery(),
                        this.addEvent(),
                        this.create(),
                        this.addSysEvents(),
                        this.initElement(),
                        e.addItem(this.id, this)

                },
                getUIContainer: function() {
                    return e.getItem()
                },
                addSysEvents: function() {
                    "function" == typeof this.availableFn && (this.removeSysEvents(), this.$el.on("click.system" + this.id, $.proxy(function(t) {
                            this.availableFn() || (t.preventDefault(), t.stopImmediatePropagation && t.stopImmediatePropagation())
                        },
                        this)))
                },
                removeSysEvents: function() {
                    this.$el.off(".system" + this.id)

                },
                $: function(t) {
                    return this.$el.find(t)
                },
                resetPropery: function() {},
                addEvent: function() {},
                create: function() {
                    this.trigger("onPreCreate"),
                        this.createRoot(this.render()),
                        this.status = "create",
                        this.trigger("onCreate")
                },
                initElement: function() {},
                render: function(t) {
                    var e = this.getViewModel() || {},
                        i = this.template;
                    return this.template ? (e && (i = _.isFunction(this.template) ? this.template(e) : _.template(this.template)(e)), "function" == typeof t && t.call(this), i) : ""
                },
                refresh: function(t) {
                    this.resetPropery(),
                        t ? this.create() : this.$el.html(this.render()),
                        this.initElement(),
                        "show" == this.status && this.show(),
                        this.trigger("onRefresh")

                },
                show: function() {
                    this.wrapper[0] && this.$el[0] && ($.contains(this.wrapper[0], this.$el[0]) || (this.needEmptyWrapper && this.wrapper.html(""), this.wrapper.append(this.$el)), this.trigger("onPreShow"), this.needAnimat && (this.animateInClass ? this.hasAnimationProperty(this.animateInClass) : "function" == typeof this.animateShowAction) && "show" != this.status ? this.animateShowAction.call(this, this.$el) : this.$el.show(), this.status = "show", this.addSysEvents(), this.bindEvents(), this.trigger("onShow"))

                },
                hide: function() {
                    this.$el && "show" === this.status && (this.trigger("onPreHide"), this.needAnimat && (this.animateOutClass ? this.hasAnimationProperty(this.animateOutClass) : "function" == typeof this.animateShowAction) && "hide" != this.status ? this.animateHideAction.call(this, this.$el) : this.$el.hide(), this.status = "hide", this.unBindEvents(), this.removeSysEvents(), this.trigger("onHide"))

                },
                hasAnimationProperty: function(t) {
                    var e = [$.fx.cssPrefix + "animation-name"],
                        i = $("<div></div>");
                    return i.attr("class", t),
                        $("body").append(i),
                            "none" != i.css(e[0]) ? (i.remove(), !0) : (i.remove(), !1)
                },
                destroy: function() {
                    this.status = "destroy",
                        this.unBindEvents(),
                        this.removeSysEvents(),
                        e.removeItem(this.id),
                        this.$el.remove(),
                        this.trigger("onDestroy"),
                        delete this

                },
                getViewModel: function() {
                    return this.datamodel
                },
                setzIndexTop: function(e, i) {
                    e || (e = this.$el),
                        (!i || i > 10) && (i = 0),
                        i = 1e3 * i,
                        e.css("z-index", t(i))
                },
                bindEvents: function() {
                    var t = this.events;
                    if (!t && !(t = _.result(this, "events"))) return this;
                    this.unBindEvents();
                    var e,
                        i,
                        n,
                        r,
                        a,
                        o = /^(\S+)\s*(.*)$/;
                    for (e in t) i = t[e],
                        _.isFunction(i) || (i = this[t[e]]),
                        i && (n = e.match(o), r = n[1], a = n[2], i = _.bind(i, this), r += ".delegateUIEvents" + this.id, "" === a ? this.$el.on(r, i) : this.$el.on(r, a, i));
                    return this
                },
                unBindEvents: function() {
                    return this.$el.off(".delegateUIEvents" + this.id),
                        this
                }
            })
        }),
    define("UIMask", ["UIView", getAppUITemplatePath("ui.mask")],
        function(t) {
            return _.inherit(t, {
                propertys: function($super) {
                    $super()
                },
                resetDefaultProperty: function() {
                    this.events = {},
                        this.animateOutClass = "cm-overlay-out",
                        this.addEvents({
                            touchmove: "_preventDefault"
                        })

                },
                initialize: function($super, t) {
                    $super(t)
                },
                setRootStyle: function() {
                    var t = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                    this.$el.css({
                        width: "100%",
                        height: t + "px",
                        position: "absolute",
                        left: "0px",
                        top: "0px"
                    })
                },
                addEvent: function($super) {
                    $super(),
                        this.on("onCreate",
                            function() {
                                this.$el.addClass("cui-mask")

                            }),
                        this.on("onHide",
                            function() {
                                $(window).off(".mask" + this.id)
                            }),
                        this.on("onShow",
                            function() {
                                this.setRootStyle(),
                                    this.setzIndexTop(),
                                    $(window).off(".mask" + this.id),
                                    $(window).on("resize.mask" + this.id, $.proxy(function() {
                                            this.setRootStyle(),
                                                $.os.android && window.scrollTo(0, window.scrollY + 10)
                                        },
                                        this))
                            })
                }
            })
        }),
    define("UILayer", ["UIView", "UIMask"],
        function(t, e) {
            return _.inherit(t, {
                propertys: function($super) {
                    $super(),
                        this.mask = new e,
                        this.type = "layer",
                        this.resetDefaultProperty()

                },
                resetDefaultProperty: function() {
                    this.mask.resetDefaultProperty(),
                        this.needMask = !0,
                        this.needAnimat = !0,
                        this.maskToHide = !0,
                        this.needReposition = !0,
                        this.hasPushState = history && history.pushState,
                        this.hasPushState = !1,
                        this.historyBack = !1,
                        this.animateInClass = "cm-up-in",
                        this.animateOutClass = "cm-up-out",
                        this.animateShowAction = null,
                        this.animateHideAction = null,
                        this.events = {
                            touchmove: "_preventDefault"
                        }

                },
                initialize: function($super, t) {
                    $super(t),
                        this.clearRes()
                },
                resetPropery: function() {
                    var t = this;
                    this.needAnimat && (this.animateShowAction || (this.animateShowAction = function(e) {
                        var i = !1;
                        e.show(),
                            e.addClass(t.animateInClass),
                            e.one($.fx.animationEnd,
                                function() {
                                    i = !0,
                                        e.removeClass(t.animateInClass)
                                }),
                            setTimeout(function() {
                                    i || (e.removeClass(t.animateInClass), e.off($.fx.animationEnd))

                                },
                                350)
                    }), this.animateHideAction || (this.animateHideAction = function(e) {
                        var i = !1;
                        e.addClass(t.animateOutClass),
                            e.one($.fx.animationEnd,
                                function() {
                                    i = !0,
                                        e.removeClass(t.animateOutClass),
                                        e.hide()
                                }),
                            setTimeout(function() {
                                    i || (e.removeClass(t.animateOutClass), e.off($.fx.animationEnd), e.hide())
                                },
                                350)
                    })),
                        this.mask.needAnimat = !1,
                        this.mask.animateHideAction = this.needAnimat && this.animateHideAction ?
                            function(e) {
                                var i = !1;
                                e.addClass(t.mask.animateOutClass),
                                    e.one($.fx.animationEnd,
                                        function() {
                                            i = !0,
                                                e.removeClass(t.mask.animateOutClass),
                                                e.hide()
                                        }),
                                    setTimeout(function() {
                                            i || (e.removeClass(t.mask.animateOutClass), e.off($.fx.animationEnd), e.hide())
                                        },
                                        350)
                            }: null,
                        this._setMaskEvent()
                },
                _setMaskEvent: function() {
                    var t = this;
                    this.needMask && this.maskToHide && this.mask.addEvents({
                        click: function() {
                            t.hide()

                        }
                    })
                },
                clearRes: function() {},
                _addPushStateEvent: function() {
                    this.hasPushState && (history.pushState({},
                        document.title, location.href), this.historyBack = !1, $(window).on("popstate.pageviewpopstate" + this.id, $.proxy(function() {
                            this.historyBack = !0,
                                this.hide()
                        },
                        this)))
                },
                _removePushStateEvent: function() {
                    this.hasPushState && $(window).off(".pageviewpopstate" + this.id)

                },
                addEvent: function() {
                    this.on("onCreate",
                        function() {
                            this.$el.addClass("cui-layer")
                        }),
                        this.on("onPreShow",
                            function() {
                                this.needMask && this.mask.show()
                            }),
                        this.on("onShow",
                            function() {
                                this.setzIndexTop(),
                                    this._addPushStateEvent(),
                                    this.needReposition && this.reposition()
                            }),
                        this.on("onPreHide",
                            function() {
                                return this.hasPushState && !this.historyBack ? void history.back() : void 0

                            }),
                        this.on("onHide",
                            function() { (!this.hasPushState || this.historyBack) && (this.mask.hide(), this._removePushStateEvent())
                            }),
                        this.on("onDestroy",
                            function() {
                                this.mask.destroy()
                            })
                },
                reposition: function() {
                    this.$el.css({
                        "margin-left": -(this.$el.width() / 2) + "px",
                        "margin-top": -(this.$el.height() / 2) + "px"
                    })
                }
            })
        }),
    define("UIAlert", ["UILayer", getAppUITemplatePath("ui.alert")],
        function(t, e) {
            return _.inherit(t, {
                propertys: function($super) {
                    $super()

                },
                resetDefaultProperty: function($super) {
                    $super(),
                        this.maskToHide = !1,
                        this.datamodel = {
                            title: "",
                            content: "content",
                            btns: [{
                                name: "知道了",
                                className: "cui-btns-ok"
                            }]
                        },
                        this.template = e,
                        this.addEvents({
                            "click .cui-btns-ok": "okAction",
                            "click .cui-btns-cancel": "cancelAction"
                        }),
                        this.okAction = function() {
                            this.hide()
                        },
                        this.cancelAction = function() {
                            this.hide()

                        }
                },
                initialize: function($super, t) {
                    $super(t)
                },
                addEvent: function($super) {
                    $super(),
                        this.on("onCreate",
                            function() {})
                },
                setDatamodel: function(t, e, i) {
                    t || (t = {}),
                        _.extend(this.datamodel, t),
                        e && (this.okAction = e),
                        i && (this.cancelAction = i),
                        this.refresh()
                }
            })
        }),
    define("UIToast", ["UILayer", getAppUITemplatePath("ui.toast")],
        function(t, e) {
            return _.inherit(t, {
                propertys: function($super) {
                    $super()

                },
                resetDefaultProperty: function($super) {
                    $super(),
                        this.template = e,
                        this.datamodel = {
                            content: "toast"
                        },
                        this.hideSec = 2e3,
                        this.hasPushState = !1,
                        this.TIMERRES = null,
                        this.hideAction = function() {}
                },
                initialize: function($super, t) {
                    $super(t)
                },
                addEvent: function($super) {
                    $super(),
                        this.on("onCreate",
                            function() {
                                this.$el.addClass("cui-toast")

                            }),
                        this.on("onShow",
                            function() {
                                this.TIMERRES && clearTimeout(this.TIMERRES),
                                    this.TIMERRES = setTimeout($.proxy(function() {
                                            this.hide()
                                        },
                                        this), this.hideSec)
                            }),
                        this.on("onHide",
                            function() {
                                this.TIMERRES && clearTimeout(this.TIMERRES),
                                    this.hideAction()
                            })
                },
                setDatamodel: function(t, e, i, n) {
                    this.datamodel.content = t,
                        e && (this.hideSec = e),
                        i && (this.hideAction = i),
                        this.maskToHide = n,
                        this.refresh()

                }
            })
        }),
    define("UIAnimation", [],
        function() {
            var t = $.fx.animationEnd;
            return {
                slideleft: function(e, i, n, r) {
                    var a = e.$el;
                    i.$el,
                        i.hide(),
                        a.show(),
                        a.on(t,
                            function() {
                                a.off(t),
                                    $("body").removeClass("hiddenx"),
                                    a.removeClass("animatestart"),
                                    a.removeClass("sliderightin"),
                                    e.onShowed ? a.show() : e.show(),
                                    "function" == typeof n && (r ? n.call(r, e, i) : n(e, i))

                            }),
                        $("body").addClass("hiddenx"),
                        a.addClass("animatestart"),
                        a.addClass("sliderightin")
                },
                slideright: function(e, i, n, r) {
                    var a = e.$el,
                        o = i.$el;
                    o.show(),
                        o.on(t,
                            function() {
                                o.off(t),
                                    $("body").removeClass("hiddenx"),
                                    o.removeClass("animatestart"),
                                    o.removeClass("sliderightout"),
                                    i.hide(),
                                    e.onShowed ? a.show() : e.show(),
                                    "function" == typeof n && (r ? n.call(r, e, i) : n(e, i))

                            }),
                        $("body").addClass("hiddenx"),
                        o.addClass("animatestart"),
                        o.addClass("sliderightout")
                },
                noAnimate: function(t, e, i, n) {
                    e && e.__hide(t.viewname),
                        t.__show(),
                        i && i.call(n, t, e)
                }
            }
        }),
    define("cAbstractApp", ["cPageModelProcessor", "cUtilPerformance", "cUtilCommon", Lizard.config.plainloading ? "UILoadingLayer": "loading", !Lizard.app.vendor.is("CTRIP") && !Lizard.isHybrid || Lizard.app.code.is("WE") ? "UIHeader": "cHybridHeader", Lizard.config.plainloading ? "UIWarning404": "loadFailed", "UIAlert", "UIToast", "cMessageCenter", "UIAnimation", Lizard.app.version.gte(6.4) ? "cHybridShell": "", "cPageParser"],
        function(t, e, i, n, r, a, o, s, c, u, l) {
            function d(t) {
                this.initialize(t)

            }
            /\/html5\//i.test(location.href.replace(/[\?#].+$/, "")) && $("<base/>").attr("href", location.href.replace(/\/html5\//i, "/webapp/")).prependTo($("head").eq(0)),
                Lizard.runAt = "client";
            var h = $(".main-viewport").attr("renderat");
            return Lizard.renderAt = "server",
                h || (Lizard.renderAt = "client"),
                d.subclasses = [],
                d.defaults = {
                    mainRoot: "#main",
                    header: "header",
                    viewport: ".main-viewport",
                    animForwardName: "slideleft",
                    animBackwardName: "slideright",
                    isAnim: !1,
                    maxsize: 10
                },
                d.prototype = {
                    ctnrViewNames: ["lizardHisCtnrView"],
                    viewReady: function(t) {
                        c.subscribe("viewReady", t)

                    },
                    initialize: function(t) {
                        var e = this.initProperty(t);
                        this.options = e,
                            this.firstState = null,
                            this.mainRoot = $(e.mainRoot),
                            this.header = $(e.header),
                            this.targetViewport = this.viewport = this.mainRoot.find(e.viewport),
                            this.curView = null,
                            this.lastView = null,
                            this.maxsize = e.maxsize,
                            this.animForwardName = e.animForwardName,
                            this.animBackwardName = e.animBackwardName,
                            this.isAnim = Lizard.config.animationAPI || Lizard.config.isAnim || e.isAnim,
                            Lizard.config.animationAPI ? require([Lizard.config.animationAPI], _.bind(function(t) {
                                    this.animAPIs = t

                                },
                                this)) : this.animAPIs = u,
                            this.animatName = this.animForwardName,
                            this._loading = new n,
                            this._alert = new o,
                            this._confirm = new o,
                            this._toast = new s,
                            this._warning404 = new a,
                            this.observe = !1,
                            this.headerView = new r({
                                root: $("#headerview"),
                                parent: this
                            }),
                            Lizard.isHybrid && this.headerView.root.addClass("cm-header-hybird-wrap"),
                            this.bindEvents(),
                            this.views = {},
                            this.start(),
                            c.subscribe("switchview",
                                function(t) {
                                    t.$el.show()

                                },
                                this)
                    },
                    showMessage: function(t) {
                        t || (t = {}),
                            "string" == typeof t && (t = {
                            datamodel: {
                                content: t
                            }
                        }),
                            this._alert.resetDefaultProperty(),
                            this._alert.setOption(t),
                            this._alert.refresh(),
                            this._alert.show()
                    },
                    hideMessage: function() {
                        this._alert.hide()
                    },
                    showConfirm: function(t) {
                        t || (t = {}),
                            "string" == typeof t && (t = {
                            datamodel: {
                                content: t
                            }
                        }),
                            this._confirm.resetDefaultProperty(),
                            this._confirm.datamodel.btns = [{
                                name: "取消",
                                className: "cui-btns-cancel"
                            },
                                {
                                    name: "确定",
                                    className: "cui-btns-ok"
                                }],
                            this._confirm.setOption(t),
                            this._confirm.refresh(),
                            this._confirm.show()

                    },
                    hideConfirm: function() {
                        this._confirm.hide()
                    },
                    showWarning404: function(t, e, i) {
                        var n = this;
                        t || (t = {}),
                            "function" == typeof t && (t = {
                            retryAction: t
                        }),
                            this._warning404.resetDefaultProperty(),
                            this._warning404.setOption(t),
                            this._warning404.refresh(),
                            Lizard.showHisCtnrView(function() {
                                    n._warning404 && (n._warning404.wrapper = this.$el, n._warning404.show(), this.headerview.set(i ? i.headData: {
                                        view: this,
                                        title: "网络不给力",
                                        back: !0,
                                        events: {
                                            returnHandler: function() {
                                                Lizard.isHybrid ? decodeURIComponent(window.location.hash.substr(1)) == this.$el.attr("page-url") ? Lizard.goBack() : Lizard.goTo(this.$el.attr("page-url"), {
                                                    pushState: !1
                                                }) : window.location.href.substring(window.location.href.length - this.$el.attr("page-url").length) == this.$el.attr("page-url") ? Lizard.goBack() : Lizard.goTo(this.$el.attr("page-url"), {
                                                    pushState: !1
                                                })

                                            }
                                        }
                                    }))
                                },
                                function() {
                                    n._warning404 && n._warning404.hide()
                                },
                                {
                                    triggerHide: !1,
                                    addToHistory: !1,
                                    viewName: "warning404",
                                    pageConfig: e
                                })
                    },
                    hideWarning404: function() {
                        this._warning404.hide()
                    },
                    showToast: function(t) {
                        t || (t = {}),
                            "string" == typeof t && (t = {
                            datamodel: {
                                content: t
                            }
                        }),
                            this._toast.resetDefaultProperty(),
                            this._toast.setOption(t),
                            this._toast.refresh(),
                            this._toast.show()

                    },
                    hideToast: function() {
                        this._toast.hide()
                    },
                    showLoading: function(t) {
                        this._loading._showTimeout && (clearTimeout(this._loading._showTimeout), delete this._loading._showTimeout),
                            t || (t = {}),
                            this._loading.opener = t.opener,
                            this._loading.resetDefaultProperty(),
                            this.__showLoading(t)
                    },
                    __showLoading: function(t) {
                        this._loading.setOption(t),
                            this._loading.refresh(),
                            this._loading._showTimeout = setTimeout(_.bind(function() {
                                    if (_.isUndefined(l)) this._loading.show();
                                    else {
                                        var t = new l.Fn("show_loading_page");
                                        t.run()
                                    }
                                    delete this._loading._showTimeout
                                },
                                this), Lizard.config.showloadingtimeout || 200)
                    },
                    hideLoading: function() {
                        if (this._loading._showTimeout && (clearTimeout(this._loading._showTimeout), delete this._loading._showTimeout), !this._loading.opener || this._loading.opener === arguments[0]) if (_.isUndefined(l)) this._loading.hide();
                        else {
                            var t = new l.Fn("hide_loading_page");
                            t.run()
                        }
                    },
                    initProperty: function(t) {
                        var e = _.extend({},
                            d.defaults, t || {});
                        return e
                    },
                    bindEvents: function() {
                        $.bindFastClick && $.bindFastClick(),
                            this._handleLink()
                    },
                    _handleLink: function() { (Lizard.isHybrid || i.isSupportPushState) && $("body").on("click", $.proxy(function(t) {
                            for (var e = $(t.target), n = !1; e[0] && "BODY" != e[0].nodeName && !e.hasClass("sub-viewport");) {
                                if ("A" == e[0].nodeName) {
                                    n = !0;
                                    break
                                }
                                e = e.parent()
                            }
                            if (n) {
                                var r = e.attr("href"),
                                    a = {},
                                    o = e.attr("lizard-data");
                                if ("off" == Lizard.config.lizardCatch || "off" == e.attr("lizard-catch") || r && i.isExternalLink(r)) return ! 0;
                                t.preventDefault(),
                                    o && (a.data = JSON.parse(o)),
                                        "back" == e.attr("data-jumptype") ? this.back(e.attr("href"), a) : "forward" == e.attr("data-jumptype") && this.goTo(e.attr("href"), a)

                            }
                        },
                        this))
                    },
                    start: function() {},
                    loadView: function(i, n, r) {
                        var a = e.getUuid(),
                            o = e.getUuid();
                        e.group(a, {
                            name: "Domready",
                            landingpage: 1 == r.landingpage ? 1: 0,
                            url: i
                        }),
                            e.group(o, {
                                name: "Onload",
                                landingpage: 1 == r.landingpage ? 1: 0,
                                url: i
                            }),
                            Lizard.loadingView = !0,
                            i && Lizard.unloadUbt && Lizard.unloadUbt(this.curView);
                        var s = Lizard._initParser(i, n);
                        Lizard.config && Lizard.config.isHideAllLoading || r.hideloading ? (_.isUndefined(s.isHideByOut) ? Lizard.config.isHideByOut: s.isHideByOut) || this.hideLoading() : (Lizard.app.vendor.is("CTRIP") && this.curView && this.curView.$el && this.curView.$el.hide(), this.showLoading());
                        try {
                            s.serverData = window.Fp.getData("datas")

                        } catch(u) {}
                        t(s, _.bind(function(t, s) {
                                if (delete s.serverData, !_.isFunction(this.judgeForward) || this.judgeForward(i)) {
                                    var u = e.getUuid();
                                    e.group(u, {
                                        name: "TemplateRender",
                                        url: i
                                    });
                                    var l = Lizard.render(s, t, r.renderAt);
                                    if (l.header && this.targetViewport == this.viewport && this.header.html(l.header).css({
                                        display: ""
                                    }), e.groupEnd(u), Lizard.viewHtmlMap || (Lizard.viewHtmlMap = {}), Lizard.viewSchemaMap || (Lizard.viewSchemaMap = {}), -1 == _.indexOf(this.ctnrViewNames, l.config.viewName) && (Lizard.viewHtmlMap[l.config.viewName] = n, !Lizard.config.disableSchemaCache)) if (_.isString(l.config.url_schema)) {
                                        var d = l.config.url_schema;
                                        0 === d.indexOf("/") ? Lizard.viewSchemaMap[Lizard.schema2re(d) + "$"] = n: Lizard.viewSchemaMap[Lizard.schema2re("/" + d) + "$"] = n
                                    } else _.each(l.config.url_schema,
                                        function(t) {
                                            0 === t.indexOf("/") ? Lizard.viewSchemaMap[Lizard.schema2re(t) + "$"] = n: Lizard.viewSchemaMap[Lizard.schema2re("/" + t) + "$"] = n
                                        });
                                    var h = $("<DIV></DIV>").css({
                                        display: "none"
                                    });
                                    "server" == r.renderAt ? this.hideLoading() : h = $(l.viewport).css({
                                        display: "none"
                                    }),
                                        !l.config.showfake || this.views[l.config.viewName] && this.views[l.config.viewName].$el.attr("page-url") == i || (_.isObject(l.config.showfake) && l.config.showfake.hideloading && ((_.isUndefined(l.config.isHideByOut) ? Lizard.config.isHideByOut: l.config.isHideByOut) || this.hideLoading()), this.curView && this.curView.saveScrollPos() && this.curView.$el.hide(), Lizard.__fakeViewNode = h.appendTo(this.targetViewport).show()),
                                        require([l.config.controller || "cPageView"], _.bind(function(t) {
                                                if (!_.isFunction(this.judgeForward) || this.judgeForward(i)) {
                                                    if (this.animatName = r.animatName || ("back" == this.navigationType ? this.animBackwardName: this.animForwardName), this.curView && (this.lastView = this.curView), r.forceCreateInstance && l.config.viewName && this.views[l.config.viewName] && (this.views[l.config.viewName].$el && this.views[l.config.viewName].$el.remove(), this.views[l.config.viewName] = null), l.config.viewName && this.views[l.config.viewName]) {
                                                        this.curView = this.views[l.config.viewName],
                                                            this.curView.lastURL = this.curView.$el.attr("page-url");
                                                        var u = _.some(s.models,
                                                            function(t) {
                                                                return t.ajaxOnly || t.paramChange
                                                            });
                                                        Lizard.config.determinOnlyByModel || (u = this.curView.$el.attr("page-url") != i && decodeURIComponent(this.curView.$el.attr("page-url")) != decodeURIComponent(i) && (!_.isFunction(this.curView.emptyContentNode) || this.curView.emptyContentNode(this.curView.$el.attr("page-url"), i)) || u),
                                                            u && (this.curView.$el.remove(), l.config.showfake || h.appendTo(this.targetViewport), this.curView.$el = h, this.curView.onCreate && this.curView.onCreate(), this.curView.delegateEvents(), _.extend(this.curView, _.pick(l, ["datas", "config", "lizTmpl", "lizParam"]))),
                                                            this.curView.lizParam = l.lizParam,
                                                            this.curView.navigationType = this.navigationType

                                                    } else l.config.showfake || h.appendTo(this.targetViewport),
                                                        this.curView = new t({
                                                            el: "server" == r.renderAt ? this.viewport.children().first() : h
                                                        }),
                                                        this.curView.$el.attr("page-url", i),
                                                        this.curView.text = n,
                                                        _.extend(this.curView, _.pick(l, ["datas", "config", "lizTmpl", "lizParam"]));
                                                    if (this.curView.$el.attr({
                                                        "data-view-name": l.config.viewName
                                                    }), this.curView.$el.parent()[0] != this.targetViewport[0] && this.curView.$el.appendTo(this.targetViewport), "server" == r.renderAt && h.remove(), Lizard.__fakeViewNode = null, e.groupEnd(a), this.curView && this.curView.switchByOut) {
                                                        var d = this;
                                                        this.curView.turning = function() {
                                                            if (d.lastView && d.lastView.hide(), c.publish("switchview", [d.curView, d.lastView]), d.curView.$el.show(), this.onShowed = !0, d.isAnim && d.lastView) {
                                                                var t = d.animAPIs[d.animatName];
                                                                t && _.isFunction(t) && t(d.curView, d.lastView, $.proxy(function(t, e) {
                                                                        d._onSwitchEnd(t, e)
                                                                    },
                                                                    d))
                                                            }
                                                            this.hideLoading()

                                                        }
                                                    } else(_.isUndefined(l.config.isHideByOut) ? Lizard.config.isHideByOut: l.config.isHideByOut) || this.hideLoading(),
                                                        c.publish("switchview", [this.curView, this.lastView]);
                                                    this.curView.lastViewId = this.curView.referrer = this.lastView && this.lastView.config.viewName,
                                                        this.switchView(this.curView, this.lastView),
                                                        e.groupEnd(o),
                                                        l.config.viewName && (this.views[l.config.viewName] = this.curView)

                                                }
                                            },
                                            this))
                                }
                            },
                            this), _.bind(function(t, e) {
                                this.hideLoading();
                                var n = {
                                    callback: function() {
                                        Lizard.goTo(i, {
                                            pushState: !1
                                        })
                                    },
                                    headData: {
                                        title: "网络不给力",
                                        back: !0,
                                        events: {
                                            returnHandler: function() {
                                                Lizard.back()
                                            }
                                        }
                                    }
                                };
                                e && (n = _.extend(n, e(t)));
                                var r = {
                                    datamodel: n,
                                    callTelAction: n.callTelAction ||
                                        function() {},
                                    retryAction: n.callback
                                };
                                this.showWarning404(r, s, n)
                            },
                            this))
                    },
                    switchView: function(t, e) {
                        e && !document.getElementById(e.id) && t && !t.switchByOut && (e.$el.appendTo(this.targetViewport), e.$el.hide(), e.id = e.$el.attr("id")),
                            t && !document.getElementById(t.id) && (t.$el.appendTo(this.targetViewport), t.$el.hide(), t.id = t.$el.attr("id"));
                        var i;
                        if (!t) throw "inview 未被实例化";
                        Lizard.T.lizTmpl = t.lizTmpl,
                            Lizard.P.lizParam = t.lizParam,
                            e ? ("none" != e.$el.css("display") && e.saveScrollPos(), this.isAnim && (i = this.animAPIs[this.animatName]), t.fromView = e.config.viewName, _.indexOf(this.ctnrViewNames, t.config.viewName) > -1 && (c.publish("showHisCtnrView"), e.hideWarning404 = _.bind(function() {
                                    "show" === this._warning404.status && ("warning404" == t.config.viewName ? this._warning404.hide() : Lizard.goBack())

                                },
                                this)), i && _.isFunction(i) && !t.switchByOut ? i(t, e, $.proxy(function(t, e) {
                                    this._onSwitchEnd(t, e)
                                },
                                this)) : ( - 1 == _.indexOf(this.ctnrViewNames, t.config.viewName) && (t && !t.switchByOut && e.hide(), t.show()), this._onSwitchEnd(t, e))) : (_.indexOf(this.ctnrViewNames, t.config.viewName) > -1 && c.publish("showHisCtnrView"), t.show(), this._onSwitchEnd(t, e))

                    },
                    _onSwitchEnd: function(t, e) {
                        _.each(this.targetViewport.children(),
                            function(i) {
                                t.switchByOut && e && i == e.$el[0] || i != t.$el[0] && $(i).hide()
                            }),
                            e == t || t.switchByOut || setTimeout(function() {
                                e && e.$el && e.$el.hide()
                            },
                            10),
                            c.publish("viewReady", [t])
                    },
                    showView: function(t) {
                        this.loadView(t.url, t.text, t.options)
                    },
                    goTo: function() {},
                    goBack: function() {},
                    jump: function() {},
                    go: function() {},
                    showHisCtnrView: function(t, e, i) {
                        if (this.curView || i.pageConfig) { ! this.curView && i.pageConfig && (i.addToHistory = !1);
                            var n = this.isAnim,
                                r = this.animatName;
                            this.curView && (this.curView.triggerShow = this.curView.triggerHide = i ? !i.triggerFlag: !0, this.curView.triggerHide = i && "triggerHide" in i ? i.triggerHide: !0),
                                this.isAnim = i && i.isAnim ? !0: this.isAnim,
                                this.isAnim && (this.animatName = this.animForwardName);
                            var a = _.clone(i.pageConfig ? i.pageConfig: this.curView.config),
                                o = i.pageConfig ? i.pageConfig.pageUrl: this.curView.config.pageUrl;
                            if (a.model.apis = [], a.view = {
                                viewport: ""
                            },
                                a.controller = "cPageView", a.viewName = i && i.viewName ? i.viewName: o, -1 == _.indexOf(this.ctnrViewNames, a.viewName) && this.ctnrViewNames.push(a.viewName), i && i.addToHistory === !1 || (Lizard.isHybrid ? (this.endObserver(), encodeURIComponent(o) == window.location.hash.substr(1) ? (window.location.hash = encodeURIComponent(encodeURIComponent(o)), o = encodeURIComponent(o)) : window.location.hash = encodeURIComponent(o)) : history.pushState({
                                    url: o,
                                    text: ' <SCRIPT type="text/lizard-config">' + JSON.stringify(a) + "</SCRIPT>",
                                    options: {
                                        pushState: !0
                                    }
                                },
                                document.title, o)), this.loadView(o, ' <SCRIPT type="text/lizard-config">' + JSON.stringify(a) + "</SCRIPT>", {
                                pushState: !0,
                                hideloading: !0
                            }), Lizard.isHybrid) {
                                var s = 1;
                                $.os.ios && parseInt($.os.version) >= 9 && (s = 100),
                                    setTimeout(_.bind(this.startObserver, this), s)
                            }
                            c.unsubscribe("showHisCtnrView"),
                                c.subscribe("showHisCtnrView",
                                    function() {
                                        var i = this;
                                        this.lizardHisCtnrView = this.curView,
                                            this.curView.onShow || (this.curView.onShow = function() {
                                            t && t.apply(this, arguments),
                                                setTimeout(function() {
                                                        i.animatName = i.animBackwardName

                                                    },
                                                    10)
                                        },
                                            this.curView.onHide = function() {
                                                e && e.apply(this, arguments),
                                                    setTimeout(function() {
                                                            i.isAnim = n,
                                                                i.animatName = r
                                                        },
                                                        10)
                                            }),
                                            this.curView.show(),
                                            i.isAnim && (this.curView.onShowed = !0)
                                    },
                                    this)
                        }
                    },
                    hideHisCtnrView: function() {
                        history.back()
                    },
                    stateObserve: function(t, e, i) {
                        this.curView && (this._stateCallbacks || (this._stateCallbacks = []), this._stateCallbacks.push({
                            callback: t,
                            scope: e,
                            args: i,
                            view: this.curView
                        }))

                    },
                    _callObserveBack: function() {
                        var t = this._stateCallbacks.pop();
                        t.view == this.curView && t.callback.apply(t.scope, t.args)
                    },
                    "interface": function() {
                        return {
                            viewReady: this.viewReady,
                            showMessage: this.showMessage,
                            hideMessage: this.hideMessage,
                            showConfirm: this.showConfirm,
                            hideConfirm: this.hideConfirm,
                            showWarning404: this.showWarning404,
                            hideWarning404: this.hideWarning404,
                            showToast: this.showToast,
                            hideToast: this.hideToast,
                            showLoading: this.showLoading,
                            hideLoading: this.hideLoading,
                            showHisCtnrView: this.showHisCtnrView,
                            hideHisCtnrView: this.hideHisCtnrView,
                            stateObserve: this.stateObserve,
                            goTo: this.goTo,
                            goBack: this.goBack,
                            forward: this.goTo,
                            back: this.goBack,
                            go: this.go,
                            jump: this.jump
                        }

                    }
                },
                d
        }),
    define("cWebApp", ["cUtilCommon", "cCoreInherit", "cAbstractApp", "cUtilPath", "cAjax"],
        function(t, e, i, n, r) {
            return e.Class(i, {
                bindEvents: function($super) {
                    $super(),
                        $(window).bind("popstate", _.bind(function(t) {
                                if (_.size(this._stateCallbacks)) return void this._callObserveBack();
                                var e = t.state || t.originalEvent && t.originalEvent.state;
                                _.isUndefined(e) && location.href.substring(location.href.indexOf(n.parseUrl(location.href).pathname)) == this.__startState.url && (e = this.__startState),
                                    !Lizard.stopStateWatch && e && (e.options && (e.options.pushState = !1, e.options.landingpage = 0, e.options.hideloading = !0, delete e.options.renderAt), history.replaceState({
                                        url: e.url,
                                        text: e.text,
                                        options: e.options
                                    },
                                    document.title, e.url), this.navigationType = "back", _.isUndefined(e.options) && (e.options = {}), e.options.animatName = this.animBackwardName, this.showView(e), Lizard.__fakeViewNode && Lizard.__fakeViewNode.remove())

                            },
                            this))
                },
                start: function() {
                    if (Lizard.config.urlMappingModule) {
                        var t = this;
                        require([Lizard.config.urlMappingModule],
                            function(e) {
                                var i = e(location.href);
                                t.judgeForward(i) ? t._loadViewByLocationUrl() : t.goTo(i, {
                                    pushState: !1,
                                    renderAt: Lizard.renderAt,
                                    landingpage: 1,
                                    hideloading: Lizard.config.isFirstPageHideLoading
                                })

                            })
                    } else this._loadViewByLocationUrl()
                },
                _loadViewByLocationUrl: function() {
                    var t = n.parseUrl(location.href).pathname;
                    t = "/" == t ? "/index": location.href.substring(location.href.indexOf(n.parseUrl(location.href).pathname)),
                        this.__startState = {
                            url: t,
                            text: document.documentElement.innerHTML,
                            options: {
                                pushState: !1,
                                renderAt: Lizard.renderAt,
                                landingpage: 1,
                                hideloading: Lizard.config.isFirstPageHideLoading
                            }
                        },
                        Lizard.app.vendor.is("CTRIP") || history.replaceState({
                            url: t,
                            text: document.documentElement.innerHTML,
                            options: {
                                pushState: !1,
                                renderAt: Lizard.renderAt,
                                landingpage: 1,
                                hideloading: Lizard.config.isFirstPageHideLoading
                            }
                        },
                        document.title, t),
                        this.loadView(t, document.documentElement.innerHTML, {
                            pushState: !1,
                            renderAt: Lizard.renderAt,
                            landingpage: 1,
                            hideloading: Lizard.config.isFirstPageHideLoading
                        })

                },
                goTo: function(e, i) {
                    var n = new Date;
                    if (! (i && !i.forcegoto && this.lastGoto && n - this.lastGoto < 500)) {
                        if (this.navigationType = "forward", this.lastGoto = n, _.isObject(e)) {
                            if (history.length > 1) return void this.goBack();
                            var a = e;
                            return a.animatName = a.animatName || this.animBackwardName,
                                a.replaceFirstState = !0,
                                a.isPushState = !0,
                                void this.goTo(a.defaultView, a)

                        } (t.isUrl(e) || 0 === e.indexOf("http://localhost")) && (e.indexOf("/webapp") > -1 && (e = e.substr(e.indexOf("/webapp"))), e.indexOf("/html5") > -1 && (e = e.substr(e.indexOf("/html5"))));
                        var o = i && (i.viewName || i.pageName),
                            s = i && i.forcegetschema,
                            c = this;
                        if (i && o && Lizard.viewHtmlMap[o]) return void c._loadViewByOptions(e, Lizard.viewHtmlMap[o], i);
                        if (Lizard.viewSchemaMap && !s) {
                            var u = e.replace(/^[^\?#]*\??/g, "").replace(/#DIALOG_.*$/g, "").replace(/#\|cui-.*$/g, ""),
                                l = u ? e.substr(0, e.indexOf(u) - 1) : e,
                                d = "",
                                h = 0;
                            if (_.each(Lizard.viewSchemaMap,
                                function(t, e) {
                                    new RegExp(e).test(l) && e.length > h && (d = t)
                                }), d) return void c._loadViewByOptions(e, d, i)
                        }
                        var f = e,
                            p = Lizard.config.version;
                        p && (f = f.replace(/(\?|#|$)/,
                            function(t, e) {
                                return "#" === e ? "?" + p + "#": "?" === e ? "?" + p + "&": "?" + p
                            })),
                            r.get(f, i ? i.data: {},
                                function(t) {
                                    c._loadViewByOptions(e, t, i)
                                },
                                _.bind(function() {
                                        this.showWarning404(function() {
                                                Lizard.goTo(e, {
                                                    pushState: !1
                                                })
                                            },
                                            null, {
                                                headData: {
                                                    view: this,
                                                    title: "网络不给力",
                                                    back: !0,
                                                    events: {
                                                        returnHandler: function() {
                                                            this.curView ? Lizard.goTo(this.lastView.$el.attr("page-url"), {
                                                                pushState: !1
                                                            }) : Lizard.goBack()

                                                        }
                                                    }
                                                }
                                            })
                                    },
                                    this))
                    }
                },
                _loadViewByOptions: function(t, e, i) {
                    n.parseUrl(t).pathname,
                            i && i.pushState === !1 ? history.replaceState({
                            url: t,
                            text: e,
                            options: {
                                pushState: !1
                            }
                        },
                        document.title, t) : history.pushState({
                            url: t,
                            text: e,
                            options: {
                                pushState: !0
                            }
                        },
                        document.title, t),
                        -1 == e.indexOf("lizard.seed.js") && window.location.reload(),
                        _.isEmpty(i) && (i = {}),
                        i.pushState = !0,
                        i.animatName = i.animatName,
                        this.loadView(t, e, i)

                },
                goBack: function() {
                    0 === arguments.length ? history.back() : (this.goTo.apply(this, arguments), this.navigationType = "back")
                },
                jump: function(e, i) {
                    var n = e;
                    if (!t.isUrl(e)) {
                        var r = window.location.protocol + "//" + window.location.host;
                        n = e.toLowerCase().indexOf("/webapp") < 0 && -1 == e.toLowerCase().indexOf("/html5") ? r + "/webapp/" + e: r + e

                    }
                    i && i.replace ? window.location.replace(n) : window.location.href = n
                },
                judgeForward: function(e) {
                    t.isUrl(e) || 0 === e.indexOf("http://localhost") || (e = window.location.protocol + "//" + window.location.host + (0 === e.indexOf("/") ? e: "/" + e));
                    var i = n.parseUrl(e),
                        r = new RegExp(i.pathname.replace("(", "\\(").replace(")", "\\)") + "$");
                    return r.test(window.location.pathname) || r.test(decodeURIComponent(window.location.pathname))
                },
                stateObserve: function($super, t, e, i) {
                    $super(t, e, i),
                        history.pushState({
                                url: this.curView.config.pageUrl,
                                text: Lizard.viewHtmlMap[this.curView.config.viewName],
                                options: {
                                    pushState: !0
                                }
                            },
                            document.title, this.curView.config.pageUrl)

                }
            })
        }),
    define("text!ui/ui.loading.layer.html", [],
        function() {
            return '<%\r\nvar hasText = (typeof content == \'string\' && content.length > 0);\r\n %>\r\n<div class="cui-grayload-text" style=" <% if(!hasText && !closeBtn){%> width: 80px; height: 70px; <%}%> " >\r\n  <div class="cui-i cui-w-loading">\r\n  </div>\r\n  <div class="cui-i cui-m-logo">\r\n  </div>\r\n  <%if(closeBtn) %>\r\n  <div class="cui-grayload-close">\r\n  </div>\r\n  <% %>\r\n  <div class="cui-grayload-bfont">\r\n  <%if(hasText){ %>\r\n    <%=content %>\r\n    <%} %>\r\n    </div>\r\n</div>\r\n'

        }),
    define("text!ui/ui.mask.html", [],
        function() {
            return '<div class="cui-pop-box">\r\n  <div class="cui-hd">\r\n      <%=title%>\r\n  </div>\r\n  <div class="cui-bd">\r\n    <div class="cui-error-tips">\r\n      <%=content%></div>\r\n    <div class="cui-roller-btns">\r\n      <% for(var i = 0, len = btns.length; i < len; i++ ) {%>\r\n      <div class="cui-flexbd <%=btns[i].className%>">\r\n        <%=btns[i].name%></div>\r\n      <% } %>\r\n    </div>\r\n  </div>\r\n</div>\r\n'

        }),
    define("text!ui/ui.warning404.html", [],
        function() {
            return '<div class="head-warning">\r\n  <div class="head-warning-padding">\r\n    <div class="head-warning-content">\r\n      <div class="cui-load-fail cui-text-center">\r\n        <div class="cui-load-error">\r\n          <div class="cui-i cui-wifi cui-fail-icon">\r\n          </div>\r\n        </div>\r\n        <p class="cui-gray">\r\n          <%=loadFail %></p>\r\n        <button type="button" class="cui-btns-retry">\r\n          <%=tryAgain %></button>\r\n        <%if(showContact) { %>\r\n          <div class="cui-404-tel">\r\n            <div class="cui-glines">\r\n            </div>\r\n            <p class="cui-grayc">\r\n              <%=telText %></p>\r\n            <span  class="cui-btns-tel"><span class="cui-i cui-warning-kf"></span><%=contact %></span></div>\r\n        <% } %>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n'

        }),
    define("text!ui/ui.alert.html", [],
        function() {
            return '<div class="cui-pop-box">\r\n<%if(typeof title == \'string\' && title.length > 0){ %>\r\n  <div class="cui-hd">\r\n      <%=title%>\r\n  </div>\r\n<%} %>\r\n  <div class="cui-bd">\r\n    <div class="cui-error-tips">\r\n      <%=content%></div>\r\n    <div class="cui-roller-btns">\r\n      <% for(var i = 0, len = btns.length; i < len; i++ ) {%>\r\n      <div class="cui-flexbd <%=btns[i].className%>">\r\n        <%=btns[i].name%></div>\r\n      <% } %>\r\n    </div>\r\n  </div>\r\n</div>\r\n'

        }),
    define("text!ui/ui.toast.html", [],
        function() {
            return '<div class="cui-layer-padding">\r\n  <div class="cui-layer-content">\r\n    <%=content %></div>\r\n</div>\r\n'
        }),
    define("text!ui/ui.header.html", [],
        function() {
            return "\r\n<div class=\"cm-header\">\r\n<%\r\n\r\nvar i = 0, len = 0, j = 0, jj = 0;\r\nvar left = left;\r\nvar center = center;\r\nvar right =  right.reverse();\r\nvar item = null;\r\nvar outhtml = ''\r\nvar dir;\r\nvar btnObj = null;\r\n\r\n%>\r\n\r\n<%for(jj=0; jj < 2; jj++) { %>\r\n  <% \r\n    if(jj == 0) { dir = 'fl'; btnObj = left; } else { dir = 'fr'; btnObj = right; }\r\n  %>\r\n  <% for(i = 0, len = btnObj.length; i < len; i++) { %>\r\n    <% item = btnObj[i]; %>\r\n    <%if(typeof item.itemFn == 'function') { %>\r\n      <%=item.itemFn() %>\r\n    <%} else { %>\r\n      <span class=\" cm-header-<%=(item.value ? 'btn' : 'icon') %> <%=dir %>  js_<%=item.tagname %>\" >\r\n        <% if(item.value) { %>\r\n          <%=item.value %>\r\n        <% } else { %>\r\n          <i class=\"icon-<%=item.tagname %>\"></i>\r\n        <% } %>\r\n      </span>\r\n    <%} %>\r\n  <%} %>\r\n<%} %>\r\n\r\n<% item = center; %>\r\n<%if(typeof item.itemFn == 'function') { %>\r\n  <%=item.itemFn() %>\r\n<%} else if(item.tagname=='title' ||  item.tagname=='subtitle') { %>\r\n  <h1 class=\"cm-page-title js_<%=item.tagname %>\" >\r\n    <%if(_.isArray(item.value) && item.value.length == 2) { %>\r\n      <span class=\"cm-title-l\"><%=item.value[0]%></span>\r\n      <span class=\"cm-title-s\"><%=item.value[1]%></span>\r\n    <%} else { %>\r\n      <%=item.value || item.value[0]%>\r\n    <%} %>\r\n  </h1>\r\n<%} else if(item.tagname=='select'){ %>\r\n  <h1 class=\"cm-page-select-title js_<%=item.tagname %>\" >\r\n    <%=item.value %>\r\n  </h1>\r\n<%} else if(item.tagname=='tabs') { %>\r\n  <h1 class=\"cm-page-tabs-title js_<%=item.tagname %>\" >\r\n    <%for(j = 0; j < item.data.items.length; j ++) { %>\r\n      <span data-key=\"<%=item.data.items[j].id %>\" data-index=\"<%=j %>\" class=\"<%if(item.data.index==j){ %>active<%} %>\" ><%=item.data.items[j].name %></span>\r\n    <% } %>\r\n  </h1>\r\n<% } else{ %>\r\n\r\n<%} %>\r\n\r\n</div>\r\n"

        }),
    define("text!ui/ui.bubble.layer.html", [],
        function() {
            return '<section class="cm-pop cm-pop--radius <%=wrapperClass %>  <%if(dir == \'up\'){ %> <%=upClass %> <% } else { %> <%=downClass %> <% } %>">\r\n<i class="icon-pop-triangle"></i>\r\n<div class="cm-pop-bd">\r\n  <ul class="cm-pop-list <%=itemStyleClass %>">\r\n    <% for(var i = 0, len = data.length; i < len; i++) { %>\r\n    <% var itemData = data[i]; %>\r\n    <li data-index="<%=i%>" data-flag="c" class="<% if(index == i){ %><%=curClass %><%} %>"  ><%if(typeof itemFn == \'function\') { %><%=itemFn.call(scope, itemData, i) %> <% } else { %><%=itemData.name%><%} %></li>\r\n    <% } %>\r\n  </ul>\r\n</div>\r\n</section>\r\n\r\n'

        }),
    define("text!ui/ui.emotion.loading.html", [],
        function() {
            return '<div class="" style="z-index: 3002; " id="ui-view-1"><div class="cp-h5-main" style="position: fixed; top: 50%; margin-top:-239px; bottom: 0px; left: 0px; right: 0px; z-index: 3002; "><div class="cp-Network-loading loading-box"><div class="loading-animate"><div class="bubble"></div><div class="eye"></div><div class="eye2"></div><div class="tail"></div><div class="tear"></div><div class="l-hand"></div><div class="r-hand"></div><div class="text"></div><div class="sweat"></div></div><p><i class="i-loading"></i>游游努力加载中...</p></div></div></div> '

        }),
    define("cShell", [],
        function() {
            function t(t) {
                var e,
                    i,
                    n = this,
                    r = {},
                    a = 1,
                    o = 0,
                    s = function(t, n) {
                        e = t,
                            i = n,
                            c(t)
                    },
                    c = function(t) {
                        if (t == e) {
                            var n = r[t];
                            n && n.apply(null, i)
                        }
                    };
                n.done = function(t) {
                    return r[a] = t,
                        c(a),
                        this
                },
                    n.fail = function(t) {
                        return r[o] = t,
                            c(o),
                            this
                    },
                    n.resolve = function() {
                        return s.call(null, a, arguments),
                            n

                    },
                    n.reject = function() {
                        return s.call(null, o, arguments),
                            n
                    },
                    t && (t.done = n.done, t.fail = n.fail)
            }
            function e(t) {
                function e() {
                    var e = t.pre ? t.pre.apply(null, arguments) : arguments;
                    return a.doCall(t.name, "run", e)
                }
                return e.ping = function() {
                    return a.doCall(t.name, "ping", arguments)
                },
                    e
            }
            var i = ["detectDevice", "scanBarcode", "scanQrcode", {
                    name: "share",
                    pre: function() {
                        return arguments

                    },
                    post: function(t) {
                        return t
                    },
                    fail: function() {}
                },
                    "voice2text", "uploadimage", "weiXinGlobal"],
                n = {
                    CTRIP_MASTER: 1,
                    TECENT_WEIXIN: 1
                },
                r = new Error("unavailable"),
                a = {
                    calls: [],
                    doCall: function(e, i, n) {
                        var r,
                            o,
                            s;
                        "object" == typeof n[0] ? (s = n[0], r = n[1], o = n[2]) : (r = n[0], "object" == typeof n[1] ? (s = n[1], o = n[2]) : (o = n[1], s = n[2]));
                        var c = {},
                            u = new t(c),
                            l = function(t) {
                                r && r(t),
                                    u.resolve(t)
                            },
                            d = function(t) {
                                o && o(t),
                                    u.reject(t)
                            },
                            h = [l, d, s];
                        return a.ready ? a.doExec(e, i, h) : a.error ? d(a.error) : a.calls.push({
                            name: e,
                            type: i,
                            args: h
                        }),
                            c
                    },
                    doExec: function(t, e, i) {
                        var n,
                            r = a.methods[t],
                            o = i[0],
                            s = i[1];
                        "function" == typeof r && (r = {
                            run: r
                        }),
                                r && r.run ? (n = r[e]) ? n.apply(null, i) : o && o() : s && s(new Error("unavailable"))

                    }
                },
                o = [Lizard.app.vendor, Lizard.app.code].join("_"),
                s = {};
            return n[o] ? require(["cShell_" + o],
                function(t) {
                    t.ready(function() {
                        a.ready = !0,
                            delete a.error,
                            a.methods = t.METHOD;
                        for (var e; e = a.calls.shift();) a.doExec(e.name, e.type, e.args)
                    }).error(function() {
                        a.ready = !1,
                            a.error = r;
                        for (var t; t = a.calls.shift();) t.args[1](a.error)

                    }).init()
                }) : (a.ready = !1, a.error = r),
                s.weixin = function(t) {
                    n[o] && require(["cShell_" + o],
                        function(e) {
                            e.init(t)
                        })
                },
                i.forEach(function(t) {
                    "string" == typeof t && (t = {
                        name: t
                    }),
                        s[t.name] = e(t)
                }),
                s
        });;

})();