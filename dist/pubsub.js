!function(t){function n(r){if(o[r])return o[r].exports;var e=o[r]={exports:{},id:r,loaded:!1};return t[r].call(e.exports,e,e.exports,n),e.loaded=!0,e.exports}var o={};return n.m=t,n.c=o,n.p="http://localhost:9090/",n(0)}([function(t,n,o){var r,e;"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(u,i){u.pubsub={},r=i(u.pubsub),e="function"==typeof r?r.call(n,o,n,t):r,!(void 0!==e&&(t.exports=e))}(void 0,function(t){var n={},o=0;return t.subscribe=function(t,r){n[t]||(n[t]=[]);var e=(++o).toString();return n[t].push({token:e,func:r}),e},t.publish=function(t,o){return!!n[t]&&(setTimeout(function(){for(var r=n[t],e=r?r.length:0;e--;)r[e].func(t,o)},0),!0)},t.unSubscribe=function(t){for(var o in n)if(n[o])for(var r=0,e=n[o].length;r<e;r++)if(n[o][r].token===t)return n[o].splice(r,1),t},t.unTopic=function(t,o){return!!t&&(o||n[t]&&delete n[t],!0)},t.getAllTopic=function(){var t=[];if(!Object.keys(n).length)return t;for(var o in n)t.push(o);return t},t})}]);