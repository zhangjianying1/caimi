define(["zepto"],function(a){var b={getData:function(){var b,c,d,e;b=document.location.search.substring(1),b&&(c=b.split("&"),d=[],e={},a.each(c,function(a){d=c[a].split("="),e[d[0]]=d[1]}));try{}catch(f){}return e}};return b});