var d = (n, t, e) => {
  if (!t.has(n))
    throw TypeError("Cannot " + e);
};
var i = (n, t, e) => (d(n, t, "read from private field"), e ? e.call(n) : t.get(n)), a = (n, t, e) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, e);
}, c = (n, t, e, s) => (d(n, t, "write to private field"), s ? s.call(n, e) : t.set(n, e), e);
var r, o, h;
class y {
  constructor(t) {
    a(this, r, "");
    a(this, o, "");
    a(this, h, "");
    c(this, r, t);
  }
  get id() {
    return i(this, r);
  }
  set id(t) {
    c(this, r, t);
  }
  get apiKey() {
    return i(this, o);
  }
  set apiKey(t) {
    c(this, o, t);
  }
  get accessKey() {
    return i(this, h);
  }
  set accessKey(t) {
    c(this, h, t);
  }
  read() {
    const t = i(this, r);
    return fetch(`https://api.jsonbin.io/v3/b/${t}/latest`, {
      headers: {
        "Content-Type": "application/json",
        "X-Access-Key": i(this, h)
      }
    }).then((s) => s.json()).catch((s) => {
      console.error(s);
    });
  }
  update(t) {
    const e = i(this, r);
    return fetch(`https://api.jsonbin.io/v3/b/${e}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
        // 'X-Access-Key': this.#accessKey,
      },
      body: JSON.stringify(t)
    }).then((s) => s.json()).catch((s) => {
      console.error(s);
    });
  }
  create(t, e = !1) {
    const s = {
      "Content-Type": "application/json",
      "X-Bin-Private": e
    };
    return i(this, o) != "" && (s["X-Master-Key"] = i(this, o)), i(this, h) != "" && i(this, o) == "" && (s["X-Access-Key"] = i(this, h)), t && (s["X-Bin-Name"] = t), fetch("https://api.jsonbin.io/v3/b", {
      method: "POST",
      headers: s,
      body: JSON.stringify({ foo: "bar" })
    }).then((p) => p.json()).catch((p) => {
      console.error(p);
    });
  }
  delete(t = i(this, r)) {
    const e = {};
    return i(this, o) != "" && (e["X-Master-Key"] = i(this, o)), i(this, h) != "" && i(this, o) == "" && (e["X-Access-Key"] = i(this, h)), fetch(`https://api.jsonbin.io/v3/b/${t}`, {
      method: "DELETE",
      headers: e
    }).then((s) => s.json()).catch((s) => {
      console.error(s);
    });
  }
}
r = new WeakMap(), o = new WeakMap(), h = new WeakMap();
window.jsonbin = y;
export {
  y as default
};
//# sourceMappingURL=jsonbin.es.js.map
