var p=(s,e,t)=>{if(!e.has(s))throw TypeError("Cannot "+t)};var i=(s,e,t)=>(p(s,e,"read from private field"),t?t.call(s):e.get(s)),a=(s,e,t)=>{if(e.has(s))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(s):e.set(s,t)},c=(s,e,t,h)=>(p(s,e,"write to private field"),h?h.call(s,t):e.set(s,t),t);(function(s,e){typeof exports=="object"&&typeof module<"u"?module.exports=e():typeof define=="function"&&define.amd?define(e):(s=typeof globalThis<"u"?globalThis:s||self,s.jsonbin=e())})(this,function(){var e,t,h;"use strict";class s{constructor(n){a(this,e,"");a(this,t,"");a(this,h,"");c(this,e,n)}get id(){return i(this,e)}set id(n){c(this,e,n)}get apiKey(){return i(this,t)}set apiKey(n){c(this,t,n)}get accessKey(){return i(this,h)}set accessKey(n){c(this,h,n)}read(){const n=i(this,e);return fetch(`https://api.jsonbin.io/v3/b/${n}/latest`,{headers:{"Content-Type":"application/json","X-Access-Key":i(this,h)}}).then(o=>o.json()).catch(o=>{console.error(o)})}update(n){const r=i(this,e);return fetch(`https://api.jsonbin.io/v3/b/${r}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then(o=>o.json()).catch(o=>{console.error(o)})}create(n,r=!1){const o={"Content-Type":"application/json","X-Bin-Private":r};return i(this,t)!=""&&(o["X-Master-Key"]=i(this,t)),i(this,h)!=""&&i(this,t)==""&&(o["X-Access-Key"]=i(this,h)),n&&(o["X-Bin-Name"]=n),fetch("https://api.jsonbin.io/v3/b",{method:"POST",headers:o,body:JSON.stringify({foo:"bar"})}).then(d=>d.json()).catch(d=>{console.error(d)})}delete(n=i(this,e)){const r={};return i(this,t)!=""&&(r["X-Master-Key"]=i(this,t)),i(this,h)!=""&&i(this,t)==""&&(r["X-Access-Key"]=i(this,h)),fetch(`https://api.jsonbin.io/v3/b/${n}`,{method:"DELETE",headers:r}).then(o=>o.json()).catch(o=>{console.error(o)})}}return e=new WeakMap,t=new WeakMap,h=new WeakMap,s});
//# sourceMappingURL=jsonbin.umd.js.map