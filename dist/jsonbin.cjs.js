"use strict";var d=(n,t,s)=>{if(!t.has(n))throw TypeError("Cannot "+s)};var i=(n,t,s)=>(d(n,t,"read from private field"),s?s.call(n):t.get(n)),a=(n,t,s)=>{if(t.has(n))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(n):t.set(n,s)},c=(n,t,s,e)=>(d(n,t,"write to private field"),e?e.call(n,s):t.set(n,s),s);var r,o,h;class y{constructor(t){a(this,r,"");a(this,o,"");a(this,h,"");c(this,r,t)}get id(){return i(this,r)}set id(t){c(this,r,t)}get apiKey(){return i(this,o)}set apiKey(t){c(this,o,t)}get accessKey(){return i(this,h)}set accessKey(t){c(this,h,t)}read(){const t=i(this,r);return fetch(`https://api.jsonbin.io/v3/b/${t}/latest`,{headers:{"Content-Type":"application/json","X-Access-Key":i(this,h)}}).then(e=>e.json()).catch(e=>{console.error(e)})}update(t){const s=i(this,r);return fetch(`https://api.jsonbin.io/v3/b/${s}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(e=>e.json()).catch(e=>{console.error(e)})}create(t,s=!1){const e={"Content-Type":"application/json","X-Bin-Private":s};return i(this,o)!=""&&(e["X-Master-Key"]=i(this,o)),i(this,h)!=""&&i(this,o)==""&&(e["X-Access-Key"]=i(this,h)),t&&(e["X-Bin-Name"]=t),fetch("https://api.jsonbin.io/v3/b",{method:"POST",headers:e,body:JSON.stringify({foo:"bar"})}).then(p=>p.json()).catch(p=>{console.error(p)})}delete(t=i(this,r)){const s={};return i(this,o)!=""&&(s["X-Master-Key"]=i(this,o)),i(this,h)!=""&&i(this,o)==""&&(s["X-Access-Key"]=i(this,h)),fetch(`https://api.jsonbin.io/v3/b/${t}`,{method:"DELETE",headers:s}).then(e=>e.json()).catch(e=>{console.error(e)})}}r=new WeakMap,o=new WeakMap,h=new WeakMap;window.jsonbin=y;module.exports=y;
//# sourceMappingURL=jsonbin.cjs.js.map