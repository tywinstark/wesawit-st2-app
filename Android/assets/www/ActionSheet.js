(function(a){function b(){}b.prototype.create=function(e,g){e||(e={});var f=e.scope||null;var d={title:e.title||"",items:e.items||["Cancel"],style:e.style||"default",destructiveButtonIndex:e.hasOwnProperty("destructiveButtonIndex")?e.destructiveButtonIndex:undefined,cancelButtonIndex:e.hasOwnProperty("cancelButtonIndex")?e.cancelButtonIndex:undefined};var c=function(h){var i=false,j=h.buttonIndex;if(!d.cancelButtonIndex||j!=d.cancelButtonIndex){i=d.items[j]}if(typeof g=="function"){g.apply(f,[i,j])}};return a.exec(c,c,"ActionSheet","create",[d])};a.addConstructor(function(){if(!window.plugins){window.plugins={}}window.plugins.actionSheet=new b()})})(window.cordova||window.Cordova);