(function(c){function b(){}var a="FacebookConnect";b.prototype.initWithAppId=function(e,f){if(!e){return false}var d=function(g){if(typeof f=="function"){f.apply(null,arguments)}};return c.exec(d,d,a,"initWithAppId",[{appId:e}])};b.prototype.login=function(f,g){if(!f){f={}}var e={permissions:f.permissions||["email"],appId:f.appId||""};var d=function(h){if(typeof g=="function"){g.apply(null,arguments)}};return c.exec(d,d,a,"login",[e])};b.prototype.requestWithGraphPath=function(g,f,e,i){var h;if(!g){g="me"}if(typeof f==="function"){i=f;f={};e=undefined}if(typeof e==="function"){i=e;e=undefined}e=e||"GET";var d=function(j){if(typeof i=="function"){i.apply(null,arguments)}};return c.exec(d,d,a,"requestWithGraphPath",[{path:g,options:f,httpMethod:e}])};b.prototype.logout=function(e){var d=function(f){if(typeof e=="function"){e.apply(null,arguments)}};return c.exec(d,d,a,"logout",[])};b.prototype.dialog=function(g,e,f){var d=function(h){if(typeof f=="function"){f.apply(null,arguments)}};return c.exec(d,d,a,"dialog",[{method:g,params:e}])};c.addConstructor(function(){if(!window.plugins){window.plugins={}}window.plugins.facebookConnect=new b()})})(window.cordova||window.Cordova);