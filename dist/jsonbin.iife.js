var y=(o,t,e)=>{if(!t.has(o))throw TypeError("Cannot "+e)};var s=(o,t,e)=>(y(o,t,"read from private field"),e?e.call(o):t.get(o)),a=(o,t,e)=>{if(t.has(o))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(o):t.set(o,e)},c=(o,t,e,r)=>(y(o,t,"write to private field"),r?r.call(o,e):t.set(o,e),e);var jsonbin=function(){var t,e,r;"use strict";class o{constructor(i){a(this,t,"");a(this,e,"");a(this,r,"");c(this,t,i)}get id(){return s(this,t)}set id(i){c(this,t,i)}get apiKey(){return s(this,e)}set apiKey(i){c(this,e,i)}get accessKey(){return s(this,r)}set accessKey(i){c(this,r,i)}read(){const i=s(this,t);return fetch(`https://api.jsonbin.io/v3/b/${i}/latest`,{headers:{"Content-Type":"application/json","X-Access-Key":s(this,r)}}).then(n=>n.json()).catch(n=>{console.error(n)})}update(i){const h=s(this,t);return fetch(`https://api.jsonbin.io/v3/b/${h}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}).then(n=>n.json()).catch(n=>{console.error(n)})}create(i,h=!1){const n={"Content-Type":"application/json","X-Bin-Private":h};return s(this,e)!=""&&(n["X-Master-Key"]=s(this,e)),s(this,r)!=""&&s(this,e)==""&&(n["X-Access-Key"]=s(this,r)),i&&(n["X-Bin-Name"]=i),fetch("https://api.jsonbin.io/v3/b",{method:"POST",headers:n,body:JSON.stringify({foo:"bar"})}).then(p=>p.json()).catch(p=>{console.error(p)})}delete(i=s(this,t)){const h={};return s(this,e)!=""&&(h["X-Master-Key"]=s(this,e)),s(this,r)!=""&&s(this,e)==""&&(h["X-Access-Key"]=s(this,r)),fetch(`https://api.jsonbin.io/v3/b/${i}`,{method:"DELETE",headers:h}).then(n=>n.json()).catch(n=>{console.error(n)})}}return t=new WeakMap,e=new WeakMap,r=new WeakMap,o}();
//# sourceMappingURL=jsonbin.iife.js.map
